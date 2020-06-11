let express = require('express');
let router = express.Router();

module.exports = (mongoose) => {
    /**** Database ****/
    const db = require('../databases/suggestion_db')(mongoose);

    /**** Routes ****/
    // Get all suggestions
    router.get('/', async (req, res) => {
        const suggestions = await db.getSuggestions();
        res.json(suggestions)
    });

    // Get one suggestion
    router.get('/:id', async (req, res) => {
        const suggestion = await db.getSuggestion(req.params._id);
        res.json(suggestion);
    });

    // Post suggestion
    router.post('/', async (req, res) => {
        const newSuggestion = {
            title: req.body.title,
            description: req.body.description,
            date: new Date().toLocaleString(),
            signatures: []
        };

        const suggestion = await db.createSuggestion(newSuggestion);
        res.json({ msg: "Suggestion saved", suggestion: suggestion });
    });

    // Put suggestion
    router.put('/', async (req, res) => {
        const newSuggestion = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
        };

        const suggestion = await db.updateSuggestion(newSuggestion);
        res.json({ msg: "Suggestion saved", suggestion: suggestion });
    });

    // Delete suggestion
    router.delete('/', async (req, res) => {
        const removeSuggestion = {
            id: req.body.id
        };

        const suggestion = await db.deleteSuggestion(removeSuggestion);
        res.json({ msg: "Suggestion deleted", suggestion: suggestion });
    });

    // Post signature
    router.post('/:suggestionId/signatures', async (req, res) => {
        const suggestionId = req.params.suggestionId;
        let newSignature = {
            name: req.body.name,
            username: req.body.username,
            date: new Date().toLocaleString()
        }

        const signature = await db.createSignature(suggestionId, newSignature);
        res.json({ msg: "Signature saved", signature: signature });
    });

    return router;
}
