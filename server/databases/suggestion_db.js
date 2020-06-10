class SuggestionDb {
    constructor(mongoose) {
        const suggestionSchema = new mongoose.Schema({
            title: String,
            description: String,
            date: String,
            signatures: [{ name: String, username: String, date: String }]
        });

        this.suggestionModel = mongoose.model('suggestion', suggestionSchema);
    }

    async getSuggestions() {
        try {
            return await this.suggestionModel.find({});
        } catch (error) {
            console.log("getSuggestions: ", error.message)
            return;
        }
    }

    async getSuggestion(id) {
        try {
            return await this.suggestionModel.findById(id);
        } catch (error) {
            console.log("getSuggestion: ", error.message);
            return;
        }
    }

    async createSuggestion(newSuggestion) {
        let suggestion = new this.suggestionModel(newSuggestion);

        try {
            return await suggestion.save();
        } catch (error) {
            console.log("createSuggestion: ", error.message);
            return;
        }
    }

    async deleteSuggestion(removeSuggestion) {
        try {
            return await this.suggestionModel.remove({ _id: removeSuggestion.id })
        } catch (error) {
            console.log("deleteSuggestion: ", error.message);
            return;
        }
    }

    async createSignature(suggestionId, signature) {
        const suggestion = await this.getSuggestion(suggestionId);

        try {
            suggestion.signatures.push(signature);
            return await suggestion.save();
        } catch (error) {
            console.log("createSignature: ", error.message);
            return;
        }
    }

}

module.exports = mongoose => new SuggestionDb(mongoose);