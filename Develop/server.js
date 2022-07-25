const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./public/assets/js/index');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "clog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/api/notes', (req, res) =>{
    
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`);
})