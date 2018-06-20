const data = require('./data.js');
const express = require('express');
const path = require('path');
const cors = require('cors');
const moment = require('moment');
const search = require('./search');

const app = express();

app.use(cors());

app.get('/flights', (req, res) => {
    
    const arr = search(req.query.origin, req.query.dest, req.query.depDate, req.query.retDate);

    const result = { 
        origin : req.query.origin, 
        dest: req.query.dest, 
        depDate: req.query.depDate,
        retDate: req.query.retDate === 'null' ? null : req.query.retDate,
        arr 
    };
    return res.send(result);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server listening on port ' + port + '!');
});