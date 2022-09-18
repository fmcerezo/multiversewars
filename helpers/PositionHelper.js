export default class PositionHelper {
    static get(xyContainer, whContainer) {
        return {
            top: xyContainer.y,
            bottom: xyContainer.y + whContainer.height,
            left: xyContainer.x,
            right: xyContainer.x + whContainer.width
        };
    }

    static getExtended(position, widthDistance, heightDistance) {
        return {
            top: position.top - heightDistance,
            bottom: position.bottom + heightDistance,
            left: position.left - widthDistance,
            right: position.right + widthDistance
        };
    }

    static getRandomAroundReference(reference, whContainer, whScene) {
        const pos = {
            x:  Math.floor(Math.random() * 2) === 1 
                ? Math.floor(Math.random() * reference.left) 
                : reference.right + Math.floor(Math.random() * (whScene.clientWidth - reference.right)),

            y:  Math.floor(Math.random() * 2) === 1 
                ? Math.floor(Math.random() * reference.top) 
                : reference.bottom + Math.floor(Math.random() * (whScene.clientHeight - reference.bottom))
        }

        // Using hero size as reference, we are not looking for to be exact.
        return PositionHelper.get(pos, whContainer);
    }
}