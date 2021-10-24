const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

/**
 * built-in middleware functions
 */

// It used to enable CORS with various options.
app.use(cors());
// It parses incoming requests with JSON
app.use(express.json());

/**
 * Database Connection
 */

// Connection URI
const uri = "mongodb+srv://dbuser1:9P2AGUUElq70TuhK@cluster0.juclx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("store");
        const productsCollection = database.collection("products");

        // POST API for data insert
        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            const result = await productsCollection.insertOne(newProduct);
            // console.log('Post hitting', result);
            res.send(result);
        });

        // GET API for all products
        app.get('/products', async (req, res) => {
            const products = req.body;
            const cursor = await productsCollection.find({});
            const result = await cursor.toArray();
            // console.log('data retrieve', result);
            res.send(result);
        });

        // GET API for single product
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.findOne(query);
            res.send(result);
        });

        // PUT API for product update
        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const updateProduct = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    productName: updateProduct.productName,
                    productPrice: updateProduct.productPrice,
                    productQuantity: updateProduct.productQuantity,
                },
            };
            const result = await productsCollection.updateOne(filter, updateDoc, options);
            console.log('update hitting', updateProduct);
            res.json(result)
        });

        // DELETE API for product delete
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
            console.log('Delete hitting', id);
            res.json(result);
        });


        console.log('connected successfully to server');
    }
    finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Node Server');
});

app.listen(port, () => {
    console.log('Listening at', port);
});