const emailInput = document.querySelector(".email_input");
const faqList = document.querySelector(".faq_list");

emailInput.addEventListener("input", (e) => {
  if (e.target.value.trim() !== "") {
    emailInput.classList.add("is_writing");
  } else {
    emailInput.classList.remove("is_writing");
  }
});

faqList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.classList.toggle("expanded");
  }
});
