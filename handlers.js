var model = require("./module");
var todomodel = model.todo

function emptyApi(req, res) {
    res.status(200).send({ message: "welcome" });
}

//insert user
function handleAddNewTodo(req, res) {
    var data = new todomodel({ name: req.body.name, status: req.body.status });
    data.save(function (err, save) {
        if (err) {
            res.status(500).send({ message: "Something Went Wrong" });
            console.log("err:", err)
            return;
        }
        res.status(200).send({ message: "Inserted Sucessfully", id: save._id });
        console.log("save:", save);
    })
}

//update user
function handleUpdateTodo(req, res) {
    var updatetodo = {};
    if (req.body.name && req.body.status) {
        updatetodo = {
            name: req.body.name,
            status: req.body.status
        }
    }
    if (req.body.name) {
        updatetodo = {
            name: req.body.name
        }
    }
    if (req.body.status) {
        updatetodo = {
            status: req.body.status
        }
    }
    todomodel.findByIdAndUpdate(req.body.id, updatetodo, function (err, updated) {
        if (err) {
            res.status(404).send({ message: "Id Not Found" });
            console.log("err:", err)
            return;
        }
        if (!updated) {
            res.status(200).send({ message: " Not Updated Sucessfully" });
            return
        }
        else {
            res.status(200).send({ message: "Updated Sucessfully" });
            console.log("updated:", updated);
        }
    });
}

//delete user
function handleDeleteTodo(req, res) {
    todomodel.deleteOne({ _id: req.query.id }, function (err, deleted) {
        if (err) {
            res.status(400).send({ message: "Data Not Found" });
            console.log("err:", err)
            return;
        }
        if (deleted.deletedCount == 1) {
            res.status(404).send({ message: "Deleted Sucessfully" });
            return;
        }
        if (deleted.deletedCount == 0) {
            res.status(200).send({ message: "Data Not Found" });
        }
        console.log("deleted:", deleted);
    });
}

//get users
function handleGetTodo(req, res) {
    console.log("req:", req.query, req.query.id);
    if (!req.query.id) {
        todomodel.find({}, function (err, data) {
            if (err) {
                res.status(404).send({ message: "Data Not Found" });
                console.log("err:", err)
                return;
            }
            res.status(200).send({ message: "Data Displayed Sucessfully", records: data });
            console.log("data:", data);
        });
    }
    else {
        todomodel.findById({ _id: req.query.id }, function (err, data) {
            if (err) {
                res.status(404).send({ message: "Data Not Found" });
                console.log("err:", err)
                return;
            }
            res.status(200).send({ message: "Data Displayed Sucessfully", data: data });
            console.log("data:", data);
        });

    }
}


module.exports = {
    emptyApi,
    handleAddNewTodo,
    handleUpdateTodo,
    handleDeleteTodo,
    handleGetTodo

}