import * as R from 'ramda'

const samePoint = (p1, p2) =>
  p1.x === p2.x && p1.y === p2.y

const sameLine = (l1, l2) =>
  (samePoint(l1.p1, l2.p1) && samePoint(l1.p2, l2.p2)) ||
  (samePoint(l1.p1, l2.p2) && samePoint(l1.p2, l2.p1))

const reverseLine = line => ({
  p1: {
    x: line.p2.x,
    y: line.p2.y
  },
  p2: {
    x: line.p1.x,
    y: line.p1.y
  }
})

const lineDirection = ({ p1, p2 }) => {
  if (p1.x === p2.x) return p1.y < p2.y ? 'D' : 'U'
  if (p1.y === p2.y) return p1.x < p2.x ? 'R' : 'L'
}

const calculateAllLines = (location, cells) =>
  R.chain(
    cell => {
      const x = location.x + cell.x
      const y = location.y + cell.y
      const tl = { x, y }
      const tr = { x: x + 1, y }
      const br = { x: x + 1, y: y + 1 }
      const bl = { x, y: y + 1 }
      return [
        { p1: tl, p2: tr },
        { p1: tr, p2: br },
        { p1: br, p2: bl },
        { p1: bl, p2: tl }
      ]
    },
    cells)

const eliminateInternalLines = lines => {
  const countOccurrencesOfLine = line1 =>
    lines.filter(line2 => sameLine(line1, line2)).length
  return lines.filter(line => countOccurrencesOfLine(line) === 1)
}

// TODO: use recursion to make this functional
const orderBoundaryLines = lines => {
  let currentLine = lines[0]
  let otherPoint = currentLine.p2
  const startingPoint = currentLine.p1
  const results = [currentLine]
  for (; ;) {
    if (samePoint(otherPoint, startingPoint)) break
    currentLine = lines
      .filter(line1 => !results.find(line2 => sameLine(line1, line2)))
      .find(line => samePoint(line.p1, otherPoint) || samePoint(line.p2, otherPoint))
    const p1Matched = samePoint(currentLine.p1, otherPoint)
    otherPoint = p1Matched ? currentLine.p2 : currentLine.p1
    results.push(p1Matched ? currentLine : reverseLine(currentLine))
  }
  return results
}

// TODO: use recursion to make this functional
const consolidateBoundaryLines = lines => {
  const result = []
  const furthestLineIndexMaintainingDirection = (originalDirection, fromLineIndex) => {
    for (let lineIndex = fromLineIndex + 1; lineIndex < lines.length; lineIndex++) {
      const nextLine = lines[lineIndex]
      const nextDirection = lineDirection(nextLine)
      if (nextDirection !== originalDirection) {
        return lineIndex
      }
    }
    return 0
  }
  for (let lineIndex = 0; lineIndex < lines.length;) {
    const line = lines[lineIndex]
    const p1 = line.p1
    lineIndex = furthestLineIndexMaintainingDirection(lineDirection(line), lineIndex)
    const p2 = lines[lineIndex].p1
    result.push({ p1, p2 })
    if (lineIndex === 0) break
  }
  return result
}

export const calculateBoundary = R.pipe(
  calculateAllLines,
  eliminateInternalLines,
  orderBoundaryLines,
  consolidateBoundaryLines
)
