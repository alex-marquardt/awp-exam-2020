const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = (secret, mongoose) => {
    /**** Database ****/
    const db = require('../databases/user_db')(mongoose);

    /**** Routes ****/
    // get all users
    router.get('/', async (req, res) => {
        const users = await db.getUsers();
        res.json(users)
    })

    // create new user
    router.post('/', async (req, res) => {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) reject(err); else resolve(hash);
            });
        });

        let newUser = {
            username: req.body.username,
            password: hashedPassword,
            name: req.body.name,
            admin: req.body.admin
        };

        const user = await db.createUser(newUser);
        res.json({ msg: "User saved", user });
    });

    // token generator
    router.post('/authenticate', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            let msg = "Username or password missing";
            res.status(401).json({ msg: msg });
            return;
        }
        const user = await db.getUser(username);

        if (user) { // If user is found
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) { // If password matched
                    const payload = { username: username };
                    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

                    res.json({
                        token: token,
                        username: user.username,
                        name: user.name,
                        admin: user.admin
                    });
                }
                else res.status(401).json({ msg: "Password or user mismatch" })
            });
        }
        else {
            res.status(404).json({ msg: "Password or user mismatch" });
        }
    });

    return router;
};
