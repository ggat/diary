export function debounce(callback, timeout) {
    let timer;
    return function (...params) {
        if (timer !== undefined) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            callback(...params);
        }, timeout);
    };
}
