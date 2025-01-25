console.log('readed the script')

const Formweather = document.querySelector('#Formweather')
const input = document.querySelector('input')
const message = document.querySelector('#message')

Formweather.addEventListener('submit',(event) => {
    message.textContent = 'Loading...'
    event.preventDefault()
    const address = input.value
    fetch('http://localhost:3000/weather?address='+address).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                message.textContent= data.error
            } else {
                console.log(`temperature in ${address} is ${data.temperature}`)
                message.textContent= `temperature in ${address} is ${data.temperature}`
            }
        })
    })
    input.value = ''
})