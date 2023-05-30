const tbody = document.getElementById('tbody')
const btn = document.getElementById('btn')
let allow = true

const allowOnlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
}

const allowOnlyLetters = (e) => {
    e.target.value = e.target.value.replace(/[^a-z\s]/gi, '')
}

btn.addEventListener('click', () => {
    if (allow) {
        tbody.innerHTML += `
            <tr>
                <td class="order"></td>
                <td><input placeholder="Name"/ oninput= "allowOnlyLetters(event)"> </td>
                <td><input placeholder = "Surname" oninput= "allowOnlyLetters(event)"/></td>
                <td><input type = "number" placeholder = "Salary" oninput="allowOnlyNumbers(event)"/></td>
                <td>
                    <button class="cancel" onclick = "deleteRow(event)">Cancel</button>
                    <button class="save" onclick = "saveRow(event)">Save  </button>
                </td>
            </tr>
            `
        allow = false
    } else {
        alert("Please SAVE previous action")
    }
    makeOrder()

})

const deleteRow = (e) => {
    e.target.closest('tr').remove()
    allow = true
    makeOrder()
}

const saveRow = (e) => {
    let inputs = [...document.querySelectorAll('input')]
    inputs.map(input => {
        if (checkErrors()) {
            input.classList.remove("error")
            input.parentElement.innerText = input.value
            e.target.innerText = "Change"
            e.target.previousElementSibling.innerText = "Delete"
            e.target.removeEventListener('click', saveRow)
            e.target.addEventListener('click', changeRow)
            e.target.classList.remove("save")
            e.target.classList.add('edit')
            allow = true
        }
    })
}

const changeRow = (e) => {
    // let text = e.target.innerText
    let tr = e.target.closest('tr')
    let tds = [...tr.querySelectorAll("td:not(:first-child,:last-child")]
    tds.map(a => {
        let input = document.createElement('input')
        input.setAttribute = ('type', 'text')
        input.value = a.innerText
        a.innerText = ''
        a.append(input)
    })
    e.target.innerText = "Save"
    e.target.removeEventListener('click', changeRow)
    e.target.addEventListener('click', saveRow)
    e.target.classList.remove("edit")
    e.target.classList.add('save')
}

const makeOrder = () => {
    let tr = [...document.querySelectorAll('tbody tr')]
    tr.map((a, b) => {
        let td = a.querySelector('td')
        td.innerText = b + 1
    })
}

const checkErrors = () => {
    let result = true
    let inputs = [...document.querySelectorAll('input')]

    inputs.map(a => {
        a.classList.remove('error')
        if (a.value < 3) {
            a.classList.add('error')
            result = false
            // allow = false
        }
    })
    return result
}


//Input events explanation
// let demo = document.getElementById('demo')

// demo.addEventListener('input', (e) => {
//     e.target.value = e.target.value.replace(/[^a-z]/gi, '')
//     if (e.target.value.trim().length < 3) {
//         e.target.classList.add("error")
//     } else {
//         e.target.classList.remove("error")
//     }

//     console.log('salam')
// })