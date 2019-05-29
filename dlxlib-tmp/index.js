!function(t,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports):"function"==typeof define&&define.amd?define(["exports"],o):o((t=t||self).dlxlib={})}(this,function(t){"use strict";class o{constructor(t,o){this.listHeader=t,this.rowIndex=o,this.up=this,this.down=this,this.left=this,this.right=this,t&&t.addDataObject(this)}appendToRow(t){this.left.right=t,t.right=this,t.left=this.left,this.left=t}appendToColumn(t){this.up.down=t,t.down=this,t.up=this.up,this.up=t}unlinkFromColumn(){this.down.up=this.up,this.up.down=this.down}relinkIntoColumn(){this.down.up=this,this.up.down=this}loopUp(t){this.loop(t,"up")}loopDown(t){this.loop(t,"down")}loopLeft(t){this.loop(t,"left")}loopRight(t){this.loop(t,"right")}loop(t,o){for(let n=this[o];n!==this;n=n[o])t(n)}}class n extends o{constructor(){super(null,-1),this.previousColumnObject=this,this.nextColumnObject=this,this.numberOfRows=0}appendColumnHeader(t){this.previousColumnObject.nextColumnObject=t,t.nextColumnObject=this,t.previousColumnObject=this.previousColumnObject,this.previousColumnObject=t}unlinkColumnHeader(){this.nextColumnObject.previousColumnObject=this.previousColumnObject,this.previousColumnObject.nextColumnObject=this.nextColumnObject}relinkColumnHeader(){this.nextColumnObject.previousColumnObject=this,this.previousColumnObject.nextColumnObject=this}addDataObject(t){this.appendToColumn(t),this.numberOfRows++}unlinkDataObject(t){t.unlinkFromColumn(),this.numberOfRows--}relinkDataObject(t){t.relinkIntoColumn(),this.numberOfRows++}loopNext(t){for(let o=this.nextColumnObject;o!==this;o=o.nextColumnObject)t(o)}}const e=require("events");
/**
   * @typedef {number[]} PartialSolution The indices of the matrix rows that comprise a partial solution.
   */
/**
   * @typedef {number[]} Solution The indices of the matrix rows that comprise a complete solution.
   */
/**
   * @typedef {*} MatrixValue Matrix values can be of any type. Anything truthy is treated as a 1. Anything falsy is treated as a 0.
   */
/**
   * @typedef {MatrixValue[]} MatrixRow A matrix row is an array of {@link MatrixValue}.
   */
/**
   * @typedef {MatrixRow[]} Matrix A matrix is an array of {@link MatrixRow}.
   */
/**
   * Solves the matrix and returns an array of solutions.
   * This is a convenience function which avoids having to create an instance of the {@link Dlx} class.
   * It is useful if you are not interested in handling any events.
   * @param {Matrix} matrix The matrix to be solved.
   * @param {object} [options] Optional options object.
   * @param {number} options.numSolutions The number of solutions to be returned. By default, all solutions are returned.
   * @param {number} options.numPrimaryColumns The number of primary columns. By default, all columns are primary.
   *     Any remaining columns are considered to be secondary columns.
   * @returns {Solution[]} The solutions that were found.
   */const i={numSolutions:Number.MAX_SAFE_INTEGER,numPrimaryColumns:Number.MAX_SAFE_INTEGER};
/**
   * 
   */class s extends e{
/**
     * Solves the matrix and returns an array of solutions.
     * @param {Matrix} matrix The matrix to be solved.
     * @param {object} [options] Additional options object.
     * @param {number} [options.numSolutions] The number of solutions to be returned. By default, all solutions are returned.
     * @param {number} [options.numPrimaryColumns] The number of primary columns. By default, all columns are primary.
     *     Any remaining columns are considered to be secondary columns.
     * @returns {Solution[]} The solutions that were found.
     * @fires Dlx#step
     * @fires Dlx#solution
     */
solve(t,o){const n=Object.assign({},i,o);if(!Number.isInteger(n.numSolutions))throw new Error("options.numSolutions must be an integer");if(n.numSolutions<0)throw new Error("options.numSolutions can't be negative - don't be silly");const e=this.solutionGenerator(t,n),s=n.numSolutions,u=[];for(let t=0;t<s;t++){const t=e.next();if(t.done)break;u.push(t.value)}return u}
/**
     * Creates an ES2015 Generator object that can be used to iterate over the solutions to the matrix.
     * @param {Matrix} matrix The matrix to be solved.
     * @param {object} [options] Additional options object.
     * @param {number} [options.numPrimaryColumns] The number of primary columns. By default, all columns are primary.
     *     Any remaining columns are considered to be secondary columns.
     * @returns {IterableIterator.<Solution>} An ES2015 Generator object that can be used to iterate over the solutions.
     * @fires Dlx#step
     * @fires Dlx#solution
     */*solutionGenerator(t,o){const n=Object.assign({},i,o);if(!Number.isInteger(n.numPrimaryColumns))throw new Error("options.numPrimaryColumns must be an integer");if(n.numPrimaryColumns<0)throw new Error("options.numPrimaryColumns can't be negative - don't be silly");const e=u(t,n.numPrimaryColumns),s=new p(this,e);yield*function*t(o){o.searchStep();if(o.isEmpty())return void(o.currentSolution.length&&(o.solutionFound(),yield o.currentSolution.slice()));const n=l(o);r(n);for(let e=n.down;e!==n;e=e.down)o.pushRowIndex(e.rowIndex),e.loopRight(t=>r(t.listHeader)),yield*t(o),e.loopLeft(t=>h(t.listHeader)),o.popRowIndex();h(n)}(s)}}
/**
   * Step event - fired for each step of the algorithm.
   * @event Dlx#step
   * @type object
   * @property {PartialSolution} partialSolution The current partial solution at this step of the algorithm.
   * @property {number} stepIndex The index of this step of the algorithm (0, 1, 2, ...).
   */
/**
   * Solution event - fired for each solution found.
   * @event Dlx#solution
   * @type object
   * @property {Solution} solution A solution to the matrix.
   * @property {number} solutionIndex The index of this solution (0, 1, 2, ...).
   */const u=(t,e)=>{e=e||(t[0]?t[0].length:0);const i=new n,s=new Map;return t.forEach((t,u)=>{let l=null;t.forEach((t,r)=>{if(0===u){const t=new n;r<e&&i.appendColumnHeader(t),s.set(r,t)}if(t){const t=s.get(r),n=new o(t,u);l?l.appendToRow(n):l=n}})}),i};const l=t=>{let o=null;return t.root.loopNext(t=>{(!o||t.numberOfRows<o.numberOfRows)&&(o=t)}),o},r=t=>{t.unlinkColumnHeader(),t.loopDown(t=>t.loopRight(t=>t.listHeader.unlinkDataObject(t)))},h=t=>{t.loopUp(t=>t.loopLeft(t=>t.listHeader.relinkDataObject(t))),t.relinkColumnHeader()};class p{constructor(t,o){this.dlx=t,this.root=o,this.currentSolution=[],this.stepIndex=0,this.solutionIndex=0}isEmpty(){return this.root.nextColumnObject===this.root}pushRowIndex(t){this.currentSolution.push(t)}popRowIndex(){this.currentSolution.pop()}searchStep(){const t={partialSolution:this.currentSolution.slice(),stepIndex:this.stepIndex++};this.dlx.emit("step",t)}solutionFound(){const t={solution:this.currentSolution.slice(),solutionIndex:this.solutionIndex++};this.dlx.emit("solution",t)}}t.Dlx=s,t.solutionGenerator=
/**
   * Creates an ES2015 Generator object that can be used to iterate over the solutions to the matrix.
   * This is a convenience function which avoids having to create an instance of the {@link Dlx} class.
   * It is useful if you are not interested in handling any events.
   * @param {Matrix} matrix The matrix to be solved.
   * @param {object} [options] Optional options object.
   * @param {number} options.numPrimaryColumns The number of primary columns. By default, all columns are primary.
   *     Any remaining columns are considered to be secondary columns.
   * @returns {IterableIterator.<number>} An ES2015 Generator object that can be used to iterate over the solutions.
   */
function*(t,o){yield*(new s).solutionGenerator(t,o)},t.solve=function(t,o){return(new s).solve(t,o)},Object.defineProperty(t,"__esModule",{value:!0})});
