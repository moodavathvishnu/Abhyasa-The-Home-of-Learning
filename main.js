document.addEventListener('DOMContentLoaded', () => {
  console.log('app.js loaded');
  const toLoginLink = document.getElementById('to-login');
  const toSignupLink = document.getElementById('to-signup');
  
  if (toLoginLink) {
    toLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Login link clicked');
      toggleForm();
    });
  }
  
  if (toSignupLink) {
    toSignupLink.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Signup link clicked');
      toggleForm();
    });
  }
});

function toggleForm() {
  console.log('toggleForm called');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  if (signupForm && loginForm) {
    signupForm.classList.toggle('hidden');
    loginForm.classList.toggle('hidden');
    console.log('Forms toggled: signup hidden=', signupForm.classList.contains('hidden'), 'login hidden=', loginForm.classList.contains('hidden'));
  } else {
    console.warn('Forms not found');
  }
}
// In main.js

const leaderboardBody = document.getElementById('leaderboard-body');
const leaderboardSection = document.getElementById('leaderboard');
const leaderboardBtn = document.getElementById('leaderboard-btn');

function showLeaderboard() {
  leaderboardSection.classList.remove('hidden');
  updateLeaderboard(); // Call update when showing
}

function hideLeaderboard() {
  leaderboardSection.classList.add('hidden');
}

if (leaderboardBtn) {
  leaderboardBtn.addEventListener('click', showLeaderboard);
}

function updateLeaderboard() {
  if (!leaderboardBody) return;

  const leaderboardDataString = localStorage.getItem('leaderboardData');
  const leaderboardData = leaderboardDataString ? JSON.parse(leaderboardDataString) : [];

  // Sort by score (descending)
  leaderboardData.sort((a, b) => b.score - a.score);

  leaderboardBody.innerHTML = ''; // Clear existing rows

  leaderboardData.forEach((entry, index) => {
    const row = leaderboardBody.insertRow();
    const rankCell = row.insertCell();
    const usernameCell = row.insertCell();
    const scoreCell = row.insertCell();
    const languageCell = row.insertCell();
    const dateTimeCell = row.insertCell();

    rankCell.textContent = index + 1;
    usernameCell.textContent = entry.username;
    scoreCell.textContent = entry.score;
    languageCell.textContent = entry.language;
    dateTimeCell.textContent = entry.dateTime; // Ensure your data has this
  });
}

function login() {
  console.log('login called');
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  let users = {};
  try {
    users = JSON.parse(localStorage.getItem('users') || '{}');
  } catch (e) {
    console.warn('Invalid users data');
  }
  if (!users[username]) {
    alert('User does not exist. Please sign up.');
    toggleForm();
    return;
  }
  if (users[username].password === password) {
    localStorage.setItem('currentUser', username);
    window.location.href = 'home.html';
  } else {
    alert('Invalid username or password.');
  }
}

function signup() {
  console.log('signup called');
  const email = document.getElementById('signup-email').value;
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  if (email && username && password) {
    let users = {};
    try {
      users = JSON.parse(localStorage.getItem('users') || '{}');
    } catch (e) {
      console.warn('Invalid users data, initializing empty object');
    }
    if (users[username]) {
      alert('Username already exists!');
      return;
    }
    users[username] = { email, password, scores: [] };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! Please login.');
    toggleForm();
  } else {
    alert('Please fill all fields.');
  }
}

function checkAuth() {
  console.log('checkAuth called');
  const user = localStorage.getItem('currentUser');
  if (!user && window.location.pathname !== '/index.html') {
    window.location.href = 'index.html';
  } else if (user) {
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
      usernameDisplay.textContent = `Welcome, ${user}`;
    }
    if (window.location.pathname.includes('home.html') || window.location.pathname.includes('result.html')) {
      updateLeaderboard();
    }
  }
}

function logout() {
  console.log('logout called');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('quizResult');
  localStorage.removeItem('currentQuiz');
  localStorage.removeItem('quizState');
  window.location.href = 'index.html';
}

const questions = {
  "C":[
    { question: "What is the output of printf('%d', 5);?", options: [{ text: "5", image: null }, { text: "0", image: null }, { text: "Error", image: null }, { text: "None", image: null }], answer: "5", difficulty: "Easy", explanation: "In C, printf('%d', 5); prints the integer 5 using the %d format specifier for decimal integers." },
    { question: "What is the size of int in C?", options: [{ text: "2 bytes", image: null }, { text: "4 bytes", image: null }, { text: "8 bytes", image: null }, { text: "Depends", image: "images/int_size.png" }], answer: "Depends", difficulty: "Easy", explanation: "The size of int in C depends on the compiler and architecture (e.g., 4 bytes on 32-bit systems, 2 bytes on some 16-bit systems)." },
    { question: "What does 'break' do in a loop?", options: [{ text: "Continues", image: null }, { text: "Exits loop", image: null }, { text: "Skips", image: null }, { text: "None", image: null }], answer: "Exits loop", difficulty: "Easy", explanation: "In C, 'break' exits a loop immediately, transferring control to the next statement after the loop." },
    { question: "Which keyword declares an integer variable?", options: [{ text: "int", image: null }, { text: "var", image: null }, { text: "number", image: null }, { text: "integer", image: null }], answer: "int", difficulty: "Easy", explanation: "In C, 'int' declares an integer variable (e.g., int x;)." },
    { question: "Which header file provides printf()?", options: [{ text: "stdio.h", image: null }, { text: "conio.h", image: null }, { text: "stdlib.h", image: null }, { text: "string.h", image: null }], answer: "stdio.h", difficulty: "Easy", explanation: "The stdio.h header includes printf() for standard input/output in C." },
    { question: "What is the output of printf('%c', 65);?", options: [{ text: "A", image: null }, { text: "65", image: null }, { text: "Error", image: null }, { text: "a", image: null }], answer: "A", difficulty: "Easy", explanation: "In C, printf('%c', 65); prints the ASCII character for 65, which is 'A'." },
    { question: "What is the result of 5 / 2 in C?", options: [{ text: "2", image: null }, { text: "2.5", image: null }, { text: "3", image: null }, { text: "Error", image: null }], answer: "2", difficulty: "Easy", explanation: "In C, integer division (5 / 2) truncates the decimal part, yielding 2." },
    { question: "Which symbol denotes a preprocessor directive?", options: [{ text: "#", image: null }, { text: "$", image: null }, { text: "@", image: null }, { text: "&", image: null }], answer: "#", difficulty: "Medium", explanation: "In C, preprocessor directives (e.g., #include) are prefixed with '#'." },
    { question: "What is the output of int x = 5; printf('%d', x++);?", options: [{ text: "5", image: null }, { text: "6", image: null }, { text: "Error", image: null }, { text: "Undefined", image: null }], answer: "5", difficulty: "Medium", explanation: "In C, x++ returns the current value (5) before incrementing x to 6, so printf prints 5." },
    { question: "Which function reads a single character?", options: [{ text: "getchar()", image: null }, { text: "gets()", image: null }, { text: "scanf()", image: null }, { text: "read()", image: null }], answer: "getchar()", difficulty: "Medium", explanation: "In C, getchar() reads a single character from standard input." },
    { question: "What is the output of int x = 10; printf('%d', x / 3);?", options: [{ text: "3", image: null }, { text: "3.33", image: null }, { text: "4", image: null }, { text: "Error", image: null }], answer: "3", difficulty: "Medium", explanation: "In C, integer division (10 / 3) truncates to 3." },
    { question: "Which operator performs modulo in C?", options: [{ text: "%", image: null }, { text: "&", image: null }, { text: "*", image: null }, { text: "^", image: null }], answer: "%", difficulty: "Medium", explanation: "In C, '%' computes the remainder (e.g., 5 % 2 = 1)." },
    { question: "What is the output of printf('%f', 5.0); with stdio.h?", options: [{ text: "5.000000", image: null }, { text: "5", image: null }, { text: "Error", image: null }, { text: "0.000000", image: null }], answer: "5.000000", difficulty: "Medium", explanation: "In C, printf('%f', 5.0); prints 5.0 as a float with default precision (6 decimal places)." },
    { question: "What is the output of int *p = malloc(4); *p = 10; printf('%d', *p);?", options: [{ text: "10", image: null }, { text: "4", image: null }, { text: "Error", image: null }, { text: "Undefined", image: null }], answer: "10", difficulty: "Medium", explanation: "In C, malloc(4) allocates 4 bytes; *p = 10 stores 10, so printf('%d', *p) prints 10." },
    { question: "What is the output of int arr[2] = {1, 2}; printf('%d', *(arr + 1));?", options: [{ text: "1", image: null }, { text: "2", image: null }, { text: "Error", image: null }, { text: "Undefined", image: null }], answer: "2", difficulty: "Hard", explanation: "In C, *(arr + 1) accesses arr[1], which is 2." },
    { question: "What is the output of int x = 5; printf('%d', ++x + x++);?", options: [{ text: "12", image: null }, { text: "11", image: null }, { text: "13", image: null }, { text: "Undefined", image: null }], answer: "Undefined", difficulty: "Hard", explanation: "In C, ++x + x++ modifies x multiple times in one expression, causing undefined behavior." },
    { question: "What does 'volatile' keyword do in C?", options: [{ text: "Prevent optimization", image: null }, { text: "Define constants", image: null }, { text: "Enable pointers", image: null }, { text: "Allow loops", image: null }], answer: "Prevent optimization", difficulty: "Hard", explanation: "In C, 'volatile' prevents compiler optimization for variables that may change unexpectedly." },
    { question: "What is the output of int x = 0; if (x = 1) printf('%d', x); else printf('0');?", options: [{ text: "1", image: null }, { text: "0", image: null }, { text: "Error", image: null }, { text: "Undefined", image: null }], answer: "1", difficulty: "Hard", explanation: "In C, x = 1 assigns 1 to x and evaluates to 1 (true), so printf('%d', x) prints 1." },
    { question: "What is the output of struct {int x;} s = {5}; printf('%d', s.x);?", options: [{ text: "5", image: null }, { text: "0", image: null }, { text: "Error", image: null }, { text: "Undefined", image: null }], answer: "5", difficulty: "Hard", explanation: "In C, the struct s is initialized with x = 5, so printf('%d', s.x) prints 5." },
    { question: "What is the output of int x = 5; printf('%d', x << 1);?", options: [{ text: "10", image: null }, { text: "5", image: null }, { text: "2", image: null }, { text: "Error", image: null }], answer: "10", difficulty: "Hard", explanation: "In C, x << 1 shifts x (5, binary 101) left by 1, yielding 10 (binary 1010)." }
  ],
  
  "Python": [
    {question:"What is the output of print(2 + 2)?",options:[{text:"4",image:null},{text:"22",image:null},{text:"Error",image:null},{text:"None",image:null}],answer:"4",difficulty:"Easy",explanation:"In Python, print(2 + 2) evaluates 2 + 2 and prints 4."},
    {question:"What is the type of 3.14 in Python?",options:[{text:"float",image:null},{text:"int",image:null},{text:"str",image:null},{text:"bool",image:null}],answer:"float",difficult:"Easy",explanation:"In Python, 3.14 is a float due to its decimal point."},
    {question:"What is the output of print('Hello'[0])?",options:[{text:"H",image:null},{text:"Hello",image:null},{text:"Error",image:null},{text:"0",image:null}],answer:"H",difficulty:"Easy",explanation:"In Python, 'Hello'[0] accesses the first character, 'H'."},
      {
        question: "What is the result of 5 // 2 in Python?",
        options: [
          { text: "2", image: null },
          { text: "2.5", image: null },
          { text: "3", image: null },
          { text: "Error", image: null }
        ],
        answer: "2",
        difficulty: "Easy",
        explanation: "In Python, '//' performs floor division, so 5 // 2 yields 2."
      },
      {
        question: "Which keyword defines a function in Python?",
        options: [
          { text: "def", image: null },
          { text: "function", image: null },
          { text: "fun", image: null },
          { text: "lambda", image: null }
        ],
        answer: "def",
        difficulty: "Easy",
        explanation: "In Python, 'def' defines a function (e.g., def my_func():)."
      },
      {
        question: "What is the output of print(len('abc'))?",
        options: [
          { text: "3", image: null },
          { text: "2", image: null },
          { text: "4", image: null },
          { text: "Error", image: null }
        ],
        answer: "3",
        difficulty: "Easy",
        explanation: "In Python, len('abc') returns the string's length, 3."
      },
      {
        question: "Which operator checks equality in Python?",
        options: [
          { text: "==", image: null },
          { text: "=", image: null },
          { text: "===", image: null },
          { text: "!=", image: null }
        ],
        answer: "==",
        difficulty: "Easy",
        explanation: "In Python, '==' checks for equality (e.g., 5 == 5 is True)."
      },
      {
        question: "What is the output of print([1, 2].append(3))?",
        options: [
          { text: "[1, 2, 3]", image: null },
          { text: "None", image: null },
          { text: "Error", image: null },
          { text: "3", image: null }
        ],
        answer: "None",
        difficulty: "Medium",
        explanation: "In Python, append() modifies the list in place and returns None."
      },
      {
        question: "What is the output of print({1: 'a', 2: 'b'}[1])?",
        options: [
          { text: "a", image: null },
          { text: "1", image: null },
          { text: "Error", image: null },
          { text: "b", image: null }
        ],
        answer: "a",
        difficulty: "Medium",
        explanation: "In Python, {1: 'a', 2: 'b'}[1] accesses the value for key 1, which is 'a'."
      },
      {
        question: "What is the output of print([x for x in range(3)])?",
        options: [
          { text: "[0, 1, 2]", image: null },
          { text: "[1, 2, 3]", image: null },
          { text: "Error", image: null },
          { text: "[0, 1]", image: null }
        ],
        answer: "[0, 1, 2]",
        difficulty: "Medium",
        explanation: "In Python, [x for x in range(3)] creates [0, 1, 2] via list comprehension."
      },
      {
        question: "What is the output of print('a' in 'abc')?",
        options: [
          { text: "True", image: null },
          { text: "False", image: null },
          { text: "Error", image: null },
          { text: "None", image: null }
        ],
        answer: "True",
        difficulty: "Medium",
        explanation: "In Python, 'in' checks if 'a' is in 'abc', returning True."
      },
      {
        question: "What is the output of print(2 ** 3)?",
        options: [
          { text: "8", image: null },
          { text: "6", image: null },
          { text: "9", image: null },
          { text: "Error", image: null }
        ],
        answer: "8",
        difficulty: "Medium",
        explanation: "In Python, '**' is exponentiation, so 2 ** 3 = 8."
      },
      {
        question: "What is the output of print(tuple([1, 2])[1])?",
        options: [
          { text: "2", image: null },
          { text: "1", image: null },
          { text: "Error", image: null },
          { text: "[1, 2]", image: null }
        ],
        answer: "2",
        difficulty: "Medium",
        explanation: "In Python, tuple([1, 2])[1] accesses the second element, 2."
      },
      {
        question: "What is the output of print(sorted([3, 1, 2]))?",
        options: [
          { text: "[1, 2, 3]", image: null },
          { text: "[3, 1, 2]", image: null },
          { text: "Error", image: null },
          { text: "[2, 1, 3]", image: null }
        ],
        answer: "[1, 2, 3]",
        difficulty: "Medium",
        explanation: "In Python, sorted() returns a new sorted list, so [3, 1, 2] becomes [1, 2, 3]."
      },
      {
        question: "What is the output of async def f(): return 42; print(f())?",
        options: [
          { text: "42", image: null },
          { text: "<coroutine object>", image: null },
          { text: "Error", image: null },
          { text: "None", image: null }
        ],
        answer: "<coroutine object>",
        difficulty: "Hard",
        explanation: "In Python, async def returns a coroutine; print(f()) outputs the coroutine object."
      },
      {
        question: "What is the output of print(lambda x: x*2)(3)?",
        options: [
          { text: "6", image: null },
          { text: "3", image: null },
          { text: "Error", image: null },
          { text: "<function>", image: null }
        ],
        answer: "6",
        difficulty: "Hard",
        explanation: "In Python, lambda x: x*2 doubles x; calling it with (3) returns 6."
      },
      {
        question: "What is the output of print(set([1, 1, 2]))?",
        options: [
          { text: "{1, 2}", image: null },
          { text: "[1, 1, 2]", image: null },
          { text: "Error", image: null },
          { text: "{1}", image: null }
        ],
        answer: "{1, 2}",
        difficulty: "Hard",
        explanation: "In Python, set([1, 1, 2]) removes duplicates, yielding {1, 2}."
      },
      {
        question: "What is the output of class A: x = 1; print(A.x)?",
        options: [
          { text: "1", image: null },
          { text: "Error", image: null },
          { text: "None", image: null },
          { text: "A", image: null }
        ],
        answer: "1",
        difficulty: "Hard",
        explanation: "In Python, A.x accesses the class attribute x, which is 1."
      },
      {
        question: "What is the output of print([1, 2, 3][1:2])?",
        options: [
          { text: "[2]", image: null },
          { text: "2", image: null },
          { text: "[1, 2]", image: null },
          { text: "Error", image: null }
        ],
        answer: "[2]",
        difficulty: "Hard",
        explanation: "In Python, [1, 2, 3][1:2] slices from index 1 to 2, returning [2]."
      },
      {
        question: "What is the output of def f(*args): return args; print(f(1, 2))?",
        options: [
          { text: "(1, 2)", image: null },
          { text: "[1, 2]", image: null },
          { text: "Error", image: null },
          { text: "1", image: null }
        ],
        answer: "(1, 2)",
        difficulty: "Hard",
        explanation: "In Python, *args collects arguments into a tuple, so f(1, 2) returns (1, 2)."
      }  
  ],
  "C++":[
    {
      question: "What is the output of cout << 5?",
      options: [
        { text: "5", image: null },
        { text: "Error", image: null },
        { text: "0", image: null },
        { text: "None", image: null }
      ],
      answer: "5",
      difficulty: "Easy",
      explanation: "In C++, cout << 5; prints 5 to the console using the iostream library."
    },
    {
      question: "Which header file provides cout?",
      options: [
        { text: "iostream", image: null },
        { text: "stdio.h", image: null },
        { text: "string", image: null },
        { text: "vector", image: null }
      ],
      answer: "iostream",
      difficulty: "Easy",
      explanation: "In C++, iostream provides cout for console output."
    },
    {
      question: "What is the data type for a single character?",
      options: [
        { text: "char", image: null },
        { text: "int", image: null },
        { text: "string", image: null },
        { text: "float", image: null }
      ],
      answer: "char",
      difficulty: "Easy",
      explanation: "In C++, 'char' stores a single character (e.g., 'A')."
    },
    {
      question: "What is the output of int x = 10; cout << x / 3?",
      options: [
        { text: "3", image: null },
        { text: "3.33", image: null },
        { text: "4", image: null },
        { text: "Error", image: null }
      ],
      answer: "3",
      difficulty: "Easy",
      explanation: "In C++, integer division (10 / 3) truncates to 3."
    },
    {
      question: "Which keyword defines a constant in C++?",
      options: [
        { text: "const", image: null },
        { text: "static", image: null },
        { text: "define", image: null },
        { text: "final", image: null }
      ],
      answer: "const",
      difficulty: "Easy",
      explanation: "In C++, 'const' defines a constant (e.g., const int x = 5;)."
    },
    {
      question: "What is the output of cout << 'A'?",
      options: [
        { text: "A", image: null },
        { text: "65", image: null },
        { text: "Error", image: null },
        { text: "a", image: null }
      ],
      answer: "A",
      difficulty: "Easy",
      explanation: "In C++, cout << 'A'; prints the character 'A'."
    },
    {
      question: "Which symbol denotes a comment in C++?",
      options: [
        { text: "//", image: null },
        { text: "#", image: null },
        { text: "/*", image: null },
        { text: "--", image: null }
      ],
      answer: "//",
      difficulty: "Easy",
      explanation: "In C++, '//' denotes a single-line comment."
    },
    {
      question: "What is the output of int x = 5; cout << x++?",
      options: [
        { text: "5", image: null },
        { text: "6", image: null },
        { text: "Error", image: null },
        { text: "Undefined", image: null }
      ],
      answer: "5",
      difficulty: "Medium",
      explanation: "In C++, x++ returns 5 before incrementing x to 6, so cout prints 5."
    },
    {
      question: "Which keyword allocates dynamic memory?",
      options: [
        { text: "new", image: null },
        { text: "malloc", image: null },
        { text: "alloc", image: null },
        { text: "create", image: null }
      ],
      answer: "new",
      difficulty: "Medium",
      explanation: "In C++, 'new' allocates memory on the heap (e.g., int* p = new int;)."
    },
    {
      question: "What is the output of string s = 'hello'; cout << s[1]?",
      options: [
        { text: "e", image: null },
        { text: "h", image: null },
        { text: "Error", image: null },
        { text: "l", image: null }
      ],
      answer: "e",
      difficulty: "Medium",
      explanation: "In C++, s[1] accesses the second character of 'hello', which is 'e'."
    },
    {
      question: "What is the output of int arr[3] = {1, 2, 3}; cout << arr[2]?",
      options: [
        { text: "3", image: null },
        { text: "2", image: null },
        { text: "Error", image: null },
        { text: "Undefined", image: null }
      ],
      answer: "3",
      difficulty: "Medium",
      explanation: "In C++, arr[2] accesses the third element, 3."
    },
    {
      question: "Which library provides vector?",
      options: [
        { text: "vector", image: null },
        { text: "array", image: null },
        { text: "list", image: null },
        { text: "map", image: null }
      ],
      answer: "vector",
      difficulty: "Medium",
      explanation: "In C++, the vector library provides the std::vector container."
    },
    {
      question: "What is the output of int x = 5; cout << (x > 3 ? x : 3)?",
      options: [
        { text: "5", image: null },
        { text: "3", image: null },
        { text: "Error", image: null },
        { text: "Undefined", image: null }
      ],
      answer: "5",
      difficulty: "Medium",
      explanation: "In C++, the ternary operator (x > 3 ? x : 3) returns x (5) since x > 3 is true."
    },
    {
      question: "What is the output of class A {public: int x = 5;}; A a; cout << a.x?",
      options: [
        { text: "5", image: null },
        { text: "0", image: null },
        { text: "Error", image: null },
        { text: "Undefined", image: null }
      ],
      answer: "5",
      difficulty: "Medium",
      explanation: "In C++, a.x accesses the public member x, initialized to 5."
    },
    {
      question: "What is the output of int* p = new int(5); cout << *p; delete p?",
      options: [
        { text: "5", image: null },
        { text: "Error", image: null },
        { text: "0", image: null },
        { text: "Undefined", image: null }
      ],
      answer: "5",
      difficulty: "Hard",
      explanation: "In C++, *p accesses the value 5; delete p frees the memory."
    },
    {
      question: "What is the output of void f(int& x) {x = 10;} int x = 5; f(x); cout << x?",
      options: [
        { text: "10", image: null },
        { text: "5", image: null },
        { text: "Error", image: null },
        { text: "Undefined", image: null }
      ],
      answer: "10",
      difficulty: "Hard",
      explanation: "In C++, passing x by reference allows f to modify x to 10."
    },
    {
      question: "What does 'virtual' keyword enable?",
      options: [
        { text: "Polymorphism", image: null },
        { text: "Encapsulation", image: null },
        { text: "Inheritance", image: null },
        { text: "Abstraction", image: null }
      ],
      answer: "Polymorphism",
      difficulty: "Hard",
      explanation: "In C++, 'virtual' enables runtime polymorphism via method overriding."
    },
    {
      question: "What is the output of template<typename T> T add(T a, T b) {return a + b;} cout << add(2, 3)?",
      options: [
        { text: "5", image: null },
        { text: "Error", image: null },
        { text: "0", image: null },
        { text: "Undefined", image: null }
      ],
      answer: "5",
      difficulty: "Hard",
      explanation: "In C++, the template function add(2, 3) returns 2 + 3 = 5."
    },
    {
      question: "What is the output of int x = 5; cout << (x << 2)?",
      options: [
        { text: "20", image: null },
        { text: "5", image: null },
        { text: "10", image: null },
        { text: "Error", image: null }
      ],
      answer: "20",
      difficulty: "Hard",
      explanation: "In C++, x << 2 shifts x (5, binary 101) left by 2, yielding 20 (binary 10100)."
    },
    {
      question: "What is the output of auto x = 5; cout << x?",
      options: [
        { text: "5", image: null },
        { text: "Error", image: null },
        { text: "0", image: null },
        { text: "Undefined", image: null }
      ],
      answer: "5",
      difficulty: "Hard",
      explanation: "In C++, 'auto' deduces x as int with value 5, so cout prints 5."
    }
  ],
  
  "HTML": [
    {
      question: "Which tag creates a hyperlink?",
      options: [
        { text: "<a>", image: null },
        { text: "<link>", image: null },
        { text: "<href>", image: null },
        { text: "<url>", image: null }
      ],
      answer: "<a>",
      difficulty: "Easy",
      explanation: "In HTML, <a> creates a hyperlink with the href attribute (e.g., <a href='url'>Link</a>)."
    },
    {
      question: "What does <br> do?",
      options: [
        { text: "Inserts a line break", image: null },
        { text: "Creates a button", image: null },
        { text: "Defines a block", image: null },
        { text: "Adds a border", image: null }
      ],
      answer: "Inserts a line break",
      difficulty: "Easy",
      explanation: "In HTML, <br> inserts a single line break."
    },
    {
      question: "Which tag defines the document title?",
      options: [
        { text: "<title>", image: null },
        { text: "<head>", image: null },
        { text: "<meta>", image: null },
        { text: "<h1>", image: null }
      ],
      answer: "<title>",
      difficulty: "Easy",
      explanation: "In HTML, <title> sets the document's title, displayed in the browser's title bar."
    },
    {
      question: "What is the purpose of <img>?",
      options: [
        { text: "Display an image", image: null },
        { text: "Create a link", image: null },
        { text: "Define a form", image: null },
        { text: "Add a video", image: null }
      ],
      answer: "Display an image",
      difficulty: "Easy",
      explanation: "In HTML, <img> displays an image with src and alt attributes."
    },
    {
      question: "Which tag creates a paragraph?",
      options: [
        { text: "<p>", image: null },
        { text: "<div>", image: null },
        { text: "<span>", image: null },
        { text: "<text>", image: null }
      ],
      answer: "<p>",
      difficulty: "Easy",
      explanation: "In HTML, <p> defines a paragraph."
    },
    {
      question: "What does <ul> stand for?",
      options: [
        { text: "Unordered List", image: null },
        { text: "Upper List", image: null },
        { text: "Unique List", image: null },
        { text: "Underlined List", image: null }
      ],
      answer: "Unordered List",
      difficulty: "Easy",
      explanation: "In HTML, <ul> creates an unordered (bulleted) list."
    },
    {
      question: "Which attribute specifies an image source?",
      options: [
        { text: "src", image: null },
        { text: "alt", image: null },
        { text: "href", image: null },
        { text: "title", image: null }
      ],
      answer: "src",
      difficulty: "Easy",
      explanation: "In HTML, the src attribute in <img> specifies the image file path."
    },
    {
      question: "What is the purpose of <meta charset='UTF-8'>?",
      options: [
        { text: "Set character encoding", image: null },
        { text: "Define page title", image: null },
        { text: "Link stylesheet", image: null },
        { text: "Enable JavaScript", image: null }
      ],
      answer: "Set character encoding",
      difficulty: "Medium",
      explanation: "In HTML, <meta charset='UTF-8'> sets the document's character encoding to UTF-8."
    },
    {
      question: "Which tag creates a numbered list?",
      options: [
        { text: "<ol>", image: null },
        { text: "<ul>", image: null },
        { text: "<li>", image: null },
        { text: "<dl>", image: null }
      ],
      answer: "<ol>",
      difficulty: "Medium",
      explanation: "In HTML, <ol> creates an ordered (numbered) list."
    },
    {
      question: "What does the alt attribute do in <img>?",
      options: [
        { text: "Provides alternative text", image: null },
        { text: "Sets image size", image: null },
        { text: "Links to another page", image: null },
        { text: "Adds a border", image: null }
      ],
      answer: "Provides alternative text",
      difficulty: "Medium",
      explanation: "In HTML, the alt attribute in <img> provides text for accessibility or if the image fails to load."
    },
    {
      question: "Which tag defines a table row?",
      options: [
        { text: "<tr>", image: null },
        { text: "<td>", image: null },
        { text: "<th>", image: null },
        { text: "<table>", image: null }
      ],
      answer: "<tr>",
      difficulty: "Medium",
      explanation: "In HTML, <tr> defines a table row."
    },
    {
      question: "What is the purpose of <div>?",
      options: [
        { text: "Group content", image: null },
        { text: "Create a link", image: null },
        { text: "Insert an image", image: null },
        { text: "Define a form", image: null }
      ],
      answer: "Group content",
      difficulty: "Medium",
      explanation: "In HTML, <div> is a block-level container for grouping content."
    },
    {
      question: "Which attribute makes an input required?",
      options: [
        { text: "required", image: null },
        { text: "type", image: null },
        { text: "value", image: null },
        { text: "name", image: null }
      ],
      answer: "required",
      difficulty: "Medium",
      explanation: "In HTML, the required attribute in <input> makes the field mandatory."
    },
    {
      question: "What does <link> do?",
      options: [
        { text: "Links external resources", image: null },
        { text: "Creates a hyperlink", image: null },
        { text: "Inserts an image", image: null },
        { text: "Defines a form", image: null }
      ],
      answer: "Links external resources",
      difficulty: "Medium",
      explanation: "In HTML, <link> connects external resources like CSS (e.g., <link rel='stylesheet' href='style.css'>)."
    },
    {
      question: "What is the purpose of <meta name='viewport'>?",
      options: [
        { text: "Control responsive design", image: null },
        { text: "Set page title", image: null },
        { text: "Link stylesheet", image: null },
        { text: "Enable JavaScript", image: null }
      ],
      answer: "Control responsive design",
      difficulty: "Hard",
      explanation: "In HTML, <meta name='viewport'> sets the viewport for responsive design (e.g., width=device-width)."
    },
    {
      question: "Which tag defines a form submission button?",
      options: [
        { text: "<button type='submit'>", image: null },
        { text: "<input type='button'>", image: null },
        { text: "<form>", image: null },
        { text: "<submit>", image: null }
      ],
      answer: "<button type='submit'>",
      difficulty: "Hard",
      explanation: "In HTML, <button type='submit'> submits a form."
    },
    {
      question: "What does the <canvas> tag do?",
      options: [
        { text: "Draws graphics", image: null },
        { text: "Creates a form", image: null },
        { text: "Inserts video", image: null },
        { text: "Defines a table", image: null }
      ],
      answer: "Draws graphics",
      difficulty: "Hard",
      explanation: "In HTML, <canvas> provides a drawable surface for JavaScript graphics."
    },
    {
      question: "Which attribute specifies a unique identifier?",
      options: [
        { text: "id", image: null },
        { text: "class", image: null },
        { text: "name", image: null },
        { text: "type", image: null }
      ],
      answer: "id",
      difficulty: "Hard",
      explanation: "In HTML, the id attribute provides a unique identifier for an element."
    },
    {
      question: "What is the purpose of <article>?",
      options: [
        { text: "Defines independent content", image: null },
        { text: "Creates a link", image: null },
        { text: "Inserts an image", image: null },
        { text: "Groups navigation", image: null }
      ],
      answer: "Defines independent content",
      difficulty: "Hard",
      explanation: "In HTML, <article> defines self-contained content, like a blog post."
    },
    {
      question: "What does <details> tag do?",
      options: [
        { text: "Creates collapsible content", image: null },
        { text: "Defines a table", image: null },
        { text: "Inserts video", image: null },
        { text: "Links CSS", image: null }
      ],
      answer: "Creates collapsible content",
      difficulty: "Hard",
      explanation: "In HTML, <details> creates a collapsible section, often with <summary>."
    }
  ],
  
  "CSS": [
    {
      question: "What does display: none; do?",
      options: [
        { text: "Hides an element", image: null },
        { text: "Makes inline", image: null },
        { text: "Centers element", image: null },
        { text: "Increases font", image: null }
      ],
      answer: "Hides an element",
      difficulty: "Easy",
      explanation: "In CSS, display: none; removes an element from the document flow, hiding it."
    },
    {
      question: "Which property sets text color?",
      options: [
        { text: "color", image: null },
        { text: "background-color", image: null },
        { text: "font-color", image: null },
        { text: "text-color", image: null }
      ],
      answer: "color",
      difficulty: "Easy",
      explanation: "In CSS, the color property sets the text color."
    },
    {
      question: "What does margin: 10px; do?",
      options: [
        { text: "Adds 10px space outside", image: null },
        { text: "Adds 10px space inside", image: null },
        { text: "Sets width to 10px", image: null },
        { text: "Centers element", image: null }
      ],
      answer: "Adds 10px space outside",
      difficulty: "Easy",
      explanation: "In CSS, margin: 10px; adds 10px of space outside an element."
    },
    {
      question: "Which property sets font size?",
      options: [
        { text: "font-size", image: null },
        { text: "text-size", image: null },
        { text: "size", image: null },
        { text: "font", image: null }
      ],
      answer: "font-size",
      difficulty: "Easy",
      explanation: "In CSS, font-size sets the size of text (e.g., font-size: 16px;)."
    },
    {
      question: "What does text-align: center; do?",
      options: [
        { text: "Centers text", image: null },
        { text: "Bolds text", image: null },
        { text: "Underlines text", image: null },
        { text: "Increases spacing", image: null }
      ],
      answer: "Centers text",
      difficulty: "Easy",
      explanation: "In CSS, text-align: center; horizontally centers inline or inline-block content."
    },
    {
      question: "Which property sets background color?",
      options: [
        { text: "background-color", image: null },
        { text: "color", image: null },
        { text: "bg-color", image: null },
        { text: "background", image: null }
      ],
      answer: "background-color",
      difficulty: "Easy",
      explanation: "In CSS, background-color sets the element's background color."
    },
    {
      question: "What does border: 1px solid black; do?",
      options: [
        { text: "Adds a 1px black border", image: null },
        { text: "Sets width to 1px", image: null },
        { text: "Hides border", image: null },
        { text: "Centers element", image: null }
      ],
      answer: "Adds a 1px black border",
      difficulty: "Easy",
      explanation: "In CSS, border: 1px solid black; adds a 1px solid black border around an element."
    },
    {
      question: "How do you center a block element horizontally?",
      options: [
        { text: "margin: auto;", image: null },
        { text: "text-align: center;", image: null },
        { text: "float: center;", image: null },
        { text: "position: center;", image: null }
      ],
      answer: "margin: auto;",
      difficulty: "Medium",
      explanation: "In CSS, margin: auto; centers a block element with a defined width."
    },
    {
      question: "What does position: absolute; do?",
      options: [
        { text: "Positions relative to nearest positioned ancestor", image: null },
        { text: "Keeps in document flow", image: null },
        { text: "Centers element", image: null },
        { text: "Hides element", image: null }
      ],
      answer: "Positions relative to nearest positioned ancestor",
      difficulty: "Medium",
      explanation: "In CSS, position: absolute; positions an element relative to its nearest positioned ancestor."
    },
    {
      question: "What is the output of width: 100px; padding: 10px; box-sizing: border-box;?",
      options: [
        { text: "100px total width", image: null },
        { text: "120px total width", image: null },
        { text: "80px total width", image: null },
        { text: "Error", image: null }
      ],
      answer: "100px total width",
      difficulty: "Medium",
      explanation: "With box-sizing: border-box;, the total width (100px) includes padding."
    },
    {
      question: "Which property sets space between elements?",
      options: [
        { text: "margin", image: null },
        { text: "padding", image: null },
        { text: "border", image: null },
        { text: "spacing", image: null }
      ],
      answer: "margin",
      difficulty: "Medium",
      explanation: "In CSS, margin sets space outside an element, between elements."
    },
    {
      question: "What does float: left; do?",
      options: [
        { text: "Aligns element to the left", image: null },
        { text: "Centers element", image: null },
        { text: "Hides element", image: null },
        { text: "Increases size", image: null }
      ],
      answer: "Aligns element to the left",
      difficulty: "Medium",
      explanation: "In CSS, float: left; aligns an element to the left, with content wrapping around it."
    },
    {
      question: "What does z-index: 10; do?",
      options: [
        { text: "Sets stacking order", image: null },
        { text: "Sets width", image: null },
        { text: "Centers element", image: null },
        { text: "Hides element", image: null }
      ],
      answer: "Sets stacking order",
      difficulty: "Medium",
      explanation: "In CSS, z-index controls the stacking order of positioned elements."
    },
    {
      question: "What does display: flex; do?",
      options: [
        { text: "Enables flexible box layout", image: null },
        { text: "Hides element", image: null },
        { text: "Centers text", image: null },
        { text: "Sets width", image: null }
      ],
      answer: "Enables flexible box layout",
      difficulty: "Medium",
      explanation: "In CSS, display: flex; enables a flexible box layout for child elements."
    },
    {
      question: "What does @media screen and (max-width: 600px) do?",
      options: [
        { text: "Applies styles for screens <= 600px", image: null },
        { text: "Sets font size", image: null },
        { text: "Hides elements", image: null },
        { text: "Centers content", image: null }
      ],
      answer: "Applies styles for screens <= 600px",
      difficulty: "Hard",
      explanation: "In CSS, @media applies styles based on conditions like screen width."
    },
    {
      question: "What is the output of .box {transition: all 0.3s;}?",
      options: [
        { text: "Animates all properties over 0.3s", image: null },
        { text: "Sets width to 0.3s", image: null },
        { text: "Hides box", image: null },
        { text: "Error", image: null }
      ],
      answer: "Animates all properties over 0.3s",
      difficulty: "Hard",
      explanation: "In CSS, transition: all 0.3s; animates all property changes over 0.3 seconds."
    },
    {
      question: "What does :hover do?",
      options: [
        { text: "Applies styles on mouse hover", image: null },
        { text: "Centers element", image: null },
        { text: "Hides element", image: null },
        { text: "Sets font", image: null }
      ],
      answer: "Applies styles on mouse hover",
      difficulty: "Hard",
      explanation: "In CSS, :hover applies styles when the mouse hovers over an element."
    },
    {
      question: "What does grid-template-columns: 1fr 1fr; do?",
      options: [
        { text: "Creates two equal-width columns", image: null },
        { text: "Sets row height", image: null },
        { text: "Hides grid", image: null },
        { text: "Centers grid", image: null }
      ],
      answer: "Creates two equal-width columns",
      difficulty: "Hard",
      explanation: "In CSS, grid-template-columns: 1fr 1fr; creates two equal-width grid columns."
    },
    {
      question: "What does transform: rotate(45deg); do?",
      options: [
        { text: "Rotates element 45 degrees", image: null },
        { text: "Scales element", image: null },
        { text: "Hides element", image: null },
        { text: "Centers element", image: null }
      ],
      answer: "Rotates element 45 degrees",
      difficulty: "Hard",
      explanation: "In CSS, transform: rotate(45deg); rotates an element 45 degrees clockwise."
    },
    {
      question: "What does clip-path: circle(50%); do?",
      options: [
        { text: "Clips element to a circle", image: null },
        { text: "Sets border radius", image: null },
        { text: "Hides element", image: null },
        { text: "Centers element", image: null }
      ],
      answer: "Clips element to a circle",
      difficulty: "Hard",
      explanation: "In CSS, clip-path: circle(50%); clips an element to a circular shape."
    }
  ],
  
  "JavaScript": [
      {
        question: "What is the output of console.log(2 + 2)?",
        options: [
          { text: "4", image: null },
          { text: "22", image: null },
          { text: "Error", image: null },
          { text: "None", image: null }
        ],
        answer: "4",
        difficulty: "Easy",
        explanation: "In JavaScript, console.log(2 + 2) evaluates 2 + 2 and logs 4."
      },
      {
        question: "What is the type of 'hello' in JavaScript?",
        options: [
          { text: "string", image: null },
          { text: "text", image: null },
          { text: "object", image: null },
          { text: "undefined", image: null }
        ],
        answer: "string",
        difficulty: "Easy",
        explanation: "In JavaScript, 'hello' is a string literal."
      },
      {
        question: "What is the output of console.log([1, 2][0])?",
        options: [
          { text: "1", image: null },
          { text: "2", image: null },
          { text: "Error", image: null },
          { text: "undefined", image: null }
        ],
        answer: "1",
        difficulty: "Easy",
        explanation: "In JavaScript, [1, 2][0] accesses the first element, 1."
      },
      {
        question: "Which operator checks equality?",
        options: [
          { text: "==", image: null },
          { text: "=", image: null },
          { text: "===", image: null },
          { text: "!=", image: null }
        ],
        answer: "===",
        difficulty: "Easy",
        explanation: "In JavaScript, '===' checks strict equality (value and type)."
      },
      {
        question: "What is the output of console.log(true && false)?",
        options: [
          { text: "false", image: null },
          { text: "true", image: null },
          { text: "Error", image: null },
          { text: "undefined", image: null }
        ],
        answer: "false",
        difficulty: "Easy",
        explanation: "In JavaScript, '&&' returns false if any operand is false."
      },
      {
        question: "What does let do?",
        options: [
          { text: "Declares block-scoped variable", image: null },
          { text: "Declares function", image: null },
          { text: "Defines constant", image: null },
          { text: "Imports module", image: null }
        ],
        answer: "Declares block-scoped variable",
        difficulty: "Easy",
        explanation: "In JavaScript, 'let' declares a block-scoped variable."
      },
      {
        question: "What is the output of console.log(typeof 42)?",
        options: [
          { text: "number", image: null },
          { text: "int", image: null },
          { text: "float", image: null },
          { text: "object", image: null }
        ],
        answer: "number",
        difficulty: "Easy",
        explanation: "In JavaScript, typeof 42 returns 'number'."
      },
      {
        question: "What is the output of console.log([1, 2, 3].length)?",
        options: [
          { text: "3", image: null },
          { text: "2", image: null },
          { text: "Error", image: null },
          { text: "undefined", image: null }
        ],
        answer: "3",
        difficulty: "Medium",
        explanation: "In JavaScript, [1, 2, 3].length returns the array's length, 3."
      },
      {
        question: "What is the output of console.log([1, 2, 3].pop())?",
        options: [
          { text: "3", image: null },
          { text: "[1, 2]", image: null },
          { text: "Error", image: null },
          { text: "undefined", image: null }
        ],
        answer: "3",
        difficulty: "Medium",
        explanation: "In JavaScript, pop() removes and returns the last element, 3."
      },
      {
        question: "What is the output of console.log({a: 1}.a)?",
        options: [
          { text: "1", image: null },
          { text: "a", image: null },
          { text: "Error", image: null },
          { text: "undefined", image: null }
        ],
        answer: "1",
        difficulty: "Medium",
        explanation: "In JavaScript, {a: 1}.a accesses the property a, which is 1."
      },
      {
        question: "What is the output of console.log(2 ** 3)?",
        options: [
          { text: "8", image: null },
          { text: "6", image: null },
          { text: "Error", image: null },
          { text: "9", image: null }
        ],
        answer: "8",
        difficulty: "Medium",
        explanation: "In JavaScript, '**' is exponentiation, so 2 ** 3 = 8."
      },
      {
        question: "What is the output of console.log([1, 2, 3].slice(1, 2))?",
        options: [
          { text: "[2]", image: null },
          { text: "[1, 2]", image: null },
          { text: "Error", image: null },
          { text: "2", image: null }
        ],
        answer: "[2]",
        difficulty: "Medium",
        explanation: "In JavaScript, slice(1, 2) returns [2] from index 1 to 2."
      },
      {
        question: "What does addEventListener do?",
        options: [
          { text: "Handles events", image: null },
          { text: "Defines variables", image: null },
          { text: "Imports modules", image: null },
          { text: "Creates loops", image: null }
        ],
        answer: "Handles events",
        difficulty: "Medium",
        explanation: "In JavaScript, addEventListener attaches an event handler (e.g., click) to an element."
      },
      {
        question: "What is the output of let x = 5; console.log(x > 3 ? x : 3)?",
        options: [
          { text: "5", image: null },
          { text: "3", image: null },
          { text: "Error", image: null },
          { text: "undefined", image: null }
        ],
        answer: "5",
        difficulty: "Medium",
        explanation: "In JavaScript, the ternary operator returns x (5) since x > 3 is true."
      },
      {
        question: "What is the output of console.log([1, 2, 3].map(x => x * 2))?",
        options: [
          { text: "[2, 4, 6]", image: null },
          { text: "[1, 2, 3]", image: null },
          { text: "Error", image: null },
          { text: "undefined", image: null }
        ],
        answer: "[2, 4, 6]",
        difficulty: "Hard",
        explanation: "In JavaScript, map(x => x * 2) doubles each element, returning [2, 4, 6]."
      },
      {
        question: "What is the output of async function f() {return 42;} console.log(f())?",
        options: [
          { text: "Promise", image: null },
          { text: "42", image: null },
          { text: "Error", image: null },
          { text: "undefined", image: null }
        ],
        answer: "Promise",
        difficulty: "Hard",
        explanation: "In JavaScript, async functions return a Promise; console.log(f()) logs the Promise object."
      },
      {
        question: "What is the output of console.log((() => 5)())?",
        options: [
          { text: "5", image: null },
          { text: "Error", image: null },
          { text: "undefined", image: null },
          { text: "Function", image: null }
        ],
        answer: "5",
        difficulty: "Hard",
        explanation: "In JavaScript, (() => 5)() is an IIFE (Immediately Invoked Function Expression) returning 5."
      },
      {
        question: "What is the output of let x = 5; {let x = 10;} console.log(x)?",
        options: [
          { text: "5", image: null },
          { text: "10", image: null },
          { text: "Error", image: null },
          { text: "undefined", image: null }
        ],
        answer: "5",
        difficulty: "Hard",
        explanation: "In JavaScript, let is block-scoped; the inner x (10) doesn't affect the outer x (5)."
      },
      {
        question: "What is the output of console.log(new Set([1, 1, 2]).size)?",
        options: [
          { text: "2", image: null },
          { text: "3", image: null },
          { text: "Error", image: null },
          { text: "1", image: null }
        ],
        answer: "2",
        difficulty: "Hard",
        explanation: "In JavaScript, new Set([1, 1, 2]) creates a set with unique values {1, 2}, so size is 2."
      },
      {
        question: "What is the output of console.log(0.1 + 0.2 === 0.3)?",
        options: [
          { text: "false", image: null },
          { text: "true", image: null },
          { text: "Error", image: null },
          { text: "undefined", image: null }
        ],
        answer: "false",
        difficulty: "Hard",
        explanation: "In JavaScript, 0.1 + 0.2 yields 0.30000000000000004 due to floating-point precision, so === 0.3 is false."
      }
    ],    
}

const learningContent = {
  C: [
    { topic: "Basics", article: "Learn about variables, data types, and control structures in C..." },
    { topic: "Pointers", article: "Understand pointers, memory management, and their applications..." }
  ],
  Python: [
    { topic: "Introduction", article: "Explore Python syntax, variables, and basic operations..." },
    { topic: "List Comprehensions", article: "Master concise list creation with Python's list comprehensions..." }
  ],
};

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let timerInterval;
let timeLeft;

function selectLanguage(language) {
  console.log('selectLanguage called:', language);
  try {
    const input = document.getElementById('language');
    input.value = language;
    document.querySelectorAll('.btn-option[data-language]').forEach(btn => {
      btn.classList.remove('selected');
      if (btn.dataset.language === language) btn.classList.add('selected');
    });
  } catch (error) {
    console.error('Error in selectLanguage:', error);
  }
}

function selectDifficulty(difficulty) {
  console.log('selectDifficulty called:', difficulty);
  try {
    const input = document.getElementById('difficulty');
    input.value = difficulty;
    document.querySelectorAll('.btn-option[data-difficulty]').forEach(btn => {
      btn.classList.remove('selected');
      if (btn.dataset.difficulty === difficulty) btn.classList.add('selected');
    });
  } catch (error) {
    console.error('Error in selectDifficulty:', error);
  }
}

function shuffleArray(array) {
  try {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  } catch (error) {
    console.error('Error in shuffleArray:', error);
    return array;
  }
}

function startQuiz() {
  console.log('startQuiz called');
  try {
    const language = document.getElementById('language').value;
    const difficulty = document.getElementById('difficulty').value;
    const numQuestions = parseInt(document.getElementById('num-questions').value);

    if (!language || !difficulty) {
      alert('Please select a language and difficulty.');
      return;
    }

    localStorage.setItem('quizSettings', JSON.stringify({ language, difficulty, numQuestions }));

    let availableQuestions = questions[language]?.filter(q => q.difficulty === difficulty) || [];
    let userQuestions = {};
    try {
      userQuestions = JSON.parse(localStorage.getItem('userQuestions') || '{}');
    } catch (e) {
      console.warn('Invalid userQuestions data');
    }
    if (userQuestions[language] && userQuestions[language][difficulty]) {
      availableQuestions = availableQuestions.concat(userQuestions[language][difficulty]);
    }

    if (availableQuestions.length === 0) {
      alert('No questions available for the selected language and difficulty.');
      return;
    }

    if (availableQuestions.length < numQuestions) {
      alert('Not enough questions. Using available questions.');
    }

    currentQuiz = shuffleArray(availableQuestions).slice(0, numQuestions);
    currentQuiz = currentQuiz.map(q => ({
      ...q,
      options: shuffleArray([...q.options])
    }));

    console.log('Randomized quiz:', currentQuiz);

    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    timeLeft = 30;

    localStorage.setItem('currentQuiz', JSON.stringify(currentQuiz));
    localStorage.setItem('quizState', JSON.stringify({ currentQuestionIndex: 0, score: 0, correctAnswers: 0, timeLeft }));
    console.log('Quiz started, redirecting to quiz.html');
    window.location.href = 'quiz.html';
  } catch (error) {
    console.error('Error in startQuiz:', error);
    alert('An error occurred while starting the quiz. Please try again.');
  }
}

function loadQuiz() {
  console.log('loadQuiz called');
  try {
    const quizData = localStorage.getItem('currentQuiz');
    const quizState = localStorage.getItem('quizState');
    if (quizData && quizState) {
      currentQuiz = JSON.parse(quizData);
      const state = JSON.parse(quizState);
      currentQuestionIndex = state.currentQuestionIndex;
      score = state.score;
      correctAnswers = state.correctAnswers;
      timeLeft = state.timeLeft;
      console.log('Quiz loaded:', { currentQuestionIndex, quizLength: currentQuiz.length, score, correctAnswers });
      loadQuestion();
    } else {
      console.warn('No quiz data found');
      window.location.href = 'home.html';
    }
  } catch (error) {
    console.error('Error in loadQuiz:', error);
    window.location.href = 'home.html';
  }
}

function startTimer() {
  console.log('startTimer called, timeLeft:', timeLeft);
  try {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      if (timeLeft <= 0) {
        console.log('Time up for question', currentQuestionIndex);
        clearInterval(timerInterval);
        if (currentQuestionIndex + 1 < currentQuiz.length) {
          nextQuestion();
        } else {
          endQuiz();
        }
      }
    }, 1000);
  } catch (error) {
    console.error('Error in startTimer:', error);
  }
}

function loadQuestion() {
  console.log('loadQuestion called, index:', currentQuestionIndex, 'quiz length:', currentQuiz.length);
  try {
    if (currentQuestionIndex >= currentQuiz.length) {
      console.log('No more questions, ending quiz');
      endQuiz();
      return;
    }
    timeLeft = 30;
    startTimer();
    const q = currentQuiz[currentQuestionIndex];
    document.getElementById('question-text').textContent = q.question;
    document.getElementById('score').textContent = score;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    q.options.forEach(option => {
      const button = document.createElement('button');
      if (option.image) {
        const img = document.createElement('img');
        img.src = option.image;
        img.alt = option.text;
        img.style.maxWidth = '100px';
        button.appendChild(img);
        button.appendChild(document.createTextNode(option.text));
      } else {
        button.textContent = option.text;
      }
      button.onclick = () => checkAnswer(option.text);
      optionsDiv.appendChild(button);
    });
    document.getElementById('feedback').textContent = '';
  } catch (error) {
    console.error('Error in loadQuestion:', error);
    endQuiz();
  }
}

function checkAnswer(selected) {
  console.log('checkAnswer called:', selected, 'question index:', currentQuestionIndex, 'quiz length:', currentQuiz.length);
  try {
    const q = currentQuiz[currentQuestionIndex];
    const feedbackDiv = document.getElementById('feedback');
    const optionsButtons = document.querySelectorAll('#options button');
    
    clearInterval(timerInterval);
    
    optionsButtons.forEach(btn => btn.disabled = true);

    optionsButtons.forEach(btn => {
      const btnText = btn.textContent || btn.querySelector('img').alt;
      if (btnText === q.answer) {
        btn.classList.add('option-correct');
      } else if (btnText === selected && selected !== q.answer) {
        btn.classList.add('option-incorrect');
      }
    });

    if (selected === q.answer) {
      score += 10;
      correctAnswers++;
      feedbackDiv.textContent = 'Correct!';
      feedbackDiv.className = 'feedback-correct';
    } else {
      feedbackDiv.textContent = `Incorrect! The correct answer is: ${q.answer}`;
      feedbackDiv.className = 'feedback-incorrect';
    }
    document.getElementById('score').textContent = score;
    localStorage.setItem('quizState', JSON.stringify({ currentQuestionIndex, score, correctAnswers, timeLeft }));

    setTimeout(() => {
      if (currentQuestionIndex + 1 >= currentQuiz.length) {
        console.log('Last question answered, ending quiz');
        endQuiz();
      } else {
        console.log('Moving to next question');
        nextQuestion();
      }
    }, 1000);
  } catch (error) {
    console.error('Error in checkAnswer:', error);
    endQuiz();
  }
}

function nextQuestion() {
  console.log('nextQuestion called, current index:', currentQuestionIndex, 'quiz length:', currentQuiz.length);
  try {
    currentQuestionIndex++;
    localStorage.setItem('quizState', JSON.stringify({ currentQuestionIndex, score, correctAnswers, timeLeft }));
    loadQuestion();
  } catch (error) {
    console.error('Error in nextQuestion:', error);
    endQuiz();
  }
}

function endQuiz() {
  console.log('endQuiz called');
  try {
    clearInterval(timerInterval);
    const result = { score, correctAnswers, totalQuestions: currentQuiz.length };
    localStorage.setItem('quizResult', JSON.stringify(result));
    const user = localStorage.getItem('currentUser');
    let users = {};
    try {
      users = JSON.parse(localStorage.getItem('users') || '{}');
    } catch (e) {
      console.warn('Invalid users data, initializing empty object');
    }
    if (user && users[user]) {
      let settings = {};
      try {
        settings = JSON.parse(localStorage.getItem('quizSettings') || '{}');
      } catch (e) {
        console.warn('Invalid quizSettings, using default values');
      }
      const language = settings.language || 'Unknown';
      const dateTime = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      users[user].scores = users[user].scores || [];
      users[user].scores.push({ score, language, dateTime });
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Score saved for user:', user, 'Score:', score, 'Language:', language, 'DateTime:', dateTime);
    } else {
      console.warn('User not found or invalid:', user);
    }
    localStorage.removeItem('currentQuiz');
    localStorage.removeItem('quizState');
    console.log('Before redirect to result.html');
    window.location.href = 'result.html';
  } catch (error) {
    console.error('Error in endQuiz:', error);
    localStorage.removeItem('currentQuiz');
    localStorage.removeItem('quizState');
    console.log('Redirecting to result.html after error');
    window.location.href = 'result.html';
  }
}

function displayResult() {
  console.log('displayResult called');
  try {
    const result = localStorage.getItem('quizResult');
    if (result) {
      const { score, correctAnswers, totalQuestions } = JSON.parse(result);
      console.log('Result page loaded, quizResult:', { score, correctAnswers, totalQuestions });
      document.getElementById('final-score').textContent = score;
      document.getElementById('correct-answers').textContent = correctAnswers;
      document.getElementById('total-questions').textContent = totalQuestions;
      updateLeaderboard();
    } else {
      console.warn('No quiz result found');
      window.location.href = 'home.html';
    }
  } catch (error) {
    console.error('Error in displayResult:', error);
    window.location.href = 'home.html';
  }
}

function backToHome() {
  console.log('backToHome called');
  try {
    localStorage.removeItem('quizResult');
    window.location.href = 'home.html';
  } catch (error) {
    console.error('Error in backToHome:', error);
    window.location.href = 'home.html';
  }
}

function reQuiz() {
  console.log('reQuiz called');
  try {
    let settings = {};
    try {
      settings = JSON.parse(localStorage.getItem('quizSettings') || '{}');
    } catch (e) {
      console.warn('Invalid quizSettings data');
    }
    if (settings.language && settings.difficulty && settings.numQuestions) {
      const { language, difficulty, numQuestions } = settings;
      let availableQuestions = questions[language]?.filter(q => q.difficulty === difficulty) || [];
      let userQuestions = {};
      try {
        userQuestions = JSON.parse(localStorage.getItem('userQuestions') || '{}');
      } catch (e) {
        console.warn('Invalid userQuestions data');
      }
      if (userQuestions[language] && userQuestions[language][difficulty]) {
        availableQuestions = availableQuestions.concat(userQuestions[language][difficulty]);
      }

      if (availableQuestions.length === 0) {
        alert('No questions available for the selected language and difficulty.');
        window.location.href = 'quiz-setup.html';
        return;
      }

      if (availableQuestions.length < numQuestions) {
        currentQuiz = shuffleArray(availableQuestions).slice(0, numQuestions);
      } else {
        currentQuiz = shuffleArray(availableQuestions).slice(0, numQuestions);
      }

      currentQuiz = currentQuiz.map(q => ({
        ...q,
        options: shuffleArray([...q.options])
      }));

      console.log('Randomized re-quiz:', currentQuiz);

      currentQuestionIndex = 0;
      score = 0;
      correctAnswers = 0;
      timeLeft = 30;

      localStorage.setItem('currentQuiz', JSON.stringify(currentQuiz));
      localStorage.setItem('quizState', JSON.stringify({ currentQuestionIndex: 0, score: 0, correctAnswers: 0, timeLeft }));
      console.log('Re-quiz started, redirecting to quiz.html');
      window.location.href = 'quiz.html';
    } else {
      console.warn('No quiz settings found');
      window.location.href = 'quiz-setup.html';
    }
  } catch (error) {
    console.error('Error in reQuiz:', error);
    window.location.href = 'quiz-setup.html';
  }
}

function updateLeaderboard() {
  console.log('updateLeaderboard called');
  try {
    let users = {};
    try {
      users = JSON.parse(localStorage.getItem('users') || '{}');
    } catch (e) {
      console.warn('Invalid users data');
    }
    const scores = [];
    for (const username in users) {
      const userScores = users[username].scores || [];
      userScores.forEach(scoreEntry => {
        scores.push({
          username,
          score: scoreEntry.score || 0,
          language: scoreEntry.language || 'Unknown',
          dateTime: scoreEntry.dateTime || 'N/A'
        });
      });
    }
    scores.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      const dateA = a.dateTime === 'N/A' ? 0 : new Date(a.dateTime).getTime();
      const dateB = b.dateTime === 'N/A' ? 0 : new Date(b.dateTime).getTime();
      return dateB - dateA;
    });
    console.log('Leaderboard scores:', scores);

    const homeTbody = document.getElementById('leaderboard-body');
    const resultTbody = document.getElementById('result-leaderboard');
    const tbody = homeTbody || resultTbody;
    if (tbody) {
      tbody.innerHTML = '';
      scores.slice(0, 5).forEach((entry, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${index + 1}</td><td>${entry.username}</td><td>${entry.score}</td><td>${entry.language}</td><td>${entry.dateTime}</td>`;
        tbody.appendChild(tr);
      });
    }
  } catch (error) {
    console.error('Error in updateLeaderboard:', error);
  }
}

function showLeaderboard() {
  console.log('showLeaderboard called');
  try {
    document.querySelector('.articles').classList.add('hidden');
    document.querySelector('.nav-buttons').classList.add('hidden');
    document.getElementById('leaderboard').classList.remove('hidden');
    updateLeaderboard();
  } catch (error) {
    console.error('Error in showLeaderboard:', error);
  }
}

function hideLeaderboard() {
  console.log('hideLeaderboard called');
  try {
    document.querySelector('.articles').classList.remove('hidden');
    document.querySelector('.nav-buttons').classList.remove('hidden');
    document.getElementById('leaderboard').classList.add('hidden');
  } catch (error) {
    console.error('Error in hideLeaderboard:', error);
  }
}

function showQuestionForm() {
  console.log('showQuestionForm called');
  try {
    document.querySelector('.articles').classList.add('hidden');
    document.querySelector('.nav-buttons').classList.add('hidden');
    document.getElementById('question-form').classList.remove('hidden');
    loadUserQuestions();
  } catch (error) {
    console.error('Error in showQuestionForm:', error);
  }
}

function hideQuestionForm() {
  console.log('hideQuestionForm called');
  try {
    document.querySelector('.articles').classList.remove('hidden');
    document.querySelector('.nav-buttons').classList.remove('hidden');
    document.getElementById('question-form').classList.add('hidden');
  } catch (error) {
    console.error('Error in hideQuestionForm:', error);
  }
}

function submitQuestion() {
  console.log('submitQuestion called');
  try {
    const language = document.getElementById('submit-language').value;
    const difficulty = document.getElementById('submit-difficulty').value;
    const question = document.getElementById('submit-question').value;
    const option1 = document.getElementById('submit-option1').value;
    const option2 = document.getElementById('submit-option2').value;
    const option3 = document.getElementById('submit-option3').value;
    const option4 = document.getElementById('submit-option4').value;
    const answer = document.getElementById('submit-answer').value;

    if (question && option1 && option2 && option3 && option4 && answer) {
      let userQuestions = {};
      try {
        userQuestions = JSON.parse(localStorage.getItem('userQuestions') || '{}');
      } catch (e) {
        console.warn('Invalid userQuestions data');
      }
      if (!userQuestions[language]) userQuestions[language] = {};
      if (!userQuestions[language][difficulty]) userQuestions[language][difficulty] = [];
      userQuestions[language][difficulty].push({
        question,
        options: [
          { text: option1, image: null },
          { text: option2, image: null },
          { text: option3, image: null },
          { text: option4, image: null }
        ],
        answer,
        difficulty
      });
      localStorage.setItem('userQuestions', JSON.stringify(userQuestions));
      alert('Question submitted successfully!');
      document.getElementById('submit-question').value = '';
      document.getElementById('submit-option1').value = '';
      document.getElementById('submit-option2').value = '';
      document.getElementById('submit-option3').value = '';
      document.getElementById('submit-option4').value = '';
      document.getElementById('submit-answer').value = '';
      loadUserQuestions();
    } else {
      alert('Please fill all fields.');
    }
  } catch (error) {
    console.error('Error in submitQuestion:', error);
  }
}

function loadUserQuestions() {
  console.log('loadUserQuestions called');
  try {
    const userQuestionsDiv = document.getElementById('user-questions');
    userQuestionsDiv.innerHTML = '';
    let userQuestions = {};
    try {
      userQuestions = JSON.parse(localStorage.getItem('userQuestions') || '{}');
    } catch (e) {
      console.warn('Invalid userQuestions data');
    }
    let hasQuestions = false;
    for (const language in userQuestions) {
      for (const difficulty in userQuestions[language]) {
        userQuestions[language][difficulty].forEach((q, index) => {
          hasQuestions = true;
          const article = document.createElement('article');
          article.innerHTML = `
            <h4>${q.question}</h4>
            <p>Language: ${language}, Difficulty: ${difficulty}</p>
            <p>Options: ${q.options.map(opt => opt.text).join(', ')}</p>
            <p>Answer: ${q.answer}</p>
            <button onclick="removeQuestion('${language}', '${difficulty}', ${index})" class="btn btn-red">Remove</button>
          `;
          userQuestionsDiv.appendChild(article);
        });
      }
    }
    if (!hasQuestions) {
      userQuestionsDiv.innerHTML = '<p>No questions submitted yet.</p>';
    }
  } catch (error) {
    console.error('Error in loadUserQuestions:', error);
  }
}

function removeQuestion(language, difficulty, index) {
  console.log('removeQuestion called', { language, difficulty, index });
  try {
    let userQuestions = {};
    try {
      userQuestions = JSON.parse(localStorage.getItem('userQuestions') || '{}');
    } catch (e) {
      console.warn('Invalid userQuestions data');
    }
    if (userQuestions[language] && userQuestions[language][difficulty]) {
      userQuestions[language][difficulty].splice(index, 1);
      if (userQuestions[language][difficulty].length === 0) {
        delete userQuestions[language][difficulty];
      }
      if (Object.keys(userQuestions[language]).length === 0) {
        delete userQuestions[language];
      }
      localStorage.setItem('userQuestions', JSON.stringify(userQuestions));
      alert('Question removed successfully!');
      loadUserQuestions();
    } else {
      alert('Question not found.');
    }
  } catch (error) {
    console.error('Error in removeQuestion:', error);
  }
}

function loadTopics() {
  console.log('loadTopics called');
  try {
    const language = document.getElementById('learn-language').value;
    const topicsDiv = document.getElementById('topics');
    topicsDiv.innerHTML = '';
    if (language && learningContent[language]) {
      learningContent[language].forEach(content => {
        const article = document.createElement('article');
        article.innerHTML = `<h4>${content.topic}</h4><p>${content.article}</p>`;
        topicsDiv.appendChild(article);
      });
    }
  } catch (error) {
    console.error('Error in loadTopics:', error);
  }
}
