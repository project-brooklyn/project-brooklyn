import { Text } from "@react-three/drei"

export default function GameInfo({level, phase, height, depth}) {

    return (
        <Text 
            position={[0, height/2+1,  depth/2-0.5]}
            rotation={[0, Math.PI/2, 0]}
        >
            {"Game Info\n"}
            {`Level: ${level}\n`}
            {`Phase: ${phase}\n`}
        </Text>
    )
};
