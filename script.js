// Image Data
const images = [
    "att.476Ya2Zk6fmEsVvt0tUaq6lwWXpwmb4azAW_9s1MbdM.jpg.jpeg",
    "att.5tdiU96zEGGEqVVhANywcof1QagHg4E8GJHZ4UJB0Kw.jpg.jpeg",
    "att.BwDNmuxjlHV033ZuiIhD2v0KxBxTyxH1JZH4jG2jBus.jpg.jpeg",
    "att.G2LxiaLz6H0Mwis4faKBAk_Dd3OkwC4FslokvtWP6LA.jpg.jpeg",
    "att.MiyoL9G1dipHnL8AMpgHNF9ZyZEqczlSuxXocQlF50Y.jpg.jpeg",
    "att.P1O5fZIbgv9kyddjKF97wLQWiVrO9hrp2MoS2KgLjrA.jpg.jpeg",
    "att.SlOv6A7o9q9HXTXoLfLZ_gYkU8Ggdo4ym2K8j2cDpOA.jpg.jpeg",
    "att.TpqGL199hOvn60sH5Q_GKYPOKsqsw-5Y0j3xxQG_u-0.jpg.jpeg",
    "att.Uz-8l1qycZsKOnIKWsnNauFWZoiEFLrgFFnDFQ-cKsg.webp.webp",
    "att.Wf9cQpWbSbiIM6A--9qkhiBDXh_eeXZRZkCI0zFce8E.jpg.jpeg",
    "att.ZCKT2NE3_woRO08VK3vZwzUvkp2ers_RelO9uku8e7E.jpg.jpeg",
    "att.ZiNEILxNGgx-CAU-AUSxdCnETdoOKM5H6OydqH7FYHo.jpg.jpeg",
    "att.df3LTHDAxXihZWbacqBc5W4PG2zspZBs5qO0zyNWsKc.jpg.jpeg",
    "att.eSeiVych9vSmMcrG7RlX0UPbTqqS4jlQhyw2KIpQNlg.png.jpeg",
    "att.edLhvIYblN1FpMui8HwzhEawNrIipCvzD3gLGzAViPQ.jpg.jpeg",
    "att.fdV5pb675Dng8W5UrdF4yGJuWVMxPWvxgjqm0jvI2HM.gif.gif",
    "att.ivS-ETMnO0fC45SoXCmiz3YZjUFB0bPdMlkxrcdJ1lw.jpg.jpeg",
    "att.j710Sch5W1OJTOYfM3_hjAT5wTGKd5hA8hO1rtkkT2I.jpg.jpeg",
    "att.kx-ntbHftmzkNVEyW76p7W3g1zxAwnwmhjWi27MowTk.jpg.jpeg",
    "att.m6-7KGlzwumk6nn1SsPzhmGwuhAgGvTbcUtjGJIi1fU.jpg.jpeg",
    "att.rhAGHco1utmNz3Y09q4iJXnlmhCs050NL_Ahp83qV90.jpg.jpeg",
    "att.sp_AQty_yT83VIzRE4jTL7Ioa4IDHFKgvabj5FWZ_YE.jpg.jpeg",
    "att.z7ez_4JQI3x_xXYKhPWsMN-n5XmCyE_YsS4pTceA6MU.jpg.jpeg"
];

// Carousel Logic
let currentSlide = 0;
const carouselSlide = document.getElementById('carouselSlide');

function initCarousel() {
    images.forEach(imgSrc => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        const img = document.createElement('img');
        img.src = imgSrc;
        img.loading = "lazy";
        item.appendChild(img);
        carouselSlide.appendChild(item);
    });
}

function updateCarousel() {
    carouselSlide.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % images.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
    updateCarousel();
}

// Section Navigation
function nextSection(sectionId) {
    document.querySelectorAll('.glass-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// --- Flower Fireworks Logic ---
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Petal {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 3 + 2;
        this.friction = 0.96;
        this.gravity = 0.15;
        this.opacity = 1;
        this.size = Math.random() * 3 + 2;
        this.vx = Math.cos(this.angle) * this.velocity;
        this.vy = Math.sin(this.angle) * this.velocity;
    }

    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        // Draw petal shape
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size, -this.size, this.size * 2, 0, 0, this.size * 2);
        ctx.bezierCurveTo(-this.size * 2, 0, -this.size, -this.size, 0, 0);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.01;
    }
}

let particles = [];
const colors = ['#ff4d6d', '#ff758f', '#c9184a', '#ffb3c1', '#ffffff'];

function createFirework(x, y) {
    const petalCount = 40;
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < petalCount; i++) {
        particles.push(new Petal(x, y, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        if (p.opacity > 0) {
            p.update();
            p.draw();
        } else {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

// Initial Fireworks
function startFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.5
            );
        }, i * 500);
    }
}

// Floating Roses Generation
function createRoses() {
    const container = document.querySelector('.floating-roses');
    const roseEmojis = ['🌹', '🌷', '🌸', '✨'];
    for (let i = 0; i < 15; i++) {
        const rose = document.createElement('div');
        rose.className = 'rose';
        rose.innerText = roseEmojis[Math.floor(Math.random() * roseEmojis.length)];
        rose.style.left = Math.random() * 100 + 'vw';
        rose.style.animationDelay = Math.random() * 10 + 's';
        rose.style.fontSize = (Math.random() * 20 + 20) + 'px';
        container.appendChild(rose);
    }
}

// --- Countdown & Date Lock Logic ---
const targetDate = new Date('February 14, 2026 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        unlockPage();
        return true;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    return false;
}

function unlockPage() {
    const lockScreen = document.getElementById('lockScreen');
    const countdownMusic = document.getElementById('countdownMusic');
    const unlockedMusic = document.getElementById('unlockedMusic');

    if (lockScreen) {
        lockScreen.classList.add('unlocked');

        // Music transition
        if (countdownMusic) {
            countdownMusic.pause();
            countdownMusic.currentTime = 0;
        }
        if (unlockedMusic) {
            unlockedMusic.play().catch(err => console.log("Audio play blocked:", err));
        }

        setTimeout(() => {
            lockScreen.style.display = 'none';
        }, 1000);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    animate();

    // Manual music trigger
    if (btnMusic && countdownMusic) {
        btnMusic.addEventListener('click', () => {
            // "Prime" both audios for mobile
            if (unlockedMusic) { unlockedMusic.play().then(() => unlockedMusic.pause()).catch(e => { }); }

            countdownMusic.play().then(() => {
                if (btnMusic) btnMusic.parentElement.style.display = 'none';
            }).catch(err => console.log("Audio play blocked:", err));
        });
    }

    // Attempt to play music on first interaction to bypass autoplay restrictions
    const startAudio = () => {
        // Unlock both audios for mobile transitions
        if (countdownMusic) {
            countdownMusic.play().then(() => {
                if (!document.getElementById('lockScreen').classList.contains('unlocked')) {
                    // Keep playing if locked
                } else {
                    countdownMusic.pause();
                }
            }).catch(e => { });
        }

        if (unlockedMusic) { unlockedMusic.play().then(() => unlockedMusic.pause()).catch(e => { }); }

        document.removeEventListener('click', startAudio);
        document.removeEventListener('touchstart', startAudio);
    };
    document.addEventListener('click', startAudio);
    document.addEventListener('touchstart', startAudio); // Better for mobile

    const isUnlocked = updateCountdown();
    if (!isUnlocked) {
        const countdownInterval = setInterval(() => {
            if (updateCountdown()) {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    startFireworks();
    createRoses();
});
