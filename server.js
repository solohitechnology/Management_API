const bodyParser = require('body-parser');
const connectDB = require('./configs/db')
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');



const userRoutes = require('./routes/user');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());



//All  API routes will be here bellow
app.use('/api', userRoutes);



connectDB()
	.then(() => {
		console.log("DB connected");
		app.listen(PORT,() => {
			console.log("Server running on port...",PORT);
		})
	})
	.catch(error => console.error(error))
