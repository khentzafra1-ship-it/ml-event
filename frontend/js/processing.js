document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const reward = params.get("reward") || "";

    const statusTitle = document.getElementById("statusTitle");
    const statusMessage = document.getElementById("statusMessage");

    const progressBar = document.getElementById("progressBar");
    const progressPercent = document.getElementById("progressPercent");

    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");


    function updateProgress(percent) {

        progressBar.style.width = percent + "%";
        progressPercent.textContent = percent + "%";

    }


    function completeStep(step) {

        step.classList.remove("active");
        step.classList.add("completed");

        const icon = step.querySelector(".status-icon");

        icon.textContent = "✓";

    }


    // STEP 1
    setTimeout(function () {

        updateProgress(25);

        statusTitle.textContent =
            "Checking Submitted Details...";

        statusMessage.textContent =
            "Reviewing the information you submitted.";

    }, 500);


    setTimeout(function () {

        completeStep(step1);

        step2.classList.add("active");

        updateProgress(45);

        statusTitle.textContent =
            "Preparing Demo Reward...";

        statusMessage.textContent =
            "Preparing your selected reward for the demo.";

    }, 2200);


    // STEP 2
    setTimeout(function () {

        completeStep(step2);

        step3.classList.add("active");

        updateProgress(72);

        statusTitle.textContent =
            "Finalizing Demo Claim...";

        statusMessage.textContent =
            "Almost finished. Please wait...";

    }, 4200);


    // STEP 3
    setTimeout(function () {

        completeStep(step3);

        updateProgress(100);

        statusTitle.textContent =
            "Reward Ready!";

        statusMessage.textContent =
            "Your demo claim has been processed.";

    }, 6000);


    // GO TO PRANK REVEAL
    setTimeout(function () {

        window.location.href = "success.html?reward=" +
            encodeURIComponent(reward);

    }, 7200);

});