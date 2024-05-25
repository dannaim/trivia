
            let words =[];
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'data.json', true);
            xhr.onload = function() {
              if (xhr.status === 200) {
              console.log(JSON.parse(xhr.responseText));
              words = JSON.parse(xhr.responseText);
              
               displayQuestion(); // Call the displayQuestion function after loading the file
              }
            };
            xhr.send();
             

            let currentQuestionIndex;
            let streak = 0;

            const questionElement = document.getElementById('question');
            const options = document.querySelectorAll('.option-btn');
            const pronounceBtn = document.getElementById('pronounce-btn');
            const nextBtn = document.getElementById('next-btn');
            const strikeElement = document.getElementById('strike');

            // Function to shuffle the array
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i],array[j]] = [array[j], array[i]];
                }
                return array;
            }

            // Function to display a new question
            function displayQuestion() {
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
                options.forEach((option,index)=>{
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
                    alert("Correct!");
                } else {
                    streak = 0;
                    alert("Incorrect. The correct answer is: " + correctAnswer);
                }
                displayQuestion();
                strikeElement.textContent = "Strikes: " + streak;
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
