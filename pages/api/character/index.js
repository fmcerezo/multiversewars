var MongoClient = require('mongodb').MongoClient;

export default async function handler(req, res) {
    const { method } = req;
    const { character } = req.query;
    
  
    switch (method) {
      case "GET":
        var resultRS = await find("characters");

        res.status(200).json({ message: "GET", data: "Total results", info: resultRS });
        break;      
  }
}

async function find(collectionname,json) {
  const client = new MongoClient('mongodb://localhost:27017', {useUnifiedTopology: true});
  await client.connect();
  const col = client.db("multiversewars").collection(collectionname);
  const result = await col.find().toArray();
  client.close();
  return result;
}