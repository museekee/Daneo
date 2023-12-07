import * as store from "./../../lib/store.mjs"

const searchParam = (key) => new URLSearchParams(location.search).get(key)
const pageType = searchParam("type")
const dataType = searchParam("data")

const accordions = document.getElementById("accordions")

function accordionClick() {
  const buttons = document.querySelectorAll('.open-accordion')
  buttons.forEach(function(button, index) {
    button.addEventListener('click', function(e) {
      e.preventDefault()
      
      this.parentNode.classList.toggle('on')
      
      buttons.forEach(function(button2, index2) {
          if ( index !== index2 ) {
              button2.parentNode.classList.remove('on')
          }
      })
    })
  })
}


const datas = store.getDatas("ju", dataType)
for (let i = 0; i < datas.length; i++) {
    const result = datas[i]
    console.log(result)
    const details = []

    const accordion = document.createElement("li")
    const div = document.createElement("div")
    const detail = document.createElement("div")
    const table = document.createElement("d-table")
    details.push(`id: ${result.id}`)
    if (result.fork) {
        details.push(`fork: ${result.fork}`)
    }
    detail.innerText = details.join(" / ")
    const practice = document.createElement("button")
    div.classList.add('open-accordion')
    div.innerText = datas.length == datas.length - i ? "최근 결과" : `${i+1}번째 결과`
    table.classList.add('content')
    practice.onclick = () => {location.href = `/wnrhkstlr?data=${dataType}&fork=${encodeURIComponent(result.id)}`}
    practice.innerText = "틀린 것만 시험"
    practice.style.float = "right"
    div.appendChild(detail)
    div.appendChild(practice)
    
    for (const item of result.correct) {
        const tableItem = document.createElement("d-item")
        if (pageType === "hanja") {
            const hanja = document.createElement("d-hanja")
            hanja.innerText = item.word
            tableItem.appendChild(hanja)
        }
        const mean = document.createElement("d-mean")
        mean.innerText = item.mean.join(", ")
        tableItem.appendChild(mean)
        table.appendChild(tableItem)
    }
    
    for (const item of result.fail) {
        const tableItem = document.createElement("d-item")
        if (pageType === "hanja") {
            const hanja = document.createElement("d-hanja")
            hanja.innerText = item.word
            tableItem.appendChild(hanja)
        }
        const mean = document.createElement("d-mean")
        mean.innerText = item.mean.join(", ")
        tableItem.style.backgroundColor = "#ff0000"
        tableItem.style.color = "#ffffff"
        tableItem.appendChild(mean)
        table.appendChild(tableItem)
    }
    accordion.appendChild(div)
    accordion.appendChild(table)
    accordions.appendChild(accordion)
}
accordionClick()