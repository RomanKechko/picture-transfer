/* let card1newX = 0,
  card1newY = 0,
  card1startX = 0,
  card1startY = 0

const card1 = document.getElementById('card1')

card1.addEventListener('mousedown', mouseDown)

function mouseDown (e) {
  card1startX = e.clientX
  card1startY = e.clientY
  document.addEventListener('mousemove', mouseMove)
  document.addEventListener('mouseup', mouseUp)
}

function mouseMove (e) {
  card1newX = card1startX - e.clientX
  card1newY = card1startY - e.clientY

  card1startX = e.clientX
  card1startY = e.clientY

  card1.style.top = card1.offsetTop - card1newY + 'px'
  card1.style.left = card1.offsetLeft - card1newX + 'px'
}

function mouseUp (e) {
  document.removeEventListener('mousemove', mouseMove)
} */

/*  */

/* let newX = 0,
  newY = 0,
  startX = 0,
  startY = 0

const card2 = document.getElementById('card2')

card2.addEventListener('mousedown', mouseDown2)

function mouseDown2 (e) {
  startX = e.clientX
  startY = e.clientY
  document.addEventListener('mousemove', mouseMove2)
  document.addEventListener('mouseup', mouseUp2)
}

function mouseMove2 (e) {
  newX = startX - e.clientX
  newY = startY - e.clientY

  startX = e.clientX
  startY = e.clientY

  card2.style.top = card2.offsetTop - newY + 'px'
  card2.style.left = card2.offsetLeft - newX + 'px'


}

function mouseUp2 (e) {
  document.removeEventListener('mousemove', mouseMove2)
} */

/*  */

class Card {
  constructor (element) {
    this.element = element
    this.newX = 0
    this.newY = 0
    this.startX = 0
    this.startY = 0
    this.parentRect = this.element.parentElement.getBoundingClientRect() // Получаем размеры родительского контейнера
    this.mouseMoveHandler = this.mouseMove.bind(this)
    this.mouseUpHandler = this.mouseUp.bind(this)
    this.element.addEventListener('mousedown', this.mouseDown.bind(this))
  }

  mouseDown (e) {
    const rect = this.element.getBoundingClientRect()
    this.startX = e.clientX - rect.left
    this.startY = e.clientY - rect.top
    this.element.style.position = 'fixed'
    document.addEventListener('mousemove', this.mouseMoveHandler)
    document.addEventListener('mouseup', this.mouseUpHandler)
  }

  mouseMove (e) {
    this.newX = e.clientX - this.startX - this.parentRect.left // Учитываем смещение родительского контейнера
    this.newY = e.clientY - this.startY - this.parentRect.top // Учитываем смещение родительского контейнера
    this.element.style.top = this.newY + 'px'
    this.element.style.left = this.newX + 'px'
  }

  mouseUp () {
    document.removeEventListener('mousemove', this.mouseMoveHandler)
    document.removeEventListener('mouseup', this.mouseUpHandler)

    const pole = document.getElementById('pole')
    const movingContainer = document.getElementById('moving_container')
    const poleRect = pole.getBoundingClientRect()
    const cardRect = this.element.getBoundingClientRect()

    if (
      cardRect.left >= poleRect.left &&
      cardRect.right <= poleRect.right &&
      cardRect.top >= poleRect.top &&
      cardRect.bottom <= poleRect.bottom
    ) {
      pole.appendChild(this.element) // Перемещаем карту в 'pole'
    } else {
      movingContainer.appendChild(this.element) // Перемещаем карту обратно в 'moving_container'
    }

    const newParentRect = this.element.parentElement.getBoundingClientRect()
    this.element.style.position = 'absolute'
    this.element.style.top = cardRect.top - newParentRect.top + 'px'
    this.element.style.left = cardRect.left - newParentRect.left + 'px'
  }
}

const cards = document.querySelectorAll('.card')
cards.forEach(card => {
  new Card(card)
})

/* const movingContainer = document.querySelector('.moving_container')
let styles = window.getComputedStyle(movingContainer)
if (isClicked) {
  movingContainer.addEventListener('click', resize)
}

function resize () {
  let bg = styles.getPropertyValue('transform')
  if (bg === 'matrix(0.1, 0, 0, 0.1, 0, 0)') {
    movingContainer.style.cssText = 'transform: scale(1)'
  } else {
    movingContainer.style.cssText = 'transform: scale(0.1)'
  }
} */

/* class Song {
  constructor (name, artist) {
    this.name = name
    this.artist = artist
    this.isLiked = false
  }

  like () {
    this.isLiked = !this.isLiked
  }
}

const song1 = new Song('Футбольный мяч', 'Антоха MC')
const song2 = new Song('На заре', 'Альянс')
const song3 = new Song('Ай', 'Хаски')
console.log(song2)
song2.like()
console.log(song2) */
