var Todos = require("../models/todoModel");

var date = new Date();

module.exports = function(app) {

    /*

    Request: 
    GET: localhost:1337/api/setuptodos

    Response: 
    [
        {
            "__v": 0,
            "username": "Kshitij",
            "todo": "Make app",
            "creation_time": "1491036780922",
            "isDone": false,
            "hasAttachment": false,
            "_id": "58df6fbe6c6fd97877ab410b"
        },
        {
            "__v": 0,
            "username": "Sanyam",
            "todo": "Play games",
            "creation_time": "1491036780922",
            "isDone": false,
            "hasAttachment": false,
            "_id": "58df6fbe6c6fd97877ab410c"
        }
    ]

    */

    app.get("/api/setupTodos", function(req, res) { 

        var starterTodos = [
            {
                username: "Kshitij",
                todo: "Make app",
                creation_time: date.getTime(),
                isDone: false,
                hasAttachment: false
            },
            {
                username: "Sanyam",
                todo: "Play games",
                creation_time: date.getTime(),
                isDone: false,
                hasAttachment: false
            }
        ];

        Todos.create(starterTodos, function(err, result) {
            res.send(result);
        });

    });
}