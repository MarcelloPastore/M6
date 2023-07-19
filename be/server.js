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

// ?require delle middleware
const logger = require('./middlewares/logger');
const cacheMiddleware = require('./middlewares/cacheMiddleware');


require("dotenv").config();

const app = express();

// * middelware
app.use(express.json());
app.use(logger)
app.use(cacheMiddleware)

// * import routes
app.use('/', postsRoute);
app.use('/', authorsRoute);
app.use('/', loginRoute);
app.use('/', resourcesRoute);

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