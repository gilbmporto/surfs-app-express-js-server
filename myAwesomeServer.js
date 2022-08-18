const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const surfsAppData = require('./surfsAppData');
const surfsAppDatabase = require('./surfsAppData');

const PORT = process.env.PORT || 5001;

app.use(express.static('public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.status(200).send("Surf's App Group of Friends Random Facts can be found here!")
})

app.get('/surfs-app/random', (req, res, next) => {
    let randomId = Math.ceil(Math.random() * 8);
    let randomData = surfsAppData[(randomId - 1)];
    res.send({
        data: randomData
    });
})

app.get('/surfs-app/all', (req, res, next) => {
    res.status(200).send({
        data: surfsAppData
    })
})

app.get(`/surfs-app/:person`, (req, res, next) => {
    let personFName = (req.query.personName).toLowerCase();
    console.log(req.query.firstName);
    for (obj of surfsAppData) {
        if ((obj.firstName).toLowerCase() == personFName) {
            res.send({
                data: obj
            })
            return obj;
        };
    }
    res.status(404).send('Name not found');
});

app.get('/surfs-app/post-new-fact/:newfact', (req, res, next) => {
    let userName = req.query.username;
    let passWord = req.query.password;
    let authAccess = false;
    const validUsers = [
        {
            username: 'gil.porto',
            password: '231546'
        }, 
        {
            username: 'davi.navarro',
            password: '786989'    
        }];
    for (const user of validUsers) {
        if (user.username === userName && user.password === passWord) {
            authAccess = true;
            res.status(200).send({auth: authAccess, data: surfsAppData})
            return user;
        } else {
            res.status(403).send({auth: authAccess});
            return user;
            };
        }
});

app.post('/surfs-app/post-new-fact/:newfact',(req, res, next) => {
    let personToAddFact = req.query.personToAddFact;
    let newFactToBeAdded = req.query.factToBePosted;
    for (obj of surfsAppDatabase) {
        if (personToAddFact === obj.firstName) {
            (obj.facts).push({
                factId: ((obj.facts).length + 1),
                info: newFactToBeAdded
            });
            res.send({
                newFactId: ((obj.facts).length + 1),
                personName: personToAddFact,
                newFact: newFactToBeAdded
            });
        } else {
            res.status(404).send('Person not found!');
        };
    };
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});