const express = require('express');
const path = require('path');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

// HTML calls
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) =>{
    let data = fs.readFileSync(__dirname+ "/db/db.json");
    res.json(JSON.parse(data));
});

//HTML calls
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
    let obj = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    }

    let data = fs.readFileSync(__dirname + "/db/db.json");
    let jsonData = JSON.parse(data);

    jsonData.push(obj);

    let newDb = JSON.stringify(jsonData);

    fs.writeFileSync(__dirname+"/db/db.json", newDb);

    res.send('Proceeded POST request');
})

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
app.delete('/api/notes/:id', (req, res)=> {
    console.log(req.body);

    let data = fs.readFileSync(__dirname + "/db/db.json");
    let jsonData = JSON.parse(data);

    let remaining = jsonData.filter(element => element.id != req.params.id);

    let newDb = JSON.stringify(remaining);

    fs.writeFileSync(__dirname + "/db/db.json", newDb);

    res.send('Proceeded DELETE request')
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})