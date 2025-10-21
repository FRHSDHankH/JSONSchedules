const schedules = ["HankSchedule.json", "JamesSchedule.json", "WyattSchedule.json", "JasonSchedule.json"]
let s=0
async function loadProfile() {
  try {
    const response = await fetch(schedules[s]);
    const data = await response.json();
    const scheduleName = schedules[s].replace(".json", "").replace(/([A-Za-z]+)(Schedule)/, "$1 $2"); // ^ this last replace was ai to add the space before schedule

    const classRows = data.map((cls) => `
      <div class="row bgSchedules p-3 my-3 mx-auto rounded-3 shadow-sm align-items-center text-center hover text">
        <div class="col-md-3 col-12 titleText">${cls.className}</div>
        <div class="col-md-2 col-12 text">${cls.teacher}</div>
        <div class="col-md-2 col-12 text">${cls.roomNumber}</div>
        <div class="col-md-2 col-12 text">Period ${cls.period}</div>
        <div class="col-md-3 col-12 text">${cls.subjectArea}</div>
      </div>
    `).join(""); // ^ this was to make it make a bunch of rows as opposed to previously how I had a bunch of manual rows

    document.getElementById("schedules").innerHTML = `
      <div class="row text-center bgSchedules py-3 rounded-3 my-2 shadow-sm">
        <div class="col-12 titleText fs-3">
          ${scheduleName}
        </div>
      </div>
      ${classRows}
    `;
  } catch (error) {
    document.getElementById("schedules").textContent = "Error."
  }
}
loadProfile();

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight" || e.key === "ArrowUp") {
    if(s === schedules.length-1) {
      s = 0
    } else {
      s++
    }
    loadProfile();
  } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
    if(s === 0) {
      s = schedules.length-1
    } else {
      s--
    }
    loadProfile();
  }
  
});