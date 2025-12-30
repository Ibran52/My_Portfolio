console.log("Home script loaded");

import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"

// Tubes Cursor Initialization
const app = TubesCursor(document.getElementById('canvas'), {
  tubes: {
    colors: ["#f967fb", "#53bc28", "#6958d5"],
    lights: {
      intensity: 200,
      colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
    }
  }
})

document.body.addEventListener('click', () => {
  const colors = randomColors(3)
  const lightsColors = randomColors(4)
  app.tubes.setColors(colors)
  app.tubes.setLightsColors(lightsColors)
})

function randomColors (count) {
    return new Array(count)
        .fill(0)
        .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'))
}

// Typing Effect
const roles = [
  "MERN Stack Developer",
  "Web Developer",
  "Backend Developer"];
const roleTextElement = document.querySelector('.role-text');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; 
    } else {
        roleTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

document.addEventListener("DOMContentLoaded", () => {
    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            const formData = {
                name: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                message: contactForm.querySelector('textarea').value
            };

            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    alert('Failed to send message: ' + result.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Cursor Toggle Logic
    const cursorToggleBtn = document.querySelector('.cursor-toggle');
    const cursorIcon = document.getElementById('cursor-icon');
    const canvas = document.getElementById('canvas');

    if (cursorToggleBtn && canvas) {
        // Check saved preference
        const cursorEnabled = localStorage.getItem('cursorEnabled') !== 'false'; // Default to true
        
        if (!cursorEnabled) {
            canvas.style.opacity = '0';
            canvas.style.pointerEvents = 'none'; // Ensure clicks pass through when hidden
            if(cursorIcon) cursorIcon.classList.replace('ri-mouse-fill', 'ri-mouse-line'); // Change icon to indicate off state if desired, or keep as toggle
        }

        cursorToggleBtn.addEventListener('click', () => {
            const isHidden = canvas.style.opacity === '0';
            
            if (isHidden) {
                canvas.style.opacity = '1';
                canvas.style.pointerEvents = 'auto'; // Or whatever default was. Actually canvas usually z-index -1 so pointer events might not matter but opacity does.
                if(cursorIcon) cursorIcon.classList.replace('ri-mouse-line', 'ri-mouse-fill');
                localStorage.setItem('cursorEnabled', 'true');
            } else {
                canvas.style.opacity = '0';
                canvas.style.pointerEvents = 'none';
                if(cursorIcon) cursorIcon.classList.replace('ri-mouse-fill', 'ri-mouse-line');
                localStorage.setItem('cursorEnabled', 'false');
            }
        });
    }

    const track = document.querySelector(".carousel-track");
	if (!track) return; // Exit if carousel not present

	const cards = document.querySelectorAll(".deconstructed-card");
	const prevBtn = document.querySelector(".carousel-button.prev");
	const nextBtn = document.querySelector(".carousel-button.next");
	const dotsContainer = document.querySelector(".dots-container");

	cards.forEach((_, index) => {
		const dot = document.createElement("div");
		dot.classList.add("dot");
		if (index === 0) dot.classList.add("active");
		dot.addEventListener("click", () => goToCard(index));
		dotsContainer.appendChild(dot);
	});

	const dots = document.querySelectorAll(".dot");

	const cardWidth = cards[0].offsetWidth;
	const cardMargin = 40;
	const totalCardWidth = cardWidth + cardMargin;

	let currentIndex = 0;

	cards.forEach((card) => {
		card.addEventListener("mousemove", (e) => {
			const rect = card.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = (e.clientY - rect.top) / rect.height;
			const xDeg = (y - 0.5) * 8;
			const yDeg = (x - 0.5) * -8;
			card.style.transform = `perspective(1200px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
			const layers = card.querySelectorAll(".card-layer");
			layers.forEach((layer, index) => {
				const depth = 30 * (index + 1);
				const translateZ = depth;
				const offsetX = (x - 0.5) * 10 * (index + 1);
				const offsetY = (y - 0.5) * 10 * (index + 1);
				layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${translateZ}px)`;
			});
			const waveSvg = card.querySelector(".wave-svg");
			if (waveSvg) {
				const moveX = (x - 0.5) * -20;
				const moveY = (y - 0.5) * -20;
				waveSvg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
				const wavePaths = waveSvg.querySelectorAll("path:not(:first-child)");
				wavePaths.forEach((path, index) => {
					const factor = 1 + index * 0.5;
					const waveX = moveX * factor * 0.5;
					const waveY = moveY * factor * 0.3;
					path.style.transform = `translate(${waveX}px, ${waveY}px)`;
				});
			}
			const bgObjects = card.querySelectorAll(".bg-object");
			bgObjects.forEach((obj, index) => {
				const factorX = (index + 1) * 10;
				const factorY = (index + 1) * 8;
				const moveX = (x - 0.5) * factorX;
				const moveY = (y - 0.5) * factorY;
				if (obj.classList.contains("square")) {
					obj.style.transform = `rotate(45deg) translate(${moveX}px, ${moveY}px)`;
				} else if (obj.classList.contains("triangle")) {
					obj.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(1)`;
				} else {
					obj.style.transform = `translate(${moveX}px, ${moveY}px)`;
				}
			});
		});

		card.addEventListener("mouseleave", () => {
			card.style.transform = "";
			const layers = card.querySelectorAll(".card-layer");
			layers.forEach((layer) => {
				layer.style.transform = "";
			});
			const waveSvg = card.querySelector(".wave-svg");
			if (waveSvg) {
				waveSvg.style.transform = "";
				const wavePaths = waveSvg.querySelectorAll("path:not(:first-child)");
				wavePaths.forEach((path) => {
					path.style.transform = "";
				});
			}
			const bgObjects = card.querySelectorAll(".bg-object");
			bgObjects.forEach((obj) => {
				if (obj.classList.contains("square")) {
					obj.style.transform = "rotate(45deg) translateY(-20px)";
				} else if (obj.classList.contains("triangle")) {
					obj.style.transform = "translate(-50%, -50%) scale(0.5)";
				} else {
					obj.style.transform = "translateY(20px)";
				}
			});
		});
	});

	function goToCard(index) {
		index = Math.max(0, Math.min(index, cards.length - 1));

		currentIndex = index;
		updateCarousel();
	}

	function updateCarousel() {
		const translateX = -currentIndex * totalCardWidth;

		track.style.transform = `translateX(${translateX}px)`;

		dots.forEach((dot, index) => {
			dot.classList.toggle("active", index === currentIndex);
		});
	}

	prevBtn.addEventListener("click", () => {
		goToCard(currentIndex - 1);
	});

	nextBtn.addEventListener("click", () => {
		goToCard(currentIndex + 1);
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowLeft") {
			goToCard(currentIndex - 1);
		} else if (e.key === "ArrowRight") {
			goToCard(currentIndex + 1);
		}
	});

	let touchStartX = 0;
	let touchEndX = 0;

	track.addEventListener("touchstart", (e) => {
		touchStartX = e.changedTouches[0].screenX;
	});

	track.addEventListener("touchend", (e) => {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
	});

	function handleSwipe() {
		if (touchStartX - touchEndX > 50) {
			goToCard(currentIndex + 1);
		} else if (touchEndX - touchStartX > 50) {
			goToCard(currentIndex - 1);
		}
	}

	window.addEventListener("resize", () => {
		const newCardWidth = cards[0].offsetWidth;
		const newTotalCardWidth = newCardWidth + cardMargin;

		const translateX = -currentIndex * newTotalCardWidth;
		track.style.transition = "none";
		track.style.transform = `translateX(${translateX}px)`;

		setTimeout(() => {
			track.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
		}, 50);
	});

	updateCarousel();
});
