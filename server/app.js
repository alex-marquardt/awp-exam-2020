const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const checkJwt = require('express-jwt');

/**** Configuration ****/
const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(express.static('../client/build'));

/**** Open paths ****/
let openPaths = [
    { url: '/api/users/authenticate', methods: ['POST'] },
    { url: '/api/suggestions', methods: ['GET'] },
    { url: '/api/suggestions/:id', methods: ['GET'] }
];

const secret = process.env.SECRET || "awp exam 2020";
app.use(checkJwt({ secret: secret }).unless({ path: openPaths }));

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { // If the user didn't authorize correctly
        res.status(401).json({ error: err.message }); // Return 401 with error message.
    } else {
        next(); // If no errors, forward request to next middleware or route
    }
});

/**** Routes ****/
const usersRouter = require('./routers/users_router')(secret);
app.use('/api/users', usersRouter);

const suggestionRouter = require('./routers/suggestions_router')(mongoose);
app.use('/api/suggestions', suggestionRouter);

/**** Building ****/
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname = 'client/build/index.html'))
);

/**** Start ****/
const url = process.env.MONGO_URL || 'mongodb://localhost/suggestion_db';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        await app.listen(port);
        console.log(`Suggestion API running on port ${port}!`);
    })
    .catch(error => console.error(error));
