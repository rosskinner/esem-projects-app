import paper, { view, Point, Path, Raster, project } from 'paper'
import { useEffect } from 'react'
import { getStrapiMedia } from '../lib/api'

const Paper = ({ projects }) => {
  // console.log(this)

  useEffect(() => {
    paper.install(window)
    paper.setup('paper-canvas')
    init()
  }, [])
  const init = () => {
    const values = {
      paths: 50,
      points: 10,
      radius: (view.size.height * 0.15)
    }

    const hitOptions = {
      segments: true,
      stroke: true,
      fill: true,
      tolerance: 5,
      match: function (e) {
        if (e.type === 'pixel') return false
        return true
      }
    }
    createPaths()
    let group
    let clipMask
    let blob

    function createPaths () {
      const url = (projects[1].collectionImage.formats === null || Object.keys(projects[1].collectionImage.formats).length === 0) ? projects[1].collectionImage : projects[1].collectionImage.formats.large
      const imgSrc = getStrapiMedia(url)

      const raster = new Raster(imgSrc)

      // Move the raster to the center of the view
      // raster.width = view.size.width
      raster.size = raster.size.clone(view.size)
      raster.position = view.center

      const radius = values.radius
      const points = values.points

      blob = createBlob(view.center, radius, points)
      const lightness = (Math.random() - 0.5) * 0.4 + 0.4
      const hue = Math.random() * 360
      blob.fillColor = { hue: hue, saturation: 1, lightness: lightness, alpha: 0 }

      // console.log(projects)
      clipMask = blob.clone()
      blob.strokeColor = 'black'
      group = new Group(clipMask, raster)

      group.clipped = true
      project.activeLayer.insertChild(1, blob)
      console.log(group, blob)

      // const text = new PointText(view.center)
      // text.fillColor = 'white'
      // text.content = 'EP'
      // text.pivot = text.center
      // text.fontSize = '30rem'
      // text.fontFamily = 'Karla'
      // text.justification = 'center'

      // path.clipMask = true
      // console.log(raster)
    }

    function createBlob (center, maxRadius, points) {
      const path = new Path()
      path.closed = true
      for (let i = 0; i < points; i++) {
        const delta = new Point({
          length: (maxRadius * 0.5) + maxRadius,
          angle: (360 / points) * i
        })
        const newVector = center.add(delta)
        path.add(newVector)
      }
      path.smooth()
      return path
    }

    let segment, path
    let movePath = false

    view.onMouseDown = function (event) {
      segment = path = null
      const hitResult = project.hitTest(event.point, hitOptions)
      if (!hitResult) { return }
      if (event.modifiers.shift) {
        if (hitResult.type === 'segment') {
          hitResult.segment.remove()
          clipMask.segments[hitResult.segment._index].remove()
        };
        return
      }

      if (hitResult) {
        path = hitResult.item
        if (hitResult.type === 'segment') {
          segment = hitResult.segment
        } else if (hitResult.type === 'stroke') {
          const location = hitResult.location
          // segment = blob.insert(location.index + 1, event.point)
          // clipMask.insert(location.index + 1, event.point)

          // blob.smooth()
          // clipMask.smooth()
        }
      }
      movePath = hitResult.type === 'fill'
      if (movePath) { project.activeLayer.addChild(hitResult.item) }
    }

    blob.onMouseMove = function (event) {
      project.activeLayer.selected = false
      // console.log(event)
      // const hitResult = project.hitTest(event.point, hitOptions)
      // if (!hitResult) { return }
      // if (hitResult) {
      this.selected = true
      // }
    }

    view.onMouseDrag = function (event) {
      if (segment) {
        blob.segments[segment.index].point = segment.point.add(event.delta)
        clipMask.segments[segment.index].point = segment.point.add(event.delta)

        clipMask.smooth()
        blob.smooth()
      } else if (path && path.type !== 'fill') {
        // blob.position = path.position.add(event.delta)
        // clipMask.position = path.position.add(event.delta)

        // for (let i = 0; i < clipMask.segments.length; i++) {
        //   const s = clipMask.segments[i]
        //   if (s === segment) {
        //     path.position = path.position.add(event.delta)
        //     s.point = s.point.add(event.delta)
        //   }
        // }
      }
      // console.log(segment)
    }
  }
  return null
}

export default Paper
