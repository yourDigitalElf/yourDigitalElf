$(document).ready(function () {
    $("#viewAll").on("click", function () {
        getAll()
    })

    function getAll() {
        $.get("/api/users", function (data) {

        })
    }
});
