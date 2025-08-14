require('dotenv').config();

const express = require('express');
const DatasRoutes = require('./routes/datas');
const mongoose = require('mongoose')
const cors = require('cors')

// Création d'une app express
const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}))

// Transform all post requests body into json format
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)

// We create a middleware to focus on the datasRoute
app.use('/api/data', DatasRoutes);

app.get('/', (req, res)=>{
    res.send("Welcome to the main page");
});

app.listen(process.env.PORT, ()=>{
    console.log('Server is launched')
})