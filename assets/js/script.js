document.addEventListener("DOMContentLoaded", function () {
    // Display today's date (e.g. "Wednesday, Apr 30th 2026")
    function ordinal(n) {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    const now = new Date();
    const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
    const month = now.toLocaleDateString("en-US", { month: "short" });
    const year = now.getFullYear();
    document.getElementById("currentDay").textContent =
        `${weekday}, ${month} ${ordinal(now.getDate())} ${year}`;

    // Save button click listener
    document.querySelectorAll(".saveBtn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const text = btn.previousElementSibling.value;
            const id = btn.closest(".time-block").id;
            localStorage.setItem(id, text);
        });
    });

    // Color-code blocks based on current hour
    function timeTracker() {
        const timeNow = new Date().getHours();
        document.querySelectorAll(".time-block").forEach(function (block) {
            const blockHour = parseInt(block.id.replace("hour", ""), 10);
            block.classList.remove("past", "present", "future");
            if (blockHour < timeNow) {
                block.classList.add("past");
            } else if (blockHour === timeNow) {
                block.classList.add("present");
            } else {
                block.classList.add("future");
            }
        });
    }

    // Load saved notes from localStorage
    document.querySelectorAll(".time-block").forEach(function (block) {
        const saved = localStorage.getItem(block.id);
        if (saved !== null) {
            block.querySelector(".description").value = saved;
        }
    });

    timeTracker();
    setInterval(timeTracker, 60000);
});
