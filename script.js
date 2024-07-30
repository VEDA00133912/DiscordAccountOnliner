let interval;

function updateStatus() {
    const statusSelect = document.getElementById("statusForm").value;
    const token = document.getElementById("TokenForm").value;

    if (!token) {
        return logMessage("× Discord Token is required.", "error");
    }

    fetch("https://discord.com/api/v10/users/@me/settings", {
        method: "PATCH",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: statusSelect }),
        mode: "cors",
        credentials: "include"
    })
    .then(response => {
        if (response.ok) {
            logMessage(`✓ Status updated to ${statusSelect}`, "success");
        } else {
            logMessage(`× Failed status update: ${response.status}`, "error");
        }
    })
    .catch(error => logMessage(`× Error: ${error.message}`, "error"));
}

function logMessage(message, type) {
    const logArea = document.getElementById("logArea");
    const logEntry = document.createElement("div");

    logEntry.innerText = message;
    logEntry.className = type === "error" ? "log-error" : "log-success";
    logArea.appendChild(logEntry);
    logArea.scrollTop = logArea.scrollHeight; 
}

document.getElementById("start").addEventListener("click", () => {
    interval = setInterval(updateStatus, 5000);
    logMessage("✓ Start updating status", "success");
});

document.getElementById("stop").addEventListener("click", () => {
    clearInterval(interval);
    logMessage("✓ Stop status", "error");
});
