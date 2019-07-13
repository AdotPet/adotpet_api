const mongoose = require("mongoose");

let uri = undefined;
if (process.env.DB_REMOTE === "true")
  uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${
    process.env.DB_HOST
  }/${process.env.DB_NAME}?retryWrites=true&w=majority`;
else uri = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
console.log(`Mongoose connected on database.`);
console.log(`Mongoose version: v${mongoose.version}`);

mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
