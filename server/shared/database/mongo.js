require("../../config_env");
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            autoIndex: false
        });
        console.log("connected to ", process.env.MONGO_CONNECTION_STRING)
    } catch (err) {
        console.log("error to ", process.env.MONGO_CONNECTION_STRING)
        throw new Error(err);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (err) {
        throw new Error(err);
    }
};

const main =

    module.exports = { connectDB, disconnectDB };
