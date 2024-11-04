let correctAnswers = 0;

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {                                                                       
    // Global variables to store the questions
    let questions = [];
    let currentQuestion = {};
  
    // Fetch the CSV file and parse it
    fetch('questions.csv')
        .then(response => response.text())
        .then(data => {
            questions = parseCSV(data);
            getRandomQuestion(); // Load a random question initially
        })
        .catch(error => console.error('Error loading CSV:', error));
  
    // Function to parse the CSV file
    function parseCSV(data) {
        let rows = data.trim().split('\n');
        let result = [];
        
        // Extract data from each row
        for (let i = 1; i < rows.length; i++) { // Adjust this to let i = 0 if CSV has no headers
            let cols = rows[i].split(',');
            result.push({
                question: cols[0].replace(/"/g, ''),
                answer: cols[1].trim(),
                hint: cols[2].replace(/"/g, '')
            });
        }
        return result;
    }
  
    // Function to get a random question
    window.getRandomQuestion = function() { // Added 'window.' to make it globally accessible
    if (questions.length === 0) {
        document.getElementById('question').textContent = 'No questions available.';
        return;
    }

    // Pick a random question
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    // Display the question
    document.getElementById('question').textContent = currentQuestion.question;
    document.getElementById('user-answer').value = '';
    document.getElementById('hint').textContent = '';
    document.getElementById('result').textContent = '';
};
  
    // Function to check the answer
    window.checkAnswer = function() {
        // Handle case where no question is available
        if (!currentQuestion.question) {
            document.getElementById('result').textContent = 'No question to answer.';
            return;
        }
  
        let userAnswer = document.getElementById('user-answer').value.trim();
        let resultText = '';
        
        if (userAnswer === currentQuestion.answer) {
            resultText = 'Correct!';
        } else {
            resultText = `Wrong! The correct answer is ${currentQuestion.answer}.`;
        }
        
        document.getElementById('result').textContent = resultText;
    };
  
    // Function to show a hint
    window.showHint = function() {
        document.getElementById('hint').textContent = `Hint: ${currentQuestion.hint}`;
    };

    function updateProgressBar() {
        const totalQuestions = questions.length;
        const progressPercent = (correctAnswers / totalQuestions) * 100;
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;
    }
    
    window.checkAnswer = function() {
        if (!currentQuestion.question) {
            document.getElementById('result').textContent = 'No question to answer.';
            return;
        }
    
        let userAnswer = document.getElementById('user-answer').value.trim();
        let resultText = '';
    
        if (userAnswer === currentQuestion.answer) {
            resultText = 'Correct!';
            correctAnswers++;  // Increment correct answers
            updateProgressBar();  // Update progress bar
        } else {
            resultText = `Wrong! The correct answer is ${currentQuestion.answer}.`;
        }
    
        document.getElementById('result').textContent = resultText;
    };

    function updateProgressBar() {
        const totalQuestions = questions.length;
        const progressPercent = (correctAnswers / totalQuestions) * 100;
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;
    
        // Redirect if progress bar is full
        if (progressPercent >= 100) {
            window.location.href = 'completion.html';
        }
    }
    
    // Keypress event listener for both "Enter" actions
    document.getElementById('user-answer').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            if (document.getElementById('result').textContent !== '') {
                getRandomQuestion();
            } else {
                checkAnswer();
            }
        }
    });
});
  


        // // Spinner
        // var spinner = function () {
        //     setTimeout(function () {
        //         if ($('#spinner').length > 0) {
        //             $('#spinner').removeClass('show');
        //         }
        //     }, 1);
        // };
        // spinner();