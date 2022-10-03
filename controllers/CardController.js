const Uuid = {
  uuidLength: 19,

  getUuid: () => {
    return Uuid.getUuidPart() + '-' + Uuid.getUuidPart() + '-' + Uuid.getUuidPart() + '-' + Uuid.getUuidPart();
  },

  getUuidPart: () => {
    return (((1+Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
};

const CardController = {
    cookieField: "gameCode=",
    entityUri: process.env.API_URL + "/api/v1/cards",

    createStateToSave: (state) => {
      let stateCopy = {
        ...state
      };
      
      stateCopy.enemies = [];
      state.enemies.forEach(enemy => {
        stateCopy.enemies.push({
          imgSrc: enemy.imgSrc,
          name: enemy.name,
          points: enemy.points,
          x: enemy.x,
          y: enemy.y
        });
      });

      stateCopy.gifts = [];
      state.gifts.forEach(gift => {
        stateCopy.gifts.push({
          type: gift.type,
          points: gift.points,
          x: gift.x,
          y: gift.y
        });
      });

      return stateCopy;
    },

    getCookieGameCode: () => {
      const cookieValue = document.cookie;

      let gameCode = "";
      if (Uuid.uuidLength + CardController.cookieField.length === cookieValue.length) {
        gameCode = document.cookie.replace(CardController.cookieField, "");
      }

      return gameCode;
    },
  
    load: async (gameCode) => {
      const params = `/${gameCode}`;
      const response = await fetch(CardController.entityUri + params);
      const retValue = 200 === response.status ? response.json() : false;
  
      return retValue;
    },
  
    save: async (state, controllerState) => {
      const gameCode = Uuid.getUuid();
      const stateCopy = CardController.createStateToSave(state);

      const data = {
        gameCode: gameCode,
        state: stateCopy,
        controllerState: controllerState
      };
    
      const JSONdata = JSON.stringify(data);
      const endpoint = CardController.entityUri;
      const options = {    
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      };
    
      const response = await fetch(endpoint, options);
      const retValue = 200 === response.status ? gameCode : false;

      if (false !== retValue) {
        document.cookie = CardController.cookieField + gameCode + "; expires=Tue, 19 Jan 2038 04:14:07 GMT; path=/";
      }

      return retValue;
    }
  };
  
  export default CardController;