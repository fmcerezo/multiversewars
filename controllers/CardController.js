import CookieController from "./CookieController";
import UuidHelper from "../helpers/UuidHelper";

const CardController = {
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

  delete: async (gameCode) => {
    const endpoint = CardController.entityUri + `/${gameCode}`;
    const response = await fetch(endpoint, { method: 'DELETE' });
    CookieController.delete(response);
  },

  getRequestSaveData: (state) => {
    let gameCode = CookieController.get();
    let method = 'PUT';
    let params = `/${gameCode}`;
    
    if ('' === gameCode) {
      gameCode = UuidHelper.getUuid();
      method = 'POST';
      params = '';
    }

    return {
      gameCode: gameCode,
      method: method,
      params: params,
      state: CardController.createStateToSave(state)
    }
  },

  load: async (gameCode) => {
    const params = `/${gameCode}`;
    const response = await fetch(CardController.entityUri + params);
    const retValue = 200 === response.status ? response.json() : false;
    CookieController.set(response, gameCode);

    return retValue;
  },

  save: async (state, controllerState) => {
    const requestSaveData = CardController.getRequestSaveData(state);

    const data = {
      gameCode: requestSaveData.gameCode,
      state: requestSaveData.state,
      controllerState: controllerState
    };
  
    const JSONdata = JSON.stringify(data);
    const endpoint = CardController.entityUri + requestSaveData.params;
    const options = {    
      method: requestSaveData.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };
  
    const response = await fetch(endpoint, options);
    CookieController.set(response, data.gameCode);
  },

  validGameCode: () => {
    return "" !== document.getElementById("gameCode").value;
  }
};

export default CardController;