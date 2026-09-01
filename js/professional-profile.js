/**
 * Professional Profile Tabs Controller
 * Memastikan perilaku tab Bootstrap 5 berjalan aman tanpa bentrok dengan skrip bawaan.
 */

document.addEventListener('DOMContentLoaded', function () {
    const triggerTabList = [].slice.call(document.querySelectorAll('#profile-tabs button'));
    
    triggerTabList.forEach(function (triggerEl) {
        const tabTrigger = new bootstrap.Tab(triggerEl);

        triggerEl.addEventListener('click', function (event) {
            event.preventDefault();
            tabTrigger.show();
        });
    });

    // Opsional: Otomatis scroll sedikit ke arah konten tab jika diakses via perangkat mobile
    const tabContainer = document.getElementById('profile-tabs');
    triggerTabList.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function () {
            if (window.innerWidth < 768) {
                tabContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});