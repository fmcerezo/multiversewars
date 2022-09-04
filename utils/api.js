class Data {
    constructor(collectionName) {
        const MongoClient = require("mongodb").MongoClient;
        this.client = new MongoClient(process.env.DB_HOST, {useUnifiedTopology: true});
        this.collectionName = collectionName;
    }

    async eraseAll() {
        const col = await this.getCollection();
        await col.deleteMany();
        this.client.close();
    }

    async findAll(query) {
        let page = 1;
        if (query.page && parseInt(query.page) > 0) {
            page = parseInt(query.page);
        }

        let perPage = 20;
        if (query.perPage && parseInt(query.perPage) > 0) {
            perPage = parseInt(query.perPage);
        }

        let sorting = {};
        if (query.sortField && query.sortType) {
            sorting[query.sortField] = 'desc' === query.sortType ? -1 : 1;
        }

        const skip = (page - 1) * perPage;

        const col = await this.getCollection();
        const totalCount = await col.countDocuments();
        const result = await col.find().sort(sorting).skip(skip).limit(perPage).toArray();
        const pageCount = result.length;
        this.client.close();
        return {
            meta: {
              success: true,
              totalCount: totalCount,
              pageCount: Math.ceil(totalCount/perPage),
              currentPage: page,
              perPage: perPage,
            },
            result: result
          };
    }

    async getCollection() {
        await this.client.connect();
        return this.client.db(process.env.DB_SCHEMA).collection(this.collectionName);
    }

    async insert(data) {
        const col = await this.getCollection();
        await col.insertOne(data);
        this.client.close();
    }
}

export default async function handler(req, res) {
    const { method } = req;
    const arrayUrl = req.url.split("/");
    const collectionName = arrayUrl.splice(-1)[0].split("?")[0];
    const data = new Data(collectionName);

    switch (method) {
        case "GET":
            const results = await data.findAll(req.query);
            let json = {};
            json[collectionName] = results;
            res.status(200).json(json);
            break;

        case "POST":
            await data.insert(req.body);
            res.status(200).json({ message: "POST" });
            break;

        case "DELETE":
            await data.eraseAll();
            res.status(200).json({ message: "DELETE" });
            break;
        
        default:
            res.status(404).json({ message: "Not found" });
    }
}