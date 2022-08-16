var quiz = "https://jservice.io/api/random?count=100";

fetch(quiz)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

var reward = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

fetch(reward)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
