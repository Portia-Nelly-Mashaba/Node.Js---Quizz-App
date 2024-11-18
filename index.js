const readlineSync = require('readline-sync');

// Quiz Questions
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["1) Paris", "2) Rome", "3) Berlin", "4) Madrid"],
        answer: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["1) Earth", "2) Mars", "3) Jupiter", "4) Saturn"],
        answer: 3
    },
    {
        question: "Which programming language is known as the language of the web?",
        choices: ["1) Python", "2) Java", "3) JavaScript", "4) C++"],
        answer: 3
    }
];

let score = 0;
let currentQuestion = 0;
const timePerQuestion = 10000; // 10 seconds
const countdownInterval = 1000; // 1 second interval for the countdown

// Function to ask each question with a countdown timer
function askQuestion() {
    if (currentQuestion >= questions.length) {
        // Quiz finished
        console.log("\nQuiz finished! Your final score is:", score);
        process.exit(); // Exit the program
    }

    const question = questions[currentQuestion];
    let timeLeft = timePerQuestion / 1000; // 10 seconds countdown
    let userAnswered = false; // Track if user answered

    console.log(`\nQuestion ${currentQuestion + 1}: ${question.question}`);
    console.log(question.choices.join('\n'));

    // Start countdown timer using setInterval
    const countdown = setInterval(() => {
        if (timeLeft > 0) {
            console.log(`Time left: ${timeLeft}s`);
            timeLeft--;
        } else {
            clearInterval(countdown); // Clear the countdown timer
            if (!userAnswered) {
                console.log("Time's up! Moving to the next question.");
                currentQuestion++;
                askQuestion(); // Move to next question after timeout
            }
        }
    }, countdownInterval);

    // Capture user input synchronously while countdown is running
    const answer = readlineSync.question('Your answer (1-4): ');

    // Check if the user answered in time
    if (!userAnswered && timeLeft > 0) {
        userAnswered = true;
        clearInterval(countdown); // Stop the timer since the user answered

        // Check the answer
        if (parseInt(answer) === question.answer) {
            console.log("Correct!");
            score++;
        } else {
            console.log("Wrong answer!");
        }

        currentQuestion++;
        askQuestion(); // Move to the next question after answering
    }
}

// Start the quiz
console.log("Welcome to the Quiz! You have 10 seconds per question.");
askQuestion();
