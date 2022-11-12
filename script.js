// global variables supposedly without global pollution.
(() => {
  // by not declaring let, var or const, you are making it a global variable
  prevPressedDigit = "";
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
  console.log("a key has been pressed");
  console.log(e.key);
  OutputChange(e.key);
  2;
};

const whichButtonClicked = () => {
  // you can select multiple using the query selector
  const buttons = document.querySelectorAll(".digit, .operator");
  buttons.forEach((el) => {
    el.addEventListener("click", buttonClick);
  });

  document.addEventListener("keydown", keyClick);
  // for (let i = 0; i < buttons.length;) {

  // }
  // you can also convert them into an array
  // const buttons = [...document.querySelectorAll(".digit")];
};

const main = (() => {
  whichButtonClicked();
})();
