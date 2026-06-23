const book = document.getElementById("magazine");

const pageFlip = new St.PageFlip(book, {
  width: 500,
  height: 640,
  size: "stretch",
  minWidth: 320,
  maxWidth: 1100,
  minHeight: 520,
  maxHeight: 760,
  maxShadowOpacity: 0.45,
  showCover: true,
  mobileScrollSupport: false,
  flippingTime: 950,
  usePortrait: true,
  startPage: 0,
  drawShadow: true
});

pageFlip.loadFromHTML(document.querySelectorAll(".page"));

document.getElementById("prevBtn").addEventListener("click", () => pageFlip.flipPrev());
document.getElementById("nextBtn").addEventListener("click", () => pageFlip.flipNext());

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") pageFlip.flipPrev();
  if (e.key === "ArrowRight") pageFlip.flipNext();
});
