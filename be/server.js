// ! * * * * * * * *
// ! inizio del server 
// ! * * * * * * * *

const express = require('express');
const mongoose = require('mongoose');
const PORT = 5069;

// ? require delle routes
const postsRoute = require('./routes/posts');
const authorsRoute = require('./routes/authors');
const loginRoute = require('./routes/login');
const resourcesRoute = require('./routes/resources');
const moviesRoute = require('./routes/movies');
const path = require('path');
const cors = require('cors');

// ?require delle middleware
const logger = require('./middlewares/logger');
const cacheMiddleware = require('./middlewares/cacheMiddleware');


require("dotenv").config();

const app = express();

// * middelware
app.use(express.json());
app.use(logger)
app.use(cacheMiddleware)

app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use(cors());


// * import routes
app.use('/', postsRoute);
app.use('/', authorsRoute);
app.use('/', loginRoute);
app.use('/', resourcesRoute);
app.use('/', moviesRoute);

mongoose.connect(process.env.MONGO_DB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Errore di connessione al server!"));
db.once("open", () => console.log("Database MongoDB connesso!"));


// ! * * * * * * * *
// ! Ultima Riga, fine server
// ! * * * * * * * *
app.listen(PORT, () =>
    console.log(`Server avviato ed in ascolto sulla porta: ${PORT}`)
);