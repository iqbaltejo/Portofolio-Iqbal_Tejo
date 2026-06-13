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

    // Image Zoom + Slide
    const galleries = document.querySelectorAll('.project-gallery');

    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll ('img');
        let currentIndex = 0;

        images.forEach((img, index)=> {
            img.addEventListener("click", function() {  
                 currentIndex = index;

                  // Buat overlay
                const overlay = document.createElement('div');
                overlay.classList.add('image-zoom-overlay');

                // Gambar besar
                const zoomedImg = document.createElement('img');
                zoomedImg.src = img.src;
                overlay.appendChild(zoomedImg);

                // Tombol navigasi
                const prevBtn = document.createElement('div');
                prevBtn.classList.add('image-zoom-prev');
                prevBtn.innerHTML = '&#10094;'; // panah kiri
                const nextBtn = document.createElement('div');
                nextBtn.classList.add('image-zoom-next');
                nextBtn.innerHTML = '&#10095;'; // panah kanan

                overlay.appendChild(prevBtn);
                overlay.appendChild(nextBtn);
                document.body.appendChild(overlay);

                setTimeout(() => overlay.classList.add('active'), 10);

                // Fungsi update gambar
                const updateImage = () => {
                    zoomedImg.src = images[currentIndex].src;
                };

                // Tombol prev
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    updateImage();
                });

                // Tombol next
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentIndex = (currentIndex + 1) % images.length;
                    updateImage();
                });

                // Tutup klik luar
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        overlay.classList.remove('active');
                        setTimeout(() => overlay.remove(), 300);
                    }
                });

                // Tutup pakai ESC
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        overlay.classList.remove('active');
                        setTimeout(() => overlay.remove(), 300);
                    } else if (e.key === 'ArrowLeft') {
                        currentIndex = (currentIndex - 1 + images.length) % images.length;
                        updateImage();
                    } else if (e.key === 'ArrowRight') {
                        currentIndex = (currentIndex + 1) % images.length;
                        updateImage();
                    }
                }, { once: true });
            });
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
