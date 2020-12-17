const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const img1 = document.querySelector('#img1')

weatherForm.addEventListener('submit', (e) => {
    //Evita que se recargue por completo la página
    e.preventDefault()
    const location = search.value

    message1.textContent = "Loading..."
    message2.textContent = ""
    img1.src = ""

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) 
                message1.textContent = data.error
            else {
                message1.textContent = data.location
                message2.textContent = data.forecast
                img1.src = data.icon
            }
        })
    })
})
