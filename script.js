let hexinput = document.getElementById("hexInput");
let inputcolor = document.getElementById("inputColor");
let lightenText = document.getElementById("lightenText");
let darkenText = document.getElementById("darkenText");
let toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", function () {
  if (toggleBtn.classList.contains("toggled")) {
    toggleBtn.classList.remove("toggled");
    lightenText.classList.remove("unselected");
    darkenText.classList.add("unselected");
  } else {
    toggleBtn.classList.add("toggled");
    lightenText.classList.add("unselected");
    darkenText.classList.remove("unselected");
  }

  reset();
});

hexinput.addEventListener("keyup", function () {
  if (!validhex(hexinput.value)) {
    return;
  }

  let trimedhex = hexinput.value.replace("#", "");

  inputcolor.style.backgroundColor = `#${trimedhex}`;

  hextorgb(hexinput.value);
});

function validhex(hex) {
  if (!hex) {
    return;
  }

  let trimedhex = hex.replace("#", "");

  return trimedhex.length === 3 || trimedhex.length === 6;
}

function hextorgb(hex) {
  if (!validhex(hex)) return;

  let trimedhex = hex.replace("#", "");

  if (trimedhex.length === 3) {
    trimedhex =
      trimedhex[0] +
      trimedhex[0] +
      trimedhex[1] +
      trimedhex[1] +
      trimedhex[2] +
      trimedhex[2];
  }

  let r = parseInt(trimedhex.substring(0, 2), 16);
  let g = parseInt(trimedhex.substring(2, 4), 16);
  let b = parseInt(trimedhex.substring(4, 6), 16);

  return { r, g, b };
}

function rgbtohex(r, g, b) {
  let Rhex = ("0" + r.toString(16)).slice(-2);
  let Ghex = ("0" + g.toString(16)).slice(-2);
  let Bhex = ("0" + b.toString(16)).slice(-2);

  return `#${Rhex}${Ghex}${Bhex}`;
}

let slider = document.getElementById("slider");
let slidertext = document.getElementById("sliderText");
let alteredColor = document.getElementById("alteredColor");
let alteredtext = document.getElementById("alteredtext");

slider.addEventListener("input", function () {
  slidertext.textContent = `${slider.value}%`;
  if (!validhex(hexinput.value)) return;

  let lightdark = toggleBtn.classList.contains("toggled")
    ? -slider.value
    : slider.value;

  let alteredhex = changecolor(hexinput.value, lightdark);

  alteredColor.style.backgroundColor = alteredhex;
  alteredtext.innerText = `Altered color : ${alteredhex}`;
});

function changecolor(hexcolor, percentage) {
  let rgb = hextorgb(hexcolor);
  r = rgb.r;
  g = rgb.g;
  b = rgb.b;

  amount = Math.floor((percentage * 255) / 100);

  let newR = r + amount;
  let newG = g + amount;
  let newB = b + amount;

  return rgbtohex(limiter(newR), limiter(newG), limiter(newB));
}

function limiter(value) {
  if (value > 255) {
    return (value = 255);
  } else if (value < 0) {
    return (value = 0);
  } else {
    return value;
  }
}

function reset() {
  slider.value = 0;
  alteredColor.style.backgroundColor = hexinput.value;
  slidertext.textContent = `0%`;
}
