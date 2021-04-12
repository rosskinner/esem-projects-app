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

const Canvas = () => {
  const stage = document.getElementById('stage')
  _stageWidth = stage.width = window.innerWidth
  _stageHeight = stage.height = window.innerHeight
  // _halfStageWidth = _stageWidth / 2
  // _halfStageHeight = _stageHeight / 2
  _stageContext = stage.getContext('2d')
  _stageContext.fillStyle = '#fff'
  _stageContext.strokeStyle = '#999'
  _stageContext.font = `${_boxSize}px Baskervville`
  _stageContext.textBaseline = 'middle'
  text = document.getElementById('home-text').innerHTML.split('')
  // console.log(text)
  createBoxes()
  onEnterFrame()
  // text.addEventListener('load', (e) => {
  //   console.log('text', text)
  // })

  window.addEventListener(
    'mousemove',
    function (e) {
      _mouseX = e.clientX
      _mouseY = e.clientY
    },
    false
  )
  // console.log(window)

  //* ** METHODS ***
  function clearStage () {
    _stageContext.clearRect(0, 0, _stageWidth, _stageHeight)
  }

  function createBoxes () {
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
          text: text[count < text.length - 1 ? count : count % text.length]
        })
        _boxArray.push(curBox)
        count++
      }
    }
  }

  function drawStage () {
    let i = 0
    let curBox
    // _boxArray.sort(function (a, b) {
    //   return a.size - b.size
    // })
    for (i = 0; i < _boxArrayLength; i++) {
      curBox = _boxArray[i]
      curBox.move()
      curBox.draw()
    }
  }

  function onEnterFrame () {
    clearStage()
    drawStage()
    // console.log(window)
    window.requestAnimationFrame(onEnterFrame)
  }

  //* ** CLASSES ***
}

const Box = function (options) {
  this.size = this.startSize = options.size
  this.halfSize = this.size / 2
  this.x = this.startX = options.x
  this.y = this.startY = options.y
  this.text = options.text
  this.width = _stageContext.measureText(options.text).width
// console.log(options.x, options.y)
}

Box.prototype.draw = function () {
// _stageContext.beginPath();
// _stageContext.moveTo(this.startX, this.startY);
// _stageContext.lineTo(this.x, this.y);
// _stageContext.stroke();

  // _stageContext.drawImage(
  //   image,
  //   this.x - this.size / 2,
  //   this.y - this.size / 2,
  //   this.size,
  //   this.size
  // )

  // _stageContext.beginPath()
  // _stageContext.moveTo(this.startX, this.startY)
  // _stageContext.lineTo(this.x, this.y)
  // _stageContext.fillStyle = 'rgb(255,255,255)'
  // _stageContext.stroke()
  // _stageContext.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
  // const char = i < text.length - 1 ? i : i % text.length
  _stageContext.fillText(
    this.text,
    this.x,
    this.y,
    this.size,
    this.size
  )
  // console.log(i)
  _stageContext.font = `${this.size}px Baskervville`
  // console.log(this.size)

// _stageContext.fillRect(this.x - this.size/2,this.y - this.size/2,this.size,this.size);
}

Box.prototype.move = function () {
  const dx = _mouseX - this.startX
  const dy = _mouseY - this.startY
  const sqrtNum = Math.sqrt(dx * dx + dy * dy)
  let lensDisp
  // are we within range
  if (sqrtNum < _mouseRadiusNum) {
    lensDisp = Math.sin(Math.PI * Math.abs(sqrtNum / _mouseRadiusNum))
    this.size = this.startSize + this.startSize * (1 * ((_mouseRadiusNum - sqrtNum) / _mouseRadiusNum))
  } else {
    this.x = this.startX
    this.y = this.startY
    this.size = this.startSize
  }
}

export default Canvas
// })()
