var quizUrl = "https://jservice.io/api/random?count=100";
var rewardUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
var score = 0;
var mistakes = 0;
var index = 0;
var oldScore = 0;
var rulesEl = document.querySelector("#rules");
var start = document.querySelector("#startBtn");
var answerFormEl = document.querySelector("#answerForm");
var oldScoreEl = document.querySelector("#score");
var oldDrinkEl = document.querySelector("#oldName");
var oldAlcEl = document.querySelector("#oldAlc");
var oldGlassEl = document.querySelector("#oldGlass");
var oldDrinkImgEl = document.querySelector("#oldDrinkImg");
var oldDrinkInstructionsEl = document.querySelector("#oldInstructions");
var oldDrinkIngredientsEl = document.querySelector("#oldIngredients");
var categoriesEl = document.querySelector("#category");
var questionsEl = document.querySelector("#question");
var quizEl = document.querySelector("#quizBoard");
var re = [
	/\,/g,
	/\//g,
	/\\/g,
	/<i>/gi,
	/<\/i>/gi,
	/&/g,
	/\//g,
	/\b(a)\b/gi,
	/\b(an)\b/gi,
	/\b(the)\b/gi,
	/\b(to)\b/gi,
	/\b(and)\b/gi,
	/\b(if)\b/gi,
	/\((\w+)\)/gi,
	/\(((\w+)\s+(\w+))+\)/gi,
	/[A-Z]\./g,
];

oldDrinkCard();
oldScoreCard();

function oldDrinkCard() {
	var oldDrink = JSON.parse(localStorage.getItem("drink"));
	//   console.log(oldDrink);
	if (oldDrink !== null) {
		oldDrinkImgEl.src = oldDrink.image;
		oldDrinkEl.textContent = oldDrink.name;
		oldAlcEl.textContent = oldDrink.alcoholic;
		oldDrinkInstructionsEl.textContent = oldDrink.instructions;
		for (i = 0; i < oldDrink.ingredients.length; i++) {
			var oldIngredientEl = document.createElement("li");
			oldIngredientEl.textContent = oldDrink.ingredients[i];
			oldDrinkIngredientsEl.appendChild(oldIngredientEl);
		}
	}
}

function oldScoreCard() {
	var pullScore = localStorage.getItem("lastScore");
	if (pullScore !== null) {
		oldScore = pullScore;
	}
	oldScoreEl.textContent = oldScore;
}

start.addEventListener("click", startQuiz);

function startQuiz(event) {
	event.preventDefault();
	rulesEl.remove();
	start.classList.add("hidden");
	answerFormEl.classList.remove("hidden");

	fetch(quizUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			var newData = data;
			console.log(newData);
			//------------------------

			categoriesEl.textContent =
				"CATEGORY: " + "'" + newData[index].category["title"] + "'";
			questionsEl.textContent = newData[index].question; //1 question

			function nextQuestion(event) {
				var userAnswer = document.querySelector("#answer").value;

				event.preventDefault();
				console.log("answerArray  = " + newData[index].answer);
				console.log("userAnswer = " + userAnswer);

				// First, clean the userAnswer
				var cleanAnswer = userAnswer.trim().toLowerCase();
				console.log("cleanAnswer = " + cleanAnswer);

				// Second, get & clean the API answer (to grade against)
				var answerFromAPI = newData[index].answer;
				console.log("answerFromAPI =  " + answerFromAPI);
				// ! text.replace(unwantedText, "")
				answerReg();
				function answerReg() {
					for (i = 0; i < re.length; i++) {
						var testAnswer = answerFromAPI.replaceAll(re[i], "");
						console.log(re[i]);
						answerFromAPI = testAnswer;
					}
					console.log(testAnswer);
				}
				console.log("answerFromAPI =  " + answerFromAPI);

				var cleanAnswerFromAPI = answerFromAPI.trim().toLowerCase();
				console.log("cleanAnswerFromAPI = " + cleanAnswerFromAPI);

				// Third, convert the singular answer from answerArray into an array of strings
				// i.e. return ['the', 'brown' 'dog'] from answerArray[i] = 'the brown dog'
				var correctAnswerArray = cleanAnswerFromAPI.split(" ");
				console.log("correctAnswerArray is: " + correctAnswerArray);

				// Finally, grade the answer
				console.log(
					"isCorrectAnswer() = " +
						isCorrectAnswer(correctAnswerArray, cleanAnswer)
				);

				if (isCorrectAnswer(correctAnswerArray, cleanAnswer)) {
					index++;
					score++;
					questionsEl.textContent = newData[index].question;
					categoriesEl.textContent =
						"CATEGORY: " + "'" + newData[index].category["title"] + "'";
					document.querySelector("#answer").value = "";
				} else {
					gameLost();
				}
			}

			answerFormEl.addEventListener("submit", nextQuestion);
		});
}

// TODO: have event listener for click for starting game
// start.addEventListener("click", gameLost);
// TODO: have event listener for submit to check answers and move on to next question

// function to grade the user's answer and return a boolean where true=Correct and false=Incorrect
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
		answerFormEl.classList.add("hidden");
		rulesEl.remove();
		var congratulations = document.createElement("h2");
		congratulations.textContent =
			"Pour Loser! You scored " + score + " have a drink!";
		quizEl.prepend(congratulations);

		var drinkName = reward.drinks[0].strDrink;
		categoriesEl.textContent = drinkName;

		var drinkAlc = reward.drinks[0].strAlcoholic;
		questionsEl.textContent = drinkAlc;

		var glassType = reward.drinks[0].strGlass;
		var glassTypeEl = document.createElement("h4");
		glassTypeEl.textContent = glassType;
		quizEl.appendChild(glassTypeEl);

		var drinkImg = reward.drinks[0].strDrinkThumb;
		var drinkImgEl = document.createElement("img");
		drinkImgEl.src = drinkImg;
		drinkImgEl.classList.add("w-50");
		quizEl.appendChild(drinkImgEl);

		var drinkInstructions = reward.drinks[0].strInstructions;
		var drinkInstructionsEl = document.createElement("p");
		drinkInstructionsEl.textContent = drinkInstructions;
		quizEl.appendChild(drinkInstructionsEl);

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

		var currentDrink = {
			image: drinkImg,
			name: drinkName,
			alcoholic: drinkAlc,
			glass: glassType,
			instructions: drinkInstructions,
			ingredients: ingredientSet,
		};
		localStorage.setItem("drink", JSON.stringify(currentDrink));
		localStorage.setItem("lastScore", score);
	}
}
