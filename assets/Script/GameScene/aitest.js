var printHello =  function () {
        console.log("hello ai!");
}
var getAiMoveArray = function (board){
       console.log("get board of" + board);
       console.log("we need board:" + [[2, 4, 4, 2], [2, 4, 4, 2], [2, 3, 3, 2], [2, 1, 1, 2], [1, 0, 0, 1]]);
       return [{"piece":[1,3],"direct":"down","step":1},{"piece":[2,3],"direct":"left","step":1},{"piece":[3,4],"direct":"left","step":1}];
}
module.exports.printHello = printHello;
module.exports.getAiMoveArray = getAiMoveArray;
