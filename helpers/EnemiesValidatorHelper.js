export default class EnemiesValidatorHelper {
    /**
     * Check at least one enemy can be defeated by player.
     * @param {object} enemies
     * @param {int} heroPoints
     * @returns {bool}
     */
    static validate(enemies, heroPoints) {
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].points <= heroPoints) {
                return true;
            }
        }

        return false;
    }
}