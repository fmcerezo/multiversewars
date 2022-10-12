import UuidHelper from "../helpers/UuidHelper";

const CookieController = {
    cookieField: "gameCode=",
  
    delete: (response) => {
      if (200 === response.status) {
        document.cookie = CookieController.cookieField + '; max-age=0';
      }
    },
    
    get: () => {
      const cookieValue = document.cookie;
  
      let gameCode = "";
      if (UuidHelper.uuidLength + CookieController.cookieField.length === cookieValue.length) {
        gameCode = document.cookie.replace(CookieController.cookieField, "");
      }
  
      return gameCode;
    },
  
    set: (response, gameCode) => {
      if (200 === response.status) {
        document.cookie = CookieController.cookieField + gameCode + "; expires=Tue, 19 Jan 2038 04:14:07 GMT; path=/";
      }
    }
  };

  export default CookieController;