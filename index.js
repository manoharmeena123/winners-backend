const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./confige/db');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
    try {
        await connection
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    } catch (error) {
        console.log("Database is not connected ", error)
    }

});
