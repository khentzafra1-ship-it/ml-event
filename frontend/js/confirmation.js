const reward = sessionStorage.getItem("selectedReward");
const userId = sessionStorage.getItem("userId");
const zoneId = sessionStorage.getItem("zoneId");
const email = sessionStorage.getItem("email");
const rewardType =
    sessionStorage.getItem("selectedRewardType") ||
    ((reward || "").toLowerCase().includes("diamond") ? "diamonds" : "skin");


// Display information
document.getElementById("rewardName").textContent =
    reward || "—";

document.getElementById("mlUserId").textContent =
    userId || "—";

document.getElementById("serverId").textContent =
    zoneId || "—";

document.getElementById("email").textContent =
    email || "—";


// ==========================================
// CONFIRM CLAIM
// ==========================================

document.getElementById("confirmButton").addEventListener("click", async function () {

    const button = this;

    button.disabled = true;
    button.textContent = "SUBMITTING...";


    try {

        const response = await fetch(
            "https://mlevent.infinityfreeapp.com/backend/claims/submit.php",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    ml_user_id: userId,
                    server_id: zoneId,
                    email: email,
                    reward_type: rewardType,
                    reward_name: reward

                })

            }
        );


        const result = await response.json();


        if (result.success) {

            // ==================================
            // CLAIM SUCCESSFUL
            // CLEAR USER INPUT DATA
            // ==================================

            sessionStorage.setItem("claimedReward", reward || "");

            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("zoneId");
            sessionStorage.removeItem("email");


            // Go to success page
            window.location.href = "processing.html?reward=" +
                encodeURIComponent(reward || "");


        } else {

            showModal(result.message || "Unable to submit claim.", {
                title: /already claimed/i.test(result.message || "")
                    ? "Already Claimed"
                    : "Claim Not Submitted"
            });

            button.disabled = false;
            button.textContent = "CONFIRM CLAIM";

        }


    } catch (error) {

        console.error(error);

        showModal("Unable to connect to the server. Please try again.", {
            title: "Connection Error"
        });

        button.disabled = false;
        button.textContent = "CONFIRM CLAIM";

    }

});