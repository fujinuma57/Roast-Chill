// スクロール時のフェードイン
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('active');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// フォーム送信
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xldbvpbg", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        document.getElementById("successMessage").style.display = "block";
        form.reset();
        setTimeout(() => {
          window.location.href = "thanks.html";
        }, 3000);
      } else {
        alert("送信に失敗しました。");
      }
    } catch (error) {
      alert("通信エラーが発生しました。");
    }
  });
});
