const createElements = (arr) => {
  const htmlElement = arr.map((el) => `<span class='btnn'> ${el}</span>`);
  console.log(htmlElement.join(" "));
};
const synonyms = ["hello", "hi", "konnichiwa"];
createElements(synonyms);
