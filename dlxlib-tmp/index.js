!function(t,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports):"function"==typeof define&&define.amd?define(["exports"],o):o((t=t||self).dlxlib={})}(this,function(t){"use strict";class o{constructor(t,o){this.listHeader=t,this.rowIndex=o,this.up=this,this.down=this,this.left=this,this.right=this,t&&t.addDataObject(this)}appendToRow(t){this.left.right=t,t.right=this,t.left=this.left,this.left=t}appendToColumn(t){this.up.down=t,t.down=this,t.up=this.up,this.up=t}unlinkFromColumn(){this.down.up=this.up,this.up.down=this.down}relinkIntoColumn(){this.down.up=this,this.up.down=this}loopUp(t){this.loop(t,"up")}loopDown(t){this.loop(t,"down")}loopLeft(t){this.loop(t,"left")}loopRight(t){this.loop(t,"right")}loop(t,o){for(let e=this[o];e!==this;e=e[o])t(e)}}class e extends o{constructor(){super(null,-1),this.previousColumnObject=this,this.nextColumnObject=this,this.numberOfRows=0}appendColumnHeader(t){this.previousColumnObject.nextColumnObject=t,t.nextColumnObject=this,t.previousColumnObject=this.previousColumnObject,this.previousColumnObject=t}unlinkColumnHeader(){this.nextColumnObject.previousColumnObject=this.previousColumnObject,this.previousColumnObject.nextColumnObject=this.nextColumnObject}relinkColumnHeader(){this.nextColumnObject.previousColumnObject=this,this.previousColumnObject.nextColumnObject=this}addDataObject(t){this.appendToColumn(t),this.numberOfRows++}unlinkDataObject(t){t.unlinkFromColumn(),this.numberOfRows--}relinkDataObject(t){t.relinkIntoColumn(),this.numberOfRows++}loopNext(t){for(let o=this.nextColumnObject;o!==this;o=o.nextColumnObject)t(o)}}const n=require("events"),i={numSolutions:Number.MAX_SAFE_INTEGER,numPrimaryColumns:Number.MAX_SAFE_INTEGER};
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
   */class s extends n{
/**
     * Solves the matrix and returns an array of solutions.
     * @param {Matrix} matrix The matrix to be solved.
     * @param {object} [options] Optional options object.
     * @param {number} options.numSolutions The number of solutions to be returned. By default, all solutions are returned.
     * @param {number} options.numPrimaryColumns The number of primary columns. By default, all columns are primary.
     *     Any remaining columns are considered to be secondary columns.
     * @returns {Solution[]} The solutions that were found.
     */
solve(t,o){const e=Object.assign({},i,o);if(!Number.isInteger(e.numSolutions))throw new Error("options.numSolutions must be an integer");if(e.numSolutions<0)throw new Error("options.numSolutions can't be negative - don't be silly");const n=this.solutionGenerator(t,e),s=e.numSolutions,u=[];for(let t=0;t<s;t++){const t=n.next();if(t.done)break;u.push(t.value)}return u}
/**
     * Creates an ES2015 Generator object that can be used to iterate over the solutions to the matrix.
     * @param {Matrix} matrix The matrix to be solved.
     * @param {object} [options] Optional options object.
     * @param {number} options.numPrimaryColumns The number of primary columns. By default, all columns are primary.
     *     Any remaining columns are considered to be secondary columns.
     * @returns {IterableIterator.<number>} An ES2015 Generator object that can be used to iterate over the solutions.
     */*solutionGenerator(t,o){const e=Object.assign({},i,o);if(!Number.isInteger(e.numPrimaryColumns))throw new Error("options.numPrimaryColumns must be an integer");if(e.numPrimaryColumns<0)throw new Error("options.numPrimaryColumns can't be negative - don't be silly");const n=u(t,e.numPrimaryColumns),s=new p(this,n);yield*function*t(o){o.searchStep();if(o.isEmpty())return void(o.currentSolution.length&&(o.solutionFound(),yield o.currentSolution.slice().sort()));const e=l(o);r(e);for(let n=e.down;n!==e;n=n.down)o.pushRowIndex(n.rowIndex),n.loopRight(t=>r(t.listHeader)),yield*t(o),n.loopLeft(t=>h(t.listHeader)),o.popRowIndex();h(e)}(s)}}const u=(t,n)=>{n=n||(t[0]?t[0].length:0);const i=new e,s=new Map;return t.forEach((t,u)=>{let l=null;t.forEach((t,r)=>{if(0===u){const t=new e;r<n&&i.appendColumnHeader(t),s.set(r,t)}if(t){const t=s.get(r),e=new o(t,u);l?l.appendToRow(e):l=e}})}),i};const l=t=>{let o=null;return t.root.loopNext(t=>{(!o||t.numberOfRows<o.numberOfRows)&&(o=t)}),o},r=t=>{t.unlinkColumnHeader(),t.loopDown(t=>t.loopRight(t=>t.listHeader.unlinkDataObject(t)))},h=t=>{t.loopUp(t=>t.loopLeft(t=>t.listHeader.relinkDataObject(t))),t.relinkColumnHeader()};class p{constructor(t,o){this.dlx=t,this.root=o,this.currentSolution=[],this.stepIndex=0,this.solutionIndex=0}isEmpty(){return this.root.nextColumnObject===this.root}pushRowIndex(t){this.currentSolution.push(t)}popRowIndex(){this.currentSolution.pop()}searchStep(){this.dlx.emit("step",this.currentSolution,this.stepIndex++)}solutionFound(){this.dlx.emit("solution",this.currentSolution,this.solutionIndex++)}}t.Dlx=s,t.solutionGenerator=function*(t,o){yield*(new s).solutionGenerator(t,o)},t.solve=(t,o)=>(new s).solve(t,o),Object.defineProperty(t,"__esModule",{value:!0})});
