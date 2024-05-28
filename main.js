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
    const parentRect = this.element.parentElement.getBoundingClientRect() // Получаем размеры родительского контейнера
    this.startX = e.clientX - rect.left + parentRect.left // Учитываем смещение родительского контейнера
    this.startY = e.clientY - rect.top + parentRect.top // Учитываем смещение родительского контейнера
    this.element.style.position = 'fixed'
    document.addEventListener('mousemove', this.mouseMoveHandler)
    document.addEventListener('mouseup', this.mouseUpHandler)
  }

  mouseMove (e) {
    this.newX = e.clientX - this.startX
    this.newY = e.clientY - this.startY
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
