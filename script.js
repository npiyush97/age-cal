const dayInput = document.querySelector('.day');
const monthInput = document.querySelector('.month');
const yearInput = document.querySelector('.year');
const dayError = document.querySelector('.day-error');
const monthError = document.querySelector('.month-error');
const yearError = document.querySelector('.year-error');
const dayContainer = document.querySelector('.input-container-day');
const monthContainer = document.querySelector('.input-container-month');
const yearContainer = document.querySelector('.input-container-year');
const btn = document.querySelector('.btn');

btn.addEventListener('click', (e) => {
    const allInputsFilled = dayInput.value.length > 0 && monthInput.value.length > 0 && yearInput.value.length > 0;
    const date = new Date(`${yearInput.value}/${monthInput.value}/${dayInput.value}`);
    const currentDate = new Date();
    const [dayErrMsg, monthErrMsg, yearErrMsg] = ['Must be a valid day', 'Must be a valid month', 'Must be in the past'];

    // Clear previous errors
    clearErrors();

    // Preliminary checks
    if (!preliminaryCheckAndError()) {
        return;
    }

    // Check if all inputs are filled
    if (!allInputsFilled) {
        return;
    }

    // Validate input date
    if (date.toString() === 'Invalid Date') {
        return;
    }

    const diff = Math.floor((currentDate - date) / (1000 * 60 * 60 * 24));
    let yearsDiff = currentDate.getFullYear() - date.getFullYear();
    let monthsDiff = currentDate.getMonth() - date.getMonth();
    let daysDiff = currentDate.getDate() - date.getDate();

    if (yearsDiff < 0) {
        setError(yearError, yearErrMsg);
        return;
    }
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
        yearsDiff--;
        monthsDiff += (monthsDiff < 0 ? 12 : 0)
    }
    if (daysDiff < 0) {
        const daysInLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        daysDiff += daysInLastMonth;
        monthsDiff--;
    }
    console.log(monthsDiff)
    if (yearsDiff < 0) {
        setError(yearError, yearErrMsg);
        return;
    }
    if (monthsDiff < 0) {
        setError(monthError, monthErrMsg);
        return;
    }
    if (daysDiff < 0) {
        setError(dayError, dayErrMsg);
        return;
    }

    displayResult(daysDiff, monthsDiff, yearsDiff);
});

function preliminaryCheckAndError() {
    const errors = [
        { input: dayInput, errorEl: dayError, message: 'This Field is required' },
        { input: monthInput, errorEl: monthError, message: 'This Field is required' },
        { input: yearInput, errorEl: yearError, message: 'This Field is required' }
    ];

    let passed = true;
    errors.forEach(({ input, errorEl, message }) => {
        if (input.value.length === 0) {
            setError(errorEl, message);
            passed = false;
        }
    });
    return passed;
}

function setError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.parentElement.classList.add('error');
}

function clearErrors() {
    [dayError, monthError, yearError].forEach(errorEl => {
        errorEl.textContent = '';
        errorEl.parentElement.classList.remove('error');
    });
}

function displayResult(days, months, years) {
    const dayContent = document.querySelector('.user-days');
    const monthContent = document.querySelector('.user-months');
    const yearContent = document.querySelector('.user-years');

    dayContent.textContent = days < 10 ? '0' + days : days;
    monthContent.textContent = months;
    yearContent.textContent = years > 1 ? years : years + ' year';
}
