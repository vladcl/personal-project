require("dotenv").config();

module.exports = {
  uri: process.env.DB_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  },
};
