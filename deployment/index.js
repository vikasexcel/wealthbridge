const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const { exec } = require('child_process');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// CI/CD script for deployment
const deploy = () => {
    exec('git push heroku main', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during deployment: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Deployment stderr: ${stderr}`);
            return;
        }
        console.log(`Deployment stdout: ${stdout}`);
    });
};

// Uncomment the line below to enable deployment script
// deploy();