const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

// Using routes


// Launching app
app.listen(PORT, () =>{
	console.log(`Server on port ${PORT}`);
});
