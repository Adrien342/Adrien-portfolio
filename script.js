const menuToggle = document.querySelector('#menu-toggle');
const siteNav = document.querySelector('#site-nav');
const navLinks = [...document.querySelectorAll('nav a')];
const sections = [...document.querySelectorAll('main section')];
const contactForm = document.querySelector('form');
const formStatus = document.querySelector('#form-status');

menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav?.classList.toggle('is-open', !isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        menuToggle?.setAttribute('aria-expanded', 'false');
        siteNav?.classList.remove('is-open');
    });
});

sections.forEach((section) => section.classList.add('reveal-ready'));

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        entry.target.classList.add('is-visible');
        const activeLink = navLinks.find((link) => link.getAttribute('href') === `#${entry.target.id}`);
        navLinks.forEach((link) => link.classList.remove('is-active'));
        activeLink?.classList.add('is-active');
    });
}, { threshold: 0.2 });

sections.forEach((section) => sectionObserver.observe(section));

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (formStatus) {
        formStatus.textContent = 'Thanks. Your message is ready to send.';
    }
    contactForm.reset();
});
