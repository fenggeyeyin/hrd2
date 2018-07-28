
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ... 
        Col:0,
        Row:0,
        Padding:0,
        SpacingX:0,
        SpacingY:0,
        star:{
            default:null,
            type:cc.Prefab
        },
        piece:{
            default:null,
            type:cc.Prefab
        },
        Score:{
            default:null,
            type:cc.Node
        },
        aitest:{
            default:null,
            type:cc.Node
        }
    },
    reward:0,
    pieces:null,
    stars:null,
    mask:null,
    pNum: 0,
    initPos: null,
    board: null,
    onLoad: function () {
        this.pNum = 10;
        this.initBoard();
        this.buildInitPosTable();
        this.init();
        
    },
    init:function(){//初始化函数，生成star节点，添加监听事件
        var node=this.node;
        this.mask=[];
        this.pieces=[];
        this.stars=[];
        for(var i=0;i<10;i++){
                var ele=cc.instantiate(this.piece) 
                var com=ele.getComponent('piece') 
                com.setSpriteFrame(i > 6 ? 6: i) 
                com.setPnum(i + 1)
                this.pieces[i + 1] = ele
                var offset = com.getOffSet()
                ele.setPosition(this.initPos[i].x*128 + offset.x, this.initPos[i].y*128 + offset.y)
                com.pos = cc.v2(this.initPos[i].x*128 + offset.x, this.initPos[i].y*128 + offset.y)
                node.addChild(ele,0,"ele")
        }

        this.addPieceTouchEvents()
    },
    check:function(){
        if(this.checkConnected()){
            this.delAndDrop();
        }
    },
    initBoard: function () {
        this.board = [[7, 5, 5, 2, 2], [0, 8 ,6, 1, 1], [0, 9 ,6, 1, 1], [10, 4 ,4, 3, 3]]
    },
    getBoard: function () {
        return this.board;
    },
    canMove: function (p_num, m) {
        console.info('can move ' + p_num + ' ' + m.direct + ' ' +  m.move)
        var p_grids = []
        for (var i=0; i< 4; i++) {
            for (var j=0; j< 5; j++) {
                if (this.board[i][j] == p_num) {
                    p_grids.push(cc.v2(i, j))
                }
            }
        }
        var rt = true
        if (m.move == 0)
            return false
        if (m.move == 1) {
            rt = p_grids.every((item) => {
                var tmp = cc.v2(item.x, item.y)
                if (m.direct == 'right') {
                    tmp.x++
                } else if (m.direct == 'left') {
                    tmp.x--
                } else if (m.direct == 'up') {
                    tmp.y++
                } else if (m.direct == 'down') {
                    tmp.y--
                }
                if (this.board[tmp.x][tmp.y] != 0 && this.board[tmp.x][tmp.y] != p_num) {
                    console.info('piece ' + p_num + 'can not move 1' + m.direct + ' ' + this.board[tmp.x][tmp.y])
                    return false;
                }
                return true;
            })
            if (!rt)
                return false
        }
        if (m.move == 2) {
            rt = p_grids.every((item) => {
                var tmp = cc.v2(item.x, item.y)
                if (m.direct == 'right') {
                    tmp.x++
                    tmp.x++
                } else if (m.direct == 'left') {
                    tmp.x--
                    tmp.x--
                } else if (m.direct == 'up') {
                    tmp.y++
                    tmp.y++
                } else if (m.direct == 'down') {
                    tmp.y--
                    tmp.y--
                }
                if (this.board[tmp.x][tmp.y] != 0 && this.board[tmp.x][tmp.y] != p_num) {
                    console.info('piece ' + p_num + 'can not move 2' + m.direct + ' ' +this.board[tmp.x][tmp.y])
                    return false;
                }
                return true;
            })
            if (!rt)
                return false
        }
        console.info('piece ' + p_num + 'can move ' + m.direct + ' ' + m.move)
        return true
    },
    buildInitPosTable:function () {
        this.initPos = []
        this.initPos.push(cc.v2(1, 3))
        this.initPos.push(cc.v2(0, 3))
        this.initPos.push(cc.v2(3, 3))
        this.initPos.push(cc.v2(3, 1))
        this.initPos.push(cc.v2(0, 1))
        this.initPos.push(cc.v2(1, 2))
        this.initPos.push(cc.v2(0, 0))
        this.initPos.push(cc.v2(1, 1))
        this.initPos.push(cc.v2(2, 1))
        this.initPos.push(cc.v2(3, 0))
    },
    findNodeByPos: function (x, y) {
        var pNum = this.board[parseInt(x/128)][parseInt(y/128)]
        return this.pieces[pNum]
    },
    addPieceTouchEvents: function () {//添加触摸监听事件
        var p1=null;
        var p2=null;
        var selectNode=null;
        window.console.log("m"+this);
        this.node.on('touchstart',function(event){//传回节点位置
            var x=event.getLocationX()
            var y=event.getLocationY()
            selectNode=this.findNodeByPos(x, y)
            selectNode.select=true;
            p1=selectNode.getComponent('piece').pos;
            window.console.log(p1);
        },this);
        this.node.on('touchend',function(event){
            selectNode.select=false;
            var x=event.getLocationX()
            var y=event.getLocationY()
            var m = this.calcPieceMove(p1, x, y)
            while(m.move > 0){
                if(this.canMove(selectNode.getComponent('piece').getPnum(), m)){
                    this.movePiecePos(selectNode, m)
                    this.movePieceOnBoard(selectNode.getComponent('piece').getPnum(), m)
                    return
                }
                m.move--
            } 
            node.setPosition(p1.x, p1.y)
        },this);  
    },
    aiMove: function (pnum, direct, move) {
        var selectNode = this.pieces[pnum];
        var m = {direct: direct, move: move};
        if(this.canMove(selectNode.getComponent('piece').getPnum(), m)) {
            this.movePiecePos(selectNode, m)
            this.movePieceOnBoard(selectNode.getComponent('piece').getPnum(), m)
        }
    },
    calcPieceMove: function ( p1, x, y) {
        var move = 0
        var direct = 'up'
        if (x < 0 || y < 0 || x > 512 || y > 640)
            return {direct: direct, move: 0}
        
        if (Math.abs(y-p1.y) < Math.abs(x-p1.x)) {
           var distance = Math.abs(x-p1.x)
           if (172 < distance) {
               move = 2;
           } else if  (0 < distance && distance <= 172){
               move = 1;
           }
           if (x > p1.x)
            direct = 'right'
           else
            direct = 'left'
        } else {
            var distance = Math.abs(y-p1.y)
            if (172 < distance) {
                move = 2;
            } else if  (0 < distance && distance <= 172){
                move = 1;
            }
            if (y > p1.y)
             direct = 'up'
            else
             direct = 'down'
        }
        return {direct: direct, move: move}
    },
    movePiecePos: function (node, m) {
        var p1 = node.getComponent('piece').pos
        var x = p1.x, y=p1.y
        if (m.direct == 'right')
            x = p1.x + m.move*128
        if (m.direct == 'left')
            x = p1.x - m.move*128
        if (m.direct == 'up')
            y = p1.y + m.move*128
        if (m.direct == 'down')
            y = p1.y - m.move*128

        var act=cc.moveTo(m.move*0.1,cc.v2(x, y));

        node.runAction(act);
        //node.setPosition(x,y);
        node.getComponent('piece').pos = cc.v2(x, y)
    },
    movePieceOnBoard: function (p_num, m) {
        var p_grids = []
        for (var i=0; i< 4; i++) {
            for (var j=0; j< 5; j++) {
                if (this.board[i][j] == p_num) {
                    p_grids.push(cc.v2(i, j))
                    this.board[i][j] = 0
                }
            }
        }
        p_grids.forEach((item) => {
            if (m.direct == 'right')
                item.x = item.x + m.move
            if (m.direct == 'left')
                item.x = item.x - m.move
            if (m.direct == 'up')
                item.y = item.y + m.move
            if (m.direct == 'down')
                item.y = item.y - m.move
            this.board[item.x][item.y] = p_num
        })
        console.info('board after move ' + this.board)
    },
    addTouchEvents:function(node){//添加触摸监听事件
        var p1=null;
        var p2=null;
        window.console.log("m"+this);
        node.on('touchstart',function(event){//传回节点位置
            node.select=true;
            p1=node.getComponent('Star').pos;
            window.console.log(p1);
        },this);
        node.on('touchmove',function(event){
            if(node.select){
                var x=event.getLocationX();
                var y=event.getLocationY();
                node.setPosition(x,y);
                window.console.log(x+" "+y);
            }
        },this);
        node.on('touchend',function(event){
            node.select=false;
            var x=event.getLocationX();
            var y=event.getLocationY();
            p2=this.PositionToPos(x,y);
            window.console.log(p2);
            if(this.isAround(p1,p2)&&typeof(this.stars[p2.x][p2.y])!='undefined'){
                window.console.log('isAround');
                this.changeTwoPos(p1,p2);
                this.check();//check
            }else{
                node.setPosition(this.pSet[p1.x][p1.y]);
            }
            
        },this);
    },
    PositionToGrid:function(x,y){//屏幕坐标转矩阵坐标
        var ele=cc.instantiate(this.star);
        var eleSize=ele.getContentSize();
        var pos=cc.v2(Math.floor((x-this.Padding)/(eleSize.width+this.SpacingX)),Math.floor((y-this.Padding)/(eleSize.height+this.SpacingY)));
        return pos;
    },
    PositionToPos:function(x,y){//屏幕坐标转矩阵坐标
        var ele=cc.instantiate(this.star);
        var eleSize=ele.getContentSize();
        var pos=cc.v2(Math.floor((x-this.Padding)/(eleSize.width+this.SpacingX)),Math.floor((y-this.Padding)/(eleSize.height+this.SpacingY)));
        return pos;
    },
    isAround:function(p1,p2){//判断矩阵坐标p2是否与p1相邻
        var dis=Math.abs((p2.x-p1.x)+(p2.y-p1.y));
        window.console.log(dis);
        if(dis==1){
            return true;
        }
        return false;
    },
    changeTwoPos:function(p1,p2){//交换两个star的位置 包括自身存储的位置信息与stars数组内的实例交换
        this.stars[p1.x][p1.y].getComponent('Star').pos=p2;
        this.stars[p1.x][p1.y].setPosition(this.pSet[p2.x][p2.y]);
        this.stars[p2.x][p2.y].getComponent('Star').pos=p1;
        this.stars[p2.x][p2.y].setPosition(this.pSet[p1.x][p1.y]);
        var t=this.stars[p1.x][p1.y];
        this.stars[p1.x][p1.y]=this.stars[p2.x][p2.y];
        this.stars[p2.x][p2.y]=t;


    },
    delAndDrop:function(){

        this.deleteConnected();
        this.dropAndUpdata();

    },
    checkConnected:function(){
        var count1=this.verticalCheckConnected();
        var count2=this.horizontalCheckConnected();

        this.reward=this.calScore(count1+count2);//奖励分数
        window.console.log(this.reward +"rew");

        return ((count1+count2)>0)?true:false;
    },
    calScore:function(num){//计算分数
        return num*10;

    },
    verticalCheckConnected:function(){//纵向检查star的相连形况
        var index1,index2;
        var start,end;
        var count=0;//记录需要删除的star数
        for(var i=0;i<this.stars.length;i++){
            if(typeof(this.stars[i][0])=='undefined'){
                continue;
            }
            index1=this.stars[i][0].getComponent('Star').sfIndex;
            start=0;
            for(var j=1;j<=this.stars[i].length;j++){
                if(j==this.stars[i].length){//当到达边界值时
                    index2=-1;
                }else{
                    index2=this.stars[i][j].getComponent('Star').sfIndex;
                }

                if(index1!=index2){
                    end=j;
                    if(end-start>=3){
                        while(start!=end){
                            this.mask[i][start]=1;
                            start++;
                            count++;
                        }
                    }
                    start=end;
                    if(start!=this.stars[i].length){
                        index1=this.stars[i][start].getComponent('Star').sfIndex;
                    }

                }
            }
        }
        return count;
    },
    horizontalCheckConnected:function(){//横向检查star的相连情况
        var index1,index2;
        var start,end;
        var count=0;//记录需删除的star数
        for(var j=0;j<this.Col;j++){
            for(var i=0;i<this.Row;){
                if(typeof(this.stars[i][j])=='undefined'){
                    i++;
                    continue;
                }
                index1=this.stars[i][j].getComponent('Star').sfIndex;
                var begin=i;
                end=begin;
                while(end<this.Row){
                    if(typeof(this.stars[end][j])=='undefined'){
                        if(end-begin>=3){
                            while(begin!=end){
                                if(this.mask[begin][j]!=1){
                                    this.mask[begin][j]=1;
                                    count++;
                                }
                                begin++;
                            }
                        }
                        break;
                    }
                    index2=this.stars[end][j].getComponent('Star').sfIndex;
                    if(index1!=index2){
                        if(end-begin>=3){
                            while(begin!=end){
                                if(this.mask[begin][j]!=1){
                                    this.mask[begin][j]=1;
                                    count++;
                                }
                                begin++;
                            }
                        }
                        break;
                    }
                    end++;
                }
                if(end==this.Row&&end-begin>=3){
                    while(begin!=end){
                        if(this.mask[begin][j]!=1){
                            this.mask[begin][j]=1;
                            count++;
                        }
                        begin++;
                    }
                }
                i=end;

            }
        }
        return count;
    },

    deleteConnected:function(){//根据mask的状态信息删除相连的star
        for(var i=0;i<this.Row;i++){
            var count=0;
            var start=0,end;
            var onoff=true;
            for(var j=this.Col-1;j>=0;j--){
                if(this.mask[i][j]==1){
                    if(onoff){
                        start=j;
                        onoff=false;
                    }
                    var act=cc.sequence(cc.blink(0.2,1),cc.scaleBy(0.5,0,0));//消失动画
                    this.stars[i][j].runAction(act);
                }
                if((this.mask[i][j-1]!=1||j-1<0)&&onoff==false){
                    end=j;
                    this.stars[i].splice(end,start-end+1);//删除star实例

                    onoff=true;
                }
                this.mask[i][j]=0;
            }
        }
        this.updateScore();//删除相连的stars后更新分数显示
    },

    dropAndUpdata:function(){//下落动画以及更新位置信息
        var finished=cc.callFunc(function(target){
            this.check();

        },this);

        for(var i=0;i<this.stars.length;i++){
            for(var j=0;j<this.stars[i].length;j++){
                if(i==this.stars.length-1&&j==this.stars[i].length-1){
                    var act=cc.sequence(cc.moveTo(1,this.pSet[i][j]),finished);
                }else{
                    var act=cc.moveTo(1,this.pSet[i][j]);
                }
                this.stars[i][j].runAction(act);
                var com=this.stars[i][j].getComponent('Star');
                com.pos=cc.v2(i,j);

            }
        }

    },
    updateScore:function(){
        var score=this.Score.getComponent('Score');//更新分数显示
        score.setReward(this.reward);
        score.updateScore();
    },
    outputObj: function(obj) {
        var description = "";
        for (var i in obj) {
            description += i + " = " + obj[i] + "\n";
        }
        console.log(description);
    }

// called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
