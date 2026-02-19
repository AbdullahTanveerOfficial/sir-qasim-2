document.addEventListener("DOMContentLoaded", function () {
    const formTitle = document.getElementById("form-title");
    const authForm = document.getElementById("authForm");
    const nameField = document.getElementById("nameField");
    const phoneField = document.getElementById("phone");
    const toggleText = document.getElementById("toggleText");
    const toggleBtn = document.getElementById("toggleBtn");
    const submitBtn = document.getElementById("submitBtn");
    const errorMessage = document.getElementById("error-message");

    let isSignup = false;

    toggleBtn.addEventListener("click", function (event) {
        event.preventDefault();
        isSignup = !isSignup;

        if (isSignup) {
            formTitle.textContent = "Sign Up";
            submitBtn.textContent = "Sign Up";
            toggleText.textContent = "Already have an account? ";
            toggleBtn.textContent = "Login";
            nameField.classList.remove("hidden");
            phoneField.classList.remove("hidden");
        } else {
            formTitle.textContent = "Login";
            submitBtn.textContent = "Login";
            toggleText.textContent = "New here? ";
            toggleBtn.textContent = "Sign Up";
            nameField.classList.add("hidden");
            phoneField.classList.add("hidden");
        }
    });

    authForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("password").value;

        const requestData = isSignup
            ? { name, email, phone, password }
            : { email, password };

        const endpoint = isSignup ? "http://localhost:5000/api/signup" : "http://localhost:5000/api/login";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token); // Save token
                window.location.href = "video-call.html"; // Redirect to video call page
            } else {
                errorMessage.textContent = data.message;
            }
        } catch (error) {
            errorMessage.textContent = "Server error. Please try again.";
        }
    });
});
