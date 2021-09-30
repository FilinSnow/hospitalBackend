const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./src/modules/routes/routes')

const app = express();
const port = 4000;

app.use(cors())
app.use(express.json())

const uri = 'mongodb+srv://user:user@cluster0.8gafr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', routes);

app.listen(port, () => {
    console.log('Server was been started');
})