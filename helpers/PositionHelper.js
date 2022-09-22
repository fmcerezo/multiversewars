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

    static getCloserRandomAroundReference(reference, whContainer, closeLevel) {
        const horizontalDistance = Math.floor(Math.random() * (reference.left / closeLevel));
        const verticalDistance = Math.floor(Math.random() * (reference.top / closeLevel));

        const pos = {
            x:  Math.floor(Math.random() * 2) === 1 
                ? reference.left - (horizontalDistance + whContainer.width)
                : reference.right + horizontalDistance,

            y:  Math.floor(Math.random() * 2) === 1 
                ? reference.top - (verticalDistance + whContainer.height)
                : reference.bottom + verticalDistance
        }

        // Using hero size as reference, we are not looking for to be exact.
        return PositionHelper.get(pos, whContainer);
    }

    static getRandomAroundReference(reference, whContainer) {
        return PositionHelper.getCloserRandomAroundReference(reference, whContainer, 1);
    }
}