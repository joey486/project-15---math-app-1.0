import { getRandomQuestion, loadQuestions } from "./main.js"; 

// Language translations
const translations = {
    en: {
        title: "Math Learning App",
        questionPlaceholder: "Loading question...",
        answerPlaceholder: "Your answer",
        hint: "Hint",
        submitButton: "Submit",
        nextQuestionButton: "Next Question",
        showHintButton: "Show Hint",
        pleaseEnterAnswer: "Please enter an answer.",
        correctAnswer: "Correct!",
        wrongAnswer: "Wrong! The correct answer is"
    },
    he: {
        title: "אפליקציית למידה בחשבון",
        questionPlaceholder: "טוען שאלה...",
        answerPlaceholder: "התשובה שלך",
        hint: "רמז",
        submitButton: "שלח",
        nextQuestionButton: "שאלה הבאה",
        showHintButton: "הצג רמז",
        pleaseEnterAnswer: "נא להזין תשובה.",
        correctAnswer: "נכון!",
        wrongAnswer: "שגוי! התשובה הנכונה היא"
    }
};

export let currentLanguage = 'en';

export function toggleLanguage() {
    // Switch language
    currentLanguage = currentLanguage === 'en' ? 'he' : 'en';
    applyTranslations();
    loadQuestions();
    getRandomQuestion();
}

function applyTranslations() {
    const t = translations[currentLanguage];

    document.title = t.title;

    // Update static text
    const titleElement = document.querySelector("h1");
    if (titleElement) titleElement.textContent = t.title;

    const questionElement = document.getElementById("question");
    if (questionElement) questionElement.textContent = t.questionPlaceholder;

    const userAnswerElement = document.getElementById("user-answer");
    if (userAnswerElement) userAnswerElement.placeholder = t.answerPlaceholder;

    const submitButton = document.getElementById("check-question-btn");
    if (submitButton) submitButton.textContent = t.submitButton;

    const nextButton = document.querySelector("button.next-button");
    if (nextButton) nextButton.textContent = t.nextQuestionButton;

    const showHintButton = document.querySelector("button[onclick='showHint()']");
    if (showHintButton) showHintButton.textContent = t.showHintButton;

    const hintElement = document.getElementById("hint");
    if (hintElement) hintElement.textContent = t.hint;
}

// Apply translations on page load
document.addEventListener('DOMContentLoaded', applyTranslations);

// Add event listener for the language toggle button
document.getElementById('toggle-language-btn').addEventListener('click', toggleLanguage);
