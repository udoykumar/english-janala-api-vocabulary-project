const createElements = (arr) => {
  const htmlElement = arr.map(
    (el) => `<span class='btn border-gray-500'> ${el}</span>`
  );
  return htmlElement.join(" ");
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLavelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
                <div class="h-full">
                    <h2 class="text-xl font-bold">${
                      word.word
                    } <i class="fa-solid fa-microphone-lines"></i> ${
    word.pronunciation
  }</h2>
                </div>
                <div class="">
                    <h2 class=" font-bold">Meaning </h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class=" font-bold">Exmple</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class=" font-bold">synomym</h2>
                    <div class="">${createElements(word.synonyms)}</div>
                </div>
  `;
  document.getElementById("word_modal").showModal();
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
    // console.log(word);
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
              <button onclick="loadWordDetail(${
                word.id
              })" class="bg-[#1A91FF20] cursor-pointer hover:bg-[#1A91FF60] rounded-md px-3 py-2"><i class="fa-solid fa-circle-info"></i> </button>
              <button onclick="pronounceWord('${
                word.word
              }')" class="bg-[#1A91FF20] cursor-pointer hover:bg-[#1A91FF60] rounded-md px-3 py-2"><i class="fa-solid fa-volume-high"></i></button>
            
            </div>


        </div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

const displayLesson = (lessons) => {
  // console.log(lessons);
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";
  lessons.forEach((lessonValue) => {
    const lesson = document.createElement("div");
    lesson.innerHTML = `
        <button id="lesson-btn-${lessonValue.level_no}" onclick="loadLevelWord(${lessonValue.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson ${lessonValue.level_no}</button>
        `;
    lessonContainer.append(lesson);
  });
};
loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);
  const url = "https://openapi.programming-hero.com/api/words/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      // console.log(allWords);
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      displayLavelWord(filterWords);
    });
});
