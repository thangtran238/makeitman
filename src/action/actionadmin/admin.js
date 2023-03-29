let showBtn = document.querySelector(".revenue");
let displayRevenue = document.querySelector(".display-revenue");
let closeBtn = document.querySelector(".modal-footer button");

showBtn.addEventListener("click", function () {
  displayRevenue.classList.toggle("hide");
});

closeBtn.addEventListener("click", function () {
  let parent = closeBtn.parentElement;
  parent.parentElement.classList.add("hide");
});

let choosingButton = document.querySelectorAll(".section");

choosingButton.forEach((e) => {
  e.addEventListener("click", () => {
    let id = e.getAttribute("id");
    remove() 
    choice(id);
  });
});

function remove() {

}

function choice(choice) {
  let icon = document.querySelector(`#${choice} .icon`);
  let numbers = document.querySelector(`#${choice} .numbers`);
  let more_info = document.querySelector(`#${choice} .more-info`);

  icon.classList.add("change");
  numbers.classList.add("change");
  more_info.classList.add("change");
}

function remove() {
  let icon = document.querySelectorAll(`.icon.change`);
  let numbers = document.querySelectorAll(`.numbers.change`);
  let more_info = document.querySelectorAll(`.more-info.change`);
      icon.forEach(i => {
        i.classList.remove('change')
      })
      numbers.forEach(n => {
        n.classList.remove('change')
      })
      more_info.forEach(m => {
        m.classList.remove('change')
      })
    }

  