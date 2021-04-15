//* ** SHIM ***

// (function () {
//   'use strict'

//* ** VARIABLES ***
let _stageContext,
  _stageWidth,
  _stageHeight
let _mouseX = 0
let _mouseY = 0
const _mouseRadiusNum = 185
let _boxArray = []


let text
let words
//* ** INIT ***

const requestAnimFrame = function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
}

class Canvas {
  constructor() {
    this.boxRows = 18
    this.boxCols = 60
    this.boxArrayLength = this.boxRows * this.boxCols
    this.boxSize = 100
    this.boxSpacing = 10
    this.initialised = false
    this.textItems = new Map()

    
    this.init = () => {
      
      this.stage = document.getElementById('stage')
      _stageWidth = this.stage.width = window.innerWidth
      _stageHeight = this.stage.height = window.innerHeight
      
      this.stage.style.width = window.innerWidth
      this.stage.style.height = window.innerHeight

      const widthEm = window.innerWidth / parseFloat(
        getComputedStyle(
          document.querySelector('body')
        )['font-size']
      )
      this.boxSize = widthEm

      _stageContext = stage.getContext('2d')
      _stageContext.fillStyle = '#fff'
      _stageContext.strokeStyle = '#999'
      _stageContext.font = `${this.boxSize}px Baskervville`
      _stageContext.textBaseline = 'middle'
      text = document.getElementById('home-text').innerHTML.split('')
      words = document.getElementById('home-text').innerHTML.split(' ')
      
      let count = 0
      words.map((word, i) => {
        word.split('').map((letter, j) => {
          this.textItems.set(count, { letter: letter, word: word, index: i })
          count++
        })
        this.textItems.set(count, { letter: ' ', word: word, index: i })
        count++
      })

    
      this.createBoxes()
      this.onEnterFrame()
      window.addEventListener('resize', this.resize.bind(this), false)
    }

    this.resize = (e) => {
      
        _stageWidth = this.stage.width = window.innerWidth
      _stageHeight = this.stage.height = window.innerHeight
      this.stage.style.width = window.innerWidth
      this.stage.style.height = window.innerHeight

      _stageContext.fillStyle = '#fff'
      _stageContext.strokeStyle = '#999'
      _stageContext.font = `${this.boxSize}px Baskervville`
      _stageContext.textBaseline = 'middle'
      const widthEm = window.innerWidth / parseFloat(
        getComputedStyle(
          document.querySelector('body')
        )['font-size']
      )
      
      this.boxSize = widthEm
      this.boxRows = 18
      this.boxCols = (window.innerWidth / this.boxSize) *2.5
      this.boxArrayLength = this.boxRows * this.boxCols
      _boxArray = []
      this.createBoxes()
    }
    

    this.move = (e) => {
      _mouseX = e.clientX -80
      _mouseY = e.clientY -80
    }
    // console.log(window)

    //* ** METHODS ***
    function clearStage () {
      _stageContext.clearRect(0, 0, _stageWidth, _stageHeight)
    }

    this.createBoxes = () => {
      let curBox, xSpacing, ySpacing
      // const startingX = _halfStageWidth - (_boxCols / 2) * this.boxSpacing
      // const startingY = _halfStageHeight - (_boxRows / 2) * _boxSpacing
      const startingX = 0
      const startingY = this.boxSize
      let i = 0
      let j = 0
      let count = 0
      for (j = 0; j < this.boxRows; j++) {
        for (i = 0; i < this.boxCols; i++) {
          xSpacing = startingX + i * (this.boxSpacing + this.boxSize)

          ySpacing = startingY + j * (this.boxSpacing + this.boxSize)
          if (_boxArray[i - 1] !== undefined) {
            xSpacing = _boxArray[count - 1].x + _boxArray[count - 1].width
          }

          curBox = new Box({
            size: this.boxSize,
            x: xSpacing,
            y: ySpacing,
            text: this.textItems.get(count < this.textItems.size - 1 ? count : count % this.textItems.size)
          })

          _boxArray.push(curBox)
          count++
        }
      }
    }

    this.drawStage = () => {
      let i = 0
      let curBox

      for (i = 0; i < this.boxArrayLength; i++) {
        curBox = _boxArray[i]
        curBox.move()
        curBox.draw()
      }
    }

    this.onEnterFrame = () => {
      clearStage()
      this.drawStage()
      this.animate = window.requestAnimationFrame(this.onEnterFrame)
    }

    this.exitCanvas = () => {
      clearStage()
      // this.initialised = false
      window.cancelAnimationFrame(this.animate)
      window.removeEventListener('resize', this.resize.bind(this), false)
    }

  }
}

const Box = function (options) {
  this.size = this.startSize = options.size
  this.halfSize = this.size / 2
  this.x = this.startX = options.x
  this.y = this.startY = options.y
  this.text = options.text
  this.width = _stageContext.measureText(options.text.letter).width
// console.log(options.x, options.y)
}

Box.prototype.draw = function () {
  _stageContext.fillText(
    this.text.letter,
    this.x,
    this.y,
    this.size,
    this.size
  )
  _stageContext.font = `${this.size}px Baskervville`
}

Box.prototype.move = function () {
  const dx = _mouseX - this.startX
  const dy = _mouseY - this.startY
  const sqrtNum = Math.sqrt(dx * dx + dy * dy)
  let lensDisp
  // are we within range

  if (sqrtNum < _mouseRadiusNum) {
      lensDisp = Math.sin(Math.PI * Math.abs(sqrtNum / _mouseRadiusNum))
    this.size = this.startSize + this.startSize * (0.3 * ((_mouseRadiusNum - sqrtNum) / _mouseRadiusNum))
  } else {
    this.x = this.startX
    this.y = this.startY
    this.size = this.startSize
  }
}

export default Canvas

