const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB(); 

const PORT = process.env.PORT || 4000;

app.use(express.json({extended: true})); // Allow json using

// Using routes
app.use('/api/users', require('./routes/users'));


// Launching app
app.listen(PORT, () =>{
	console.log(`Server on port ${PORT}`);
});
