var configValues = require("./config");

module.exports = {
    getDbConnectionString: function() {
        return "mongodb://" 
        + configValues.user_name 
        + ":" 
        + configValues.password 
        + "@ds147480.mlab.com:47480/node-todo"
    }
}