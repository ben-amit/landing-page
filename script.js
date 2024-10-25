document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('translate-btn');
    let isEnglish = true; // Start in English

    toggleButton.addEventListener('click', function () {
        isEnglish = !isEnglish; // Toggle language state

        // Select all elements with data attributes
        const elements = document.querySelectorAll('[data-en], [data-he]');
        elements.forEach(function (element) {
            // Change the innerHTML based on the current language state
            element.innerHTML = isEnglish ? element.getAttribute('data-en') : element.getAttribute('data-he');
        });

        // Change the button text based on the current language state
        toggleButton.innerHTML = isEnglish ? toggleButton.getAttribute('data-he') : toggleButton.getAttribute('data-en');
    });
});
