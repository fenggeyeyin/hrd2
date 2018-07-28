cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        gameLayout:require("gameLayout")
    },

    // use this for initialization
    onLoad: function () {

    },
    convertFromUitoAi: function (uiBoard) {
        var uitoaiMap = [0, 4, 2, 2, 2, 2, 3, 1, 1, 1, 1];
        var aiBoard = [[], [], [], [], []];
        for(var y=0; y<5; y++) {
            for(var x=0; x<4; x++) {
                aiBoard[y][x] = uitoaiMap[uiBoard[x][4 - y]]
            }
        }
        return aiBoard;
    },
    getAiMove: function () {
        var uiBoard = this.gameLayout.getBoard();
        var aiBoard = this.convertFromUitoAi(uiBoard);
        var aiMd = require("../GameScene/aitest.js")
        console.log(aiMd);
        var aiMoveArray = aiMd.getAiMoveArray(aiBoard, 3);
        var pnum = uiBoard[aiMoveArray[0].piece[0]][4 - aiMoveArray[0].piece[1]];
        this.gameLayout.aiMove(pnum, aiMoveArray[0].direct, aiMoveArray[0].step);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
