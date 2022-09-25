import CollissionHelper from '../helpers/CollisionHelper';
import PositionHelper from '../helpers/PositionHelper';

function calculateXY(heroLocation, enemy, enemyDistance) {
    return {
        x: heroLocation.x + enemyDistance >= enemy["x"]
                && heroLocation.x - enemyDistance <= enemy["x"]
            ? heroLocation.x
            : heroLocation.x < enemy["x"]
            ? enemy["x"] - enemyDistance
            : enemy["x"] + enemyDistance,
        y: heroLocation.y + enemyDistance >= enemy["y"]
                && heroLocation.y - enemyDistance <= enemy["y"]
            ? heroLocation.y
            : heroLocation.y < enemy["y"]
            ? enemy["y"] - enemyDistance
            : enemy["y"] + enemyDistance
    };
}

class UpdateEnemiesPositionController {
    static getUpdated(heroLocation, enemies, enemyDistance) {
        for (let i = 0; i < enemies.length; i++) {
            let newEnemyPos = calculateXY(heroLocation, enemies[i], enemyDistance);
            let newEnemyLocation;
            let attempt = 0;
            do {
                switch (attempt) {
                    case 1:
                        newEnemyPos.x = enemies[i]["x"];
                        break;
                    case 2:
                        newEnemyPos.y = enemies[i]["y"];
                        break;
                }
                newEnemyLocation = PositionHelper.get(newEnemyPos, enemies[i].ref.current.state);
                attempt++;
            } while (attempt < 3 && CollissionHelper.collision(enemies, newEnemyLocation, true, i) !== false);

            enemies[i]["x"] = newEnemyPos.x;
            enemies[i]["y"] = newEnemyPos.y;
        }
        
        return enemies;
    }
}

export default UpdateEnemiesPositionController;