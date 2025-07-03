const timerText = document.getElementById("timerText");
const quesstionNumberText = document.getElementById("questionNumberText");
const questionText = document.getElementById("questionText");
const answerButton = document.querySelectorAll(".answers");
const quizOverBox = document.getElementById("quizOverBox");
const scoreText = document.getElementById("scoreText");

let score = 0;
let currentQuestionAndAnswer = 0;
let timer = 20000;
let timerStart = false;
let intervalID;

const questions = [
    {
        question: "What color do you get when you mix red and blue?",
        answers: ["Green", "Purple", "Orange", "Yellow"],
        correct: 1, // Purple
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1, // Mars
    },
    {
        question: "What is the largest mammal on Earth?",
        answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: 1, // Blue Whale
    },
    {
        question: "What is the capital city of Japan?",
        answers: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correct: 2, // Tokyo
    },
    {
        question: "How many legs does a spider have?",
        answers: ["Six", "Eight", "Ten", "Twelve"],
        correct: 1, // Eight
    },
];

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // random index
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
}

function displayQuiz() {
    if (timerStart) {
        answerButton.forEach((button) => {
            button.disabled = false;
        });
    } else {
        answerButton.forEach((button) => {
            button.disabled = true;
        });
    }
    if (currentQuestionAndAnswer < questions.length) {
        const currentqueston = questions[currentQuestionAndAnswer];
        questionText.textContent = currentqueston.question;
        quesstionNumberText.textContent = currentQuestionAndAnswer + 1;

        answerButton.forEach((answerss, index) => {
            answerss.textContent = currentqueston.answers[index];
        });

        console.log(`Score: ${score}`);
        console.log(questions);

        console.log(` `);
    }
}
function handleAnswers(answer) {
    const currentqueston = questions[currentQuestionAndAnswer];
    if (answer === currentqueston.correct) {
        score++;
    }

    currentQuestionAndAnswer < questions.length - 1
        ? currentQuestionAndAnswer++
        : quizOver();

    displayQuiz();
}

function starttimer() {
    clearInterval(intervalID);
    intervalID = setInterval(() => {
        timer = timer - 100;
        timerText.textContent = (timer / 1000).toFixed(0);
        if (timer <= 0) {
            quizOver();
        }
    }, 100);
}

function quizOver() {
    scoreText.textContent = `Your Score is: ${score}`;
    quizOverBox.style.display = "flex";
    timerStart = false;
    clearInterval(intervalID);
}

answerButton.forEach((button, index) => {
    button.addEventListener("click", () => {
        handleAnswers(index);
        timer = 20000;
    });
});
function restartQuiz() {
    score = 0;
    currentQuestionAndAnswer = 0;
    timer = 20000;
    shuffleQuestions(questions);
    timerStart = true;
    quizOverBox.style.display = "none";
    shuffleQuestions(questions);
    displayQuiz();
    starttimer();
}

shuffleQuestions(questions);
displayQuiz();
