let express = require('express');
let router = express.Router();

module.exports = (mongoose) => {
    /**** Database ****/
    const db = require('../databases/suggestion_db')(mongoose);

    /**** Routes ****/
    router.get('/', async (req, res) => {
        const suggestions = await db.getSuggestions();
        res.json(suggestions)
    });

    router.get('/:id', async (req, res) => {
        const suggestion = await db.getSuggestion(req.params._id);
        res.json(suggestion);
    });

    router.post('/', async (req, res) => {
        const newSuggestion = {
            title: req.body.title,
            signatures: []
        };

        const suggestion = await db.createSuggestion(newSuggestion);
        res.json({ msg: "Suggestion saved", suggestion: suggestion });
    });

    router.post('/:suggestionId/signatures', async (req, res) => {
        const suggestionId = req.params.suggestionId;
        let newSignature = {
            username: req.body.username,
            date: new Date().toLocaleString()
        }

        const signature = await db.createSignature(suggestionId, newSignature);
        res.json({ msg: "Signature saved", signature: signature });
    });

    return router;
}
