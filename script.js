const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const subtext = document.getElementById("subtext");
const gif = document.getElementById("gif");
const card = document.getElementById("card");

let noCount = 0;

const noPhrases = [
  "No",
  "Are you sure?",
  "Really sure??",
  "Think again 😭",
  "Pleaseeee 🙏",
  "Don’t do this to me",
  "I’ll be sad…",
  "I’ll be VERY sad…",
  "Ok fine… last chance",
  "You’re breaking my heart 💔",
  "That’s illegal",
  "Stop 😤",
  "Be nice!",
  "C’moooon 🥺",
  "Alright…",
  "…seriously?"
];

const gifStates = {
  normal: "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif",
  pleading: "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
  yay: "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif"
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function growYesButton() {
  // Smooth growth as you click "No"
  const scale = 1 + noCount * 0.18; // adjust if you want faster/slower growth
  yesBtn.style.transform = `scale(${scale})`;

  // Optional: once it's huge, make it extra obvious without covering the screen
  if (noCount >= 10) {
    subtext.textContent = "Be honest… you want to click Yes 🙂";
  }
}

noBtn.addEventListener("click", () => {
  noCount += 1;

  const phrase = noPhrases[clamp(noCount, 0, noPhrases.length - 1)];
  noBtn.textContent = phrase;

  // Swap to a “pleading” gif after a couple clicks
  gif.src = noCount >= 2 ? gifStates.pleading : gifStates.normal;

  growYesButton();
});

yesBtn.addEventListener("click", () => {
  card.classList.add("success");

  gif.src = gifStates.yay;
  question.textContent = "YAY!! 💖";
  subtext.textContent = "See you soon 😘";

  // small heart shower
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.textContent = "💗";
    heart.style.position = "fixed";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `-10vh`;
    heart.style.fontSize = `${14 + Math.random() * 24}px`;
    heart.style.transition = "transform 2.4s linear, opacity 2.4s linear";
    heart.style.zIndex = "9999";
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = `translateY(${110 + Math.random() * 40}vh) rotate(${Math.random() * 360}deg)`;
      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 2600);
  }
});
