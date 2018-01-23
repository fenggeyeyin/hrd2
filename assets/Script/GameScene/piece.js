cc.Class({
    extends: cc.Component,

    properties: {
        icons:{
            default:[],
            type:cc.SpriteFrame
        },
        pos:{
            default:new cc.Vec2
        },
        number:0,
        sfIndex:0,
    },
    pnum:0,
    // use this for initialization
    onLoad: function () {
        // this.setSpriteFrame(3);
        // this.listeningEvent();
    },
    setSpriteFrame:function (index) {
        var sprite=this.getComponent(cc.Sprite);
        sprite.spriteFrame=this.icons[index];
    },
    getOffSet:function () {
        var sprite=this.getComponent(cc.Sprite);
        var rect = sprite.spriteFrame.getRect();
        return cc.v2(rect.width/2, rect.height/2)
    },
    setPnum:function (pnum) {
        this.pnum = pnum
    },
    getPnum:function () {
        return this.pnum
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

