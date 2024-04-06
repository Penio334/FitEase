document.addEventListener('DOMContentLoaded', function() {
    const textElements = document.querySelectorAll('.slide-from-left');

    // Delay each text animation
    textElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
});

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

            if (calorieDifference > 0) {
                message = `You are ${calorieDifference} calories under your goal.`;
            } else if (calorieDifference < 0) {
                message = `You have exceeded your goal by ${Math.abs(calorieDifference)} calories.`;
            } else {
                message = "You have reached your calorie goal!";
            }

            resultsContainer.innerHTML = `<p>${message}</p>`;
        } else {
            resultsContainer.innerHTML = `<p>Please enter valid numbers.</p>`;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const exerciseForm = document.getElementById('exercise-form');
    const exerciseLog = document.getElementById('exercise-log');

    exerciseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const exerciseName = document.getElementById('exercise-name').value;
        const exerciseDuration = parseInt(document.getElementById('exercise-duration').value);
        const exerciseIntensity = parseInt(document.getElementById('exercise-intensity').value);

        if (exerciseName.trim() === '' || isNaN(exerciseDuration) || isNaN(exerciseIntensity)) {
            alert('Please fill out all fields with valid values.');
            return;
        }

        const exerciseItem = document.createElement('div');
        exerciseItem.classList.add('exercise-item');
        exerciseItem.innerHTML = `
            <strong>${exerciseName}</strong> - Duration: ${exerciseDuration} minutes, Intensity: ${exerciseIntensity}/10
        `;
        exerciseLog.appendChild(exerciseItem);

        // Clear the form fields after logging exercise
        exerciseForm.reset();
    });
});

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

        // Store user's goal in localStorage
        localStorage.setItem('fitnessGoal', JSON.stringify({ type: goalType, target: goalTarget }));

        // Display goal progress
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

    // Display goal progress on page load
    displayGoalProgress();
});

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignupLink = document.getElementById('switch-to-signup');
    const switchToLoginLink = document.getElementById('switch-to-login');

    // Function to switch to signup form
    switchToSignupLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    // Function to switch to login form
    switchToLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Function to handle login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get input values
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Perform authentication (you can implement this using your backend or authentication service)
        // For demonstration, let's assume authentication is successful and redirect to dashboard
        alert(`Logged in with email: ${email}`);
        // Redirect to dashboard page
        window.location.href = '/dashboard.html';
    });

    // Function to handle signup form submission
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get input values
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Perform signup (you can implement this using your backend or authentication service)
        // For demonstration, let's assume signup is successful and redirect to dashboard
        alert(`Signed up with name: ${name}, email: ${email}`);
        // Redirect to dashboard page
        window.location.href = '/dashboard.html';
    });
});
