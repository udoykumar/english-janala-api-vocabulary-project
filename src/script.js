const loadLessons = async () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
const loadLevelWord = (id) => {
  console.log(id);
};
const displayLesson = (lessons) => {
  console.log(lessons);
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";
  lessons.forEach((lessonValue) => {
    const lesson = document.createElement("div");
    lesson.innerHTML = `
        <button onclick="loadLevelWord(${lessonValue.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson ${lessonValue.level_no}</button>
        `;
    lessonContainer.append(lesson);
  });
};
loadLessons();
