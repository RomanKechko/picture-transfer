const movingContainers = document.querySelectorAll('.moving_container')
let isContainerScaled = false

movingContainers.forEach(movingContainer => {
  movingContainer.addEventListener('click', function (event) {
    if (!event.target.classList.contains('card')) {
      isContainerScaled = !isContainerScaled // Инвертируем значение флага

      if (isContainerScaled) {
        if (movingContainer.id === 'moving_container1') {
          movingContainer.style.transform = 'scale(1) translate(-72px, 150px)'
          movingContainer.style.zIndex = 2
        } else if (movingContainer.id === 'moving_container2') {
          movingContainer.style.transform = 'scale(1) translate(-72px, 100px)'
          movingContainer.style.zIndex = 2
        } else if (movingContainer.id === 'moving_container3') {
          movingContainer.style.transform = 'scale(1) translate(-72px, -100px)'
          movingContainer.style.zIndex = 2
        } else if (movingContainer.id === 'moving_container4') {
          movingContainer.style.transform = 'scale(1) translate(-72px, -200px)'
          movingContainer.style.zIndex = 2
        }
      } else {
        movingContainer.style.transform = 'scale(0.1)'
        movingContainer.style.zIndex = 1
      }
    }
  })
})

class Card {
  constructor (element, movingContainer, isClone = false) {
    this.element = element
    this.movingContainer = movingContainer
    this.isClone = isClone
    this.newX = 0
    this.newY = 0
    this.startX = 0
    this.startY = 0
    this.mouseMoveHandler = this.mouseMove.bind(this)
    this.mouseUpHandler = this.mouseUp.bind(this)
    this.mouseDownHandler = this.mouseDown.bind(this)
    this.element.addEventListener('mousedown', this.mouseDownHandler)
  }

  mouseDown (e) {
    // Проверяем масштаб контейнера и местоположение карточки
    if (
      !this.movingContainer.style.transform.includes('scale(1)') &&
      this.element.parentElement.id !== 'pole'
    ) {
      return
    }

    e.preventDefault()
    e.stopPropagation()

    const rect = this.element.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    if (!this.isClone) {
      this.startX = offsetX
      this.startY = offsetY

      this.duplicateCard = this.element.cloneNode(true) // Создаем дубликат карты
      this.duplicateCard.style.position = 'fixed'
      this.duplicateCard.style.top = rect.top + 'px'
      this.duplicateCard.style.left = rect.left + 'px'
      this.duplicateCard.style.width = rect.width + 'px' // Сохраняем ширину карты
      this.duplicateCard.style.height = rect.height + 'px' // Сохраняем высоту карты
      document.body.appendChild(this.duplicateCard) // Добавляем дубликат на страницу
      new Card(this.duplicateCard, this.movingContainer, true) // Создаем новый экземпляр Card для дубликата

      this.duplicateCard.dispatchEvent(
        new MouseEvent('mousedown', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
          cancelable: true,
          view: window
        })
      )
    } else {
      this.startX = offsetX
      this.startY = offsetY

      document.addEventListener('mousemove', this.mouseMoveHandler)
      document.addEventListener('mouseup', this.mouseUpHandler)
    }
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

    if (this.isClone) {
      const pole = document.getElementById('pole')
      const poleRect = pole.getBoundingClientRect()
      const cardRect = this.element.getBoundingClientRect()

      if (
        cardRect.left >= poleRect.left &&
        cardRect.right <= poleRect.right &&
        cardRect.top >= poleRect.top &&
        cardRect.bottom <= poleRect.bottom
      ) {
        pole.appendChild(this.element) // Добавляем карту в pole
        // Обновляем позицию карты в pole
        this.element.style.position = 'absolute'
        this.element.style.top = cardRect.top - poleRect.top + 'px'
        this.element.style.left = cardRect.left - poleRect.left + 'px'
      } else {
        this.element.remove() // Удаляем дубликат, если он не в pole
      }
    }
  }
}

// Инициализация всех карточек при загрузке страницы
movingContainers.forEach(movingContainer => {
  const cards = movingContainer.querySelectorAll('.card')
  cards.forEach(card => {
    new Card(card, movingContainer)
  })
})
