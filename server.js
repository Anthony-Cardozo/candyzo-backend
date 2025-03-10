require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.error(err));

    /*
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
    */

const candyRoutes = require('./routes/candyRoutes');
app.use('/candies', candyRoutes);


app.listen(3000, () => console.log(`Server running on port ${PORT}`));