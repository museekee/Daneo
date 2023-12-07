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
        const correctAnswerIdx = Math.floor(Math.random() * 5) // for상에서의 idx
        for (let i = 0; i < 5; i++) {
            const button = document.createElement("button")
            
            let nd = i === correctAnswerIdx ? nowData : getRandom(data, true, nowData.word)
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
                
                if (used.length === data.length) {
                    daneo.innerText = "시험 끝!"
                    store.addData("gek", dataType, forkedAt, corrected, failed)
                    return
                }
                else {
                    nowData = getRandom(data, false)
                    toggleInput()
                    render()
                }
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

    /**
     * 
     * @param {{ word: string, mean: string[] }} data  
     * @param { boolean } canUsed 이미 사용한 글자도 추출해줄까?
     * @param { string? } withoutWord 이 글자는 빼고 추출하기
     * @returns 
     */
    function getRandom(data, canUsed, withoutWord) {
        const dt = data[parseInt(Math.random() * data.length)]
        
        if ((!canUsed && used.includes(dt.word)) || dt.word == withoutWord) return getRandom(data, withoutWord)
        else return dt
    }
})()