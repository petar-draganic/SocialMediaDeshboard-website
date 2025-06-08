"use strict"; //# sourceMappingURL=script.js.map

const darkButton = document.getElementById("dark");
const lightButton = document.getElementById("light");

const setColorMode = () => {
  if (localStorage.getItem("colorMode") == "dark") {
    setDarkMode();
  } else if (localStorage.getItem("colorMode") == "light") {
    setLightMode();
  }
};

const checkMode = () => {
  if (localStorage.getItem("colorMode") == null) {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      lightButton.click();
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      darkButton.click();
    }
  }
};

const checkModeChange = () => {
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (event) => {
      checkMode();
    });
};

const setDarkMode = () => {
  document.querySelector("body").classList = "dark";
  darkButton.click();
};

const setLightMode = () => {
  document.querySelector("body").classList = "light";
  lightButton.click();
};

setColorMode();
checkMode();
checkModeChange();

const radioButtons = document.querySelectorAll(".toggle__wrapper input");
for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener("click", (event) => {
    //console.log("click");
    if (darkButton.checked) {
      setDarkMode();
      localStorage.setItem("colorMode", "dark");
    } else {
      setLightMode();
      localStorage.setItem("colorMode", "light");
    }
  });
}
//console.log("Script loaded");
