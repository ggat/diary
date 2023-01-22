/**
 * Get current day since Unix Epoh
 * - 0-indexed
 * - local timestamp aware
 */
export function currentDay() {
    return tsToDays(Date.now() - (new Date().getTimezoneOffset() * 60 * 1000));
}

export function tsToDays(ts) {
    return Math.floor(ts / 1000 / 60 / 60 / 24);
}
