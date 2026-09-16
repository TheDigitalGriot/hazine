import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { createHash } from 'node:crypto'
import * as THREE from 'three'
import { actors } from '../src/config/experienceManifest.js'
import { OFFICE_CALIBRATION, callerScale, callerFloorPosition, buildTerrainRoute, measuredTerrainRoute, sampleTerrainRoute, routeProgress, TRUCK_CALIBRATION, spatialFrames } from '../src/scene/spatialCalibration.js'
import { loadGeneratedModel, visibleBounds } from '../scripts/calibrate-scenes.mjs'
import { globeInfluence, orientGeography } from '../src/scene/geographicChoreography.js'
import { trapezoidEnvelope } from '../src/scene/sceneProfiles.js'
import { momentById } from '../src/data/liveMeeting.js'
import { sceneCoordinate, sceneAnchorSnapshot } from '../src/scene/sceneCoordinate.js'
import { projectTruckVertices, truckTerrainLineOfSight, projectionCamera } from '../scripts/project-quarry.mjs'

function projectOfficeModel(model,key,progress,width,height) {
  const camera=projectionCamera(progress,width,height,true)
  const f={...spatialFrames.office,...spatialFrames.office.mobile}
  const matrix=new THREE.Matrix4().compose(new THREE.Vector3(...f.position),new THREE.Quaternion().setFromEuler(new THREE.Euler(...f.rotation)),new THREE.Vector3().setScalar(f.scale))
  if(key==='caller') matrix.multiply(new THREE.Matrix4().compose(new THREE.Vector3(...callerFloorPosition),new THREE.Quaternion().setFromEuler(new THREE.Euler(0,Math.PI,0)),new THREE.Vector3().setScalar(callerScale)))
  const bounds=new THREE.Box2(),point=new THREE.Vector3()
  model.traverse(mesh=>{
    if(!mesh.isMesh||mesh.name.includes('Background'))return
    const transform=matrix.clone().multiply(mesh.matrixWorld),vertices=mesh.geometry.attributes.position
    for(let i=0;i<vertices.count;i++) {
      point.fromBufferAttribute(vertices,i).applyMatrix4(transform).project(camera)
      bounds.expandByPoint(new THREE.Vector2((point.x+1)*width/2,(1-point.y)*height/2))
    }
  })
  return {key,progress,width,height,min:bounds.min.toArray(),max:bounds.max.toArray(),size:bounds.getSize(new THREE.Vector2()).toArray()}
}

function mobileCallerLineOfSight(office,caller,progress,width=375,height=844) {
  const camera=projectionCamera(progress,width,height,true),f={...spatialFrames.office,...spatialFrames.office.mobile}
  const frame=new THREE.Matrix4().compose(new THREE.Vector3(...f.position),new THREE.Quaternion().setFromEuler(new THREE.Euler(...f.rotation)),new THREE.Vector3().setScalar(f.scale))
  const terrainRoot=new THREE.Group(),personRoot=new THREE.Group()
  terrainRoot.matrix.copy(frame);terrainRoot.matrixAutoUpdate=false
  const room=office.clone(true)
  room.children.filter(mesh=>mesh.name.includes('Background')).forEach(mesh=>room.remove(mesh))
  terrainRoot.add(room);terrainRoot.updateMatrixWorld(true)
  personRoot.matrix.copy(frame.clone().multiply(new THREE.Matrix4().compose(new THREE.Vector3(...callerFloorPosition),new THREE.Quaternion().setFromEuler(new THREE.Euler(0,Math.PI,0)),new THREE.Vector3().setScalar(callerScale))))
  personRoot.matrixAutoUpdate=false;personRoot.add(caller.clone(true));personRoot.updateMatrixWorld(true)
  const bounds=projectOfficeModel(caller,'caller',progress,width,height),ray=new THREE.Raycaster(),results=[]
  for(let y=0;y<7;y++)for(let x=0;x<5;x++) {
    const px=bounds.min[0]+(x+.5)/5*(bounds.max[0]-bounds.min[0]),py=bounds.min[1]+(y+.5)/7*(bounds.max[1]-bounds.min[1])
    ray.setFromCamera(new THREE.Vector2(px/width*2-1,1-py/height*2),camera)
    const personHit=ray.intersectObject(personRoot,true)[0]
    if(!personHit)continue
    ray.far=personHit.distance-.001
    const block=ray.intersectObject(terrainRoot,true)[0]
    ray.far=Infinity
    results.push({pixel:[px,py],personDistance:personHit.distance,blocker:block?.object.name??null,visible:!block})
  }
  return {progress,width,height,personPixelRays:results.length,visibleRays:results.filter(r=>r.visible).length,results}
}

test('actual mobile office and grounded person occupy the exposed top scene above transcript',async()=>{
  const office=await loadGeneratedModel('office'),caller=await loadGeneratedModel('caller'),fixtures=[]
  for(const [w,h] of [[375,844],[375,667]])for(const p of [.255,.265,.285,.265]) {
    const room=projectOfficeModel(office,'office',p,w,h),human=projectOfficeModel(caller,'caller',p,w,h)
    // Relative stage survives shorter height; native person does not shrink to21px.
    // Tiny room-edge crop is allowed; actual human body is wholly on stage.
    assert(room.min[0]>=-w*.035&&room.max[0]<=w*1.035)
    assert(room.min[1]>=h*.19&&room.max[1]<=h*.48)
    assert(human.min[1]>=h*.29&&human.max[1]<=h*.43)
    assert(human.size[1]>=36)
    const sight=mobileCallerLineOfSight(office,caller,p,w,h)
    assert(sight.personPixelRays>=10)
    // The measured residual blocker is one lowest-pixel table ray; most of the
    // actual body must remain clear, not merely the center behind glass/wall.
    assert(sight.visibleRays/sight.personPixelRays>=.9,'actual office triangles occlude caller body')
    fixtures.push({room,human,sight})
  }
  assert.deepEqual(spatialFrames.office.position,[-2.65,-.16,-.3])
  assert.equal(spatialFrames.office.scale,.62)
  await fs.writeFile(new URL('../.prism/shared/research/2026-09-15-mobile-office-projection.json',import.meta.url),JSON.stringify({observedAt:new Date().toISOString(),method:'Actual generated post-hide office/person vertices; mobile runtime camera and shared frame; neutral pointer.',fixtures},null,2))
})

test('quarry truck projects into the observed central reading region and crystal waits for release', async () => {
  const truck = await loadGeneratedModel('truck')
  for (const p of [.505,.535,sceneCoordinate(5505/11502),.575]) {
    const { bounds,size } = projectTruckVertices(truck,p)
    assert(bounds.min[0]>=520&&bounds.max[0]<=890, `truck x bounds leave unobstructed region at ${p}`)
    assert(bounds.min[1]>=125&&bounds.max[1]<=800)
    assert(size[0]>45&&size[1]>35)
  }
  for(const p of [.535,.56,.575]) {
    const {bounds,size}=projectTruckVertices(truck,p,390,844,true)
    assert(bounds.min[0]>35&&bounds.max[0]<355)
    assert(bounds.min[1]>284&&bounds.max[1]<608)
    assert(size[0]>25&&size[1]>20)
  }
  const lineOfSight=truckTerrainLineOfSight(truck,await loadGeneratedModel('quarry'),sceneCoordinate(5505/11502))
  assert(lineOfSight.truckPixelRays>=10)
  assert.equal(lineOfSight.visibleRays,lineOfSight.truckPixelRays)
  const quarry=actors.find(a=>a.key==='quarry'),crystal=actors.find(a=>a.key==='crystal')
  for(let p=0;p<=1;p+=.001) {
    if(trapezoidEnvelope(p,quarry.focus,quarry.spread)>0) assert.equal(trapezoidEnvelope(p,crystal.focus,crystal.spread),0)
  }
  assert.equal(trapezoidEnvelope(sceneCoordinate(5505/11502),crystal.focus,crystal.spread),0)
  assert.equal(trapezoidEnvelope(crystal.focus,crystal.focus,crystal.spread),1)
})

test('measured actual chapter links share one spatial coordinate and release vault before call', () => {
  const callRaw = 2808 / (12402 - 900)
  const callScene = sceneCoordinate(callRaw)
  assert.equal(callScene, .265)
  const vault = actors.find(({ key }) => key === 'vault'), office = actors.find(({ key }) => key === 'office')
  assert.equal(trapezoidEnvelope(callScene,vault.focus,vault.spread),0)
  assert.equal(trapezoidEnvelope(callScene,office.focus,office.spread),1)
  assert.equal(sceneCoordinate(3906/11502),.395)
  assert.equal(sceneCoordinate(5004/11502),.505)
  const anchors = sceneAnchorSnapshot()
  for (const { raw,scene } of [...anchors].reverse()) assert.equal(sceneCoordinate(raw),scene)
})

test('globe aims API-projected Toronto then corridor and never overlaps extraction/building', () => {
  const geography = momentById().geography
  const calls = []
  const globe = { getCoords: (lat, lng) => { calls.push([lat,lng]); return lat > 0 ? { x: -1, y: 1, z: .3 } : { x: -1, y: -.4, z: .4 } } }
  const node = new THREE.Group()
  node.position.set(.35,.1,0)
  const camera = new THREE.Vector3(.35,.3,3.9)
  const scratch = { from: new THREE.Quaternion(), to: new THREE.Quaternion(), direction: new THREE.Vector3(), origin: new THREE.Vector3(), corridor: new THREE.Vector3() }
  for (const [p, endpoint] of [[.395,'origin'],[.448,'corridor'],[.395,'origin']]) {
    orientGeography(globe, geography, camera, node, scratch, p)
    assert(scratch[endpoint].clone().applyQuaternion(node.quaternion).dot(scratch.direction) > .999999)
  }
  assert.deepEqual(calls[0], [43.6532,-79.3832])
  assert.deepEqual(calls[1], [-23.65,-70.4])
  const building = actors.find(({ key }) => key === 'building')
  const quarry = actors.find(({ key }) => key === 'quarry')
  for (let p = 0; p <= 1; p += .001) {
    if (globeInfluence(p) > .012) {
      assert.equal(trapezoidEnvelope(p, quarry.focus, quarry.spread), 0)
      assert.equal(trapezoidEnvelope(p, building.focus, building.spread), 0)
    }
  }
})

test('caller stays human-sized, clears desk, and feet share the real office floor', () => {
  assert(Math.abs(callerFloorPosition[1] + OFFICE_CALIBRATION.callerMinY * callerScale - OFFICE_CALIBRATION.floorY) < 1e-12)
  assert(Math.abs(OFFICE_CALIBRATION.callerHeight * callerScale - 1.7) < 1e-12)
  assert(callerFloorPosition[2] < -1.272 - .264711 * callerScale)
  assert(callerFloorPosition[2] > OFFICE_CALIBRATION.windowZ)
  assert.equal(actors.find(({ key }) => key === 'office').frame, actors.find(({ key }) => key === 'caller').frame)
  assert.equal(actors.find(({ key }) => key === 'quarry').frame, actors.find(({ key }) => key === 'truck').frame)
  assert.equal(actors.find(({ key }) => key === 'truck').drift, undefined)
  for (const frame of [spatialFrames.office, { ...spatialFrames.office, ...spatialFrames.office.mobile }]) {
    const worldFeet = frame.position[1] + frame.scale * OFFICE_CALIBRATION.floorY
    const callerFeet = frame.position[1] + frame.scale * (callerFloorPosition[1] + OFFICE_CALIBRATION.callerMinY * callerScale)
    assert(Math.abs(worldFeet - callerFeet) < 1e-12)
  }
})

test('generated post-hide bounds and mesh-sampled haul contact are replayable', async () => {
  const office = await loadGeneratedModel('office')
  const bounds = visibleBounds(office, ['Background'])
  assert(bounds.size[0] < 9.3 && bounds.size[0] > 9.2)
  assert(!bounds.meshes.some(({ name }) => name.includes('Background')))
  const floorRay = new THREE.Raycaster(new THREE.Vector3(callerFloorPosition[0], -1, callerFloorPosition[2]), new THREE.Vector3(0,-1,0))
  const floorHit = floorRay.intersectObject(office,true)[0]
  assert.equal(floorHit.object.name, 'Minimalistic_Modern_Office_Structure_0')
  assert(Math.abs(floorHit.point.y - OFFICE_CALIBRATION.floorY) < 1e-12)
  const quarry = await loadGeneratedModel('quarry')
  for (const [file, expected] of [['public/models/mining_quarry.glb', '8ee06ebc04f47848b362d536b2565761bfc9ff45e78ff94569747304635f3bde'], ['src/models/QuarryModel.jsx', '76896e49792c3767c0f8349b108f3e0326dd1dc81b854dc06822af26ad099005']]) {
    assert.equal(createHash('sha256').update(await fs.readFile(new URL(`../${file}`, import.meta.url))).digest('hex'), expected, `Terrain cache requires refresh after ${file} changes`)
  }
  const started = performance.now()
  const route = buildTerrainRoute(quarry)
  assert.equal(route.length, 49)
  assert.deepEqual(route.map(({ position, quaternion, contacts }) => [position.toArray(), quaternion.toArray(), contacts]), measuredTerrainRoute.map(({ position, quaternion, contacts }) => [position.toArray(), quaternion.toArray(), contacts]))
  for (const sample of route) {
    assert(sample.contacts.every((contact) => contact.every(Number.isFinite)))
    assert(sample.position.y < .5 && sample.position.y > -3.4)
    assert(sample.quaternion.y !== undefined)
  }
  assert(TRUCK_CALIBRATION.scale * 52.796 / 16.877971 < .06)
  const position = new THREE.Vector3(), quaternion = new THREE.Quaternion()
  const replay = [.267, .395, .448, .468, .505, .535, .575, .61].map((progress) => {
    sampleTerrainRoute(route, routeProgress(progress), position, quaternion)
    return { progress, truckPosition: position.toArray(), truckQuaternion: quaternion.toArray() }
  })
  for (const fixture of [...replay].reverse()) {
    sampleTerrainRoute(route, routeProgress(fixture.progress), position, quaternion)
    assert.deepEqual(position.toArray(), fixture.truckPosition)
    assert.deepEqual(quaternion.toArray(), fixture.truckQuaternion)
  }
  await fs.writeFile(new URL('../.prism/shared/research/2026-09-15-scene-replay-fixtures.json', import.meta.url), JSON.stringify({ observedAt: new Date().toISOString(), routeBuildMs: performance.now() - started, screenshotStatus: 'ROOT-OWNED-PENDING', viewports: [[1440,900],[390,844]], replay, route: route.map(({ t, position, quaternion, contacts }) => ({ t, position: position.toArray(), quaternion: quaternion.toArray(), contacts })) }, null, 2))
})
