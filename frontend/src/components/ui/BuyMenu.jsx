import { Text } from "@react-three/drei"

export default function BuyMenu({width, depth, exampleTowers, selectedTower, setSelectedTower}) {

    const buyButtons = exampleTowers.map((tower, i) => {
        const handleClick = () => {
            if (selectedTower === tower.name) {
                setSelectedTower('');
            } else {
                setSelectedTower(tower.name);
            }
        }
        
        return (
            <Text
                key={i}
                position={[width/2, 0,  depth + 3 + i]}
                rotation={[-Math.PI/2, 0, 0]}
                onClick={handleClick}
            >
                {`${selectedTower === tower.name ? '>' : ' '} ${tower.name}: ${tower.price}\n`}
            </Text>
        )
    });

    return (
        <>
            <Text 
                position={[width/2, 0,  depth + 2]}
                rotation={[-Math.PI/2, 0, 0]}
            >
                {"Buy Menu\n"}
            </Text>
            {buyButtons}
        </>
    )
};
