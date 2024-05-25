document.addEventListener("DOMContentLoaded", function () {
    let timerInterval; // Declare timerInterval at the top of your file

    let words = [];
    let currentQuestionIndex;
    let streak = 0;
    const questionElement = document.getElementById('question');
    const options = document.querySelectorAll('.option-btn');
    const pronounceBtn = document.getElementById('pronounce-btn');
    const nextBtn = document.getElementById('next-btn');
    const strikeElement = document.getElementById('strike');

    //load json file
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            words = JSON.parse(xhr.responseText);

            displayQuestion(); // Call the displayQuestion function after loading the file
            // Call the startTimer function when displaying a new question


        }
    };
    xhr.send();

    // Function to shuffle the array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to display a new question
    function displayQuestion() {
        resetTimer();
        startTimer();
        currentQuestionIndex = Math.floor(Math.random() * words.length);
        const currentQuestion = words[currentQuestionIndex];
        questionElement.textContent = currentQuestion.english;
        const optionsArray = [currentQuestion.hebrew];
        while (optionsArray.length < 4) {
            const randomIndex = Math.floor(Math.random() * words.length);
            const randomWord = words[randomIndex].hebrew;
            if (!optionsArray.includes(randomWord)) {
                optionsArray.push(randomWord);
            }
        }
        shuffleArray(optionsArray);
        options.forEach((option, index) => {
            option.textContent = optionsArray[index];
            option.addEventListener('click', checkAnswer);
        }
        );
    }

    // Function to check the selected answer
    function checkAnswer(event) {
        const selectedAnswer = event.target.textContent;
        const correctAnswer = words[currentQuestionIndex].hebrew;
        if (selectedAnswer === correctAnswer) {
            streak++;
            // Display feedback to the user for correct answer
            const feedbackElement = document.getElementById('feedback');
            if (feedbackElement) {
                feedbackElement.textContent = "Correct!";
                feedbackElement.style.color = "green";
            }
        } else {
            streak = 0;
            // Display feedback to the user for incorrect answer
            const feedbackElement = document.getElementById('feedback');
            if (feedbackElement) {
                feedbackElement.textContent = "Incorrect. The hebrew word for " + 
                words[currentQuestionIndex].english + " is: " + correctAnswe;
                
                feedbackElement.style.color = "red";
            }
        }
        displayQuestion();
        if (strikeElement) {
            strikeElement.textContent = "Streak: " + streak;
        }
    }

    // Function to pronounce the current word
    function pronounceWord() {
        const currentWord = words[currentQuestionIndex].english;
        const utterance = new SpeechSynthesisUtterance(currentWord);
        speechSynthesis.speak(utterance);
    }

    // Event listeners for buttons
    pronounceBtn.addEventListener('click', pronounceWord);
    nextBtn.addEventListener('click', displayQuestion);


    let timerValue = 10;
    const timerElement = document.getElementById('timer-value');

    // Function to start the timer
    function startTimer() {
        timerValue = 10;
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Function to update the timer
    function updateTimer() {
        timerValue--;
        timerElement.textContent = timerValue;
        if (timerValue === 0) {
            clearInterval(timerInterval);
            // Handle timer expiration here
            streak = 0;
            alert("Time's up! The correct answer is: " + words[currentQuestionIndex].hebrew);
            displayQuestion();
            strikeElement.textContent = "Strikes: " + streak;


        }
    }

    // Function to reset the timer
    function resetTimer() {


        clearInterval(timerInterval);
        timerValue = 10;
        timerElement.textContent = timerValue;



    }

    // Function to handle user answer
    function handleAnswer() {
        clearInterval(timerInterval);
        // Handle user answer here
    }

    // Function to handle next question
    function handleNextQuestion() {
        resetTimer();
        // Handle next question here
    }

    // Event listener for option buttons
    options.forEach((option) => {
        option.addEventListener('click', handleAnswer);
    });

    // Event listener for next button
    nextBtn.addEventListener('click', handleNextQuestion);

});


