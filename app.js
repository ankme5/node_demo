const http = require('http');

const hostname = '0.0.0.0';
const port = 8000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Gracefully exit after a certain period of time (e.g., 60 seconds)
setTimeout(() => {
  console.log('Exiting application...');
  process.exit(0);
}, 60000); // Change the timeout value as needed

const express = require('express'),
    bodyParser = require('body-parser'),
    // In order to use PUT HTTP verb to edit item
    methodOverride = require('method-override'),
    // Mitigate XSS using sanitizer
    sanitizer = require('sanitizer'),
    app = express(),

app.use(bodyParser.urlencoded({
    extended: false
}));
// https: //github.com/expressjs/method-override#custom-logic
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method
    }
}));


let todolist = [];

/* The to do list and the form are displayed */
app.get('/todo', function (req, res) {
        res.render('todo.ejs', {
            todolist,
            clickHandler: "func1();"
        });
    })

    /* Adding an item to the to do list */
    .post('/todo/add/', function (req, res) {
        // Escapes HTML special characters in attribute values as HTML entities
        let newTodo = sanitizer.escape(req.body.newtodo);
        if (req.body.newtodo != '') {
            todolist.push(newTodo);
        }
        res.redirect('/todo');
    })

    /* Deletes an item from the to do list */
    .get('/todo/delete/:id', function (req, res) {
        if (req.params.id != '') {
            todolist.splice(req.params.id, 1);
        }
        res.redirect('/todo');
    })

    // Get a single todo item and render edit page
    .get('/todo/:id', function (req, res) {
        let todoIdx = req.params.id;
        let todo = todolist[todoIdx];

        if (todo) {
            res.render('edititem.ejs', {
                todoIdx,
                todo,
                clickHandler: "func1();"
            });
        } else {
            res.redirect('/todo');
        }
    })

    // Edit item in the todo list 
    .put('/todo/edit/:id', function (req, res) {
        let todoIdx = req.params.id;
        // Escapes HTML special characters in attribute values as HTML entities
        let editTodo = sanitizer.escape(req.body.editTodo);
        if (todoIdx != '' && editTodo != '') {
            todolist[todoIdx] = editTodo;
        }
        res.redirect('/todo');
    })
    /* Redirects to the to do list if the page requested is not found */
    .use(function (req, res, next) {
        res.redirect('/todo');
    })

    .listen(port, function () {
        // Logging to console
        console.log(`Todolist running on http://0.0.0.0:${port}`)
    });
// Export app
module.exports = app;
