$(document).ready(function () {
    var giftForm = $("#addBtn");
    var newGift = $("input#gifts-input");
    var rating = $("select#gift-rating");

    giftForm.on("click", function (event) {
        event.preventDefault();

        var newPresent = {
            giftName: newGift.val().trim(),
            rating: rating.val().trim()
        };
        if (!newPresent.giftName || !newPresent.rating) {
            return;
        }

        // If we have giftname and rating we run the createGift function and clear the form
        createGift(newPresent.giftName, newPresent.rating);
        newGift.val("");
        rating.val("");
    })

    // creatGift does a post to our "api/present" route and if successful, redirects us the the createList page
    function createGift(giftName, rating) {
        $.post("/api/addpresent", {
            giftName: giftName,
            rating: rating
        })
            .then(function () {
                location.reload();
                // window.location.replace("/user/retrieve");
                // If there's an error, log the error
                console.log("success")
                // window.location.replace("/cr")
            })
            .catch(function (err) {
                console.log(err);
            });
    }


});
