const classroomBlock = (data, subCode) => `
  <a class="nav" href="${data?.classroomLinks[subCode]}" rel="noopener noreferrer">
    <abbr title="${data?.desc[subCode]}">
      ${subCode}
    </abbr>
  </a>
`;

const subjectBlock = (data, day) => `
  <section class="day">
    <p class="block">${day}</p>
    ${data?.timetable[day]
      .map(
        (subCode) => `
      <a
        class="block"
        href="${data?.meetLinks[subCode]}"
        rel="noopener noreferrer"
      >
        <abbr title="${data?.desc[subCode]}">
          ${subCode}
        </abbr>
      </a>`
      )
      .reduce((a, b) => a + b)}
  </section>
`;

const loadDataToHTML = async () => {
  const data = await (await fetch("assets/data.json")).json();

  document.getElementById("classrooms").innerHTML = Object.keys(
    data?.classroomLinks
  )
    .map((subCode) => classroomBlock(data, subCode))
    .reduce((a, b) => a + b);

  document.getElementById("timetable").innerHTML = Object.keys(data?.timetable)
    .map((day) => subjectBlock(data, day))
    .reduce((a, b) => a + b);
};

loadDataToHTML();
