import { Text } from "@react-three/drei"

export default function GameInfo({level, phase, height, depth, gold}) {

    return (
        <Text 
            position={[0, height/2+2,  depth/2-0.5]}
            rotation={[0, Math.PI/2, 0]}
        >
            {"Game Info\n"}
            {`Level: ${level}\n`}
            {`Phase: ${phase}\n`}
            {`Gold: ${gold}\n`}
        </Text>
    )
}
