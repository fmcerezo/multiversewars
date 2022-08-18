var MongoClient = require('mongodb').MongoClient;

export default async function handler(req, res) {
    const { method } = req;
    
  
    switch (method) {
      case "GET":
        var resultRS = await find("characters");

        res.status(200).json({ enemies: resultRS });
        break;

      case "DELETE":
        await erase("characters");

        res.status(200).json({ message: "DELETE" });
        break;
  }
}

async function erase(collectionname) {
  const client = new MongoClient('mongodb://localhost:27017', {useUnifiedTopology: true});
  await client.connect();
  const col = client.db("multiversewars").collection(collectionname);
  await col.deleteMany();
  client.close();
}

async function find(collectionname) {
  const client = new MongoClient('mongodb://localhost:27017', {useUnifiedTopology: true});
  await client.connect();
  const col = client.db("multiversewars").collection(collectionname);
  const result = await col.find().toArray();
  client.close();
  return result;
}