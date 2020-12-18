$(document).ready(function () {
    var loginForm = $("form.login");
    var userNameInput = $("input#username");
    var passwordInput = $("input#password");

    //When the form is submitted, we validate there's an username and password entered
    loginForm.on("submit", function (event) {
        event.preventDefault();
        var userData = {
            userName: userNameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.userName || !userData.password) {
            return;
        }

        // If we have an username and password we run the loginUser function and clear the form
        loginUser(userData.userName, userData.password);
        userNameInput.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the createList page
    function loginUser(userName, password) {
        $.post("/api/login", {
            username: userName,
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
