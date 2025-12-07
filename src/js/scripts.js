//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // --------------------------------------------------
    // Navbar shrink
    // --------------------------------------------------
    const navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;

        // Si quieres que al estar arriba NO esté shrink, descomenta:
        // if (window.scrollY === 0) {
        //     navbarCollapsible.classList.remove('navbar-shrink');
        // } else {
        //     navbarCollapsible.classList.add('navbar-shrink');
        // }
    };

    // Shrink inicial y en scroll
    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    // --------------------------------------------------
    // ScrollSpy SOLO en páginas con secciones internas
    // (index.html tiene #inicio; contacto.html no)
    // --------------------------------------------------
    const mainNav = document.body.querySelector('#mainNav');
    const hasInPageSections = document.querySelector('#inicio');

    if (
        mainNav &&
        hasInPageSections &&
        typeof bootstrap !== 'undefined' &&
        bootstrap.ScrollSpy
    ) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    // --------------------------------------------------
    // Cerrar menú responsive al hacer click en una opción
    // --------------------------------------------------
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );

    responsiveNavItems.forEach(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (
                navbarToggler &&
                window.getComputedStyle(navbarToggler).display !== 'none'
            ) {
                navbarToggler.click();
            }
        });
    });

    // --------------------------------------------------
    // SimpleLightbox (galería) – solo si está cargado
    // --------------------------------------------------
    if (
        typeof SimpleLightbox !== 'undefined' &&
        document.querySelector('#portfolio a.portfolio-box')
    ) {
        new SimpleLightbox({
            elements: '#portfolio a.portfolio-box',
        });
    }

    // --------------------------------------------------
    // Enlace de WhatsApp flotante (todas las páginas)
    // --------------------------------------------------
    (function () {
        const whatsappLink = document.getElementById('whatsapp-link');
        if (!whatsappLink) return;

        const phoneNumber = '573148387523';
        const message =
            'Quisiera%20recibir%20información%20sobre%20sus%20servicios';

        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        const baseUrl = isMobile
            ? 'https://api.whatsapp.com/send'
            : 'https://web.whatsapp.com/send';

        whatsappLink.href = `${baseUrl}?phone=${phoneNumber}&text=${message}`;
    })();

    // --------------------------------------------------
    // Scroll suave para los enlaces internos del menú
    // (solo los que tienen clase .link, usados en index)
    // --------------------------------------------------
    (function () {
        const menuLinks = document.querySelectorAll('nav .link');
        if (!menuLinks.length) return;

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function scrollToSection(event) {
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;

            event.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            const headerOffset = 70;
            const targetOffsetTop = targetSection.offsetTop - headerOffset;
            const startPosition = window.pageYOffset;
            const distance = targetOffsetTop - startPosition;
            const duration = 1000;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const elapsedTime = currentTime - start;
                const progress = Math.min(elapsedTime / duration, 1);
                const ease = easeInOutQuad(progress);
                const newPosition = startPosition + distance * ease;
                window.scrollTo(0, newPosition);
                if (progress < 1) requestAnimationFrame(animation);
            }

            requestAnimationFrame(animation);
        }

        menuLinks.forEach(link => {
            link.addEventListener('click', scrollToSection);
        });
    })();

    // --------------------------------------------------
    // Slider principal (solo index: usa .slide_new)
    // --------------------------------------------------
    (function () {
        let slides = Array.from(document.querySelectorAll('.slide_new'));
        if (!slides.length) return;

        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }

        function nextSlide() {
            if (!slides.length) return;
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            if (!slides.length) return;
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        // Exponer para los botones del HTML
        window.nextSlide = nextSlide;
        window.prevSlide = prevSlide;

        // Inicial
        showSlide(currentSlide);
        // Cambio automático cada 8 segundos
        setInterval(nextSlide, 8000);
    })();
});
