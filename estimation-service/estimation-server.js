const express = require('express');
const fs = require('fs');
const cors = require('cors');
const estimate = require('./estimate');
const morgan = require('morgan')
const PORT = 3001;

const app = express();

const path = require('path');
const jsonFilePath = path.join(__dirname, 'database.json');

app.use(cors());

app.use(morgan('dev'));

app.get('/estimations', (req, res) => {
	fs.readFile(jsonFilePath, (err, data) => {
		if (err) throw err;
		const jsonData = JSON.parse(data);
		res.setHeader('Content-Type', 'application/json');
		res.send(jsonData);
	  });
	});

app.use(express.json());

app.post('/estimation', (req, res) => {
	// extract the values interested
	const { square_meters, num_bedrooms, city, budget, user_id } = req.body;
	
	const estimated_price = estimate.estimate_price(square_meters, city, num_bedrooms, budget, user_id);
  	
	// Send the response
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Content-type', 'application/json');
	res.json({ estimated_price: estimated_price });
});

app.listen(PORT, () => {
  console.log(`Estimation service listening on port ${PORT}`);
});





// const express = require('express');
// // const { estimate_price } = require('./estimate');
// const app = express();
// const PORT = 3001;

// app.use(express.json());

// // add CORS headers to the response
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// // handle POST requests
// app.post('/', (req, res) => {
//   const { square_meters, num_bedrooms, city, budget } = req.body;
// //   const estimated_price = estimate_price(square_meters, city, num_bedrooms, budget);
//   res.header('Content-type', 'application/json');
//   res.send("ok");
// });

// // handle OPTIONS requests
// app.options('/', (req, res) => {
//   res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.header('Access-Control-Max-Age', '86400');
//   res.sendStatus(200);
// });

// app.get("/myEstimations", (req, res) => {
// 	res.sendFile(path.join(__dirname, "public", "estimation", "past-estimations.html"))
// })

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}.`);
// });

