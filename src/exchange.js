/**
 * 원 => 달러
 * @param {number} krw
 * @returns {number}
 */
export function krwToUsd(krw) {
    return krw * 0.00069
}

/**
 * 달러 => 원
 * @param {number} usd
 * @returns {number}
 */
export function usdToKwr(usd) {
    return usd * 1454.63
}

/**
 * 달러 => 동
 * @param {number} usd
 * @returns {number}
 */
export function usdToVnd(usd) {
    return usd * 25080
}

/**
 * 원 => 동
 * @param {number} krw
 * @returns {number}
 */
export function krwToVnd(krw) {
    return krw * 17.23
}