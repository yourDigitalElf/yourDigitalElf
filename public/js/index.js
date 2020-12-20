$(document).ready(function () {
    let viewAll = $("#viewAll");

    viewAll.on("click", function (event) {
        event.preventDefault();
        viewAll();
    });


    function viewAll() {
        $.get("/api/users", function (req, res) {
            res.render("users")
        })

            .catch(function (err) {
                console.log(err);
            });
    }

});
