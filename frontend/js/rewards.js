const rewardOptions =
    document.querySelectorAll(".reward-option");

const selectedReward =
    document.getElementById("selectedReward");

const continueBtn =
    document.getElementById("continueBtn");

let selected = null;
let selectedType = null;


rewardOptions.forEach(option => {

    option.addEventListener("click", function () {

        // Remove previous selection

        rewardOptions.forEach(item => {
            item.classList.remove("selected");
        });


        // Select current card

        this.classList.add("selected");


        // Get reward

        selected =
            this.dataset.reward;

        selectedType =
            this.dataset.type;


        // Update selected display

        selectedReward.textContent =
            selected;


        // Enable button

        continueBtn.disabled = false;

        continueBtn.classList.add("active");

    });

});


continueBtn.addEventListener("click", function () {

    if (!selected) {
        return;
    }


    // Save selected reward temporarily

    sessionStorage.setItem(
        "selectedReward",
        selected
    );

    sessionStorage.setItem(
        "selectedRewardType",
        selectedType
    );


    // Continue to player details

    window.location.href =
        "player-details.html";

});