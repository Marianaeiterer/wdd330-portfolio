import { readFromLS, writeToLS } from "./ls.js";
import { qs, onTouch } from "./utilities.js";



let todoList = null;


export default class ToDos {
    constructor(listElement, key) {
        this.listElement = listElement;
        this.key = key;

        onTouch("#addTodo", this.addTodo.bind(this));
        this.listTodos();

    }

    addTodo() {
        let errorMessage = document.getElementById("error");
        const elem = document.getElementById("input");
        if(elem.value == ''){
            errorMessage.innerHTML = "Plese enter a valid task"; //if the user try to add a empty Todo

        }else{
            saveTodo(elem.value, this.key);
            errorMessage.innerHTML = "";
            elem.value = "";
            this.listTodos();
        }
       
        elem.addEventListener("blur", function(){
            errorMessage.innerHTML = "";
        });

    }
    findTodos(id) {
        //find the todo corresponded to the id and return it
        const todo = todoList.find(item => {
            return item.id === id;
        });

        return todo;

    }

    completeTodo(key) {
        //complete the toDo checked
        let todo = this.findTodos(key);

        if (todo) {
            todo.complete = !todo.complete;
            writeToLS(this.key, todoList);
            renderTodoList(todoList, this, this.listElement, true);

        }

    }
    removeTodo(key) {
        let todo = this.findTodos(key);
        if (todo) {
            deleteToDo(key, this.key);
            renderTodoList(todoList, this, this.listElement, true);
        }

    }

    listTodos(hidden = true) {
        renderTodoList(getTodos(this.key), this, this.listElement, hidden);
    }
}

function renderTodoList(list, todos, element, hidden) {

    element.innerHTML = ""; //parent element

    list.forEach(todo => {
        const elem = document.createElement("li"); //child element, li
        const key = new Date(todo.id).toLocaleDateString("en-US");

        if (hidden && todo.complete) {
            elem.innerHTML = `<label><input type="checkbox" checked><strike>${todo.content}</strike></label><button>X</button>`
        }
        else {
            elem.innerHTML = `<label><input type="checkbox">${todo.content}</label><button>X</button>`
        }


        element.appendChild(elem);

        let btn = elem.childNodes[1]; //button to delete tasks

        btn.addEventListener("click", function () {
            todos.removeTodo(todo.id)
        });

        let checkB = elem.childNodes[0].childNodes[0]; //checkbox

        if (checkB) {
            checkB.addEventListener('change', function () {
                todos.completeTodo(todo.id); //mark as complete the toDo
            });
        }

        //show the complete tasks
        let complete = qs("#complete");
        complete.addEventListener("click", function () {
            let completeList = filterToDo(todo.id, todo.hidden);
            renderTodoList(completeList, todos, element, hidden);

        });

        //show the incomplete tasks
        let active = qs("#active");
        active.addEventListener("click", function () {
            let activeList = todoList.filter(item => item.complete === false);
            renderTodoList(activeList, todos, element, hidden);

        });

        taksUpdated();

    });

    //show all tasks 
    let all = qs("#allTodos");
    all.addEventListener("click", function () {
        todos.listTodos();

    });

}

function taksUpdated() {

    let numberOfTasks = document.getElementById("tasks"); //element containing the number of tasks left
    numberOfTasks.innerHTML = "";
    let tasksNotCompleted = todoList.filter(item => item.complete === false);
    numberOfTasks.innerHTML = `${tasksNotCompleted.length} tasks left`;
    return;

}
function saveTodo(task, key) {
    const newToDo = {
        id: new Date(),
        content: task,
        complete: false
    };

    todoList.push(newToDo);
    writeToLS(key, todoList);
    console.log(localStorage);

}

function filterToDo(key, complete = true) {
    let toDos = getTodos(key);

    return toDos.filter(item => item.complete === true);

}

function deleteToDo(id, key) {
    //save the toDos that has a different key from the one passed
    let index = todoList.findIndex(object => {
        return id == object.id;
    });
    todoList.splice(index, 1);
    writeToLS(key, todoList);
    taksUpdated(); //update the tasks left
    
}



function getTodos(key) {
    if (todoList === null) {
        todoList = readFromLS(key) || [];
    }
    console.log(todoList);
    console.log(localStorage);
    return todoList;
}



