export default async function registerSubmit(event) {
  event.preventDefault();

  const data = {
    name: event.target.name.value,
    points: parseInt(event.target.points.value)
  };

  const JSONdata = JSON.stringify(data);
  const endpoint = process.env.API_URL + "/api/v1/records";
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