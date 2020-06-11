const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const checkJwt = require('express-jwt');

/**** Configuration ****/
const app = express();
const port = process.env.PORT || 8080;
const url = process.env.MONGO_URL || 'mongodb://localhost/suggestion_db';

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(express.static(path.resolve('..', 'client', 'build')));

/**** Open paths ****/
let openPaths = [
    { url: '/api/users/authenticate', methods: ['POST'] },
    { url: '/api/users', methods: ['POST'] },
    { url: '/api/users', methods: ['GET'] },
    { url: '/api/suggestions', methods: ['GET'] },
    { url: '/api/suggestions/:id', methods: ['GET'] }
];

const secret = process.env.SECRET || "awp exam 2020";
if (!process.env.SECRET) console.error("Warning: SECRET is undefined.");
app.use(checkJwt({ secret: secret }).unless({ path: openPaths }));

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.message });
    } else {
        next();
    }
});

/**** Routes ****/
const usersRouter = require('./routers/users_router')(secret, mongoose);
app.use('/api/users', usersRouter);

const suggestionRouter = require('./routers/suggestions_router')(mongoose);
app.use('/api/suggestions', suggestionRouter);

/**** Building ****/
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

/**** Start ****/
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        await app.listen(port);
        console.log(`Suggestion API running on port ${port}!`);
    })
    .catch(error => console.error(error));
