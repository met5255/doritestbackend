const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const UserRoutes = require('./Routes/UserRoutes')

app.use(bodyParser.urlencoded({ extended: false }))

const corsOptions = {
    exposedHeaders: ['Authorization'],
};

app.use(bodyParser.json())
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("OK");
});
app.use('/api/users',UserRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Az app fut a ${process.env.PORT}`)
})