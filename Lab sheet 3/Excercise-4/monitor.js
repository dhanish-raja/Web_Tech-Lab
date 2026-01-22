/* 2. Activity Storage */
let activityLog = [];
let clickCount = 0;
const CLICK_THRESHOLD = 5;

const logDiv = document.getElementById("log");
const warningDiv = document.getElementById("warning");

/* Utility: Add activity */
function addActivity(type, target) {
  const entry = {
    type: type,
    target: target.tagName,
    time: new Date().toLocaleTimeString()
  };

  activityLog.push(entry);
  displayLog(entry);
}

/* 4. Display Activity in DOM */
function displayLog(entry) {
  const p = document.createElement("p");
  p.innerText = `[${entry.time}] ${entry.type} on ${entry.target}`;
  logDiv.appendChild(p);
}

/* 1 & 3. Event Tracking (Capturing + Bubbling) */
document.addEventListener("click", (e) => {
  clickCount++;
  addActivity("Click (bubble)", e.target);

  if (clickCount > CLICK_THRESHOLD) {
    warningDiv.innerText = "Suspicious activity: Too many clicks!";
  }
}, false);

document.addEventListener("click", (e) => {
  addActivity("Click (capture)", e.target);
}, true);

document.addEventListener("keydown", (e) => {
  addActivity(`Key Press (${e.key})`, e.target);
});

document.addEventListener("focusin", (e) => {
  addActivity("Focus In", e.target);
});

/* 6. Export Log */
function exportLog() {
  let text = "User Activity Log\n\n";
  activityLog.forEach((a, i) => {
    text += `${i + 1}. [${a.time}] ${a.type} on ${a.target}\n`;
  });

  alert(text);
}

/* 6. Reset Log */
function resetLog() {
  activityLog = [];
  clickCount = 0;
  logDiv.innerHTML = "";
  warningDiv.innerText = "";
}
