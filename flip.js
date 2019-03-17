'use strict'

var config = {
  headsOdds: 50,
  disabledSeconds: 300,
  headsMessage: 'Turn to Facebook for some deserved respite from your labor.',
  tailsMessage: 'No Facebook. Go now – cut with the scythe of your workings the thorns casting shadows in your unclear mind!'
}

var resultDisplay = document.querySelector('#resultDisplay p')
var flipButton = document.querySelector('#flipButton')

var secondsLeft = 0
var timerId

function formatNumber (num) {
  var padding = ''

  if (num < 10) {
    padding = '0'
  }

  return padding + num.toString()
}

function tick (start) {
  let delta = Math.floor((Date.now() - start) / 1000)
  let remaining = config.disabledSeconds - delta

  if (remaining <= 0) {
    clearInterval(timerId)
    flipButton.disabled = false
    resultDisplay.innerHTML = ''
    resultDisplay.classList.remove('loaded')
    flipButton.innerHTML = 'flip'
  } else {
    let minutes = Math.floor(remaining / 60)
    let seconds = remaining % 60

    flipButton.innerHTML = minutes + ':' + formatNumber(seconds)
  }
}

function flip () {
  var heads = Math.floor(Math.random() * 100) + 1 < config.headsOdds

  resultDisplay.innerHTML = heads ? config.headsMessage : config.tailsMessage
  resultDisplay.classList.add('loaded')
  if (heads) {
    let fb = window.open('https://www.facebook.com')

    if (fb && !fb.closed) {
      fb.focus()
    }
  }

  flipButton.disabled = true
  var timerStart = Date.now()
  flipButton.innerHTML = '5:00'
  timerId = setInterval(tick, 1000, timerStart)
}

flipButton.addEventListener('click', function (event) {
  event.preventDefault()

  flip()
})
