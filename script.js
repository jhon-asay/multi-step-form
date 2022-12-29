"use strict";

const Plans = [
  { id: "arcade", name: "Arcade", monthlyPrice: 9, yearlyPrice: 90 },
  { id: "advanced", name: "Advanced", monthlyPrice: 12, yearlyPrice: 120 },
  { id: "pro", name: "Pro", monthlyPrice: 15, yearlyPrice: 150 },
];

const AddOns = [
  {
    id: "online-service",
    name: "Online service",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    id: "larger-storage",
    name: "Larger storage",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    id: "customizable-profile",
    name: "Customizable profile",
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

// const toggleLabel = document.querySelector(".toggle__label");
// const planPrices = document.querySelectorAll(".plan-price");
// const label2 = document.querySelectorAll(".label--2");

// const initPrices = async () => {
//   for (let i = 0; i < Plans.length; i++) {
//     label2.forEach((label) => {
//       if (label.htmlFor === Plans[i].id) {
//         planPrices.innerHTML = `$${Plans[i].monthlyPrice}/mo`;
//         console.log(Plans[i].monthlyPrice);
//         console.log(planPrices.innerHTML);
//       }
//     });
//   }
// };

// document.addEventListener("load", initPrices);

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
const summaryAddOnDetails = document.querySelector(".summary__addon-details");
const summaryTotalPrice = document.querySelector(".summary__total-price");

const displayUserInfo = () => {
  summaryPlanName.innerText = UserInfo.plan.name;
  summaryPlanPrice.innerText = `$${UserInfo.plan.monthlyPrice}/mo`;

  let addOnTotal = UserInfo.plan.monthlyPrice;

  for (let i = 0; i < UserInfo.addOn.length; i++) {
    addOnTotal += UserInfo.addOn[i].monthlyPrice;

    // summaryAddOnDetails = "";

    summaryAddOnDetails.insertAdjacentHTML(
      "beforeend",
      `<div class="summary__addon-details-row"><h4 class="summary__addon-name info">${UserInfo.addOn[i].name}</h4><span class="summary__addon-price info">$${UserInfo.addOn[i].monthlyPrice}/mo</span></div>`
    );
    console.log(UserInfo.addOn[i]);
    console.log(i);
  }

  summaryTotalPrice.innerText = `$${addOnTotal}/mo`;
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
    goToNextPage();
    displayUserInfo();
    //validateRequiredFields()
    console.log(UserInfo);
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

console.log(UserInfo);
