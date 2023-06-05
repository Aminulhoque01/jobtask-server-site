const mongoose = require("mongoose");
const express = require("express");
const app = (module.exports = express());
const port = 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8qoxdwe.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const categoriesProductCollection = client.db("job-task").collection("alltask");
  

    app.get("/alltask", async (req: any, res: { send: (arg0: any) => void; }) => {
      const query = {};
      const categories = await categoriesProductCollection
        .find(query)
        .toArray();

      res.send(categories);
    });

    app.get("/single-task/:id", async (req: { params: { id: any; }; }, res: { send: (arg0: any) => void; }) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const category = await categoriesProductCollection.findOne(query);
      res.send(category);
    });

    app.post("/addtask", async (req: { body: any; }, res: { send: (arg0: any) => void; }) => {
      const addProduct = req.body;
      const result = await categoriesProductCollection.insertOne(addProduct);
      res.send(result);
    });

    app.get('/addProducts', async(req: any,res: { send: (arg0: any) => void; })=>{
       const query={};
        const result = await categoriesProductCollection.find(query).toArray();
        res.send(result);
    })


    app.delete('/delete-task/:id', async(req: { params: { id: any; }; },res: { send: (arg0: any) => void; })=>{
        const id = (req.params.id).trim()
        const filter= { _id: new ObjectId(id) };
        const result = await categoriesProductCollection.deleteOne(filter);
        res.send(result)
    });

 

  

   

   

    app.put('/task/:id',  async(req: { params: { id: any; }; },res: { send: (arg0: any) => void; })=>{

        const id = (req.params.id).trim();
        const filter = { _id: new ObjectId(id)}
        const options = { upsert:false };
        const updateDoc={
            $set:{
                role:'verified',
                description:"description"
            }
        }
        const result = await categoriesProductCollection.updateOne(filter,updateDoc,options);
        res.send(result);
    });

  
  } finally {
  }
}
run().catch((error) => {
  console.log(error);
});

app.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
  res.send("Hello World!");
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
