const loadJSON = async (url) =>
  await fetch(url)
    .then((res) => res.json())
    .then((data) => data);

const insertClassroomData = async () => {
  let classrooms = "";
  await loadJSON("assets/data/classrooms.json").then((data) =>
    Object.keys(data).map(
      (key) =>
        (classrooms += `
          <a class="nav" href="${data[key]["link"]}" rel="noopener noreferrer">
            <abbr title="${data[key]["desc"]}">
              ${key}
            </abbr>
          </a>
`)
    )
  );
  document.getElementById("classrooms").innerHTML = classrooms;
};

const insertTimeTableData = async () => {
  let timetable = "";
  await loadJSON("assets/data/timetable.json").then((data) =>
    Object.keys(data).map(
      (key) =>
        (timetable += `
        <section class="day">
        <p class="block">${key}</p>
        ${data[key]
          .map(
            (block) => `
          <a
            class="block"
            href="${block["link"]}"
            rel="noopener noreferrer"
          >
            <abbr title="${block["desc"]}">
              ${block["sub"]}
            </abbr>
          </a>`
          )
          .reduce((a, b) => a + b)}
        </section>
`)
    )
  );
  document.getElementById("timetable").innerHTML = timetable;
};

insertClassroomData();
insertTimeTableData();
