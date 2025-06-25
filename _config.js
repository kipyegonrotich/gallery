const config = {};

// MongoDB Atlas SRV connection strings
config.mongoURI = {
  production: 'mongodb+srv://nixone:MyOneninE@nixipone.mongodb.net/darkroom?retryWrites=true&w=majority',
  development: 'mongodb+srv://nixone:MyOneninE@nixipone.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
  test: 'mongodb+srv://nixone:MyOneninE@nixipone.mongodb.net/darkroom-test?retryWrites=true&w=majority',
};

module.exports = config;