const mongoose = require("mongoose");
const config = require("config");

const dbURI = config.get("mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            // --- below lines are added due to warnings show on cli for MongoClient
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log("MongoDB is connected.");
    } catch(error) {
        console.error(error.message);
        process.exit(1); // --- Exiting process with failure
    }
}

module.exports = connectDB;
