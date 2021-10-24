const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('WOW, I am learning node, excited');
});

const users = [
    {
        id: 0,
        name: "Asif Akbar",
        username: "asif",
        email: "asif@gmail.com",
        phone: "1-770-736-8031 x56442",
    },
    {
        id: 1,
        name: "Evan John",
        username: "evan",
        email: "Shanna@melissa.tv",
    },
    {
        id: 2,
        name: "Jamil Mia",
        username: "jamil",
        email: "jmail@melissa.tv",
    },
    {
        id: 3,
        name: "Rina Khatun",
        username: "rina",
        email: "rina@gmail.com",
    }
]

// post method
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser);
    console.log('hitting the post', req.body);
    // res.send(JSON.stringify(newUser));
    res.json(newUser);
});

app.get('/users', (req, res) => {
    const search = req.query.search;
    if (search) {
        const searchResult = users.find((user) => user.name.toLowerCase().includes(search));
        res.send(searchResult);
    } else {
        res.send(users)
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users[id];
    res.send(user);
});

app.listen(port, () => {
    console.log('listening to ', port);
})