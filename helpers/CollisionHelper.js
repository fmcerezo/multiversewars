export default class CollisionHelper {
    static collision(enemies, character) {
        for (let i = 0; i < enemies.length; i++) {
            const enemy = {
                top: enemies[i].y,
                bottom: enemies[i].y + enemies[i].ref.current.state.height,
                left: enemies[i].x,
                right: enemies[i].x + enemies[i].ref.current.state.width
            };

            const collision = (character.left >= enemy.left && character.left <= enemy.right
                || character.right >= enemy.left && character.right <= enemy.right)
                &&
                (character.top >= enemy.top && character.top <= enemy.bottom
                || character.bottom >= enemy.top && character.bottom <= enemy.bottom);
            
            if (collision) {
                return true;
            }
        }

        return false;
    }

    static collisionNewEnemy(newEnemySize, newEnemies) {
        for (let i = 0; i < newEnemies.length; i++) {
            const collision = (newEnemySize.left >= newEnemies[i].left && newEnemySize.left <= newEnemies[i].right
                || newEnemySize.right >= newEnemies[i].left && newEnemySize.right <= newEnemies[i].right)
                &&
                (newEnemySize.top >= newEnemies[i].top && newEnemySize.top <= newEnemies[i].bottom
                || newEnemySize.bottom >= newEnemies[i].top && newEnemySize.bottom <= newEnemies[i].bottom);
            
            if (collision) {
                return true;
            }
        }

        return false;
    }
}