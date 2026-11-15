// Image Carousel

const stage = document.getElementById("stage");

if (stage) {
  const label = stage.querySelector("#label");
  const slides = [...stage.querySelectorAll("img.carousel")];
  const current = document.getElementById("cur");
  const total = document.getElementById("total");

  if (slides.length > 0) {
    let i = slides.findIndex(slide => slide.classList.contains("active"));
    if (i < 0) {
      i = 0;
      slides[0].classList.add("active");
    }

    if (total) total.textContent = slides.length;
    if (current) current.textContent = i + 1;

    function sideOf(e) {
      const r = stage.getBoundingClientRect();
      return (e.clientX - r.left) < r.width / 2 ? "prev" : "next";
    }

    function show(n) {
      slides[i].classList.remove("active");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("active");
      if (current) current.textContent = i + 1;
    }

    stage.addEventListener("mousemove", e => {
      if (!label) return;
      const r = stage.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      label.textContent = sideOf(e) === "prev" ? "<" : ">";
      label.style.transform = `translate(${x + -24}px, ${y + -16}px)`;
      stage.classList.add("hovering");
    });

    stage.addEventListener("mouseleave", () => stage.classList.remove("hovering"));

    stage.addEventListener("click", e => {
      show(sideOf(e) === "prev" ? i - 1 : i + 1);
    });

    stage.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") show(i - 1);
      if (e.key === "ArrowRight") show(i + 1);
    });
  }
}