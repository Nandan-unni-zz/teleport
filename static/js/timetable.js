const time = new Date();

const errorLogger = (err, msg) => {
  console.log(`[ERROR] @ ${msg}:`, err);
};

const isCurrentPeriod = (subIndex) => {
  const hour = time.getHours();
  const min = time.getMinutes();
  // 9:00 to 10: 30 : 0
  if (
    hour >= 8 &&
    (hour < 10 || (hour === 10 && min <= 30)) &&
    subIndex === 0
  ) {
    return true;
  }
  // 10:30 to 12: 30 : 1
  else if (
    (hour > 10 || (hour === 10 && min >= 30)) &&
    (hour < 12 || (hour === 12 && min <= 30)) &&
    subIndex === 1
  ) {
    return true;
  }
  // 12:30 to 15: 00 : 2
  else if (
    (hour > 12 || (hour === 12 && min >= 30)) &&
    hour <= 15 &&
    subIndex === 2
  ) {
    return true;
  }
  // 15:00 to 16: 00 : 3
  else if (hour >= 15 && hour <= 16 && subIndex === 3) {
    return true;
  }
  return false;
};

const classroomBlock = (data, subCode) => `
  <a 
    class="nav" 
    href="${data?.classroomLinks[subCode]}" 
    rel="noopener noreferrer"
    target="_blank"
  >
    <abbr title="${data?.desc[subCode]}">
      ${subCode}
    </abbr>
  </a>
`;

const subjectBlock = (data, day, dayIndex) => `
  <section class="day">
    <p class="block">${day}</p>
    ${data?.timetable[day]
      .map(
        (subCode, subIndex) => `
      <a
        class="block"
        href="${data?.meetLinks[subCode]}"
        rel="noopener noreferrer"
        target="_blank"
      >
        <abbr class="${
          dayIndex === time.getDay() - 1 &&
          isCurrentPeriod(subIndex) &&
          "activeSub"
        }" title="${data?.desc[subCode]}">
          ${subCode}
        </abbr>
      </a>`
      )
      .reduce((a, b) => a + b)}
  </section>
`;

const extraLinkBlock = (sub, extraLink) => `
    <a
    class="extraLink"
    href="${extraLink}"
    rel="noopener noreferrer"
    target="_blank"
    >
      ${sub}
    </a>
`;

const loadDataToHTML = async (semester) => {
  const data = await (
    await fetch(`/teleport/static/data/${semester}_timetable.json`)
  ).json();

  try {
    document.getElementById("syllabus").onclick = () =>
      window.open(data?.syllabus);
  } catch (error) {
    errorLogger(error, "loading syllabus in loadDataToHTML()");
  }

  try {
    document.getElementById("classrooms").innerHTML = Object.keys(
      data?.classroomLinks
    )
      .map((subCode) => classroomBlock(data, subCode))
      .reduce((a, b) => a + b);
  } catch (error) {
    errorLogger(error, "loading classrooms in loadDataToHTML()");
  }

  try {
    document.getElementById("timetable").innerHTML = Object.keys(
      data?.timetable
    )
      ?.map((day, dayIndex) => subjectBlock(data, day, dayIndex))
      ?.reduce((a, b) => a + b);
  } catch (error) {
    errorLogger(error, "loading timetable in loadDataToHTML()");
  }

  try {
    document.getElementById("extraLinks").innerHTML =
      `<p>Extra Links</p>` +
      Object.keys(data?.extraMeetLinks)
        .map((subCode) =>
          extraLinkBlock(subCode, data?.extraMeetLinks[subCode])
        )
        .reduce((a, b) => a + b);
  } catch (error) {
    errorLogger(error, "loading extraLinks in loadDataToHTML()");
  }

  try {
    const timeStr = `${time.getDate()} ${
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][time.getMonth()]
    } ${time.getFullYear()} &nbsp; <span> ● </span> &nbsp; ${
      time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
    }: ${
      time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
    } &nbsp; <span> ● </span> &nbsp; ${
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][time.getDay()]
    }`;
    document.getElementById("time").innerHTML = timeStr;
  } catch (error) {
    errorLogger(error, "loading time in loadDataToHTML()");
  }
};
