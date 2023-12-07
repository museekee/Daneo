import * as store from "./../lib/store.mjs"

const daneo = document.getElementById('daneo')
const inputed = document.getElementById('inputed')
const input = document.getElementById('input')
const remaining = document.getElementById('remaining')
const allClear = document.getElementById("allClear")

const searchParam = (key) => new URLSearchParams(location.search).get(key)
const forkedAt = searchParam("fork") ?? null
const dataType = searchParam("data")

if (!dataType) {
    alert("URL 쿼리값에 data가 없습니다.")
    location.href = "/"
}

const corrected = []
const failed = []
const used = []

input.focus()
if (!localStorage.getItem(`jo_${dataType}`)) localStorage.setItem(`jo_${dataType}`, JSON.stringify([]))


;(async() => {
    const sleep = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay))

    daneo.innerText = "로딩중"
    const res = await fetch(`/data/${dataType}`)
    const resjson = await res.json()
    const data = forkedAt ? store.getData("jo", dataType, forkedAt).fail : resjson
    let nowData = getRandom(data)

    clearInputs()
    render()

    function clearInputs() {
        input.innerHTML = ""
    }

    function render() {
        daneo.innerText = nowData.mean
        // if (nowData.word.length > 4) 
        const answerHanjas = nowData.word.split("").concat([getRandom(data).word.random(),getRandom(data).word.random(),getRandom(data).word.random(),getRandom(data).word.random()]).sort(() => Math.random() - 0.5)
        for (const hanja of answerHanjas) {
            const button = document.createElement("button")
            button.innerText = hanja
            button.onclick = async () => {
                inputed.innerText += hanja
            }
            input.appendChild(button)
        }
        document.getElementById("correct").innerText = corrected.length
        document.getElementById("correctPercent").innerText = `${corrected.length}/${corrected.length + failed.length} (${Math.round((corrected.length / (corrected.length + failed.length))*100)}%)`
        remaining.innerText = `${corrected.length + failed.length}/${data.length}`
    }

    allClear.onclick = () => {
        inputed.innerText = ""
    }
    
    function toggleInput() {
        for (const elem of input.children) {
            elem.toggleAttribute("disabled")
        }
        allClear.toggleAttribute("disabled")
    }

    /** @returns {{word: string, mean: string}} */
    function getRandom(data) {
        const dt = data[parseInt(Math.random() * data.length)]
        if (used.includes(dt.word)) return getRandom(data)
        else return dt
    }
})()

String.prototype.random = function() {
    return this.split("")[parseInt(Math.random() * this.split("").length)]
}