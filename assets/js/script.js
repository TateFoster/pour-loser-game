var quizUrl = "https://jservice.io/api/random?count=100";
var rewardUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
var score = 0;
var mistakes = 0;
var index = 0;
var start = document.querySelector("#startBtn");
var answerForm = document.querySelector("#answerForm");
var answer = document.querySelector("#answer");
var quiz;

function getData(data) {
  console.log(data)
  var questionArray = []
  // for index in data
    // data.question

}





fetch(quizUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var newData = data;
    getData(newData);
  });

// TODO: variables score, mistakes, question/answer  form

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


// TODO: Grade the user's answer as a boolean where true=Correct and false=Incorrect 
// Get keywords from answer (param)
// Match keywords in userAnswer (param)
// compare to a logical threshold for correctness --- isCorrectAnswer boolean

var keywordsArray = ["apple", "fritters", "good"];
var userAnswerString = "apple fritters bad";
function isCorrectAnswer(keywordsArray, userAnswerString){
  var thresholdToBeCorrect = .8;  // min. required % to be correct
  var countKeywords = keywordsArray.length; // total number of keywords in keywordsArray
  var matchedKeywords = 0;  // tracker for correctly answered keywords
  
  // for each keyword in keywordsArray
  for (var iKeywords = 0; iKeywords < countKeywords; iKeywords++){
    // if there is a match found in userAnswerString
    var isMatch = userAnswerString.match(keywordsArray[iKeywords]);
    // if match() returned null, then no match in userAnswerString was found for that keyword
    if (isMatch != null) {
      // add 1 to matchedKeywords
      matchedKeywords++;      
    }
  }

  var matchPercentage = matchedKeywords / countKeywords;  // % correct by the user

  // if matchPercentage satisfies the threshold for a correct answer
	if (matchPercentage >= thresholdToBeCorrect){
		// Then answer is correct;
    return true;
	}
	else {
		// Then answer is incorrect;
    return false;
	}
}
