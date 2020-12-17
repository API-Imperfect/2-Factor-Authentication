const mongoose = require("mongoose");

const connectToDB = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
};

module.exports = connectToDB;
