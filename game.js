const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounterText');
const scoreText = document.getElementById('scoreText');



let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What do you use CSS for?",
        choice1: "Build the skeleton of the webpage",
        choice2: "Style the webpage",
        choice3: "Putting the website online",
        choice4: "All of the above",
        answer: 2
    },
    {
        question: "How would you link a JS file?",
        choice1: "At the top of the HTML file",
        choice2: "In the CSS file",
        choice3: "At the bottom of the HTML file",
        choice4: "In a PHP file",
        answer: 3
    },
    {
        question: "Why would you use JavaScript?",
        choice1: "To enhance the way the webpage works",
        choice2: "To make the webpage have color",
        choice3: "To build the skeleton of the webpage",
        choice4: "You wouldn't need to",
        answer: 1
    },
    {
        question: "What is a 'var' in JavaScript?",
        choice1: "Containers for storing styles",
        choice2: "Containers for storing for loops",
        choice3: "Containers for storing links to other HTML files",
        choice4: "Containers for storing data values",
        answer: 4
    },  
    {
        question: "What is the difference between var and let?",
        choice1: "Nothing",
        choice2: "Var is global scoped while let is function scoped",
        choice3: "Var is function scoped while let is block scoped",
        choice4: "Let is function scoped while var is block scoped",
        answer: 3
    },
    {
        question: "What browser can't use JavaScript?",
        choice1: "Internet Explorer",
        choice2: "Microsoft Edge",
        choice3: "Safari",
        choice4: "None of the above",
        answer: 4
    },
    {
        question: "Which is a CORRECT for loop?",
        choice1: "for ( condition; init; increment )",
        choice2: "for ( init; condition; increment )",
        choice3: "for ( increment; condition; init )",
        choice4: "for ( init; increment; condition )",
        answer: 2
    },
    {
        question: "What is a 'const' in JavaScript?",
        choice1: "A permanent value",
        choice2: "A changable value",
        choice3: "An adaptable value",
        choice4: "A target value",
        answer: 1
    },  
    {
        question: "What is an 'array' in JavaScript",
        choice1: "A string of if statements",
        choice2: "A loop",
        choice3: "A set of variables referenced with a name and index number",
        choice4: "forEach declaration",
        answer: 3
    },
    {
        question: "What is Bootstrap?",
        choice1: "Open source framework for HTML",
        choice2: "Open source framework for HTML and PHP",
        choice3: "Open source framework for JavaScript",
        choice4: "Open source framework for CSS and JavaScript",
        answer: 4
    }, 
];

// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        // go to end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if(!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];

      const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; 

        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1500);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();