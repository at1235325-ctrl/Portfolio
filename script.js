

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 500);

});


/* =========================================
   TYPING ANIMATION
========================================= */

const typingText = document.getElementById("typingText");

const words = [
    "Full Stack Developer",
    "Web Developer",
    "Problem Solver",
    "Tech Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 90
    );
}

typeEffect();


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const icon = menuBtn.querySelector("i");

    if (navMenu.classList.contains("open")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================
   ACTIVE NAV LINK
========================================= */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   PARTICLE BACKGROUND
========================================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let animationFrame;

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 1.8 + 0.5;

        this.speedX =
            (Math.random() - 0.5) * 0.35;

        this.speedY =
            (Math.random() - 0.5) * 0.35;

        this.opacity =
            Math.random() * 0.6 + 0.1;

    }


    update() {

        this.x += this.speedX;
        this.y += this.speedY;


        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(139,92,246,${this.opacity})`;

        ctx.fill();

    }

}


/* Create particles */

function createParticles() {

    particles = [];

    const particleCount =
        window.innerWidth < 600 ? 55 : 110;

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}

createParticles();


/* Draw connecting lines */

function connectParticles() {

    for (
        let a = 0;
        a < particles.length;
        a++
    ) {

        for (
            let b = a + 1;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x -
                particles[b].x;

            const dy =
                particles[a].y -
                particles[b].y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                const opacity =
                    0.12 -
                    distance / 120 * 0.12;

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(99,102,241,${opacity})`;

                ctx.lineWidth = 0.6;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}


/* Animation */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(particle => {

        particle.update();
        particle.draw();

    });

    connectParticles();

    animationFrame =
        requestAnimationFrame(
            animateParticles
        );

}

animateParticles();


/* Recreate particles after resize */

window.addEventListener("resize", () => {

    createParticles();

});


/* =========================================
   CURSOR GLOW
========================================= */

const cursorGlow =
    document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".section, .hero-content, .hero-visual"
    );

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================================
   BACK TO TOP
========================================= */

const backTop =
    document.getElementById("backTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !email || !subject || !message) {

        formMessage.textContent =
            "Please fill in all fields.";

        return;

    }


    /*
       This opens the visitor's email client.
       Replace your@email.com with your real email.
    */

    const mailto =
        `mailto:your@email.com` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `${message}`
        )}`;


    window.location.href = mailto;


    formMessage.textContent =
        "Opening your email application...";

});


/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================
   CODE WINDOW MOUSE EFFECT
========================================= */

const codeWindow =
    document.querySelector(".code-window");

if (codeWindow) {

    codeWindow.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth < 900) {
                return;
            }

            const rect =
                codeWindow.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 8;

            const rotateX =
                ((y / rect.height) - 0.5) * -8;


            codeWindow.style.transform =
                `perspective(1000px)
                 rotateY(${rotateY}deg)
                 rotateX(${rotateX}deg)`;

        }
    );


    codeWindow.addEventListener(
        "mouseleave",
        () => {

            codeWindow.style.transform =
                `perspective(1000px)
                 rotateY(-7deg)
                 rotateX(3deg)`;

        }
    );

}


/* =========================================
   CARD TILT EFFECT
========================================= */

const cards =
    document.querySelectorAll(
        ".project-card, .skill-card"
    );


cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth < 900) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 4;

            const rotateX =
                ((y / rect.height) - 0.5) * -4;


            card.style.transform =
                `translateY(-8px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});

