$(document).ready(function () {
    var loginForm = $("#createBtn");
    var emailInput = $("input#username");
    var passwordInput = $("input#password");

    //When the form is submitted, we validate there's an username and password entered
    loginForm.on("click", function (event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };


        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an username and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the createList page
    function loginUser(email, password) {
        $.post("/api/login", {
            username: email,
            password: password
        })
            .then(function () {
                window.location.replace("/createList");
                // If there's an error, log the error
            })
            .catch(function (err) {
                console.log(err);
            });
    }
});
