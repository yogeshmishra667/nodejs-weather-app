console.log('client side');

const submitTerm = document.querySelector('form')
const search = document.querySelector('input')

const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

submitTerm.addEventListener('submit', (e) => {
e.preventDefault()

const locations = search.value

msgOne.textContent = ('loading....')
msgTwo.textContent = ('')
fetch(`/weather?address=${locations}`).then((response) => {
  /* [http://localhost:3000/weather?address=${locations}]  delete because heroku cannot used localhost*/
  response.json().then(( data) => {
    if(data.error){
      msgOne.textContent = (data.error)
    }else{
    msgOne.textContent = (data.forecast)
    msgTwo.textContent = (data.place)
    }
  })
})
})





