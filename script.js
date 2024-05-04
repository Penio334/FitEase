// Hero section Animation
document.addEventListener('DOMContentLoaded', function() {
    const textElements = document.querySelectorAll('.slide-from-left');

    // Text animation delay
    textElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
});

// Calorie Tracker Section
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calorie-form');
    const resultsContainer = document.getElementById('calorie-results');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const caloriesIntake = parseInt(document.getElementById('calories-intake').value);
        const caloriesGoal = parseInt(document.getElementById('calories-goal').value);

        if (!isNaN(caloriesIntake) && !isNaN(caloriesGoal)) {
            const calorieDifference = caloriesGoal - caloriesIntake;
            let message;
            let resultClass;

            // Results
            if (calorieDifference > 0) {
                message = `You are ${calorieDifference} calories under your goal.`;
                resultClass = 'under-goal';
            } else if (calorieDifference >= -100) {
                message = "You have reached your calorie goal!";
                resultClass = 'reached-goal';
            } else {
                message = `You have exceeded your goal by ${Math.abs(calorieDifference)} calories.`;
                  resultClass = 'exceeded-goal';
            }

            resultsContainer.innerHTML = `<p class="${resultClass}">${message}</p>`;
        } else {
            resultsContainer.innerHTML = `<p>Please enter valid numbers.</p>`;
        }
    });
});

// Exercise Logging Section
document.addEventListener("DOMContentLoaded", function() {
    // Submission event listener
    document.getElementById("exercise-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Input values
        var exerciseName = document.getElementById("exercise-name").value;
        var exerciseDuration = document.getElementById("exercise-duration").value;
        var exerciseIntensity = document.getElementById("exercise-intensity").value;

        // If input is empty
        if (!exerciseName || !exerciseDuration || !exerciseIntensity) {
            // Display error message
            document.getElementById("exercise-log").innerHTML = "<p>Please fill out all fields.</p>";
            return;
        }

        // Formating logged exercise data
        var exerciseLogEntry = "<p>Exercise: " + exerciseName + ", Duration: " + exerciseDuration + " minutes, Intensity: " + exerciseIntensity + "</p>";

        // Append the logged exercise data to the exercise log section
        document.getElementById("exercise-log").innerHTML += exerciseLogEntry;

        // Clearing the fields after submission
        document.getElementById("exercise-name").value = "";
        document.getElementById("exercise-duration").value = "";
        document.getElementById("exercise-intensity").value = "";
    });
});

// Goal Tracker Section
document.addEventListener('DOMContentLoaded', function() {
    const goalForm = document.getElementById('goal-form');
    const goalProgress = document.getElementById('goal-progress');

    goalForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const goalType = document.getElementById('goal-type').value;
        const goalTarget = parseInt(document.getElementById('goal-target').value);

        if (goalType.trim() === '' || isNaN(goalTarget)) {
            alert('Please fill out all fields with valid values.');
            return;
        }

        // Storing user goal in localstorage
        localStorage.setItem('fitnessGoal', JSON.stringify({ type: goalType, target: goalTarget }));

        // Displays goal progress
        displayGoalProgress();
    });

    function displayGoalProgress() {
        const storedGoal = localStorage.getItem('fitnessGoal');
        if (!storedGoal) {
            goalProgress.innerHTML = '<p>No goal set yet.</p>';
            return;
        }

        const goal = JSON.parse(storedGoal);
        goalProgress.innerHTML = `
            <p>Your current goal: ${goal.type}, Target: ${goal.target}</p>
            <!-- Add progress tracking here -->
        `;
    }
    
    displayGoalProgress();
});
