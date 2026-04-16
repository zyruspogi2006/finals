let rand2;
let input1;
let score = 0;
let streak = 0;
let gameActive = false;
let attemptCount = 0;

function startGame() {
    if (gameActive) {
        console.log( "Game already in progress! Click 'Restart' to play again.");
        return;
    }
    randomNum2();
    gameActive = true;
    attemptCount = 0;
    
    document.getElementById("inputNumber").style.display = "block";
    document.getElementById("buttonGroup").style.display = "block";
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("inputNumber").value = "";
    document.getElementById("inputNumber").focus();
    
    console.log(" GAME STARTED! Guess a number between 1 and 20");
    console.log(`Random number generated: ${rand2}`);
    updateMessage("Take your guess! Enter a number between 1 and 20");
}

function randomNum2() {
    rand2 = Math.round(Math.random() * (20 - 1) + 1);
    console.log(` Random number set: ${rand2}`);
}

function guess() {
    if (!gameActive) {
        console.log(" Game not active! Click 'Start Game' to begin.");
        return;
    }
    
    input1 = document.getElementById("inputNumber").value;
    
      if (input1 === "" || input1 < 1 || input1 > 20) {
        console.log(" Invalid input! Please enter a number between 1 and 20.");
        updateMessage("Invalid! Enter a number between 1 and 20");
        return;
    }
    
    attemptCount++;
    input1 = parseInt(input1);
    
    console.log(`Guess #${attemptCount}: ${input1}`);
    
    if (rand2 == input1) {
        score += 10; 
        streak++;
        console.log(` CORRECT! You won! Your guess was: ${input1}`);
        console.log(` Score: ${score} | Streak: ${streak}`);
        updateMessage(` You Won! The number was ${rand2}!`);
        endGame();
    } else if (rand2 > input1) {
        console.log(` Wrong! The number is HIGHER than ${input1}`);
        updateMessage(` Higher! Try again (Attempt #${attemptCount})`);
    } else if (rand2 < input1) {
        console.log(` Wrong! The number is LOWER than ${input1}`);
        updateMessage(` Lower! Try again (Attempt #${attemptCount})`);
    }
    
    document.getElementById("inputNumber").value = "";
    document.getElementById("inputNumber").focus();
}

function endGame() {
    gameActive = false;
    updateStats();
    
    document.getElementById("inputNumber").style.display = "none";
    document.getElementById("buttonGroup").style.display = "none";
    document.getElementById("startBtn").style.display = "block";
    
    console.log(`Round ended. Attempts: ${attemptCount}`);
}

function restartGame() {
    console.log(" Restarting game...");
    
    if (gameActive) {
        gameActive = false;
        console.log(` Game abandoned! The number was ${rand2}`);
    }
    
    document.getElementById("inputNumber").style.display = "none";
    document.getElementById("buttonGroup").style.display = "none";
    document.getElementById("startBtn").style.display = "block";
    document.getElementById("inputNumber").value = "";
    
    streak = 0;
    attemptCount = 0;
    
    updateStats();
    updateMessage("Game Restarted! Click Start to play again");
    console.log(`Streak reset to 0 | Total Score: ${score}`);
}

function updateStats() {
    document.getElementById("score").textContent = score;
    document.getElementById("streak").textContent = streak;
    console.log(`Stats Updated - Score: ${score}, Streak: ${streak}`);
}

function updateMessage(msg) {
    document.getElementById("message").textContent = msg;
}

console.log("=== GUESSING GAME LOADED ===");
console.log("  • Guess a number between 1-10");
console.log("  • Score: +10 points per correct guess");
console.log("============================");


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("inputNumber").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            guess();
        }
    });
});
