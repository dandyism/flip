'use strict'

var config = {
  headsOdds: 50,
  disabledSeconds: 300,
  headsMessage: 'Facebook time!',
  tailsMessage: 'No Facebook right now – face your fears!'
}

var resultDisplay = document.querySelector('#resultDisplay')
var flipButton = document.querySelector('#flipButton')

function flip () {
  var heads = Math.floor(Math.random() * 100) + 1 < config.headsOdds

  resultDisplay.innerHTML = heads ? config.headsMessage : config.tailsMessage
  if (heads) {
    let fb = window.open('https://www.facebook.com')

    if (fb && !fb.closed) {
      fb.focus()
    }
  }

  flipButton.disabled = true
  setTimeout(function () {
    flipButton.disabled = false
    resultDisplay.innerHTML = ''
  }, config.disabledSeconds * 1000)
}

flipButton.addEventListener('click', function (event) {
  event.preventDefault()

  flip()
})
