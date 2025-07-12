// ✅ GSAP Hero Animations
gsap.from(".hero-title", { y: -50, opacity: 0, duration: 1, ease: "power2.out" });
gsap.from(".hero-tagline", { y: 50, opacity: 0, duration: 1, delay: 0.5, ease: "power2.out" });
gsap.from(".hero-btn", { scale: 0.8, opacity: 0, duration: 1, delay: 1, ease: "back.out(1.7)" });

// ✅ About Section
gsap.from(".section-title", {
  scrollTrigger: { trigger: ".about", start: "top 80%" },
  opacity: 0, y: 40, duration: 1
});
gsap.from(".about-text", {
  scrollTrigger: { trigger: ".about", start: "top 80%" },
  opacity: 0, y: 20, duration: 1, stagger: 0.3
});

// ✅ How It Works
gsap.from(".step", {
  scrollTrigger: { trigger: ".how-it-works", start: "top 80%" },
  opacity: 0, y: 40, duration: 1, stagger: 0.2
});

// ✅ Domains
gsap.from(".domain-card", {
  scrollTrigger: { trigger: ".domains", start: "top 80%" },
  opacity: 0, scale: 0.9, duration: 1, stagger: 0.2, ease: "power2.out"
});
VanillaTilt.init(document.querySelectorAll(".domain-card"), {
  max: 15, speed: 400, glare: true, "max-glare": 0.3
});

// ✅ Benefits
gsap.from(".benefit-card", {
  scrollTrigger: { trigger: ".benefits", start: "top 80%" },
  opacity: 0, y: 30, duration: 1, stagger: 0.2
});
VanillaTilt.init(document.querySelectorAll(".benefit-card"), {
  max: 15, speed: 400, glare: true, "max-glare": 0.2
});

// ✅ Testimonials
gsap.from(".testimonial-card", {
  scrollTrigger: { trigger: ".testimonials", start: "top 80%" },
  opacity: 0, y: 30, duration: 1, stagger: 0.2
});
VanillaTilt.init(document.querySelectorAll(".testimonial-card"), {
  max: 15, speed: 400, glare: true, "max-glare": 0.2
});

// 🎨 Theme Switcher
const themeSwitcher = document.getElementById('theme-switcher');
if (themeSwitcher) {
  themeSwitcher.addEventListener('change', () => {
    const value = themeSwitcher.value;
    document.body.classList.forEach(c => {
      if (c.startsWith("theme-")) document.body.classList.remove(c);
    });
    if (value !== 'default') {
      document.body.classList.add(`theme-${value}`);
    }
  });
}

// 💡 Theme CSS via JS injection
const style = document.createElement("style");
style.innerHTML = `
  .theme-neon { background-color:rgb(47, 3, 68); color:rgb(14, 79, 3); }
  .theme-ocean { background-color:rgb(12, 80, 164); color:rgb(13, 3, 62); }
  .theme-retro { background-color: #2e2b2b; color: #f3f3a1; }
`;
document.head.appendChild(style);

// 🔐 Login Modal
const modal = document.getElementById('login-modal');
const openBtn = document.getElementById('login-trigger');
const closeBtn = document.getElementById('close-modal');

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener('click', () => modal.style.display = 'flex');
  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });
}

// 🎉 Confetti on Apply Click
const confettiScript = document.createElement("script");
confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
confettiScript.onload = () => {
  document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.addEventListener('click', () => createConfetti());
  });
};
document.head.appendChild(confettiScript);

function createConfetti() {
  const duration = 1.5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// 🌌 Cursor Particle Trail
const canvas = document.getElementById('cursor-particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', e => {
  for (let i = 0; i < 5; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      alpha: 1,
      size: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2
    });
  }
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let remaining = [];
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.x += p.dx;
    p.y += p.dy;
    p.alpha -= 0.01;
    if (p.alpha > 0) {
      ctx.fillStyle = `rgba(0, 198, 255, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      remaining.push(p);
    }
  }
  particles = remaining;
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Splash Loader Removal
window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash-loader");
    splash.style.opacity = 0;
    setTimeout(() => splash.remove(), 600);
  }, 1800);
});

// Scroll Progress Bar Logic
window.addEventListener("scroll", () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.querySelector(".scroll-progress").style.width = `${scrolled}%`;
});

// Animated Counter Logic
const counters = document.querySelectorAll('.counter');
const speed = 200;

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
      observer.unobserve(counter);
    }
  });
}, { threshold: 1 });

counters.forEach(counter => observer.observe(counter));

// FAB Menu Toggle
const fab = document.getElementById('fab');
const fabToggle = document.getElementById('fab-toggle');
const fabOptions = fab.querySelector('.fab-options');

fabToggle.addEventListener('click', () => {
  fabOptions.style.display = fabOptions.style.display === 'flex' ? 'none' : 'flex';
});

// Blob Animation
gsap.to(".blob-bg path", {
  duration: 12,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
  attr: {
    d: "M47.3,-71.1C60.5,-60.5,70.9,-47.2,78.3,-31.7C85.7,-16.3,90.1,0.4,84.2,14.4C78.4,28.3,62.4,39.4,48.1,52.4C33.8,65.3,21.2,80.2,6.3,85.1C-8.6,90.1,-25.9,85.1,-37.7,74.4C-49.6,63.8,-56.1,47.5,-66.1,31.8C-76.1,16.2,-89.6,1.3,-86.6,-10.1C-83.6,-21.6,-64,-29.6,-49.2,-42.6C-34.5,-55.5,-24.7,-73.4,-10.4,-79.1C3.9,-84.9,23.9,-78.3,47.3,-71.1Z"
  }
});

const texts = ["Build Skills.", "Earn Internships.", "Launch Your Career."];
let i = 0, j = 0, isDeleting = false;

function type() {
  const currentText = texts[i];
  const display = currentText.slice(0, j);
  document.getElementById("typing-text").textContent = display;

  if (!isDeleting && j < currentText.length) {
    j++;
    setTimeout(type, 100);
  } else if (isDeleting && j > 0) {
    j--;
    setTimeout(type, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % texts.length;
    setTimeout(type, 1000);
  }
}
type();

document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
  });
});

document.getElementById('search-input').addEventListener('input', e => {
  const val = e.target.value.toLowerCase();

  document.querySelectorAll('.domain-card, .testimonial-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(val) ? 'block' : 'none';
  });
});
