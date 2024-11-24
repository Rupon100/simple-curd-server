const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000; // this process.env.PORT is for deploy in somewhere some deploy plateform or 5000 id by default for local
const app = express();//call express
app.use(cors());//middle wire
app.use(express.json());// for because we work with json data or take data from req.body

/*
fardiislamrupon
BmBqr6Xs8KpqbO2y
*/


const uri = "mongodb+srv://fardiislamrupon:BmBqr6Xs8KpqbO2y@cluster0.cne3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // const database = client.db("usersDB");
    // const userCollection = database.collection("users");

    const userCollection = client.db('suersDB').collection('users');

    // for send data into the api
    app.get('/users', async (req,res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const user = await userCollection.findOne(query);
      res.send(user)
    })

    app.post('/users', async (req,res) => {
      const user = req.body;
      console.log('New User: ',user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    app.put('/users/:id', async(req,res) => {
      const id = req.params.id;
      const user = req.body;
      console.log( id ,user );
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatesUser = {
        $set: {
          name: user.name,
          email: user.email
        }
      }
      const result = await userCollection.updateOne(filter, updatesUser, options)
      res.send(result)
    })

    app.delete('/users/:id', async (req,res) => {
      const id = req.params.id;
      console.log('Please delete from datapase: ', id);

      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);

    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req,res) => {
    res.send('Simple CURD is running.....')
})


app.listen(port, () => {
    console.log(`This server is running on port: ${port}`)
})