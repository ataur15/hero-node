const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
var admin = require("firebase-admin");

const app = express();
const port = process.env.PORT || 5000;

// firebase admin initialization
var serviceAccount = require("./ema-john-simple-update-a2ed3-firebase-adminsdk-g8vhj-0a7fa8b22b.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// middleware functions
app.use(cors());
app.use(express.json());

// Database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.juclx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// verifyToken function
async function verifyToken(req, res, next) {
    if (req.headers?.authorization?.startsWith('Bearer ')) {
        const idToken = req.headers.authorization.split('Bearer ')[1];
        // console.log('Inside function', idToken);
        try {
            const decodedUser = await admin.auth().verifyIdToken(idToken);
            req.decodedUserEmail = decodedUser.email;
        }
        catch {

        }
    }
    next();
}

async function run() {
    try {
        await client.connect();
        const database = client.db("onlineShop");
        const productCollection = database.collection("products");
        const orderCollection = database.collection("orders");

        // GET API to get all products
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            const count = await cursor.count();
            const page = req.query.page;
            const size = parseInt(req.query.size);
            let products;
            if (page) {
                products = await cursor.skip(page * size).limit(size).toArray();
            }
            else {
                products = await cursor.toArray();
            }

            res.send({
                count,
                products
            });
            // console.log(req.query);
        });

        // POST API to get products by keys
        app.post('/products/bykeys', async (req, res) => {
            const keys = req.body;
            const query = { key: { $in: keys } }
            const products = await productCollection.find(query).toArray();
            res.json(products)
        });

        // POST API to add order information
        app.post('/orders', async (req, res) => {
            const orderInfo = req.body;
            orderInfo.createdAt = new Date();
            const result = await orderCollection.insertOne(orderInfo)
            res.json(result);
        });

        // GET API to get all orders by email
        app.get('/orders', verifyToken, async (req, res) => {
            // console.log(req.headers.authorization);
            const email = req.query.email;
            if (req.decodedUserEmail === email) {
                const query = { email: email };
                const cursor = orderCollection.find(query);
                const orders = await cursor.toArray();
                res.send(orders);
            }
            else {
                res.status(401).json({ message: 'User not authorized' })
            }
        });


        // console.log('Successfully database connected');
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Node server running');
});

app.listen(port, () => {
    console.log('Server running at port', port);
})
