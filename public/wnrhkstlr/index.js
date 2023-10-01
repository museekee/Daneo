import * as store from "./../lib/store.mjs"

const daneo = document.getElementById('daneo')
const input = document.getElementById('input')
const skip = document.getElementById('skipBtn')
const choseong = document.getElementById('choseongBtn')
const remaining = document.getElementById('remaining')

const searchParam = (key) => new URLSearchParams(location.search).get(key)
const forkedAt = searchParam("fork") ?? null
const dataType = searchParam("data")

if (!dataType) {
    alert("URL 쿼리값에 data가 없습니다.")
    location.href = "/"
}

const my = {
    correct: 0,
    skip: 0,
    hint: 0
}
const rule = {
    duplication: false
}

const corrected = []
const failed = []
const used = []

input.focus()
if (!localStorage.getItem(`ju_${dataType}`)) localStorage.setItem(`ju_${dataType}`, JSON.stringify([]))

;(async() => {
    const sleep = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay))

    daneo.innerText = "로딩중"
    const res = await fetch(`/data/${dataType}`)
    const resjson = await res.json()
    const data = forkedAt ? store.getData("ju", dataType, forkedAt).fail : resjson
    console.log(data)
    remaining.innerText = `0/${data.length}`
    let nowData = getRandom(data)
    render()
    
    input.onkeydown = async (e) => {
        if (e.key !== "Enter") return
        if (nowData.mean === e.currentTarget.value) {
            my.correct++
            await correct()
        }
        else {
            daneo.style.color = "#ff0000"
            toggleInput()
            await sleep(250)
            daneo.style.color = "#000000"
            toggleInput()
        }
    }

    skip.onclick = async (e) => {
        my.skip++
        await correct(true)
    }
    choseong.onclick = async (e) => {
        const res = []
        nowData.mean.split("").forEach(element => {
            res.push(["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"][parseInt((element.charCodeAt(0) - 44032) / (21 * 28))] ?? " ")
        })
        my.hint++
        render()
        daneo.innerText += ` (${res.join("")})`
    }

    async function correct(isskip) {
        if (!isskip) corrected.push({word: nowData.word, mean: nowData.mean})
        else failed.push({word: nowData.word, mean: nowData.mean})
        used.push(nowData.word)
        daneo.style.color = "#00ff00"
        daneo.innerText = `${nowData.word} (${nowData.mean})`
        toggleInput()
        await sleep(1000)
        if (used.length === data.length) {
            render()
            
            store.addData("ju", dataType, forkedAt, corrected, failed)

            daneo.innerText = "시험 끝!"
            return 
        }
        daneo.style.color = "#000000"
        nowData = getRandom(data)
        input.value = ""
        render()
        toggleInput()
    }

    function toggleInput() {
        input.toggleAttribute("disabled")
        skip.toggleAttribute("disabled")
        choseong.toggleAttribute("disabled")
        input.focus()
    }
    function render() {
        daneo.innerText = nowData.word
        document.getElementById("correct").innerText = my.correct
        document.getElementById("skip").innerText = my.skip
        document.getElementById("hint").innerText = my.hint
        document.getElementById("correctPercent").innerText = `${my.correct}/${my.correct + my.skip} (${Math.round((my.correct / (my.correct + my.skip))*100)}%)`
        remaining.innerText = `${my.correct + my.skip}/${data.length}`
    }

    /** @returns {{word: string, mean: string}} */
    function getRandom(data) {
        const dt = data[parseInt(Math.random() * data.length)]
        if (used.includes(dt.word)) return getRandom(data)
        else return dt
    }
})()