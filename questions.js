const questions = {
    general: {
        level1: [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                correct: 2
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correct: 1
            },
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic", "Indian", "Arctic", "Pacific"],
                correct: 3
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                correct: 2
            },
            {
                question: "What is the chemical symbol for gold?",
                options: ["Go", "Gd", "Au", "Ag"],
                correct: 2
            }
        ],
        level2: [
            {
                question: "Which country is home to the kangaroo?",
                options: ["New Zealand", "Australia", "South Africa", "Brazil"],
                correct: 1
            },
            {
                question: "What is the largest mammal on Earth?",
                options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                correct: 1
            },
            {
                question: "Which famous scientist developed the theory of relativity?",
                options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
                correct: 1
            },
            {
                question: "What is the smallest prime number?",
                options: ["0", "1", "2", "3"],
                correct: 2
            },
            {
                question: "Which element has the chemical symbol 'O'?",
                options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
                correct: 1
            }
        ]
    },
    javascript: {
        level1: [
            {
                question: "What does 'DOM' stand for in JavaScript?",
                options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Digital Object Model"],
                correct: 0
            },
            {
                question: "Which keyword is used to declare a variable in JavaScript?",
                options: ["var", "let", "const", "All of the above"],
                correct: 3
            },
            {
                question: "What is the result of '2' + '2' in JavaScript?",
                options: ["4", "22", "NaN", "Error"],
                correct: 1
            },
            {
                question: "Which method is used to add an element to the end of an array?",
                options: ["push()", "pop()", "shift()", "unshift()"],
                correct: 0
            },
            {
                question: "What is the correct way to write a JavaScript array?",
                options: [
                    "var colors = (1:'red', 2:'green', 3:'blue')",
                    "var colors = ['red', 'green', 'blue']",
                    "var colors = 'red', 'green', 'blue'",
                    "var colors = {1:'red', 2:'green', 3:'blue'}"
                ],
                correct: 1
            }
        ],
        level2: [
            {
                question: "What is a closure in JavaScript?",
                options: [
                    "A function that has access to its outer function's variables",
                    "A way to close a browser window",
                    "A method to end a program",
                    "A type of loop"
                ],
                correct: 0
            },
            {
                question: "What does the 'this' keyword refer to in JavaScript?",
                options: [
                    "The current function",
                    "The global object",
                    "The object that owns the current code",
                    "The parent object"
                ],
                correct: 2
            },
            {
                question: "Which of these is NOT a JavaScript framework?",
                options: ["React", "Angular", "Vue", "Django"],
                correct: 3
            },
            {
                question: "What is the purpose of the 'use strict' directive?",
                options: [
                    "To enforce stricter type checking",
                    "To enable strict mode, which catches common coding mistakes",
                    "To prevent the use of certain JavaScript features",
                    "To optimize code performance"
                ],
                correct: 1
            },
            {
                question: "What is the output of typeof null in JavaScript?",
                options: ["null", "undefined", "object", "string"],
                correct: 2
            }
        ]
    },
    sports: {
        level1: [
            {
                question: "Which country won the FIFA World Cup in 2018?",
                options: ["Brazil", "Germany", "France", "Argentina"],
                correct: 2
            },
            {
                question: "How many players are there in a standard soccer team?",
                options: ["9", "10", "11", "12"],
                correct: 2
            },
            {
                question: "Which sport uses a shuttlecock?",
                options: ["Tennis", "Badminton", "Table Tennis", "Squash"],
                correct: 1
            },
            {
                question: "In which sport would you perform a slam dunk?",
                options: ["Volleyball", "Basketball", "Tennis", "Handball"],
                correct: 1
            },
            {
                question: "Which country hosted the 2016 Summer Olympics?",
                options: ["China", "Brazil", "Russia", "Japan"],
                correct: 1
            }
        ],
        level2: [
            {
                question: "Who holds the record for most Grand Slam tennis titles?",
                options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],
                correct: 0
            },
            {
                question: "Which country has won the most Olympic gold medals?",
                options: ["United States", "China", "Russia", "Germany"],
                correct: 0
            },
            {
                question: "In which sport would you find the term 'hat-trick' commonly used?",
                options: ["Cricket", "Baseball", "Golf", "Swimming"],
                correct: 0
            },
            {
                question: "Which athlete has won the most Olympic medals of all time?",
                options: [
                    "Michael Phelps",
                    "Usain Bolt",
                    "Carl Lewis",
                    "Larisa Latynina"
                ],
                correct: 0
            },
            {
                question: "What is the maximum score possible in a single game of bowling?",
                options: ["100", "200", "300", "400"],
                correct: 2
            }
        ]
    }
}; 