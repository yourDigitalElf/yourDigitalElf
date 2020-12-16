$(document).ready(function () {
	// Getting references to our form and input
	var signUpForm = $("form.signup");
	var firstNameInput = $("input#firstname");
	var lastNameInput = $("input#lastname");
	var userNameInput = $("input#user-input");
	var emailInput = $("input#email-input");
	var passwordInput = $("input#password-input");

	// When the signup button is clicked, we validate the username and password are not blank
	signUpForm.on("submit", function (event) {
		event.preventDefault();
		var userData = {
			// firstName: firstNameInput.val().trim(),
			// lastName: lastNameInput.val().trim(),
			userName: userNameInput.val().trim(),
			// email: emailInput.val().trim(),
			password: passwordInput.val().trim(),
		};

		if (!userData.userName || !userData.password) {
			return;
		}
		// If we have an username and password, run the signUpUser function
		signUpUser(userData.userName, userData.password);
		userNameInput.val("");
		passwordInput.val("");
	});

	// Does a post to the signup route. If successful, we are redirected to the members page
	// Otherwise we log any errors
	function signUpUser(firstName, lastName, userName, email, password) {
		$.post("/api/signup", {
			firstName: firstName,
			lastName: lastName,
			userName: userName,
			email: email,
			password: password,
		})
			.then(function (data) {
				window.location.replace("/login");
				// If there's an error, handle it by throwing up a bootstrap alert
			})
			.catch(handleLoginErr);
	}

	function handleLoginErr(err) {
		$("#alert .msg").text(err.responseJSON);
		$("#alert").fadeIn(500);
	}
});
