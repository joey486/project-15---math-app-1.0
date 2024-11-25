import { currentLanguage } from "./language.js";

let questions = [];
let currentQuestion = {};
let correctAnswers = 0;

// Function to fetch and load questions from the JSON file
export function loadQuestions() {
    if ( currentLanguage === "en"){
        fetch('./database/questions_en.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            getRandomQuestion(); // Load a random question initially
        })
        .catch(error => console.error('Error loading JSON:', error));
    }
    else{
        fetch('./database/questions_he.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            getRandomQuestion(); // Load a random question initially
        })
        .catch(error => console.error('Error loading JSON:', error));
    }
}

// Function to get a random question
export function getRandomQuestion() {
    if (questions.length === 0) {
        document.getElementById('question').textContent = 'No questions available.';
        return;
    }

    // Pick a random question
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    // Display the question and reset other fields
    document.getElementById('question').textContent = currentQuestion.question;
    document.getElementById('user-answer').value = '';
    document.getElementById('hint').textContent = '';
    document.getElementById('result').textContent = '';
}

// Function to check the answer
function checkAnswer() {
    const userAnswerInput = document.getElementById('user-answer');
    const userAnswer = userAnswerInput.value.trim();

    // Check if the answer box is empty
    if (userAnswer === '') {
        document.getElementById('result').textContent = 'Please enter an answer.';
        userAnswerInput.focus(); // Focus on the answer box
        return;
    }

    // Proceed with checking the answer if not empty
    let resultText = '';
    if (userAnswer === currentQuestion.answer) {
        resultText = 'Correct!';
        correctAnswers++;  // Increment correct answers
        updateProgressBar();  // Update progress bar
    } else {
        resultText = `Wrong! The correct answer is ${currentQuestion.answer}.`;
    }
    
    document.getElementById('result').textContent = resultText;
}

// Function to show a hint
function showHint() {
    document.getElementById('hint').textContent = `Hint: ${currentQuestion.hint}`;
}

// Function to update the progress bar and check for completion
function updateProgressBar() {
    const totalQuestions = questions.length;
    const progressPercent = (correctAnswers / totalQuestions) * 100;
    document.getElementById('progress-fill').style.width = `${progressPercent}%`;
    
    // Redirect if progress bar is full
    if (progressPercent >= 100) {
        window.location.href = 'completion.html';
    }
}

// Event listener for Enter key to submit answer or get next question
function setupEnterKeyListener() {
    document.getElementById('user-answer').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            if (document.getElementById('result').textContent !== '') {
                getRandomQuestion();
            } else {
                checkAnswer();
            }
        }
    });
}

// Initialize the app once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    loadQuestions();          // Load questions from the JSON file
    setupEnterKeyListener();   // Set up key listener for Enter key
});


document.getElementById('check-question-btn').addEventListener('click', checkAnswer); //
document.getElementById('get-next-question').addEventListener('click', getRandomQuestion); //
document.getElementById('show-hint').addEventListener('click', showHint); //