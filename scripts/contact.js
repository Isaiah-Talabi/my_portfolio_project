document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = [
        { id: 'contactName', validate: val => val.length > 0 },
        { id: 'contactEmail', validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
        { id: 'contactPhone', validate: val => /^\d+$/.test(val) && val.length > 0 },
        { id: 'contactMessage', validate: val => val.length > 0 }
    ];

    fields.forEach(fieldObj => {
        const input = document.getElementById(fieldObj.id);
        if (!input) return;

        input.addEventListener('input', () => {
            const isValid = fieldObj.validate(input.value.trim());
            const errorMsg = input.nextElementSibling;
            
            if (isValid) {
                input.classList.remove('invalid');
                input.classList.add('valid');
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.style.display = 'none';
                }
            } else {
                input.classList.remove('valid');
                input.classList.add('invalid');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        fields.forEach(fieldObj => {
            const input = document.getElementById(fieldObj.id);
            if (!input) return;

            const isValid = fieldObj.validate(input.value.trim());
            const errorMsg = input.nextElementSibling;

            if (!isValid) {
                isFormValid = false;
                input.classList.add('invalid');
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.style.display = 'block';
                }
            }
        });

        if (isFormValid) {
            showToast("Message pipeline validation complete. Transmission submitted!", true);
            form.reset();
            fields.forEach(fieldObj => {
                const input = document.getElementById(fieldObj.id);
                if (input) input.classList.remove('valid', 'invalid');
            });
        } else {
            showToast("Form processing halted. Correct syntax validation faults.", false);
        }
    });
});