export default async function RegisterController(event) {
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

  const result = await response.json();
  alert(`Is this your full name: ${result.message}`);
}