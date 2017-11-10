$(() => {
  const newTodoInput = $('.new-todo');
  const addTodoButton = $('button');
  const todoList = $('.todo-list');

  const myStorage = window.localStorage;

  let itemString = myStorage.getItem("todoItems");
  let todoItems;
  if (itemString) {
    todoItems = JSON.parse(itemString);
  } else {
    todoItems = [];
  }

  todoItems.forEach(
    (item) => {
      let todoLi = newTodoLi(item);
      todoList.append(todoLi);
    }
  );

  addTodoButton.on("click", () => {
    let inputText = newTodoInput.val();
    const todoItem = newTodoLi(inputText);
    todoList.append(todoItem);
    todoItems = saveNewTodo(myStorage, inputText, todoItems);
    newTodoInput.val("");
  });

  todoList.on("click", (e) => {
    // console.log(e.target.parentNode);
    if (e.target.classList.contains("remove-btn")) {
      // console.log("delete clicked");
      e.currentTarget.removeChild(e.target.parentNode);
      let newTodos = $(".todo-text");
      myStorage.setItem("todoItems", JSON.stringify(newTodos.text()));
    }
  });

  // getWeather();
});


const newTodoLi = (text) => {
  const todoItem = $("<li>");
  const textSpan = $("<span>");
  textSpan.addClass("todo-text");
  textSpan.html(text);
  const removeButton = $("<button>");
  removeButton.addClass("remove-btn");
  removeButton.text("X");
  todoItem.append(removeButton);
  todoItem.append(textSpan);
  return todoItem;
};

const saveNewTodo = (store, newTodo, todos) => {
  const newTodos = todos.concat(newTodo);
  store.setItem("todoItems", JSON.stringify(newTodos));
  return newTodos;
};

const getWeather = () => {
  return $.ajax(
    {
      type: 'GET',
      url: "http://api.openweathermap.org/data/2.5/weather?q=NewYork,NY&appid=bcb83c4b54aee8418983c2aff3073b3b",
      success(data) {
        console.log("We have your weather!");
        console.log(data);
        let d = new Date();
        $(".date").append(formatDateString(d.toDateString()));
        $(".desc").append(data.weather[0].main);
        const temp = Math.floor((data.main.temp - 273.15) * 9 / 5 + 32);
        $(".temperature").append(temp + "°F");

      },
      error() {
        console.error("An error occurred.");
      },
    }
  );
};

const formatDateString = (s) => {
  let words = s.split(" ");
  return `${words[0]}, ${words[1]} ${words[2]}`;
};

window.getWeather = getWeather;
