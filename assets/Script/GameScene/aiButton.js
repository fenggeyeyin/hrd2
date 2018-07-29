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
    aiMoveArray: null,
    aiStepsCnt: 0,
    aiStepsNum: 0,
    uiBoard: null,
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
    getPnum: function (uiBoard, x, y) {
        return uiBoard[x][y]
    },
    makeAiMove1Step: function () {
        var pnum = this.getPnum(this.uiBoard, this.aiMoveArray[this.aiStepsNum].piece[0], 4 - this.aiMoveArray[this.aiStepsNum].piece[1]);
        this.gameLayout.aiMove(pnum, this.aiMoveArray[this.aiStepsNum].direct, this.aiMoveArray[this.aiStepsNum].step);
        this.aiStepsNum += 1;
    },
    getAiMove: function () {
        this.uiBoard = this.gameLayout.getBoard();
        var aiBoard = this.convertFromUitoAi(this.uiBoard);
        var aiMd = require("../ai.js");
        console.log(aiMd);
        this.aiStepsCnt = 3;
        this.aiStepsNum = 0;
        this.aiMoveArray = aiMd.getAiMoveArray(aiBoard);
        this.aiStepsCnt = this.aiMoveArray.length;
        this.schedule(this.makeAiMove1Step, 0.2, this.aiStepsCnt)
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
