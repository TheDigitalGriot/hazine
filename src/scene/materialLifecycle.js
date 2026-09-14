import * as THREE from 'three'

function cloneMaterial(material, actor) {
  const clone = material.clone()
  const baseOpacity = clone.opacity ?? 1

  clone.userData = {
    ...clone.userData,
    hazineBaseOpacity: baseOpacity,
    hazineBaseTransparent: Boolean(clone.transparent),
  }

  if (actor.crystal) {
    clone.color?.set('#e2a13f')
    clone.emissive?.set('#c97c24')
    clone.emissiveIntensity = 1.9
    clone.roughness = 0.24
    clone.metalness = 0.12
  }

  return clone
}

/**
 * Clone once, cache once, animate the cached handles forever after. Generated
 * glTF components intentionally use dispose={null}, so this owns only the
 * per-actor material clones and restores the shared source materials on exit.
 */
export function prepareActorMaterials(root, actor) {
  const handles = []

  root.traverse((object) => {
    if (!object.isMesh || !object.material) return

    const excluded = actor.hide?.some((fragment) => object.name.includes(fragment))
    if (excluded) {
      handles.push({ mesh: object, excluded: true, originalVisible: object.visible })
      object.visible = false
      return
    }

    const originalWasArray = Array.isArray(object.material)
    const originals = originalWasArray ? object.material : [object.material]
    const clones = originals.map((material) => cloneMaterial(material, actor))

    const originalCastShadow = object.castShadow
    const originalReceiveShadow = object.receiveShadow
    object.castShadow = true
    object.receiveShadow = true
    object.material = originalWasArray ? clones : clones[0]
    handles.push({
      mesh: object,
      originals,
      clones,
      originalWasArray,
      originalVisible: object.visible,
      originalCastShadow,
      originalReceiveShadow,
    })
  })

  return handles
}

export function setActorMaterialInfluence(handles, influence) {
  for (const handle of handles) {
    if (handle.excluded) continue
    for (const material of handle.clones) {
      const baseOpacity = material.userData.hazineBaseOpacity ?? 1
      const opacity = THREE.MathUtils.clamp(baseOpacity * influence * 2.3, 0, baseOpacity)
      material.transparent = material.userData.hazineBaseTransparent || opacity < 0.999
      material.opacity = opacity
      material.depthWrite = opacity > 0.74 && baseOpacity > 0.74
    }
  }
}

export function releaseActorMaterials(handles) {
  for (const handle of handles) {
    handle.mesh.visible = handle.originalVisible
    if (handle.excluded) continue
    handle.mesh.castShadow = handle.originalCastShadow
    handle.mesh.receiveShadow = handle.originalReceiveShadow
    handle.mesh.material = handle.originalWasArray ? handle.originals : handle.originals[0]
    for (const material of handle.clones) material.dispose()
  }
}
