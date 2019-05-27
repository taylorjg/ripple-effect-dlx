(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=g||self,f(g.dlxlib={}));}(this,function(exports){'use strict';class DataObject {

  constructor(listHeader, rowIndex) {
    this.listHeader = listHeader;
    this.rowIndex = rowIndex;
    this.up = this;
    this.down = this;
    this.left = this;
    this.right = this;
    if (listHeader) {
      listHeader.addDataObject(this);
    }
  }

  appendToRow(dataObject) {
    this.left.right = dataObject;
    dataObject.right = this;
    dataObject.left = this.left;
    this.left = dataObject;
  }

  appendToColumn(dataObject) {
    this.up.down = dataObject;
    dataObject.down = this;
    dataObject.up = this.up;
    this.up = dataObject;
  }

  unlinkFromColumn() {
    this.down.up = this.up;
    this.up.down = this.down;
  }

  relinkIntoColumn() {
    this.down.up = this;
    this.up.down = this;
  }

  loopUp(fn) { this.loop(fn, 'up'); }
  loopDown(fn) { this.loop(fn, 'down'); }
  loopLeft(fn) { this.loop(fn, 'left'); }
  loopRight(fn) { this.loop(fn, 'right'); }

  loop(fn, propName) {
    for (let next = this[propName]; next !== this; next = next[propName]) {
      fn(next);
    }
  }
}class ColumnObject extends DataObject {

  constructor() {
    super(null, -1);
    this.previousColumnObject = this;
    this.nextColumnObject = this;
    this.numberOfRows = 0;
  }

  appendColumnHeader(columnObject) {
    this.previousColumnObject.nextColumnObject = columnObject;
    columnObject.nextColumnObject = this;
    columnObject.previousColumnObject = this.previousColumnObject;
    this.previousColumnObject = columnObject;
  }

  unlinkColumnHeader() {
    this.nextColumnObject.previousColumnObject = this.previousColumnObject;
    this.previousColumnObject.nextColumnObject = this.nextColumnObject;
  }

  relinkColumnHeader() {
    this.nextColumnObject.previousColumnObject = this;
    this.previousColumnObject.nextColumnObject = this;
  }

  addDataObject(dataObject) {
    this.appendToColumn(dataObject);
    this.numberOfRows++;
  }

  unlinkDataObject(dataObject) {
    dataObject.unlinkFromColumn();
    this.numberOfRows--;
  }

  relinkDataObject(dataObject) {
    dataObject.relinkIntoColumn();
    this.numberOfRows++;
  }

  loopNext(fn) {
    for (let next = this.nextColumnObject; next !== this; next = next.nextColumnObject) {
      fn(next);
    }
  }
}const EventEmitter = require('events');

/**
 * @typedef {number[]} PartialSolution The indices of the matrix rows that comprise a partial solution.
 */

/**
 * @typedef {number[]} Solution The indices of the matrix rows that comprise a complete solution.
 */

/**
 * @typedef {*} MatrixValue Matrix values can be of any time. Anything truthy is treated as a 1. Anything falsy is treated as a 0.
 */

/**
 * @typedef {MatrixValue[]} MatrixRow A matrix row is an array of {MatrixValue}.
 */

/**
 * @typedef {MatrixRow[]} Matrix A matrix is an array of {MatrixRow}.
 */

/**
 * Solves the matrix and returns an array of solutions.
 * @param {Matrix} matrix The matrix to be solved.
 * @param {object} [options] Optional options object.
 * @param {number} options.numSolutions The number of solutions to be returned. By default, all solutions are returned.
 * @param {number} options.numPrimaryColumns The number of primary columns. By default, all columns are primary.
 *     Any remaining columns are considered to be secondary columns.
 * @returns {Solution[]} The solutions that were found.
 */
const solve = (matrix, options) => new Dlx().solve(matrix, options);

/**
 * Creates an ES2015 Generator object that can be used to iterate over the solutions to the matrix.
 * @param {Matrix} matrix The matrix to be solved.
 * @param {object} [options] Optional options object.
 * @param {number} options.numPrimaryColumns The number of primary columns. By default, all columns are primary.
 *     Any remaining columns are considered to be secondary columns.
 * @returns {IterableIterator.<number>} An ES2015 Generator object that can be used to iterate over the solutions.
 */
const solutionGenerator = function* (matrix, options) {
  yield* new Dlx().solutionGenerator(matrix, options);
};

const defaultOptions = {
  numSolutions: Number.MAX_SAFE_INTEGER,
  numPrimaryColumns: Number.MAX_SAFE_INTEGER
};

class Dlx extends EventEmitter {

  /**
   * Solves the matrix and returns an array of solutions.
   * @param {Matrix} matrix The matrix to be solved.
   * @param {object} [options] Optional options object.
   * @param {number} options.numSolutions The number of solutions to be returned. By default, all solutions are returned.
   * @param {number} options.numPrimaryColumns The number of primary columns. By default, all columns are primary.
   *     Any remaining columns are considered to be secondary columns.
   * @returns {Solution[]} The solutions that were found.
   */
  solve(matrix, options) {
    const actualOptions = Object.assign({}, defaultOptions, options);
    if (!Number.isInteger(actualOptions.numSolutions)) {
      throw new Error('options.numSolutions must be an integer')
    }
    if (actualOptions.numSolutions < 0) {
      throw new Error(`options.numSolutions can't be negative - don't be silly`)
    }
    const generator = this.solutionGenerator(matrix, actualOptions);
    const numSolutions = actualOptions.numSolutions;
    const solutions = [];
    for (let index = 0; index < numSolutions; index++) {
      const iteratorResult = generator.next();
      if (iteratorResult.done) break
      solutions.push(iteratorResult.value);
    }
    return solutions
  }

  /**
   * Creates an ES2015 Generator object that can be used to iterate over the solutions to the matrix.
   * @param {Matrix} matrix The matrix to be solved.
   * @param {object} [options] Optional options object.
   * @param {number} options.numPrimaryColumns The number of primary columns. By default, all columns are primary.
   *     Any remaining columns are considered to be secondary columns.
   * @returns {IterableIterator.<number>} An ES2015 Generator object that can be used to iterate over the solutions.
   */
  * solutionGenerator(matrix, options) {
    const actualOptions = Object.assign({}, defaultOptions, options);
    if (!Number.isInteger(actualOptions.numPrimaryColumns)) {
      throw new Error('options.numPrimaryColumns must be an integer')
    }
    if (actualOptions.numPrimaryColumns < 0) {
      throw new Error(`options.numPrimaryColumns can't be negative - don't be silly`)
    }
    const root = buildInternalStructure(matrix, actualOptions.numPrimaryColumns);
    const searchState = new SearchState(this, root);
    yield* search(searchState);
  }
}

const buildInternalStructure = (matrix, numPrimaryColumns) => {

  numPrimaryColumns = numPrimaryColumns || (matrix[0] ? matrix[0].length : 0);

  const root = new ColumnObject();
  const colIndexToListHeader = new Map();

  matrix.forEach((row, rowIndex) => {
    let firstDataObjectInThisRow = null;
    row.forEach((col, colIndex) => {
      if (rowIndex === 0) {
        const listHeader = new ColumnObject();
        if (colIndex < numPrimaryColumns) {
          root.appendColumnHeader(listHeader);
        }
        colIndexToListHeader.set(colIndex, listHeader);
      }
      if (col) {
        const listHeader = colIndexToListHeader.get(colIndex);
        const dataObject = new DataObject(listHeader, rowIndex);
        if (firstDataObjectInThisRow)
          firstDataObjectInThisRow.appendToRow(dataObject);
        else
          firstDataObjectInThisRow = dataObject;
      }
    });
  });

  return root
};

function* search(searchState) {

  searchState.searchStep();

  if (searchState.isEmpty()) {
    if (searchState.currentSolution.length) {
      searchState.solutionFound();
      yield searchState.currentSolution.slice().sort();
    }
    return
  }

  const c = chooseColumnWithFewestRows(searchState);
  coverColumn(c);
  for (let r = c.down; r !== c; r = r.down) {
    searchState.pushRowIndex(r.rowIndex);
    r.loopRight(j => coverColumn(j.listHeader));
    yield* search(searchState);
    r.loopLeft(j => uncoverColumn(j.listHeader));
    searchState.popRowIndex();
  }
  uncoverColumn(c);
}

const chooseColumnWithFewestRows = searchState => {
  let chosenColumn = null;
  searchState.root.loopNext(column => {
    if (!chosenColumn || column.numberOfRows < chosenColumn.numberOfRows) {
      chosenColumn = column;
    }
  });
  return chosenColumn
};

const coverColumn = c => {
  c.unlinkColumnHeader();
  c.loopDown(i => i.loopRight(j => j.listHeader.unlinkDataObject(j)));
};

const uncoverColumn = c => {
  c.loopUp(i => i.loopLeft(j => j.listHeader.relinkDataObject(j)));
  c.relinkColumnHeader();
};

class SearchState {

  constructor(dlx, root) {
    this.dlx = dlx;
    this.root = root;
    this.currentSolution = [];
    this.stepIndex = 0;
    this.solutionIndex = 0;
  }

  isEmpty() {
    return this.root.nextColumnObject === this.root
  }

  pushRowIndex(rowIndex) {
    this.currentSolution.push(rowIndex);
  }

  popRowIndex() {
    this.currentSolution.pop();
  }

  searchStep() {
    this.dlx.emit('step', this.currentSolution, this.stepIndex++);
  }

  solutionFound() {
    this.dlx.emit('solution', this.currentSolution, this.solutionIndex++);
  }
}exports.Dlx=Dlx;exports.solutionGenerator=solutionGenerator;exports.solve=solve;Object.defineProperty(exports,'__esModule',{value:true});}));