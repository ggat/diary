export function debounce(callback, timeout) {
    let timer;
    return function (...params) {
        if (timer !== undefined) {
            clearInterval(timer);
        }

        timer = setTimeout(() => {
            callback(...params);
        }, timeout);
    };
}
