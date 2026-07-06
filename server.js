require('dotenv').config();
const express = require('express');
const app = express();

const reportRoutes = require('./routes/reportRoutes');

app.use(express.json());
app.use('/api', reportRoutes);
app.use('/', reportRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));