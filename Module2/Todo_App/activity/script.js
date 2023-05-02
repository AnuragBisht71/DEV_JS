let addTodoButton = document.querySelector(".add-todo");
let todoInput = document.querySelector(".todo-input");
let todosList = document.querySelector(".todo-list-container");

// by clicking "Add" button
addTodoButton.addEventListener( "click", function() {
    addTodo();
});

// by pressing Enter key
todoInput.addEventListener( "keypress", function(e) {
    if(e.key == "Enter"){
        addTodo();
    }
});

function addTodo() {
    let todoInputValue = todoInput.value;
    if(todoInputValue) {
        appendTodo(todoInputValue);
        // Ater click or keypress it will empty the input box
        todoInput.value = "";
    }
}

function appendTodo(todo) {
    let todoItemDiv = document.createElement("div");
    todoItemDiv.classList.add("todo-item");
    // <div class="todo-item"></div>

    let pTag = document.createElement("p");
    pTag.classList.add("todo-input");
    pTag.textContent = todo;
    // <p class="todo-input"></p>

    let deleteTodoButton = document.createElement("button");
    deleteTodoButton.classList.add("delete-todo");
    deleteTodoButton.textContent = "Delete";
    // <button class="delete-todo"></button>

    todoItemDiv.append(pTag);
    // <div class="todo-item">
    //     <p class="todo-input"></p>
    // </div>

    todoItemDiv.append(deleteTodoButton);
    // <div class="todo-item">
    //     <p class="todo-input"></p>
    //     <button class="delete-todo"></button>
    // </div>

    todosList.append(todoItemDiv);
}

