const RegisterController = {
  entityUri: process.env.API_URL + "/api/v1/records",

  fetch: async (page) => {
    const params = `?sortField=points&sortType=desc&page=${page}&perPage=${process.env.LIST_RECORDS_PER_PAGE}`;
    const res = await fetch(RegisterController.entityUri + params);
    const data = await res.json();

    return data;
  },

  save: async (event) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
      points: parseInt(event.target.points.value)
    };
  
    const JSONdata = JSON.stringify(data);
    const endpoint = RegisterController.entityUri;
    const options = {    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };
  
    const response = await fetch(endpoint, options);
  
    return response.status;
  }
};

export default RegisterController;