import 'dotenv/config';

export default {
  uri: process.env.DB_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  },
};
