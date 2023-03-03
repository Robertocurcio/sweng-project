const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan')

// Serve static files
app.use(express.static('public'));

app.use(morgan('dev'));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "account", "lending-page_v2.html"))
})

app.get("/newEstimation", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "estimation", "new-estimation.html"))
})

app.get("/myEstimations", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "estimation", "past-estimations.html"))
})

app.use('/estimation', express.static(path.join(__dirname, 'public', 'estimation')));
app.use('/account', express.static(path.join(__dirname, 'public', 'account')));

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});