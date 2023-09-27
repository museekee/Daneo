const searchParam = (key) => new URLSearchParams(location.search).get(key)
const pageType = searchParam("type")
const dataType = searchParam("data")
const corrected = JSON.parse(localStorage.getItem(`wnrhkstlr_${dataType}`))

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

;(async() => {
    const res = await fetch(`/data/${dataType}`)
    const data = Object.entries(await res.json())
    for (let i = 0; i < corrected.length; i++) {
        const item = corrected[i]
        const accordion = document.createElement("li")
        const div = document.createElement("div")
        const table = document.createElement("d-table")
        const practice = document.createElement("button")
        div.classList.add('open-accordion')
        div.innerText = corrected.length == corrected.length - i ? "최근 결과" : `${i+1}번째 결과`
        table.classList.add('content')
        practice.onclick = () => {location.href = `/wnrhkstlr?data=hanmun&fail=${i}`}
        practice.innerText = "틀린 것만 시험"
        practice.style.float = "right"
        div.appendChild(practice)
        for (const jtem of data) {
            const tableItem = document.createElement("d-item")
            if (pageType === "hanja") {
                const hanja = document.createElement("d-hanja")
                hanja.innerText = jtem[0]
                tableItem.appendChild(hanja)
            }
            const mean = document.createElement("d-mean")
            mean.innerText = jtem[1]
            if (!item.includes(jtem[0])) {
                tableItem.style.backgroundColor = "#ff0000"
                tableItem.style.color = "#ffffff"
            }
            tableItem.appendChild(mean)
            table.appendChild(tableItem)
        }
        accordion.appendChild(div)
        accordion.appendChild(table)
        accordions.appendChild(accordion)
    }
    accordionClick()
})()