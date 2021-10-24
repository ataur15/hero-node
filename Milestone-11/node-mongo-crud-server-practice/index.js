const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 5000;

/**
 * built-in middleware functions
 */

// enable CORS with various options.
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

/**
 * crud operation inside the run function
 */

async function run() {
    try {
        await client.connect();
        const database = client.db('myCompany');
        const usersCollection = database.collection('users');
        console.log("Connected successfully to server");

        // POST API for data insert
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            console.log('post hitting', result);
            res.send(result);
        });

        // GET API for all users
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });

        // GET API for single user
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = await usersCollection.findOne(query);
            console.log('Load user with id', user);
            res.send(user);
        });

        // PUT API for user update
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const updateUser = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email
                },
            };

            const result = await usersCollection.updateOne(filter, updateDoc, options);
            console.log('Update hitting', result);
            res.json(result);

        })

        // DELETE API for data delete
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query);
            console.log('Delete user with id', result);
            res.json(result)
        });


    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running crud server')
})

app.listen(port, () => {
    console.log('listening at', port);
})