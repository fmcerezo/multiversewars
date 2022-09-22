import CollissionHelper from '../helpers/CollisionHelper';
import EnemiesValidatorHelper from '../helpers/EnemiesValidatorHelper';
import PositionHelper from '../helpers/PositionHelper';
import React from 'react';

export default class GiftController {
    constructor(game) {
        this.game = game;
        this.given = false;
        this.lastSecondFight = 0;
    }

    collect(gift) {
        let result = {
            collected: false,
            data: {
                gifts: this.game.state.gifts,
                points: 0
            }
        };

        if ('powerup' === gift.type) {
            result.collected = true;
            result.data.gifts.splice(gift.id, 1);
            result.data.points = this.game.state.points + gift.points;

            this.given = result.data.gifts.length > 0;
        }

        return result;
    }

    collision() {
        const hero = PositionHelper.get(this.game.state, this.game.refScene.current.state.refPlayer.current.state);
        const idxGift = CollissionHelper.collision(this.game.state.gifts, hero, true);
        return idxGift === false ? idxGift : this.collect(this.game.state.gifts[idxGift]);
    }

    get() {
        if (!this.isGiftPending() && this.lastSecondFight + 10 < this.game.state.seconds 
            && !EnemiesValidatorHelper.validate(this.game.state.enemies, this.game.state.points)) {
            this.lastSecondFight = this.game.state.seconds;
            this.given = true;

            const hero = PositionHelper.get(this.game.state, this.game.refScene.current.state.refPlayer.current.state);
            const random = PositionHelper.getCloserRandomAroundReference(
                hero,
                this.game.refScene.current.state.refPlayer.current.state,
                5
            );

            return [
                {
                    "type": "powerup",
                    "points": 10,
                    "ref": React.createRef(),
                    "x": random.left,
                    "y": random.top
                }
            ];
        } else {
            return [];
        }
    }

    isGiftPending() {
        return this.given;
    }

    setLastSecondFight(second) {
        this.lastSecondFight = second;
    }
}