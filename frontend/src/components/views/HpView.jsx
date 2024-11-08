import * as THREE from 'three';
import { useEffect, useRef } from 'react'

const COLOR_GREEN = new THREE.Color("green")
const COLOR_YELLOW = new THREE.Color("yellow")
const COLOR_ORANGE = new THREE.Color("orange")
const COLOR_RED = new THREE.Color("red")

export default function HpView({hpFraction, position, width = 0.5, mode = "slider", modelHeight = 0.5})
{
    const materialRef = useRef()
    useEffect(() =>{
        if (mode === "color") {
            let color = null
            if (hpFraction >= 0.75) {
                color = COLOR_GREEN
            }
            else if (hpFraction >= 0.5) {
                color = COLOR_YELLOW
            }
            else if (hpFraction >= 0.25) {
                color = COLOR_ORANGE
            }
            else {
                color = COLOR_RED
            }
            materialRef.current.color = color
        }
    }, [hpFraction, mode])

    return <>
        <sprite scale={[width, 0.04, 0]} position={[position[0], position[1] + modelHeight, position[2]]} >
            {(mode === "color") &&
                <spriteMaterial ref={materialRef} color={"black"} />
            }
            {(mode === "slider") &&
                <spriteMaterial
                    key={'hp-bar-material:' + hpFraction}
                    onBeforeCompile={
                        (shader, _) => {
                            shader.uniforms.progress = {value: hpFraction};
                            shader.fragmentShader = `
                                uniform float progress;
                                ${shader.fragmentShader}
                                `.replace(
                                    `outgoingLight = diffuseColor.rgb;`,
                                    `outgoingLight = diffuseColor.rgb;
                                    vec3 backColor = mix(vec3(0), vec3(0), progress);
                                    float pb = step(progress, vUv.x);
                                    outgoingLight.rgb = mix(vec3(1, 0, 0), backColor, pb);`
                                )
                    }}
                    defines={{"USE_UV": ""}}
                />
            }
        </sprite>
    </>
}
