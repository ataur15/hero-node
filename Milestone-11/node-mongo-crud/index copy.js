const express = require('express');
const { MongoClient, Collection } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// user: dbuser1
// pass: 9P2AGUUElq70TuhK

const uri = "mongodb+srv://dbuser1:9P2AGUUElq70TuhK@cluster0.juclx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("foodMaster");
        const usersCollection = database.collection("users");
        // create a document to insert
        const doc = {
            name: "Mushfiqur Rahim",
            email: "mushfiq@gmail.com",
            phone: "01578787878",
        }
        const result = await usersCollection.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running crud server')
});

app.listen(port, () => {
    console.log('listening to', port);
})