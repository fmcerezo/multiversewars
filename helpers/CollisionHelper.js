export default class CollisionHelper {
    static collision(objects, hero, useRef) {
        for (let i = 0; i < objects.length; i++) {
            const enemy = useRef 
            ? 
            {
                top: objects[i].y,
                bottom: objects[i].y + objects[i].ref.current.state.height,
                left: objects[i].x,
                right: objects[i].x + objects[i].ref.current.state.width
            }
            :
            {
                top: objects[i].top,
                bottom: objects[i].bottom,
                left: objects[i].left,
                right: objects[i].right
            };

            const collision = (hero.left >= enemy.left && hero.left <= enemy.right
                || hero.right >= enemy.left && hero.right <= enemy.right)
                &&
                (hero.top >= enemy.top && hero.top <= enemy.bottom
                || hero.bottom >= enemy.top && hero.bottom <= enemy.bottom);
            
            if (collision) {
                return i;
            }
        }

        return false;
    }
}