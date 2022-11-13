// global variables supposedly without global pollution.
(() => {
  // by not declaring let, var or const, you are making it a global variable
  prevPressedDigit = "";
  clickMore = false;
})();

const OutputChange = (output) => {
  const outputBar = document.querySelector(".output-bar");

  if ((prevPressedDigit === "=" || prevPressedDigit === "invalid") && !isNaN(output)) {
    outputBar.innerHTML = "";
  }

  switch (output) {
    case "+":
      outputBar.innerHTML += "+";
      break;
    case "-":
      outputBar.innerHTML += "-";
      break;
    case "\u2217":
      outputBar.innerHTML += "*";
      break;
    case "/":
      outputBar.innerHTML += "/";
      break;
    // assign two situations the same code, just don't add break
    case "=":
    case "Enter":
      // you should really never use eval, Function like this is an alternative
      outputBar.innerHTML = Function("return " + outputBar.innerHTML)();
      break;
    case "C":
    case "c":
      outputBar.innerHTML = "";
      break;
    // ignore if certain keys are pressed
    case "Shift":
    case "Capslock":
    case "Control":
      break;
    case "Backspace":
      outputBar.innerHTML = outputBar.innerHTML.slice(0, -1);
      break;
    default:
      if (!isNaN(output)) {
        outputBar.innerHTML += output;
      } else {
        outputBar.innerHTML = `Invalid input: ${output}`;
        output = "invalid";
      }
      break;
  }
  prevPressedDigit = output;
};

const buttonClick = (e) => {
  const buttonClicked = e.srcElement.innerHTML;
  OutputChange(buttonClicked);
};

const keyClick = (e) => {
  OutputChange(e.key);
};

const whichButtonClicked = () => {
  // you can select multiple using the query selector
  const buttons = document.querySelectorAll(".digit, .operator");
  buttons.forEach((el) => {
    el.addEventListener("click", buttonClick);
  });
  document.addEventListener("keydown", keyClick);
};

const main = (() => {

  whichButtonClicked();
  // add info
  document.querySelector("#info").innerHTML = "A simple calculator app, created using JavaScript, CSS and HTML";
})();

// more info was clicked
const moreInfo = () => {
  const info = document.querySelector("#info");
  if (clickMore) {
    info.innerHTML = info.innerHTML = "A simple calculator app, created using JavaScript, CSS and HTML";
    clickMore = false;
    return
  } else {
    info.innerHTML = info.innerHTML + "<br><br> Features: <br> - Keyboard input <br> - Click input <br> - Dynamic output";
    clickMore = true;
  }
};
