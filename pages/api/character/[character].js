export default function handler(req, res) {
    const { method } = req;

    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017';
  
    switch (method) {
      case "GET":
        MongoClient.connect(url, function(err, db) {
          var dbo = db.db("multiversewars");
          dbo.collection("characters").find({ "name": req.query.character }).toArray(function(err, result) {
            if (err) throw err;
            console.clear();
            console.log(result);
            db.close();
            
            res.status(200).json({ message: "GET", result });
          });
        });
        break;

      case "POST":
        MongoClient.connect(url, async function(err, db) {
          var dbo = db.db('multiversewars');
          console.clear();
          await dbo.collection('characters').insertOne(req.body);
          db.close();
        });

        res.status(200).json({ message: "POST", });
        break;

      case "DELETE":
        MongoClient.connect(url, async function(err, db) {
          var dbo = db.db('multiversewars');
          console.clear();
          await dbo.collection('characters').deleteMany({ "name": req.query.character });
          db.close();
        });

        res.status(200).json({ message: "DELETE" });
        break;

      case "PATCH":
        res.status(200).json({ message: "PATCH" });
        break;

      case "PUT":
        res.status(200).json({ message: "PUT" });
        break;

      default:
        res.status(404).json({ message: "Not found" });
    }
  }
  