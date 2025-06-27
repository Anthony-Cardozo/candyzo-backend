require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const checkoutRoutes = require('/.routes/create-checkout-session');

const app = express();
const PORT = process.env.PORT || 3001;

/*
const corsOptions = {
  origin: "https://candyzo.vercel.app", // ✅ only allow this site ADD WHEN CHANGING DOMAIN
  credentials: true
};

app.use(cors(corsOptions));
*/

app.use(cors());
//middleware need later
//cors({ origin: 'http://your-production-frontend.com' })

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.error(err));

    /*
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
    */
app.use('/', checkoutRoutes);
const candyRoutes = require('./routes/candyRoutes');
app.use('/candies', candyRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
