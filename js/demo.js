const getWeather = () => {
  $.ajax({
      type: 'GET',
      url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
      success(data) {
        console.log(data);
      },
      error() {
        console.error("An error occurred.");
      },
   });
};

getWeather();
