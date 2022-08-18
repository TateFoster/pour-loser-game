var quizUrl = "https://jservice.io/api/random?count=100";
var rewardUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
var score = 0;
var mistakes = 0;
var index = 0;
var start = document.querySelector("#startBtn");
var answerForm = document.querySelector("#answerForm");
var answer = document.querySelector("#answer");
var oldDrink = document.querySelector("#oldName");
var oldGlass = document.querySelector("#oldGlass");
var oldDrinkImg = document.querySelector("#oldDrinkImg");
var categoriesEl = document.querySelector("#category");
var questionsEl = document.querySelector("#question");
var quizEl = document.querySelector("#quizBoard");

function getData(data) {
	console.log(data);
	var categoryArray = []; // array to hold the categories
	var questionArray = []; // array to hold the questions
	var answerArray = []; // array to hold the answers
	// for each item in data
	for (var i = 0; i < 5; i++) {
		// add new Category to the categoryArray
		categoryArray[i] = data[i].category["title"];
		// add new Question to the questionArray
		questionArray[i] = data[i].question;
		// add new Answer to the answerArray
		answerArray[i] = data[i].answer;
	}

	// clean answers
	// keyword collection

	// change #category TextContent
	// change #question TextContent
}

// TODO: FUNction to generate questions from API
function startQuiz(event) {
	event.preventDefault();
	start.classList.add("hidden");
	answerForm.classList.remove("hidden");

	fetch(quizUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			var newData = data;
			getData(newData);
		});

	fetch(rewardUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			console.log(data.drinks);
			console.log(data.drinks[0].strDrink);
		});
}

// TODO: have event listener for click for starting game
start.addEventListener("click", gameLost);
// TODO: have event listener for submit to check answers and move on to next question
// trim input, toLowerCase input and answer\
// ? regular expressions to remove articles

// TODO: Grade the user's answer as a boolean where true=Correct and false=Incorrect
// Get keywords from answer (param)
// Match keywords in userAnswer (param)
// compare to a logical threshold for correctness --- isCorrectAnswer boolean

var keywordsArray = ["apple", "fritters", "good"];
var userAnswerString = "apple fritters bad";
function isCorrectAnswer(keywordsArray, userAnswerString) {
	var thresholdToBeCorrect = 0.8; // min. required % to be correct
	var countKeywords = keywordsArray.length; // total number of keywords in keywordsArray
	var matchedKeywords = 0; // tracker for correctly answered keywords

	// for each keyword in keywordsArray
	for (var iKeywords = 0; iKeywords < countKeywords; iKeywords++) {
		// if there is a match found in userAnswerString
		var isMatch = userAnswerString.match(keywordsArray[iKeywords]);
		// if match() returned null, then no match in userAnswerString was found for that keyword
		if (isMatch != null) {
			// add 1 to matchedKeywords
			matchedKeywords++;
		}
	}

	var matchPercentage = matchedKeywords / countKeywords; // % correct by the user

	// if matchPercentage satisfies the threshold for a correct answer
	if (matchPercentage >= thresholdToBeCorrect) {
		// Then answer is correct;
		return true;
	} else {
		// Then answer is incorrect;
		return false;
	}
}

function gameLost() {
	fetch(rewardUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			reward = data;
			console.log(data);
			gameReward(reward);
		});

	function gameReward(reward) {
		start.classList.add("hidden");
		answerForm.classList.add("hidden");
		categoriesEl.textContent = reward.drinks[0].strDrink;
		questionsEl.textContent = reward.drinks[0].strAlcoholic;
		var glassType = document.createElement("h4");
		glassType.textContent = reward.drinks[0].strGlass;
		quizEl.appendChild(glassType);

		var drinkImg = document.createElement("img");
		drinkImg.src = reward.drinks[0].strDrinkThumb;
		drinkImg.classList.add("w-50");
		quizEl.appendChild(drinkImg);

		var drinkInstructions = document.createElement("p");
		drinkInstructions.textContent = reward.drinks[0].strInstructions;
		quizEl.appendChild(drinkInstructions);

		var ingredientList = document.createElement("ul");
		ingredientList.classList.add("text-center");
		quizEl.appendChild(ingredientList);

		var ingredientSet = [];
		ingredientSet.push(
			reward.drinks[0].strMeasure1 + " " + reward.drinks[0].strIngredient1
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure2 + " " + reward.drinks[0].strIngredient2
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure3 + " " + reward.drinks[0].strIngredient3
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure4 + " " + reward.drinks[0].strIngredient4
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure5 + " " + reward.drinks[0].strIngredient5
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure6 + " " + reward.drinks[0].strIngredient6
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure7 + " " + reward.drinks[0].strIngredient7
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure8 + " " + reward.drinks[0].strIngredient8
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure9 + " " + reward.drinks[0].strIngredient9
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure10 + " " + reward.drinks[0].strIngredient10
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure11 + " " + reward.drinks[0].strIngredient11
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure12 + " " + reward.drinks[0].strIngredient12
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure13 + " " + reward.drinks[0].strIngredient13
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure14 + " " + reward.drinks[0].strIngredient14
		);
		ingredientSet.push(
			reward.drinks[0].strMeasure15 + " " + reward.drinks[0].strIngredient15
		);

		console.log(ingredientSet);

		for (i = 0; i < ingredientSet.length; i++) {
			if (ingredientSet[i] === "null null") {
				ingredientSet.splice([i], 1);
				i--;
			} else if (ingredientSet[i].includes("null")) {
				notNull = ingredientSet[i].replace("null", "");
				ingredientSet.splice([i], 1, notNull);
				var newItem = document.createElement("li");
				newItem.textContent = ingredientSet[i];
				ingredientList.appendChild(newItem);
			} else {
				var newItem = document.createElement("li");
				newItem.textContent = ingredientSet[i];
				ingredientList.appendChild(newItem);
			}
		}
	}
}
