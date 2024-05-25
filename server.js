const express = require('express');

// Load environment variables from.env file
require('dotenv').config();


const app = express();

const path = require('path');
const PORT = process.env.PORT || 3000;

// dir
const publicDir = path.join(__dirname, 'public');

//routes
const users = require('./routes/user');


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// setup static files
app.use(express.static(publicDir));
app.use('/v1/api/users', users);




// app.get('/', (req, res) => {
//   res.sendFile(path.join(publicDir, 'index.html'));
// })

// app.get('/about', (req, res) => {
//   res.sendFile(path.join(publicDir, 'about.html'));
// })





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
