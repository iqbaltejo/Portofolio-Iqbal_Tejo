window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Swiper
     var swiper = new Swiper(".projectSwiper", {
                slidesPerView: 1,
                spaceBetween: 50,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                effect: "slide",
                speed: 600,
            });

    // Ligthbox
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.getElementsByClassName("image-close"[0]);

    document.querySelectorAll(".project-gallery img").forEach(img => {
        img.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    closeBtn.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }

    // var swiper = new Swiper(".mySwiper", {
    //             slidePerView: 3,  //tampilkan 3 gambar per tampilan
    //             spaceBetween: 20, //Jarak antar gambar
    //             loop: true, //putar terus
    //             centerSlides: true, //slide aktif di tengah
    //             autoplay: {
    //                 delay: 2500, //waktu perpindahan (ms)
    //                 disableOnnInteraction: false,
    //             },
    //             pagination: {
    //                 el: ".swiper-pagination,",
    //                 clickable: true,
    //             },
    //             navigation: {
    //                 nextEl: ".swiper-button-next",
    //                 prevEl: ".swiper-button-prev",
    //             },
    //             breakpoints: {
    //                 0: {slidesPerView: 1},
    //                 768: {slidesPerView: 2},
    //                 992: {slidesPerView: 3}
    //             }
    //         });
