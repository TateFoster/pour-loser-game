var quizUrl = "https://jservice.io/api/random?count=100";
var rewardUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
var score = 0;
var mistakes = 0;
var index = 0;
var start = document.querySelector("#startBtn");
var answerForm = document.querySelector("#answerForm");
var answer = document.querySelector("#answer");
var quiz;

fetch(quizUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    return data;
  });

// TODO: variables score, mistakes, question/answer  form

console.log(quiz);
fetch(rewardUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

// TODO: FUNction to generate questions from API
function startQuiz(event) {
  event.preventDefault();
  start.classList.add("hidden");
  answerForm.classList.remove("hidden");
}
// TODO: FUnction to display drink recipe on loss

// TODO: have event listener for click for starting game
start.addEventListener("click", startQuiz);
// TODO: have event listener for submit to check answers and move on to next question
// trim input, toLowerCase input and answer\
// ? regular expressions to remove articles
