const loadLessons = async () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLavelWord(data.data));
};

const displayLavelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length <= 0) {
    alert("no word decated");
    wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <img src="../assets/alert-error.png" class="mx-auto">
            <p class="text-md font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
    `;
  }
  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white flex flex-col rounded-xl shadow-lg shadow-[1px 1px 1px black] text-center py-8 px-3">
            <h2 class="text-2xl font-bold">${
              word.word ? word.word : "শব্দ পাওয়া যাইনি"
            }</h2>
            <p class="py-6">meaning/pronunciation</p>
            <div class="text-2xl font-bold">${
              word.meaning ? word.meaning : "অর্থ পাওয়া যাইনি"
            }/ ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যাইনি"
    }</div>
            <div class="flex items-center mt-14 justify-between px-7">
            <button class="bg-[#1A91FF20] cursor-pointer hover:bg-[#1A91FF60] rounded-md px-3 py-2"><i class="fa-solid fa-circle-info"></i> </button>
            <button class="bg-[#1A91FF20] cursor-pointer hover:bg-[#1A91FF60] rounded-md px-3 py-2"><i class="fa-solid fa-volume-high"></i></button>
            
            </div>


        </div>
    `;
    wordContainer.append(card);
  });
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
