import * as store from "./../lib/store.mjs"

const daneo = document.getElementById('daneo')
const input = document.getElementById('input')
const remaining = document.getElementById('remaining')

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
if (!localStorage.getItem(`gek_${dataType}`)) localStorage.setItem(`gek_${dataType}`, JSON.stringify([]))


;(async() => {
    const sleep = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay))

    daneo.innerText = "로딩중"
    const res = await fetch(`/data/${dataType}`)
    const resjson = await res.json()
    const data = forkedAt ? store.getData("gek", dataType, forkedAt).fail : resjson
    let nowData = getRandom(data)

    clearInputs()
    render()

    function clearInputs() {
        input.innerHTML = ""
    }

    function render() {
        daneo.innerText = nowData.word
        const correctAnswerIdx = Math.floor(Math.random() * 5)
        for (let i = 0; i < 5; i++) {
            const button = document.createElement("button")
            let nd = getRandom(data)
            if (i === correctAnswerIdx) nd = nowData
            button.innerText = nd.mean
            button.onclick = async () => {
                used.push(nowData.word)
                const correct = i === correctAnswerIdx

                daneo.innerText = `${nowData.word} (${nowData.mean})`
                toggleInput()
                if (correct) {
                    corrected.push({word: nowData.word, mean: nowData.mean})
                    daneo.style.color = "#00ff00"
                    await sleep(500)
                }
                else {
                    failed.push({word: nowData.word, mean: nowData.mean})
                    daneo.style.color = "#ff0000"
                    await sleep(250)
                }
                daneo.style.color = "#000000"
                clearInputs()
                nowData = getRandom(data)
                toggleInput()
                render()
            }
            input.appendChild(button)
        }
        document.getElementById("correct").innerText = corrected.length
        document.getElementById("correctPercent").innerText = `${corrected.length}/${corrected.length + failed.length} (${Math.round((corrected.length / (corrected.length + failed.length))*100)}%)`
        remaining.innerText = `${corrected.length + failed.length}/${data.length}`
    }

    function toggleInput() {
        for (const elem of input.children) {
            elem.toggleAttribute("disabled")
        }
    }

    function getRandom(data) {
        const dt = data[parseInt(Math.random() * data.length)]
        if (used.includes(dt.word)) return getRandom(data)
        else return dt
    }
})()