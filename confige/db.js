const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbURI = process.env.MONGODB_URL;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
