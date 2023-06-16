const express = require("express");
const bcrypt = require("bcrypt");



//model imports 
const User = require("../models/UserModel");
const Todo = require("../models/TodoModel");
const auth = require("../middlewares/auth");
const router = express.Router();


const getTodosBasedOnUser = async (req, res) => {
    const user = res.locals.user;

    try {
        const todos = await Todo.find({ userId: user._id });
        let resp = {};
        let completedTodos = [];
        let nonCompletedTodos = [];
        let ProgressTodos = [];

        let ImportantTodos = [];
        let UrgentTodos = [];
        let TodayTodos = [];
        let UrgentImpTodos = [];
        let NothingTodos = [];
        let AllTodos = [];

        todos.forEach((todo) => {
            if (todo.isCompleted) {
                completedTodos.push(todo)
            }
            if (todo.progress) {
                ProgressTodos.push(todo)
            }
            if (!todo.isCompleted) {
                if (todo.tag == "Urgent") {
                    UrgentTodos.push(todo)
                }
                if (todo.tag == "Important") {
                    ImportantTodos.push(todo)
                }
                if (todo.tag == "Today") {
                    TodayTodos.push(todo)
                }
                if (todo.tag == "Urgent & Important") {
                    UrgentImpTodos.push(todo)
                }
                if (todo.tag == "Nothing") {
                    NothingTodos.push(todo)
                }
                if (!todo.isCompleted && !todo.progress) {
                    nonCompletedTodos.push(todo);
                }
            }
            AllTodos.push(todo)
        });
        resp.completed = completedTodos;
        resp.notCompleted = nonCompletedTodos;
        resp.Progress = ProgressTodos;

        resp.Urgent = UrgentTodos;
        resp.Important = ImportantTodos;
        resp.Nothing = NothingTodos;
        resp.Today = TodayTodos;
        resp.UrgentImp = UrgentImpTodos;
        resp.All = AllTodos;

        return res.status(200).json(resp);
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong." });
    }
}

const addTodo = async (req, res) => {
    const { title, description, start, due, tag } = req.body;

    let errors = {};

    const user = res.locals.user;


    if (title.trim() === "") {
        errors.title = "Title cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    try {

        // let etitle = await bcrypt.hash(title, 6);
        // let edesc = await bcrypt.hash(description, 6);
        // let estart = await bcrypt.hash(start, 6);
        // let etag = await bcrypt.hash(tag, 6);
        // let edue = await bcrypt.hash(due, 6);

        // # Normal Data
        const todoObj = new Todo({
            title: title,
            description: description,
            isCompleted: false,
            progress: false,
            start: start,
            tag: tag,
            due: due,
            userId: user._id
        });

        // # Encrypted Data
        // const todoObj = new Todo({
        //     title: etitle,
        //     description: edesc,
        //     isCompleted: false,
        //     progress: false,
        //     start: estart,
        //     tag: etag,
        //     due: edue,
        //     userId: user._id
        // });

        const savedTodo = await todoObj.save();
        return res.status(201).json(savedTodo)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong!" });
    }
}

const updateTodo = async (req, res) => {
    // const { title, description, isCompleted, todoId } = req.body;
    const { title, description, isCompleted, progress, start, due, tag, todoId } = req.body;

    //console.log(res.locals.user);

    const user = res.locals.user;

    let errors = {};

    if (title.trim() === "") {
        errors.title = "Title cannot be empty";
    }

    if (todoId.trim() === "") {
        errors.todoId = "todoId cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    try {

        const todo = await Todo.findOne({ _id: todoId });

        if (todo === null) {
            return res.status(400).json({ error: "Todo do not exist." });
        }

        // let etitle = await bcrypt.hash(title, 6);
        // let edesc = await bcrypt.hash(description, 6);
        // let estart = await bcrypt.hash(start, 6);
        // let etag = await bcrypt.hash(tag, 6);
        // let edue = await bcrypt.hash(due, 6);

        todo.title = title;
        todo.description = description;
        todo.isCompleted = isCompleted;
        todo.progress = progress;

        todo.start = start;
        todo.due = due;
        todo.tag = tag;

        // todo.title = etitle;
        // todo.description = edesc;
        // todo.isCompleted = isCompleted;
        // todo.progress = progress;

        // todo.start = estart;
        // todo.due = edue;
        // todo.tag = etag;

        const updatedTodo = await todo.save();

        return res.status(200).json(updatedTodo);


    } catch (error) {
        return res.status(500).json({ error: "Something went wrong." });
    }

}

const deleteTodo = async (req, res) => {
    const todoId = req.params.todoId;

    try {
        const deletedTodo = await Todo.deleteOne({ _id: todoId });
        res.status(200).json(deleteTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }

}

router.get("", auth, getTodosBasedOnUser);
router.post("/add", auth, addTodo);
router.put("/update", auth, updateTodo);
router.delete("/delete/:todoId", auth, deleteTodo);


module.exports = router;