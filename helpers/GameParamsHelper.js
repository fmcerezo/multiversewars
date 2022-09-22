const GameParamsHelper = {
    heroDistance: 1,
    initialEnemyDistance: 0,
    initialMaxEnemies: 3,
    initialPoints: 1,
    maxEnemyDistance: 6,

    getGameParams: (sceneContainer, playerContainer) => {
        const halfPlayerWidth = parseInt(playerContainer.width / 2);
        const halfPlayerHeight = parseInt(playerContainer.height / 2);

        const params = GameParamsHelper.getInitialGameParams();
        params.showStartScreen = false;
        params.x = parseInt(sceneContainer.clientWidth / 2) - halfPlayerWidth;
        params.y = parseInt(sceneContainer.clientHeight / 2) - halfPlayerHeight;

        return params;
    },

    getInitialGameParams: () => {
        return {
            backColor: 'transparent',
            clicks: 0,
            enemies: [],
            gifts: [],
            points: GameParamsHelper.initialPoints,
            showRegisterScreen: false,
            showStartScreen: true,
            screen: 1,
            seconds: 0,
            x: 500,
            y: 200
        };
    },
}

export default GameParamsHelper;