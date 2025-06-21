const config = {};

config.mongoURI = {
  production: 'mongodb+srv://<nixone>:<MyOneninE>@gallery.wc344.mongodb.net/darkroom?retryWrites=true&w=majority',
  development: 'mongodb+srv://<nixone>:<MyOneninE>@gallery.wc344.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
  test: 'mongodb+srv://<nixone>:<MyOneninE>@gallery.wc344.mongodb.net/darkroom-test?retryWrites=true&w=majority',
};

module.exports = config;
