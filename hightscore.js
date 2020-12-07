
function highScorelist() {

    var userInfo = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // to sort user score from highest to the lowest
    userInfo.sort(function (a, b) {
        return b.userscore - a.userscore;
    });
    // test sort
    console.log(userInfo);

    userInfo.forEach(function (userInfo) {
        // create li tag for each high score
        var liTag = document.createElement("li");
        liTag.textContent = userInfo.initials + " - " + userInfo.userscore;

        // display on page
        var olEl = document.getElementById("highscores-list");
        olEl.appendChild(liTag);
    });

}

function deleteScore() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

// get the hight score list when the page is reloaded

highScorelist();