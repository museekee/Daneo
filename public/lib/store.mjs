/**
 * @typedef {{
 *  id: string
 *  fork: string | null,
 *  correct: {word: string, mean: string}[],
 *  fail: {word: string, mean: string}[]
 * }} TResult
 */
/**
 * @typedef {"ju" | "gek" | "jo"} TGameTypes
 */

const genRandHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')

/**
 * 
 * @param {TGameTypes} type ju: 주관식 / gek: 객관식
 * @param {string} data hanmun등 어떤 데이터인지.
 * @returns {TResult[]}
 */
export const getDatas = (type, data) => {
    return JSON.parse(localStorage.getItem(`${type}_${data}`))
}

/**
 * 
 * @param {TGameTypes} type ju: 주관식 / gek: 객관식
 * @param {string} data hanmun등 어떤 데이터인지.
 * @param {string} id 고유 ID
 * @returns {TResult}
 */
export const getData = (type, data, id) => {
    return getDatas(type, data).find(elem => elem.id === id)
}

/**
 * 
 * @param {TGameTypes} type ju: 주관식 / gek: 객관식
 * @param {string} data hanmun등 어떤 데이터인지.
 * @param {string | null} fork 포크한 데이터의 고유 아이디
 * @param {{word: string, mean: string}[]} correct
 * @param {{word: string, mean: string}[]} fail
 */
export const addData = (type, data, fork, correct, fail) => {
    const beforeData = getDatas(type, data)
    beforeData.unshift({
        id: genRandHex(16),
        fork,
        correct,
        fail
    })
    localStorage.setItem(`${type}_${data}`, JSON.stringify(beforeData))
}