$(document).ready(function () {
	// Getting references to our form and input
	var signUpForm = $("form.signup");
	var signupBtn = $("#signup-btn");

	var firstNameInput = $("input#firstname");
	var lastNameInput = $("input#lastname");
	var userNameInput = $("input#username");
	var emailInput = $("input#email");
	var passwordInput = $("input#password");

	var userData;

	// When the signup button is clicked, we validate the username and password are not blank
	signUpForm.on("submit", function (event) {
		event.preventDefault();
		userData = {
			firstName: firstNameInput.val().trim(),
			lastName: lastNameInput.val().trim(),
			userName: userNameInput.val().trim(),
			email: emailInput.val().trim(),
			password: passwordInput.val().trim(),
		};

		if (!userData.userName || !userData.password || !userData.firstName || !userData.lastName || !userData.email) {
			return;
		}
		// If we have an username and password, run the signUpUser function
		signUpUser();
		// signUpUser(userData.userName, userData.password, userData.firstName, userData.lastName, userData.email);
		userNameInput.val("");
		passwordInput.val("");
		firstNameInput.val("");
		lastNameInput.val("");
		emailInput.val("")
	});

	// Does a post to the signup route. If successful, we are redirected to the members page
	// Otherwise we log any errors
	function signUpUser() {
		$.post("/api/signup", {
			userData
			// firstName: firstName,
			// lastName: lastName,
			// userName: userName,
			// email: email,
			// password: password,
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
