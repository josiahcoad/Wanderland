import Toastify from 'toastify-js';

export function showErrorToast(errorText, duration = 4000) {
    Toastify({
        text: errorText,
        duration: duration,
        close: true,
        gravity: 'top', // `top` or `bottom`
        positionLeft: true, // `true` or `false`
        backgroundColor: 'linear-gradient(to right, #db0a5b, #e08283)',
    }).showToast();
}

export function showNotificationToast(errorText, duration = 4000) {
    Toastify({
        text: errorText,
        duration: duration,
        close: true,
        gravity: 'top', // `top` or `bottom`
        positionLeft: true, // `true` or `false`
        backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
    }).showToast();
}