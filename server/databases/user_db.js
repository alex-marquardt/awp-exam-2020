class UserDb {
    constructor(mongoose) {
        const userSchema = new mongoose.Schema({
            username: String,
            password: String,
            name: String,
            admin: Boolean
        });

        this.userModel = mongoose.model('user', userSchema);
    }

    async getUser(username) {
        try {
            return await this.userModel.findOne({ username: username });
        } catch (error) {
            console.log("getUser", error.message);
            return;
        }
    }

    async createUser(newUser) {
        let user = new this.userModel(newUser);

        try {
            return await user.save();
        } catch (error) {
            console.log("createuser", error.message);
            return;
        }
    }
}

module.exports = mongoose => new UserDb(mongoose);