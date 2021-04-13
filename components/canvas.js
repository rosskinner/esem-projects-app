//* ** SHIM ***

// (function () {
//   'use strict'

//* ** VARIABLES ***
let _stageContext,
  _stageWidth,
  _stageHeight,
  _halfStageWidth,
  _halfStageHeight
let _mouseX = 0
let _mouseY = 0
const _boxRows = 10
const _boxCols = 60
const _mouseRadiusNum = 185
const _boxArray = []
const _boxArrayLength = _boxRows * _boxCols
const _boxSize = 100
const _boxSpacing = 10
let text
let words
let selectedWord
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
  constructor(projectLinks) {

  this.init = () => {
    this.stage = document.getElementById('stage')
  _stageWidth = this.stage.width = window.innerWidth
  _stageHeight = this.stage.height = window.innerHeight
  this.stage.style.width = window.innerWidth
  this.stage.style.height = window.innerHeight
  // _halfStageWidth = _stageWidth / 2
  // _halfStageHeight = _stageHeight / 2
  _stageContext = stage.getContext('2d')
  _stageContext.fillStyle = '#fff'
  _stageContext.strokeStyle = '#999'
  _stageContext.font = `${_boxSize}px Baskervville`
  _stageContext.textBaseline = 'middle'
  text = document.getElementById('home-text').innerHTML.split('')
  words = document.getElementById('home-text').innerHTML.split(' ')
  this.textItems = new Map()
  let count = 0
  words.map((word, i) => {
    word.split('').map((letter, j) => {
      this.textItems.set(count, { letter: letter, word: word, index: i })
      count++
    })
    this.textItems.set(count, { letter: ' ', word: word, index: i })
    count++
    //
    // textItems[i].word = word
    // const letters = word.split('')
  })

  projectLinks.map((obj) =>{
    this.textItems.forEach((item, index) => {
      if (item.word === obj.text) {
        this.textItems.set(index, {...item, projectId: obj.projectId})
      }
    })
  })
  console.log(this.textItems)
  // console.log(text)
  this.createBoxes()
  this.onEnterFrame()
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
    // const startingX = _halfStageWidth - (_boxCols / 2) * _boxSpacing
    // const startingY = _halfStageHeight - (_boxRows / 2) * _boxSpacing
    const startingX = 0
    const startingY = _boxSize
    let i = 0
    let j = 0
    let count = 0
    for (j = 0; j < _boxRows; j++) {
      for (i = 0; i < _boxCols; i++) {
        xSpacing = startingX + i * (_boxSpacing + _boxSize)

        ySpacing = startingY + j * (_boxSpacing + _boxSize)
        if (_boxArray[i - 1] !== undefined) {
          xSpacing = _boxArray[count - 1].x + _boxArray[count - 1].width
        }

        curBox = new Box({
          size: _boxSize,
          x: xSpacing,
          y: ySpacing,
          text: this.textItems.get(count < this.textItems.size - 1 ? count : count % this.textItems.size)
        })

        _boxArray.push(curBox)
        count++
      }
    }
  }

  function drawStage () {
    let i = 0
    let curBox

    for (i = 0; i < _boxArrayLength; i++) {
      curBox = _boxArray[i]
      curBox.move()
      curBox.draw()
    }
  }

  this.onEnterFrame =() => {
    clearStage()
    drawStage()
    // console.log(window)
    window.requestAnimationFrame(this.onEnterFrame)
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
  let color = '#ffffff'
  
  // if ('projectId' in this.text) {
  //   color = '#23a864'
  // }

  // _stageContext.fillStyle = color

  _stageContext.fillText(
    this.text.letter,
    this.x,
    this.y,
    this.size,
    this.size
  )
  // console.log(this.text.projectId)
  // console.log(i)
  
  _stageContext.font = `${this.size}px Baskervville`
  // console.log(this.size)
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
    if (_mouseX <= (this.startX + this.width) && _mouseX >= this.startX && _mouseY <= (this.startY + this.width) && _mouseY >= this.startY && selectedWord !== this.text.projectId) {
      selectedWord = this.text.projectId
      Canvas.prototype.selectedWord = this.text.projectId
    }
    
    
  } else {
    this.x = this.startX
    this.y = this.startY
    this.size = this.startSize
  }
}

export default Canvas
// })()
