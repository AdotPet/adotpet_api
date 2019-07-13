const mongoose = require("mongoose");

if (process.env.DB_REMOTE === "true")
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${
      process.env.DB_HOST
    }/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  );
else
  mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    useNewUrlParser: true
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;
