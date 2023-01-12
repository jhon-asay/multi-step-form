"use strict";

const Plans = [
  {
    id: "arcade",
    name: "Arcade",
    planIcon: "assets/images/icon-arcade.svg",
    monthlyPrice: 9,
    yearlyPrice: 90,
  },
  {
    id: "advanced",
    name: "Advanced",
    planIcon: "assets/images/icon-advanced.svg",
    monthlyPrice: 12,
    yearlyPrice: 120,
  },
  {
    id: "pro",
    name: "Pro",
    planIcon: "assets/images/icon-pro.svg",
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
];

const AddOns = [
  {
    id: "online-service",
    name: "Online service",
    description: "Access to multiplayer games",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    id: "larger-storage",
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    id: "customizable-profile",
    name: "Customizable profile",
    description: "Custom theme on your profile",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];

const UserInfo = {
  name: "",
  email: "",
  phone: "",
  plan: [],
  addOn: [],
};

// add change plan button and functionality

const input1 = document.querySelectorAll(".input--1");
const alert = document.querySelectorAll(".alert");

const validateRequiredFields = () => {
  let complete = 0;

  const namePattern = /^[a-zA-Z ]{4,}$/;
  const emailPattern = /^[a-zA-Z0-9._-]{4,}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^\+?[0-9]{10,12}$/;

  for (let i = 0; i < input1.length; i++) {
    let input = input1[i];
    let empty = input.value.length === 0;
    const prevElement = input.previousElementSibling;

    if (empty) {
      prevElement.classList.add("show");
      prevElement.innerText = "Please complete field";
    }

    if (!empty) {
      prevElement.classList.add("show");

      if (input.id === "name" && !namePattern.test(input.value)) {
        prevElement.innerText = "Enter letters only (Minimum 4 characters)";
      } else if (namePattern.test(input.value)) {
        prevElement.classList.remove("show");
        complete++;
      }

      if (input.id === "email" && !emailPattern.test(input.value)) {
        prevElement.innerText = "Enter valid email";
      } else if (emailPattern.test(input.value)) {
        prevElement.classList.remove("show");
        complete++;
      }

      if (input.id === "phone" && !phonePattern.test(input.value)) {
        prevElement.innerText = "Enter numbers only (Minimum 10 characters)";
      } else if (phonePattern.test(input.value)) {
        prevElement.classList.remove("show");
        complete++;
      }
    }
  }

  if (complete === 3) {
    goToNextPage();
  }
};

const monthlyPriceToggle = document.querySelector(".monthly");
const yearlyPriceToggle = document.querySelector(".yearly");
const toggleInput = document.querySelector(".toggle");

const label2 = document.querySelectorAll(".label--2");
const label3 = document.querySelectorAll(".label--3");

const displayPrices = () => {
  const savings = `
  <p class="title">
    2 months free
  </p>
  `;

  const yearly = toggleInput.checked;

  Plans.forEach((plan) => {
    label2.forEach((label) => {
      if (label.htmlFor === plan.id) {
        label.innerHTML = "";
        label.insertAdjacentHTML(
          "beforeend",
          `
          <img
            class="plan__icon" 
            src=${plan.planIcon}
            alt="${plan.name} subscription icon"
            />
          <div class="plan__description arcade">
            <h3 class="title">
              ${plan.name}
            </h3>
            <p class="info plan-price">
              $${yearly ? plan.yearlyPrice : plan.monthlyPrice}/${
            yearly ? "yr" : "mo"
          }
            </p>
            ${yearly ? savings : ""} 
          </div>
          `
        );
      }
    });
  });

  AddOns.forEach((addon) => {
    label3.forEach((label) => {
      if (label.htmlFor === addon.id) {
        label.innerHTML = "";
        label.insertAdjacentHTML(
          "beforeend",
          `
          <div class="addon__description arcade">
            <h3 class="title">
              ${addon.name}
            </h3>
            <p class="info">
              ${addon.description}
            </p>
            ${yearly ? savings : ""} 
          </div>
          <span class="info addon__price">
            $${yearly ? addon.yearlyPrice : addon.monthlyPrice}/${
            yearly ? "yr" : "mo"
          }
          </span>
          `
        );
      }
    });
  });
};

const togglePrices = () => {
  displayPrices();

  if (toggleInput.checked) {
    monthlyPriceToggle.classList.remove("selected");
    yearlyPriceToggle.classList.add("selected");
  } else {
    yearlyPriceToggle.classList.remove("selected");
    monthlyPriceToggle.classList.add("selected");
  }
};

window.onload = () => {
  togglePrices();
};

const toggleLabel = document.querySelector(".toggle__label");

toggleLabel.addEventListener("click", togglePrices);

const findInfoForInput = (input, info) => {
  const inputId = input.id;
  for (let i = 0; i < info.length; i++) {
    if (info[i].id === inputId) return info[i];
  }
};

const inputs = document.querySelectorAll(".input");

const recordInfo = (inputs) => {
  UserInfo.addOn.length = 0;
  inputs.forEach((input) => {
    if (input.checked && input.type === "radio") {
      UserInfo.plan = findInfoForInput(input, Plans);
    } else if (input.checked && input.type === "checkbox") {
      UserInfo.addOn.push(findInfoForInput(input, AddOns));
    }
  });
};

const summaryPlanName = document.querySelector(".summary__plan-name");
const summaryPlanPrice = document.querySelector(".summary__plan-price");
const summaryAddOnName = document.querySelector(".summary__addon-name");
const summaryAddOnPrice = document.querySelector(".summary__addon-price");
const summaryAddOnDetails = document.querySelector(".card__add-ons-chosen");
const summaryTotalName = document.querySelector(".summary__total-name");
const summaryTotalPrice = document.querySelector(".summary__total-price");

const calcTotalPrice = () => {
  let total = UserInfo.plan.monthlyPrice;

  UserInfo.addOn.forEach((addon) => (total += addon.monthlyPrice));

  return total;
};

const displayUserInfo = () => {
  let planTotal = UserInfo.plan.monthlyPrice;
  let totalPrice = calcTotalPrice();
  let termShort = "mo";
  let termLong = "month";

  if (toggleInput.checked) {
    planTotal *= 10;
    totalPrice *= 10;
    termShort = "yr";
    termLong = "year";
  }

  summaryPlanName.innerText = UserInfo.plan.name;
  summaryPlanPrice.innerText = `$${planTotal}/${termShort}`;

  summaryAddOnDetails.innerHTML = "";

  UserInfo.addOn.forEach((addon) => {
    summaryAddOnDetails.insertAdjacentHTML(
      "beforeend",
      `
      
        <div class="summary__details summary__addon-details">
          <div class="summary__addon-details-row">
            <h4 class="summary__addon-name info">
              ${addon.name}
            </h4>
            <span class="summary__addon-price info">
              $${
                toggleInput.checked ? addon.yearlyPrice : addon.monthlyPrice
              }/${termShort}
            </span>
          </div>
        </div>
      `
    );
  });

  summaryTotalName.innerText = `Total (per ${termLong})`;
  summaryTotalPrice.innerText = `$${totalPrice}/${termShort}`;
};

// MOVE FORM PAGE

const formPages = document.querySelectorAll(".form");
const buttons = document.querySelectorAll(".btns");

let currentPage = 0;
const maxPage = formPages.length;

const formNumber = document.querySelectorAll(".sidebar__numbers");

const activateNumber = (page) => {
  formNumber.forEach((number) => {
    number.classList.remove("sidebar__number--active");
    if (number.innerText - 1 === page) {
      number.classList.add("sidebar__number--active");
    }
  });
};

const showCurrentElements = (page, elements) => {
  let display;

  elements === formPages ? (display = "show") : (display = "flex");

  elements.forEach((element, i) => {
    element.classList.remove(display);
    if (i === page) {
      element.classList.add(display);
    }
  });
};

const goToPage = (page) => {
  formPages.forEach((p, i) => {
    p.style.transform = `translateX(${100 * (i - page)}%)`;
  });
};

const goToNextPage = () => {
  if (currentPage === maxPage - 1) {
    currentPage = 0;
  } else {
    currentPage++;
  }

  goToPage(currentPage);
  activateNumber(currentPage);
  showCurrentElements(currentPage, formPages);
  showCurrentElements(currentPage, buttons);
};

const goToPrevPage = () => {
  if (currentPage === 0) {
    currentPage = maxPage - 1;
  } else {
    currentPage--;
  }

  goToPage(currentPage);
  activateNumber(currentPage);
  showCurrentElements(currentPage, formPages);
  showCurrentElements(currentPage, buttons);
};

const init = () => {
  goToPage(0);
};

init();

const nextButtons = document.querySelectorAll(".btn--next");

nextButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    recordInfo(inputs);
    displayUserInfo();
    calcTotalPrice();
    validateRequiredFields();
  });
});

const backButtons = document.querySelectorAll(".btn--back");

backButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    goToPrevPage();
  });
});

const confirmButton = document.querySelector(".btn--confirm");

confirmButton.addEventListener("click", () => {
  goToNextPage();
});
