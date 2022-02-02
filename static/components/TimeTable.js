class TimeTable extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
        <main>
          <menu id="classrooms"></menu>
          <div class="timeContainer">
            <p></p>
            <time id="time"></time>
            <a id="syllabus">Open Syllabus <span>&#10140;</span></a>
          </div>
          <div id="timetable"></div>
          <div id="extraLinks"></div>
          <footer class="copy">2021 &copy; Nandanunni</footer>
        </main>
      `;
  }
}

customElements.define("time-table", TimeTable);
