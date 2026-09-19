const reward = sessionStorage.getItem("selectedReward");

const rewardName = document.getElementById("rewardName");
const rewardInput = document.getElementById("rewardInput");
const form = document.getElementById("playerForm");

const userIdInput = document.getElementById("userId");
const zoneIdInput = document.getElementById("zoneId");
const emailInput = document.getElementById("email");
const continueBtn = document.getElementById("continueBtn");


// ==========================================
// LOAD SAVED INFORMATION
// ==========================================

const savedUserId = sessionStorage.getItem("userId");
const savedZoneId = sessionStorage.getItem("zoneId");
const savedEmail = sessionStorage.getItem("email");


// Display reward
if (!reward) {

    rewardName.textContent = "No reward selected";

} else {

    rewardName.textContent = reward;
    rewardInput.value = reward;

}


// Restore previous inputs
if (savedUserId !== null) {
    userIdInput.value = savedUserId;
}

if (savedZoneId !== null) {
    zoneIdInput.value = savedZoneId;
}

if (savedEmail !== null) {
    emailInput.value = savedEmail;
}


// ==========================================
// CONTINUE BUTTON STATE
// ==========================================

function updateContinueButton() {

    const userId = userIdInput.value.trim();
    const zoneId = zoneIdInput.value.trim();
    const email = emailInput.value.trim();

    const allFilled =
        userId !== "" &&
        zoneId !== "" &&
        email !== "";

    if (allFilled) {
        continueBtn.disabled = false;
        continueBtn.style.background = "#e5b82e";
        continueBtn.style.borderColor = "#e5b82e";
        continueBtn.style.color = "#050505";
        continueBtn.style.cursor = "pointer";
    } else {
        continueBtn.disabled = true;
        continueBtn.style.background = "#222";
        continueBtn.style.borderColor = "#333";
        continueBtn.style.color = "#666";
        continueBtn.style.cursor = "not-allowed";
    }
}

userIdInput.addEventListener("input", updateContinueButton);
zoneIdInput.addEventListener("input", updateContinueButton);
emailInput.addEventListener("input", updateContinueButton);

updateContinueButton();


// ==========================================
// USER ID
// ==========================================

userIdInput.addEventListener("input", function () {

    this.value = this.value
        .replace(/\D/g, "")
        .slice(0, 10);

});


// ==========================================
// ZONE ID
// ==========================================

zoneIdInput.addEventListener("input", function () {

    this.value = this.value
        .replace(/\D/g, "")
        .slice(0, 4);

});


// ==========================================
// FORM SUBMIT
// ==========================================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const userId = userIdInput.value.trim();
    const zoneId = zoneIdInput.value.trim();
    const email = emailInput.value.trim();


    // Check reward
    if (!reward) {

        showModal("Please select a reward first.", { title: "No Reward Selected" });
        return;

    }


    // Check User ID
    if (!/^\d{1,10}$/.test(userId)) {

        showModal("Please enter a valid User ID.", {
            title: "Invalid User ID",
            onClose: function () { userIdInput.focus(); }
        });
        return;

    }


    // Check Zone ID
    if (!/^\d{1,4}$/.test(zoneId)) {

        showModal("Please enter a valid Zone ID.", {
            title: "Invalid Zone ID",
            onClose: function () { zoneIdInput.focus(); }
        });
        return;

    }


    // Check Email
    if (!email) {

        showModal("Please enter your email.", {
            title: "Email Required",
            onClose: function () { emailInput.focus(); }
        });
        return;

    }


    // ==========================================
    // SAVE CURRENT VALUES
    // ==========================================

    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("zoneId", zoneId);
    sessionStorage.setItem("email", email);


    // Go to confirmation
    window.location.href = "confirmation.html";

});