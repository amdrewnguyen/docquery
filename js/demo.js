$(() => {
  const newTodoInput = $('.new-todo');
  const addTodoButton = $('button');
  const todoList = $('.todo-list');

  addTodoButton.on("click", () => {
    const todoItem = $("<li>");
    todoItem.html(newTodoInput.val());
    todoList.append(todoItem);
    newTodoInput.val("");
  });

  getWeather();
});

const getWeather = () => {
  return $.ajax(
    {
      type: 'GET',
      url: "http://api.openweathermap.org/data/2.5/weather?q=NewYork,NY&appid=bcb83c4b54aee8418983c2aff3073b3b",
      success(data) {
        console.log("We have your weather!");
        console.log(data);
        const temp = Math.floor((data.main.temp - 273.15) * 9 / 5 + 32);
        $(".temperature").append(temp + "°F");
      },
      error() {
        console.error("An error occurred.");
      },
    }
  );
};

window.getWeather = getWeather;
