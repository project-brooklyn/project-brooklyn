import { useEffect, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useLoader } from '@react-three/fiber'
import HpView from './HpView.jsx'

export default function BaseView({base, hp})
{
    const model = useLoader(GLTFLoader, '/castle_3d_model.glb');
    if (!model) {
        return <>
        </>
    }

    // TODO: Use render util to convert coordinates, i.e. convertToRenderCoordinates().
    model.scene.position.set(base.x, base.z * 0.1, base.y)

    model.scene.rotation.set(0, base.rotation, 0);
    model.scene.scale.set(base.scale, base.scale, base.scale)

    const object = model.scene
    const key = `${base.x},${base.y},${base.z}`

    return <>
        <HpView hp={hp} yposition={0.75} width={1.0} />
        <primitive object={object} key={key} />
    </>
}
