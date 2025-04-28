// DOM Elements - Grabbing all elements we need from the HTML

// Different screen containers
const categorySelection = document.getElementById('categorySelection');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const leaderboardScreen = document.getElementById('leaderboardScreen');
const themeToggle = document.getElementById('themeToggle');

// Where the categories will be displayed
const categoriesContainer = document.querySelector('.categories');

// Where the question text and options will appear
const questionText = document.getElementById('questionText');
const optionsContainer = document.querySelector('.options');

// Timer display and progress bar
const timerProgress = document.querySelector('.timer-progress');
const timerText = document.querySelector('.timer-text');
const currentLevel = document.getElementById('currentLevel');

// Result screen elements
const resultCategory = document.getElementById('resultCategory');
const resultScore = document.getElementById('resultScore');
const resultAccuracy = document.getElementById('resultAccuracy');
const resultTime = document.getElementById('resultTime');

// Leaderboard table body
const leaderboardTable = document.getElementById('leaderboardTable').querySelector('tbody');


// Game State - Variables that track the quiz progress


let currentCategory = '';         // Stores the chosen category
let currentLevelNum = 1;          // Tracks if we're in level 1 or 2
let currentQuestionIndex = 0;     // Index of the current question
let score = 0;                    // Score based on time left
let correctAnswers = 0;           // Number of correct answers
let totalQuestions = 0;           // Total questions in the quiz
let timer;                        // Reference to the interval timer
let timeLeft = 15;                // Time left for the current question
let startTime;                    // Timestamp when the quiz starts
let shuffledQuestions = [];       // Stores shuffled questions


//sound Effects


const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');


// Initialize App - This runs when the page loads


function init() {
    setupEventListeners();   // Setup button/key handlers
    loadTheme();             // Load dark/light theme
    populateCategories();    // Show category buttons
    loadLeaderboard();       // Load leaderboard from storage
}


//Event Listeners - Handle user actions


function setupEventListeners() {
    // Theme switcher
    themeToggle.addEventListener('click', toggleTheme);

    // Navigation buttons
    document.getElementById('restartBtn').addEventListener('click', restartQuiz);
    document.getElementById('leaderboardBtn').addEventListener('click', showLeaderboard);
    document.getElementById('backToHomeBtn').addEventListener('click', showCategorySelection);

    // Keyboard shortcuts for answers (1–4)
    document.addEventListener('keydown', handleKeyboardInput);
}


// theme Management (Dark/Light Mode)


function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
}


//Category Selection - Show available quiz categories


function populateCategories() {
    categoriesContainer.innerHTML = ''; // Clear previous
    Object.keys(questions).forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryElement.addEventListener('click', () => startQuiz(category));
        categoriesContainer.appendChild(categoryElement);
    });
}


// Quiz Logic - Core quiz functions

function startQuiz(category) {
    // Reset game state
    currentCategory = category;
    currentLevelNum = 1;
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    totalQuestions = 0;
    startTime = Date.now();

    // Combine and shuffle level 1 & 2 questions
    shuffledQuestions = [
        ...shuffleArray([...questions[category].level1]),
        ...shuffleArray([...questions[category].level2])
    ];
    totalQuestions = shuffledQuestions.length;

    showScreen(quizScreen); // Switch to quiz screen
    loadQuestion();         // Load first question
}

function loadQuestion() {
    if (currentQuestionIndex >= totalQuestions) {
        endQuiz(); // If no more questions
        return;
    }

    const question = shuffledQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';

    // Create option buttons
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(optionElement);
    });

    // Show level number
    currentLevel.textContent = currentQuestionIndex < 5 ? 1 : 2;

    // Reset and start timer
    timeLeft = 15;
    timerText.textContent = timeLeft;
    timerProgress.style.width = '100%';
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerText.textContent = timeLeft;
        timerProgress.style.width = `${(timeLeft / 15) * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout(); // If time runs out
        }
    }, 1000);
}

function handleTimeout() {
    wrongSound.play();
    const options = optionsContainer.querySelectorAll('.option');

    // Show correct answer
    options[shuffledQuestions[currentQuestionIndex].correct].classList.add('correct');

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion(); // Move to next question
    }, 1000);
}

function checkAnswer(selectedIndex) {
    clearInterval(timer);
    const correctIndex = shuffledQuestions[currentQuestionIndex].correct;
    const options = optionsContainer.querySelectorAll('.option');

    options[correctIndex].classList.add('correct');

    if (selectedIndex !== correctIndex) {
        options[selectedIndex].classList.add('wrong');
        wrongSound.play();
    } else {
        score += timeLeft;  // More time left = more score
        correctAnswers++;
        correctSound.play();
    }

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1000);
}

function endQuiz() {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

    // Show result values
    resultCategory.textContent = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    resultScore.textContent = score;
    resultAccuracy.textContent = accuracy;
    resultTime.textContent = timeTaken;

    updateLeaderboard(score, timeTaken);
    showScreen(resultsScreen); // Show result screen
}



//  Leaderboard Management


function updateLeaderboard(score, timeTaken) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');

    leaderboard.push({
        category: currentCategory,
        score,
        time: timeTaken,
        date: new Date().toISOString()
    });

    // Sort by score, then by time (if tied)
    leaderboard.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return a.time - b.time;
    });

    // Keep only top 5
    const top5 = leaderboard.slice(0, 5);
    localStorage.setItem('leaderboard', JSON.stringify(top5));
    loadLeaderboard();
}

function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboardTable.innerHTML = '';

    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.category.charAt(0).toUpperCase() + entry.category.slice(1)}</td>
            <td>${entry.score}</td>
            <td>${entry.time}s</td>
        `;
        leaderboardTable.appendChild(row);
    });
}



// Screen Management - Show/hide screens


function showScreen(screen) {
    [categorySelection, quizScreen, resultsScreen, leaderboardScreen].forEach(s => {
        s.classList.add('hidden');
    });
    screen.classList.remove('hidden');
}

function showCategorySelection() {
    showScreen(categorySelection);
}

function showLeaderboard() {
    loadLeaderboard();
    showScreen(leaderboardScreen);
}

function restartQuiz() {
    showCategorySelection();
}


function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Use number keys (1-4) to select options
function handleKeyboardInput(e) {
    if (quizScreen.classList.contains('hidden')) return;

    const key = parseInt(e.key);
    if (key >= 1 && key <= 4) {
        const options = optionsContainer.querySelectorAll('.option');
        if (options[key - 1]) {
            options[key - 1].click();
        }
    }
}


init(); // Run everything!
