import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react'

const COLOR_GREEN = new THREE.Color("green")
const COLOR_YELLOW = new THREE.Color("yellow")
const COLOR_ORANGE = new THREE.Color("orange")
const COLOR_RED = new THREE.Color("red")

export default function HpView({hp, mode = "slider"})
{
    const width = 1.0

    const materialRef = useRef()
    const [currentHp, setCurrentHp] = useState(hp)

    useEffect(() =>{
        if (mode === "color") {
            let color = null
            if (hp >= 0.75) {
                color = COLOR_GREEN
            }
            else if (hp >= 0.5) {
                color = COLOR_YELLOW
            }
            else if (hp >= 0.25) {
                color = COLOR_ORANGE
            }
            else {
                color = COLOR_RED
            }
            materialRef.current.color = color
        }
        else if (mode === "slider") {
            setCurrentHp(hp)
        }
    }, [hp])

    return <>
        {(mode === "color") &&
            <sprite scale={[width, 0.04, 0]} position-y={0.75} >
                <spriteMaterial ref={materialRef} color={"black"} />
            </sprite>
        }
        {(mode === "slider") &&
            <sprite scale={[1, 0.04, 0]} position-y={0.75} >
                <spriteMaterial
                    key={'hp-bar-material:' + currentHp}
                    onBeforeCompile={
                        (shader, _) => {
                            shader.uniforms.progress = {value: currentHp};
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
                    customProgramCacheKey={() => {return hp}}
                />
            </sprite>
        }
    </>
}
