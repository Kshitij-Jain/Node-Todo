var Todos = require("../models/todoModel");
var bodyParser = require("body-parser");

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended : true
    }));

    /*

    Request: 
    GET: localhost:1337/api/todos/Kshitij

    Response: 
    [
		{
			"_id": "58df6ae56c6fd97877ab4109",
			"username": "Kshitij",
			"todo": "Make app",
			"creation_time": "1491036780922",
			"isDone": false,
			"hasAttachment": false,
			"__v": 0
		},
		{
			"_id": "58df70d26c6fd97877ab410d",
			"username": "Kshitij",
			"todo": "Have ice cream",
			"creation_time": "1491038418081",
			"isDone": false,
			"hasAttachment": false,
			"__v": 0
		}
	]

	*/

    app.get("/api/todos/:username", function(req, res) {
        
        Todos.find({
            username: req.params.username
        }, function(err, todos){
            if (err)
                throw err;

            res.send(todos);
        });
            
    });

    /*

    Request: 
    GET: localhost:1337/api/todo/58df210ce9af2932bf648e96

    Response: 
    {
		"_id": "58df210ce9af2932bf648e96",
		"username": "Kshitij",
		"todo": "Make app",
		"creation_time": "1491017946842",
		"isDone": false,
		"hasAttachment": false,
		"__v": 0
	}

	*/

    app.get("/api/todo/:id", function(req, res) {

        Todos.findById({
            _id: req.params.id
        }, function(err, todo){
            if (err)
                throw err;

            res.send(todo);
        });

    });

	/*

    Request: 
    POST: localhost:1337/api/todo/

    This will update the todo which will be already present in the DB.
    {
		"id": "58df6fbe6c6fd97877ab410b",
		"todo": "LOLOLO",
		"isDone": false,
		"hasAttachment": false
	}
	
	This will add todo to the DB.
	{
		"username": "Kshitij",
		"todo": "Have cream",
		"isDone": false,
		"hasAttachment": false
	}

    Response: 
    Success

	*/    

    app.post("/api/todo", function(req, res) {

        if (req.body.id) {
            Todos.findByIdAndUpdate(req.body.id, {
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            }, function(err, todo){
                if (err)
                    throw err;
                
                res.send("Success");
            });
        } else {
            var newTodo = Todos({
                username: req.body.username,
                todo: req.body.todo,
                creation_time: new Date().getTime(),
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment  
            });

            newTodo.save(function(err) {
                if (err) 
                    throw err;
                
                res.send("Success");
            });
        }

    });

    /*

    Request: 
    Delete: localhost:1337/api/todo/

    {
		"id": "58df70ea6c6fd97877ab410e"
	}

    Response: 
    Success

	*/

    app.delete("/api/todo", function(req, res){
            
        Todos.findByIdAndRemove(req.body.id, function(err) {
       	    if (err)
                throw err;

            res.send("Success");
        });

    });

}