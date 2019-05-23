const R = require('ramda')

// LRUD
const CORNERS_TABLE = {
  '-b-b': 0x250F,
  'b--b': 0x2513,
  'b-b-': 0x251B,
  '-bb-': 0x2517,

  '-bbb': 0x2523,
  'b-bb': 0x252B,
  'bb-b': 0x2533,
  'bbb-': 0x253B,

  '-nbb': 0x2520,
  'n-bb': 0x2528,
  'bb-n': 0x252F,
  'bbn-': 0x2537,

  'nbbb': 0x254A,
  'bnbb': 0x2549,
  'bbnb': 0x2548,
  'bbbn': 0x2547,

  'bbnn': 0x253F,
  'nnbb': 0x2542,
  'bnbn': 0x2543,
  'nbnb': 0x2546,
  'bnnb': 0x2545,
  'nbbn': 0x2544,

  'bbbb': 0x254B,
  'nnnn': 0x253C
}

const SIDES_TABLE = {
  // 'hn': 0x2500,
  // 'vn': 0x2502,
  'hn': 32,
  'vn': 32,
  'hb': 0x2501,
  'vb': 0x2503
}

const findCell = (solution, x, y) =>
  solution.find(cell => cell.coords.x === x && cell.coords.y === y)

const findRoomId = (solution, x, y) => {
  const cell = findCell(solution, x, y)
  return cell ? cell.room.id : null
}

const CORNER_NW = Symbol('CORNER_NW')
const CORNER_NE = Symbol('CORNER_NE')
const CORNER_SW = Symbol('CORNER_SW')
const CORNER_SE = Symbol('CORNER_SE')

const adjacentCornerRoomIds = (solution, x, y, corner) => {
  const thisRoomId = findRoomId(solution, x, y)
  const wRoomId = findRoomId(solution, x - 1, y)
  const eRoomId = findRoomId(solution, x + 1, y)
  const nRoomId = findRoomId(solution, x, y - 1)
  const sRoomId = findRoomId(solution, x, y + 1)
  const nwRoomId = findRoomId(solution, x - 1, y - 1)
  const neRoomId = findRoomId(solution, x + 1, y - 1)
  const swRoomId = findRoomId(solution, x - 1, y + 1)
  const seRoomId = findRoomId(solution, x + 1, y + 1)
  switch (corner) {
    case CORNER_NW: return [
      nwRoomId, nRoomId,
      wRoomId, thisRoomId
    ]
    case CORNER_NE: return [
      nRoomId, neRoomId,
      thisRoomId, eRoomId
    ]
    case CORNER_SW: return [
      wRoomId, thisRoomId,
      swRoomId, sRoomId
    ]
    case CORNER_SE: return [
      thisRoomId, eRoomId,
      sRoomId, seRoomId
    ]
  }
}

const lookupCornerBoxChar = (solution, x, y, corner) => {
  const [nwRoomId, neRoomId, swRoomId, seRoomId] = adjacentCornerRoomIds(solution, x, y, corner)
  const wallType = (id1, id2) => !id1 && !id2 ? '-' : id1 === id2 ? 'n' : 'b'
  const l = wallType(nwRoomId, swRoomId)
  const r = wallType(neRoomId, seRoomId)
  const u = wallType(nwRoomId, neRoomId)
  const d = wallType(swRoomId, seRoomId)
  const key = [l, r, u, d].join('')
  const codePoint = CORNERS_TABLE[key]
  return String.fromCodePoint(codePoint)
}

const SIDE_LEFT = Symbol('SIDE_LEFT')
const SIDE_RIGHT = Symbol('SIDE_RIGHT')
const SIDE_TOP = Symbol('SIDE_TOP')
const SIDE_BOTTOM = Symbol('SIDE_BOTTOM')

const adjacentSideCoords = (x, y, side) => {
  switch (side) {
    case SIDE_LEFT: return { x: x - 1, y }
    case SIDE_RIGHT: return { x: x + 1, y }
    case SIDE_TOP: return { x, y: y - 1 }
    case SIDE_BOTTOM: return { x, y: y + 1 }
  }
}

const adjacentSideRoomsIds = (solution, x, y, side) => {
  const otherCoords = adjacentSideCoords(x, y, side)
  const thisRoomId = findRoomId(solution, x, y)
  const otherRoomId = findRoomId(solution, otherCoords.x, otherCoords.y)
  return [thisRoomId, otherRoomId]
}

const lookupSideBoxChar = (solution, x, y, side) => {
  const [thisRoomId, otherRoomId] = adjacentSideRoomsIds(solution, x, y, side)
  switch (side) {
    case SIDE_LEFT:
    case SIDE_RIGHT:
      {
        const key = thisRoomId === otherRoomId ? 'vn' : 'vb'
        const codePoint = SIDES_TABLE[key]
        return String.fromCodePoint(codePoint)
      }
    case SIDE_TOP:
    case SIDE_BOTTOM:
      {
        const key = thisRoomId === otherRoomId ? 'hn' : 'hb'
        const codePoint = SIDES_TABLE[key]
        return String.fromCodePoint(codePoint)
      }
  }
}

const SPACE = ' '
const ESC = '\x1b'
const HIGHLIGHT = `${ESC}[35m`
const RESET = `${ESC}[0m`

const drawSolution = (puzzle, solution) => {

  const xs = R.range(0, puzzle.width)
  const ys = R.range(0, puzzle.height)

  let topBoxesLine = lookupCornerBoxChar(solution, 0, 0, CORNER_NW)
  for (const x of xs) {
    topBoxesLine += lookupSideBoxChar(solution, x, 0, SIDE_TOP).repeat(3)
    topBoxesLine += lookupCornerBoxChar(solution, x, 0, CORNER_NE)
  }
  console.log(topBoxesLine)

  for (const y of ys) {
    let valuesLine = lookupSideBoxChar(solution, 0, y, SIDE_LEFT)
    let boxesLine = lookupCornerBoxChar(solution, 0, y, CORNER_SW)
    for (const x of xs) {
      const cell = findCell(solution, x, y)
      if (cell.isInitialValue) {
        valuesLine += `${SPACE}${HIGHLIGHT}${cell.value}${RESET}${SPACE}`
      } else {
        valuesLine += `${SPACE}${cell.value}${SPACE}`
      }
      valuesLine += lookupSideBoxChar(solution, x, y, SIDE_RIGHT)
      boxesLine += lookupSideBoxChar(solution, x, y, SIDE_BOTTOM).repeat(3)
      boxesLine += lookupCornerBoxChar(solution, x, y, CORNER_SE)
    }
    console.log(valuesLine)
    console.log(boxesLine)
  }
}

module.exports = {
  drawSolution
}
