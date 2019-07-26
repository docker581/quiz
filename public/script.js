window.onload = function() {
    let xlinks = document.querySelectorAll('.xlink');
    xlinks.forEach(function(xlink) {
        xlink.addEventListener('click', handler)
    });
    function handler() { //закрытие мобильного меню
        if (window.innerWidth < 992) {
            let navbarToggler = document.querySelector('.navbar-toggler');
            navbarToggler.click();
        }
    }
};