document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav ul');
  const links = document.querySelectorAll('nav a');
  let active = null;
  let anim;

  const animate = (from, to) => {
    clearInterval(anim);
    const start = Date.now();

    anim = setInterval(() => {
      const p = Math.min((Date.now() - start) / 500, 1);
      const e = 1 - Math.pow(1 - p, 3);

      nav.style.setProperty('--x', `${from + (to - from) * e}px`);
      nav.style.setProperty('--y', `${-30 * Math.sin(p * Math.PI)}px`);
      nav.style.setProperty('--r', `${200 * Math.sin(p * Math.PI)}deg`);

      if (p === 1) {
        clearInterval(anim);
        nav.style.setProperty('--y', '0px');
        nav.style.setProperty('--r', '0deg');
      }
    }, 16);
  };

  const centerOf = el =>
    el.getBoundingClientRect().left +
    el.offsetWidth / 2 -
    nav.getBoundingClientRect().left -
    6;

  const move = el => {
    const current = parseFloat(nav.style.getPropertyValue('--x')) || 0;
    animate(current, centerOf(el));
    nav.classList.add('show');
  };

  links.forEach(link => {
    link.addEventListener('mouseenter', () => move(link));
    link.addEventListener('click', () => {
      active?.classList.remove('active');
      active = link;
      link.classList.add('active');
      move(link);
    });
  });

  // Scroll Spy Logic
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.3 // Trigger when 30% of section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`nav a[href="#${id}"]`);
        
        if (link && active !== link) {
          active?.classList.remove('active');
          active = link;
          active.classList.add('active');
          move(active);
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  if (links[0]) {
    active = links[0];
    active.classList.add('active');
    move(active);
  }

    // Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = menuToggle?.querySelector('i');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            
            // Toggle icon
            if (navMenu.classList.contains('open')) {
                menuIcon.classList.replace('ri-menu-3-line', 'ri-close-line');
            } else {
                menuIcon.classList.replace('ri-close-line', 'ri-menu-3-line');
            }
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                if (menuIcon) menuIcon.classList.replace('ri-close-line', 'ri-menu-3-line');
            });
        });
    }
});
