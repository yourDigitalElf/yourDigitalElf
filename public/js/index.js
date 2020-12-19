$(document).ready(function () {
<<<<<<< HEAD
    $("#viewAll").on("click", function () {
        getAll()
    })

    function getAll() {
        $.get("/api/users", function (data) {

        })
    }
=======
    let viewAll = $("#viewAll");

    viewAll.on("click", function (event) {
        event.preventDefault();
        viewAll();
    });

    
    function viewAll() {
        $.get("/api/users", {})
            .catch(function (err) {
                console.log(err);
            });
    }
    
>>>>>>> Develop
});
