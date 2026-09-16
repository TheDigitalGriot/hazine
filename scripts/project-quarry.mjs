import fs from 'node:fs/promises'
import * as THREE from 'three'
import { loadGeneratedModel } from './calibrate-scenes.mjs'
import { spatialFrames, measuredTerrainRoute, sampleTerrainRoute, routeProgress, TRUCK_CALIBRATION } from '../src/scene/spatialCalibration.js'
import { sceneProfiles, smoothstep } from '../src/scene/sceneProfiles.js'
import { sceneCoordinate } from '../src/scene/sceneCoordinate.js'

export function projectionCamera(progress, width = 1425, height = 900, mobile = false) {
  const profile = sceneProfiles[mobile ? 'mobile' : 'desktop']
  const keys = profile.cameraKeys
  let i = 1
  while (i < keys.length - 1 && keys[i].p < progress) i++
  const alpha = smoothstep(keys[i - 1].p, keys[i].p, progress)
  const camera = new THREE.PerspectiveCamera(profile.fov, width / height, .1, 1000)
  camera.position.lerpVectors(keys[i - 1].position, keys[i].position, alpha)
  camera.lookAt(new THREE.Vector3().lerpVectors(keys[i - 1].look, keys[i].look, alpha))
  camera.updateMatrixWorld(true)
  return camera
}

export function extractionWorldMatrix(mobile = false) {
  const f = spatialFrames.extraction
  const frame = mobile ? { ...f, ...f.mobile } : f
  return new THREE.Matrix4().makeTranslation(sceneProfiles[mobile ? 'mobile' : 'desktop'].sceneOffsetX, 0, 0)
    .multiply(new THREE.Matrix4().compose(new THREE.Vector3(...frame.position), new THREE.Quaternion().setFromEuler(new THREE.Euler(...frame.rotation)), new THREE.Vector3().setScalar(frame.scale)))
    .multiply(new THREE.Matrix4().makeTranslation(...f.origin))
}

export function projectTruckVertices(truck, progress, width = 1425, height = 900, mobile = false) {
  const camera = projectionCamera(progress, width, height, mobile)
  const position = new THREE.Vector3(), quaternion = new THREE.Quaternion()
  sampleTerrainRoute(measuredTerrainRoute, routeProgress(progress), position, quaternion)
  const transform = extractionWorldMatrix(mobile)
    .multiply(new THREE.Matrix4().compose(position, quaternion, new THREE.Vector3().setScalar(TRUCK_CALIBRATION.scale)))
    .multiply(new THREE.Matrix4().makeTranslation(-TRUCK_CALIBRATION.centerX, 0, -TRUCK_CALIBRATION.centerZ))
  const bounds = { min: [Infinity,Infinity], max: [-Infinity,-Infinity] }
  truck.traverse(mesh => {
    if (!mesh.isMesh) return
    const matrix = transform.clone().multiply(mesh.matrixWorld)
    const vertices = mesh.geometry.attributes.position
    const point = new THREE.Vector3()
    for (let i=0;i<vertices.count;i++) {
      point.fromBufferAttribute(vertices,i).applyMatrix4(matrix).project(camera)
      const x=(point.x+1)*width/2,y=(1-point.y)*height/2
      bounds.min[0]=Math.min(bounds.min[0],x);bounds.min[1]=Math.min(bounds.min[1],y)
      bounds.max[0]=Math.max(bounds.max[0],x);bounds.max[1]=Math.max(bounds.max[1],y)
    }
  })
  return { progress, routeT:routeProgress(progress), nativePosition:position.toArray(), camera:camera.position.toArray(), bounds, size:bounds.max.map((v,i)=>v-bounds.min[i]) }
}

export function truckTerrainLineOfSight(truck, quarry, progress, width = 1425, height = 900) {
  const camera = projectionCamera(progress,width,height)
  const position=new THREE.Vector3(),quaternion=new THREE.Quaternion()
  sampleTerrainRoute(measuredTerrainRoute,routeProgress(progress),position,quaternion)
  const terrainRoot=new THREE.Group()
  terrainRoot.matrix.copy(extractionWorldMatrix());terrainRoot.matrixAutoUpdate=false
  terrainRoot.add(quarry.clone(true));terrainRoot.updateMatrixWorld(true)
  const truckRoot=new THREE.Group()
  truckRoot.matrix.copy(extractionWorldMatrix().multiply(new THREE.Matrix4().compose(position,quaternion,new THREE.Vector3().setScalar(TRUCK_CALIBRATION.scale))).multiply(new THREE.Matrix4().makeTranslation(-TRUCK_CALIBRATION.centerX,0,-TRUCK_CALIBRATION.centerZ)));truckRoot.matrixAutoUpdate=false
  truckRoot.add(truck.clone(true));truckRoot.updateMatrixWorld(true)
  const {bounds}=projectTruckVertices(truck,progress,width,height)
  const ray=new THREE.Raycaster(),results=[]
  for(let y=0;y<5;y++)for(let x=0;x<5;x++) {
    const px=bounds.min[0]+(x+.5)/5*(bounds.max[0]-bounds.min[0]),py=bounds.min[1]+(y+.5)/5*(bounds.max[1]-bounds.min[1])
    ray.setFromCamera(new THREE.Vector2(px/width*2-1,1-py/height*2),camera)
    const truckHit=ray.intersectObject(truckRoot,true)[0]
    if(!truckHit)continue
    ray.far=truckHit.distance+.001
    const terrainHit=ray.intersectObject(terrainRoot,true)[0]
    ray.far=Infinity
    results.push({pixel:[px,py],truckDistance:truckHit.distance,terrainDistance:terrainHit?.distance??null,visible:!terrainHit||terrainHit.distance>=truckHit.distance-.001})
  }
  return {progress,truckPixelRays:results.length,visibleRays:results.filter(r=>r.visible).length,results}
}

if (process.argv[1]?.endsWith('project-quarry.mjs')) {
  const truck = await loadGeneratedModel('truck')
  const quarry = await loadGeneratedModel('quarry')
  const result = { observedAt:new Date().toISOString(), method:'Actual generated truck vertices projected using runtime nested frames and camera keys; neutral pointer. Real approved quarry triangles check line-of-sight.', desktop:[.505,.535,sceneCoordinate(5505/11502),.575,.59,.605].map(p=>projectTruckVertices(truck,p)), mobile:[.535,.56,.575].map(p=>projectTruckVertices(truck,p,390,844,true)),lineOfSight:truckTerrainLineOfSight(truck,quarry,sceneCoordinate(5505/11502)) }
  await fs.writeFile(new URL('../.prism/shared/research/2026-09-15-quarry-projection.json',import.meta.url),JSON.stringify(result,null,2))
  console.log(JSON.stringify(result,null,2))
}
