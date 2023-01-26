const columns = document.querySelectorAll('.column')

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space') {
    setRundomColors()
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type

  if (type === 'lock') {
    const node =
      event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0]
    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyToClickboard(event.target.textContent)
  } else if (type === 'info') {
    const info = document.getElementById('info-text')
    info.classList.toggle('hiden-info')
    info.classList.toggle('shown-info')
  }
})

function generateRundomColor() {
  const hexCodes = '0123456789ABCDEF'

  let color = ''

  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
  }
  return '#' + color
}

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text)
}

function setRundomColors(isInitial) {
  const colors = isInitial ? getColorFromHash() : []

  columns.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock')
    const text = col.querySelector('h2')
    const button = col.querySelector('button')

    if (isLocked) {
      colors.push(text.textContent)
      return
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : generateRundomColor()
      : generateRundomColor()

    if (!isInitial) {
      colors.push(color)
    }

    text.textContent = color
    col.style.background = color

    setTextColor(text, color)
    setTextColor(button, color)
  })
  updateColorsHash(colors)
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? '#1d2939' : 'white'
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((color) => color.toString().substring(1))
    .join('-')
}

function getColorFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((color) => '#' + color)
  }
  return []
}

setRundomColors(true)
