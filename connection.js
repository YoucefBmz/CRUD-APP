const mongoose = require("mongoose");

require("dotenv").config();

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const uri = process.env.URI;

const connexion = mongoose
  .connect(uri, connectionParams)
  .then(() => {
    console.log("DB connected !! yoohoo");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connexion;
