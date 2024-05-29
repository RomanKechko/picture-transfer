// main.js
const movingContainer = document.getElementById('moving_container')
let isContainerScaled = false

movingContainer.addEventListener('click', function (event) {
  if (!event.target.classList.contains('card')) {
    // Проверяем, не находится ли цель клика внутри карточки
    isContainerScaled = !isContainerScaled // Инвертируем значение флага

    if (isContainerScaled) {
      movingContainer.style.transform = 'scale(1)'
    } else {
      movingContainer.style.transform = 'scale(0.1)'
    }
  }
})

class Card {
  constructor (element, isClone = false) {
    this.element = element
    this.isClone = isClone
    this.newX = 0
    this.newY = 0
    this.startX = 0
    this.startY = 0
    this.mouseMoveHandler = this.mouseMove.bind(this)
    this.mouseUpHandler = this.mouseUp.bind(this)
    this.element.addEventListener('mousedown', this.mouseDown.bind(this))
  }

  mouseDown (e) {
    e.preventDefault() // Предотвращаем стандартное поведение браузера для события mousedown
    e.stopPropagation() // Предотвращаем всплытие события mousedown

    const rect = this.element.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    if (!this.isClone) {
      this.startX = e.clientX
      this.startY = e.clientY

      this.duplicateCard = this.element.cloneNode(true) // Создаем дубликат карты
      this.duplicateCard.style.position = 'fixed'
      this.duplicateCard.style.top = rect.top + 'px'
      this.duplicateCard.style.left = rect.left + 'px'
      this.duplicateCard.style.width = rect.width + 'px' // Сохраняем ширину карты
      this.duplicateCard.style.height = rect.height + 'px' // Сохраняем высоту карты
      document.body.appendChild(this.duplicateCard) // Добавляем дубликат на страницу

      // Создаем новый экземпляр Card для дубликата и передаем начальные координаты
      const duplicateCardInstance = new Card(this.duplicateCard, true)
      duplicateCardInstance.startX = this.startX - rect.left
      duplicateCardInstance.startY = this.startY - rect.top

      // Передаем обработчики события перемещения и отпускания мыши новому экземпляру
      document.addEventListener(
        'mousemove',
        duplicateCardInstance.mouseMoveHandler
      )
      document.addEventListener('mouseup', duplicateCardInstance.mouseUpHandler)

      // Начинаем перемещение дубликата сразу
      duplicateCardInstance.mouseMove(e)
    } else {
      this.startX = e.clientX - rect.left
      this.startY = e.clientY - rect.top

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

const cards = document.querySelectorAll('.card')
cards.forEach(card => {
  new Card(card)
})
