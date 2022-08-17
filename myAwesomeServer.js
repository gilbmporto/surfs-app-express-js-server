const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const surfsAppData = require('./surfsAppData');

const PORT = process.env.PORT || 5001;

//app.use(express.static('public'));

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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});