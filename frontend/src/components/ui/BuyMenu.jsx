import { Text } from "@react-three/drei"
import BuildGhostView from "../views/BuildGhostView";

export default function BuyMenu({width, depth, towerConstructors, newTower, setNewTower}) {
    const exampleTowers = towerConstructors.map(constructor => new constructor());

    const buyButtons = exampleTowers.map((tower, i) => {
        const handleClick = () => {
            if (newTower?.name === tower.name) {
                setNewTower(null);
            } else {
                const example = exampleTowers.find(example => tower.name === example.name);
                if (example) setNewTower(new example.constructor());
            }
        };
        
        return (
            <Text
                key={i}
                position={[width/2, 0,  depth + 3 + i]}
                rotation={[-Math.PI/2, 0, 0]}
                onClick={handleClick}
            >
                {`${newTower && newTower.name === tower.name ? '>' : ' '} ${tower.name}: ${tower.price}\n`}
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
            {newTower && <BuildGhostView structure={newTower} />}
        </>
    )
};
