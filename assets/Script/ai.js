function Ai () {
    "use strict";

    function ՐՏ_extends(child, parent) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.__base__ = parent;
        child.prototype.constructor = child
    }

    function ՐՏ_Iterable(iterable) {
        var tmp;
        if (iterable.constructor === [].constructor || iterable.constructor === "".constructor || (tmp = Array.prototype.slice.call(iterable)).length) {
            return tmp || iterable
        }
        return Object.keys(iterable)
    }

    function len(obj) {
        var tmp;
        if (obj.constructor === [].constructor || obj.constructor === "".constructor || (tmp = Array.prototype.slice.call(obj)).length) {
            return (tmp || obj).length
        }
        return Object.keys(obj).length
    }

    function ՐՏ_print() {
        if (typeof console === "object") {
            console.log.apply(console, arguments)
        }
    }

    function range(start, stop, step) {
        var length, idx, range;
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0
        }
        step = arguments[2] || 1;
        length = Math.max(Math.ceil((stop - start) / step), 0);
        idx = 0;
        range = new Array(length);
        while (idx < length) {
            range[idx++] = start;
            start += step
        }
        return range
    }

    function ՐՏ_type(obj) {
        return obj && obj.constructor && obj.constructor.name ? obj.constructor.name : Object.prototype.toString.call(obj).slice(8, -1)
    }

    function ՐՏ_eq(a, b) {
        ;var ՐՏitr8, ՐՏidx8;
        var i;
        if (a === b) {
            return true
        }
        if (Array.isArray(a) && Array.isArray(b) || a instanceof Object && b instanceof Object) {
            if (a.constructor !== b.constructor || a.length !== b.length) {
                return false
            }
            if (Array.isArray(a)) {
                for (i = 0; i < a.length; i++) {
                    if (!ՐՏ_eq(a[i], b[i])) {
                        return false
                    }
                }
            } else {
                if (Object.keys(a).length !== Object.keys(b).length) {
                    return false
                }
                ՐՏitr8 = ՐՏ_Iterable(a);
                for (ՐՏidx8 = 0; ՐՏidx8 < ՐՏitr8.length; ՐՏidx8++) {
                    i = ՐՏitr8[ՐՏidx8];
                    if (!ՐՏ_eq(a[i], b[i])) {
                        return false
                    }
                }
            }
            return true
        }
        return false
    }

    return function getAiMoveArray (board) {
        var __name__ = "__main__"
        var ՐՏ_1, ՐՏ_4;
        ;var MAX_CAN_MOVE_DIRECT, MOVE_DIRECT_TABLE, MAX_X, MAX_Y, winPath, winMove, OnePath, OneMove, board, root, allBoardHash, winBoardHash;
        MAX_CAN_MOVE_DIRECT = 8;
        MOVE_DIRECT_TABLE = [6, 5, 1, 2, 3, 4, 7, 0];
        MAX_X = 4;
        MAX_Y = 5;
        winPath = [];
        winMove = [];
        OnePath = [[[2,4,4,2],[2,4,4,2],[2,3,3,2],[2,1,1,2],[1,0,0,1]],[[2,4,4,2],[2,4,4,2],[2,3,3,2],[2,1,1,2],[1,0,1,0]],[[2,4,4,2],[2,4,4,2],[2,3,3,2],[2,1,1,2],[0,1,1,0]],[[2,4,4,2],[2,4,4,2],[2,3,3,0],[2,1,1,2],[0,1,1,2]],[[2,4,4,2],[2,4,4,2],[2,0,3,3],[2,1,1,2],[0,1,1,2]],[[2,4,4,2],[2,4,4,2],[2,1,3,3],[2,0,1,2],[0,1,1,2]],[[2,4,4,2],[2,4,4,2],[0,1,3,3],[2,0,1,2],[2,1,1,2]],[[2,4,4,2],[2,4,4,2],[1,0,3,3],[2,0,1,2],[2,1,1,2]],[[2,4,4,2],[2,4,4,2],[1,3,3,0],[2,0,1,2],[2,1,1,2]],[[2,4,4,2],[2,4,4,2],[1,3,3,2],[2,0,1,2],[2,1,1,0]],[[2,4,4,2],[2,4,4,2],[1,3,3,2],[2,0,1,2],[2,1,0,1]],[[2,4,4,2],[2,4,4,2],[1,3,3,2],[2,0,1,2],[2,0,1,1]],[[2,4,4,2],[2,4,4,2],[1,3,3,2],[0,2,1,2],[0,2,1,1]],[[2,4,4,2],[2,4,4,2],[0,3,3,2],[1,2,1,2],[0,2,1,1]],[[2,4,4,2],[2,4,4,2],[3,3,0,2],[1,2,1,2],[0,2,1,1]],[[2,4,4,2],[2,4,4,2],[3,3,1,2],[1,2,0,2],[0,2,1,1]],[[2,4,4,2],[2,4,4,2],[3,3,1,2],[1,2,1,2],[0,2,0,1]],[[2,4,4,2],[2,4,4,2],[3,3,1,2],[1,2,1,2],[0,2,1,0]],[[2,4,4,2],[2,4,4,2],[3,3,1,0],[1,2,1,2],[0,2,1,2]],[[2,4,4,2],[2,4,4,2],[3,3,0,1],[1,2,1,2],[0,2,1,2]],[[2,4,4,2],[2,4,4,2],[0,3,3,1],[1,2,1,2],[0,2,1,2]],[[2,4,4,2],[2,4,4,2],[0,3,3,1],[0,2,1,2],[1,2,1,2]],[[0,4,4,2],[2,4,4,2],[2,3,3,1],[0,2,1,2],[1,2,1,2]],[[0,4,4,2],[0,4,4,2],[2,3,3,1],[2,2,1,2],[1,2,1,2]],[[4,4,0,2],[4,4,0,2],[2,3,3,1],[2,2,1,2],[1,2,1,2]],[[4,4,2,0],[4,4,2,0],[2,3,3,1],[2,2,1,2],[1,2,1,2]],[[4,4,2,0],[4,4,2,1],[2,3,3,0],[2,2,1,2],[1,2,1,2]],[[4,4,2,0],[4,4,2,1],[2,3,3,2],[2,2,1,2],[1,2,1,0]],[[4,4,2,1],[4,4,2,0],[2,3,3,2],[2,2,1,2],[1,2,1,0]],[[4,4,2,1],[4,4,2,2],[2,3,3,2],[2,2,1,0],[1,2,1,0]],[[4,4,2,1],[4,4,2,2],[2,3,3,2],[2,2,1,0],[1,2,0,1]],[[4,4,2,1],[4,4,2,2],[2,3,3,2],[2,2,0,1],[1,2,0,1]],[[4,4,2,1],[4,4,2,2],[2,3,3,2],[2,0,2,1],[1,0,2,1]],[[4,4,2,1],[4,4,2,2],[2,3,3,2],[2,0,2,1],[0,1,2,1]],[[4,4,2,1],[4,4,2,2],[2,3,3,2],[2,1,2,1],[0,0,2,1]],[[4,4,2,1],[4,4,2,2],[0,3,3,2],[2,1,2,1],[2,0,2,1]],[[4,4,2,1],[4,4,2,2],[3,3,0,2],[2,1,2,1],[2,0,2,1]],[[4,4,2,1],[4,4,2,2],[3,3,2,2],[2,1,2,1],[2,0,0,1]],[[4,4,2,1],[4,4,2,2],[3,3,2,2],[2,1,2,1],[2,0,1,0]],[[4,4,2,1],[4,4,2,2],[3,3,2,2],[2,1,2,1],[2,1,0,0]],[[4,4,2,1],[4,4,2,2],[3,3,0,2],[2,1,2,1],[2,1,2,0]],[[4,4,0,1],[4,4,2,2],[3,3,2,2],[2,1,2,1],[2,1,2,0]],[[4,4,1,0],[4,4,2,2],[3,3,2,2],[2,1,2,1],[2,1,2,0]],[[4,4,1,2],[4,4,2,2],[3,3,2,0],[2,1,2,1],[2,1,2,0]],[[4,4,1,2],[4,4,2,2],[3,3,2,1],[2,1,2,0],[2,1,2,0]],[[4,4,1,2],[4,4,2,2],[3,3,2,1],[2,1,0,2],[2,1,0,2]],[[4,4,1,2],[4,4,0,2],[3,3,2,1],[2,1,2,2],[2,1,0,2]],[[4,4,1,2],[4,4,0,2],[3,3,0,1],[2,1,2,2],[2,1,2,2]],[[4,4,1,2],[4,4,0,2],[3,3,1,0],[2,1,2,2],[2,1,2,2]],[[4,4,1,2],[4,4,1,2],[3,3,0,0],[2,1,2,2],[2,1,2,2]],[[4,4,1,2],[4,4,1,2],[0,3,3,0],[2,1,2,2],[2,1,2,2]],[[4,4,1,2],[4,4,1,2],[2,3,3,0],[2,1,2,2],[0,1,2,2]],[[4,4,1,2],[4,4,1,2],[2,3,3,0],[2,1,2,2],[1,0,2,2]],[[4,4,1,2],[4,4,1,2],[2,0,3,3],[2,1,2,2],[1,0,2,2]],[[4,4,1,2],[4,4,1,2],[2,0,3,3],[2,0,2,2],[1,1,2,2]],[[4,4,1,2],[4,4,1,2],[0,2,3,3],[0,2,2,2],[1,1,2,2]],[[4,4,1,2],[4,4,1,2],[0,2,3,3],[1,2,2,2],[0,1,2,2]],[[4,4,1,2],[4,4,1,2],[0,2,3,3],[1,2,2,2],[1,0,2,2]],[[4,4,1,2],[4,4,1,2],[0,0,3,3],[1,2,2,2],[1,2,2,2]],[[4,4,1,2],[4,4,1,2],[0,3,3,0],[1,2,2,2],[1,2,2,2]],[[4,4,1,2],[4,4,1,2],[3,3,0,0],[1,2,2,2],[1,2,2,2]],[[4,4,1,2],[4,4,1,2],[3,3,2,0],[1,2,2,2],[1,2,0,2]],[[4,4,1,0],[4,4,1,2],[3,3,2,2],[1,2,2,2],[1,2,0,2]],[[4,4,0,1],[4,4,1,2],[3,3,2,2],[1,2,2,2],[1,2,0,2]],[[4,4,1,1],[4,4,0,2],[3,3,2,2],[1,2,2,2],[1,2,0,2]],[[4,4,1,1],[4,4,2,2],[3,3,2,2],[1,2,0,2],[1,2,0,2]],[[4,4,1,1],[4,4,2,2],[3,3,2,2],[1,0,2,2],[1,0,2,2]],[[4,4,1,1],[4,4,2,2],[3,3,2,2],[1,0,2,2],[0,1,2,2]],[[4,4,1,1],[4,4,2,2],[3,3,2,2],[0,0,2,2],[1,1,2,2]],[[4,4,1,1],[4,4,2,2],[0,0,2,2],[3,3,2,2],[1,1,2,2]],[[0,0,1,1],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,2,2]],[[0,1,0,1],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,2,2]],[[0,1,1,0],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,2,2]],[[0,1,1,2],[4,4,2,2],[4,4,2,0],[3,3,2,2],[1,1,2,2]],[[0,1,1,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,2,0]],[[1,0,1,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,2,0]],[[1,1,0,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,2,0]],[[1,1,2,2],[4,4,2,2],[4,4,0,2],[3,3,2,2],[1,1,2,0]],[[1,1,2,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,0,0]],[[1,1,2,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,0,1,0]],[[1,1,2,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[0,1,1,0]],[[1,1,2,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[0,1,0,1]],[[1,1,2,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[0,0,1,1]],[[1,1,2,2],[4,4,2,2],[4,4,2,2],[0,0,2,2],[3,3,1,1]],[[1,1,2,2],[0,0,2,2],[4,4,2,2],[4,4,2,2],[3,3,1,1]],[[1,0,2,2],[0,1,2,2],[4,4,2,2],[4,4,2,2],[3,3,1,1]],[[1,0,2,2],[1,0,2,2],[4,4,2,2],[4,4,2,2],[3,3,1,1]],[[1,2,0,2],[1,2,0,2],[4,4,2,2],[4,4,2,2],[3,3,1,1]],[[1,2,0,2],[1,2,2,2],[4,4,2,2],[4,4,0,2],[3,3,1,1]],[[1,2,2,2],[1,2,2,2],[4,4,0,2],[4,4,0,2],[3,3,1,1]],[[1,2,2,2],[1,2,2,2],[0,4,4,2],[0,4,4,2],[3,3,1,1]],[[1,2,2,2],[0,2,2,2],[1,4,4,2],[0,4,4,2],[3,3,1,1]],[[1,2,2,2],[0,2,2,2],[0,4,4,2],[1,4,4,2],[3,3,1,1]],[[0,2,2,2],[1,2,2,2],[0,4,4,2],[1,4,4,2],[3,3,1,1]],[[0,2,2,2],[0,2,2,2],[1,4,4,2],[1,4,4,2],[3,3,1,1]],[[2,0,2,2],[2,0,2,2],[1,4,4,2],[1,4,4,2],[3,3,1,1]],[[2,2,0,2],[2,2,0,2],[1,4,4,2],[1,4,4,2],[3,3,1,1]],[[2,2,2,0],[2,2,2,0],[1,4,4,2],[1,4,4,2],[3,3,1,1]],[[2,2,2,0],[2,2,2,2],[1,4,4,2],[1,4,4,0],[3,3,1,1]],[[2,2,2,2],[2,2,2,2],[1,4,4,0],[1,4,4,0],[3,3,1,1]],[[2,2,2,2],[2,2,2,2],[1,0,4,4],[1,0,4,4],[3,3,1,1]],[[2,2,2,2],[2,2,2,2],[1,0,4,4],[0,1,4,4],[3,3,1,1]],[[2,2,2,2],[2,2,2,2],[1,1,4,4],[0,0,4,4],[3,3,1,1]],[[2,2,2,2],[2,2,2,2],[1,1,4,4],[3,3,4,4],[0,0,1,1]],[[2,2,2,2],[2,2,2,2],[1,1,4,4],[3,3,4,4],[0,1,0,1]],[[2,2,2,2],[2,2,2,2],[1,1,4,4],[3,3,4,4],[0,1,1,0]],[[2,2,2,2],[2,2,2,2],[1,1,4,4],[3,3,4,4],[1,0,1,0]],[[2,2,2,2],[2,2,2,2],[1,1,4,4],[3,3,4,4],[1,1,0,0]],[[2,2,2,2],[2,2,2,2],[1,1,0,0],[3,3,4,4],[1,1,4,4]],[[2,2,2,2],[2,2,2,2],[1,0,1,0],[3,3,4,4],[1,1,4,4]],[[2,2,2,2],[2,2,2,2],[0,1,1,0],[3,3,4,4],[1,1,4,4]],[[2,2,2,2],[2,2,2,2],[0,1,0,1],[3,3,4,4],[1,1,4,4]],[[2,2,2,2],[2,2,2,2],[0,0,1,1],[3,3,4,4],[1,1,4,4]],[[2,2,2,2],[2,2,2,2],[3,3,1,1],[0,0,4,4],[1,1,4,4]],[[2,2,2,2],[2,2,2,2],[3,3,1,1],[1,0,4,4],[0,1,4,4]],[[2,2,2,2],[2,2,2,2],[3,3,1,1],[1,0,4,4],[1,0,4,4]],[[2,2,2,2],[2,2,2,2],[3,3,1,1],[1,4,4,0],[1,4,4,0]]];
        OneMove = [{"piece":[3,4],"direct":"left","step":1},{"piece":[0,4],"direct":"right","step":1},{"piece":[3,2],"direct":"down","step":1},{"piece":[1,2],"direct":"right","step":1},{"piece":[1,3],"direct":"up","step":1},{"piece":[0,2],"direct":"down","step":1},{"piece":[1,2],"direct":"left","step":1},{"piece":[2,2],"direct":"left","step":1},{"piece":[3,3],"direct":"up","step":1},{"piece":[2,4],"direct":"right","step":1},{"piece":[1,4],"direct":"right","step":1},{"piece":[0,3],"direct":"right","step":1},{"piece":[0,2],"direct":"down","step":1},{"piece":[1,2],"direct":"left","step":1},{"piece":[2,3],"direct":"up","step":1},{"piece":[2,4],"direct":"up","step":1},{"piece":[3,4],"direct":"left","step":1},{"piece":[3,2],"direct":"down","step":1},{"piece":[2,2],"direct":"right","step":1},{"piece":[0,2],"direct":"right","step":1},{"piece":[0,3],"direct":"down","step":1},{"piece":[0,0],"direct":"down","step":1},{"piece":[0,1],"direct":"down","step":1},{"piece":[1,0],"direct":"left","step":1},{"piece":[3,0],"direct":"left","step":1},{"piece":[3,2],"direct":"up","step":1},{"piece":[3,3],"direct":"up","step":1},{"piece":[3,1],"direct":"up","step":1},{"piece":[3,2],"direct":"up","step":1},{"piece":[2,4],"direct":"right","step":1},{"piece":[2,3],"direct":"right","step":1},{"piece":[1,3],"direct":"right","step":1},{"piece":[0,4],"direct":"right","step":1},{"piece":[1,4],"direct":"up","step":1},{"piece":[0,2],"direct":"down","step":1},{"piece":[1,2],"direct":"left","step":1},{"piece":[2,3],"direct":"up","step":1},{"piece":[3,4],"direct":"left","step":1},{"piece":[2,4],"direct":"left","step":1},{"piece":[2,2],"direct":"down","step":1},{"piece":[2,0],"direct":"down","step":1},{"piece":[3,0],"direct":"left","step":1},{"piece":[3,1],"direct":"up","step":1},{"piece":[3,3],"direct":"up","step":1},{"piece":[2,3],"direct":"right","step":1},{"piece":[2,1],"direct":"down","step":1},{"piece":[2,2],"direct":"down","step":1},{"piece":[3,2],"direct":"left","step":1},{"piece":[2,2],"direct":"up","step":1},{"piece":[0,2],"direct":"right","step":1},{"piece":[0,3],"direct":"up","step":1},{"piece":[1,4],"direct":"left","step":1},{"piece":[1,2],"direct":"right","step":1},{"piece":[1,3],"direct":"down","step":1},{"piece":[0,2],"direct":"right","step":1},{"piece":[0,4],"direct":"up","step":1},{"piece":[1,4],"direct":"left","step":1},{"piece":[1,2],"direct":"down","step":1},{"piece":[2,2],"direct":"left","step":1},{"piece":[1,2],"direct":"left","step":1},{"piece":[2,3],"direct":"up","step":1},{"piece":[3,0],"direct":"down","step":1},{"piece":[2,0],"direct":"right","step":1},{"piece":[2,1],"direct":"up","step":1},{"piece":[2,2],"direct":"up","step":1},{"piece":[1,3],"direct":"right","step":1},{"piece":[0,4],"direct":"right","step":1},{"piece":[0,3],"direct":"down","step":1},{"piece":[0,2],"direct":"down","step":1},{"piece":[0,0],"direct":"down","step":1},{"piece":[2,0],"direct":"left","step":1},{"piece":[3,0],"direct":"left","step":1},{"piece":[3,1],"direct":"up","step":1},{"piece":[3,3],"direct":"up","step":1},{"piece":[1,0],"direct":"left","step":1},{"piece":[2,0],"direct":"left","step":1},{"piece":[2,1],"direct":"up","step":1},{"piece":[2,3],"direct":"up","step":1},{"piece":[1,4],"direct":"right","step":1},{"piece":[0,4],"direct":"right","step":1},{"piece":[2,4],"direct":"right","step":1},{"piece":[1,4],"direct":"right","step":1},{"piece":[0,3],"direct":"down","step":1},{"piece":[0,1],"direct":"down","step":1},{"piece":[1,0],"direct":"down","step":1},{"piece":[1,1],"direct":"left","step":1},{"piece":[2,0],"direct":"left","step":1},{"piece":[2,2],"direct":"up","step":1},{"piece":[2,1],"direct":"up","step":1},{"piece":[1,2],"direct":"right","step":1},{"piece":[0,1],"direct":"down","step":1},{"piece":[0,2],"direct":"down","step":1},{"piece":[0,0],"direct":"down","step":1},{"piece":[0,1],"direct":"down","step":1},{"piece":[1,0],"direct":"left","step":1},{"piece":[2,0],"direct":"left","step":1},{"piece":[3,0],"direct":"left","step":1},{"piece":[3,2],"direct":"up","step":1},{"piece":[3,1],"direct":"up","step":1},{"piece":[2,2],"direct":"right","step":1},{"piece":[0,3],"direct":"right","step":1},{"piece":[1,3],"direct":"up","step":1},{"piece":[0,4],"direct":"up","step":1},{"piece":[2,4],"direct":"left","step":1},{"piece":[3,4],"direct":"left","step":1},{"piece":[1,4],"direct":"left","step":1},{"piece":[2,4],"direct":"left","step":1},{"piece":[2,2],"direct":"down","step":1},{"piece":[1,2],"direct":"right","step":1},{"piece":[0,2],"direct":"right","step":1},{"piece":[2,2],"direct":"right","step":1},{"piece":[1,2],"direct":"right","step":1},{"piece":[0,3],"direct":"up","step":1},{"piece":[0,4],"direct":"up","step":1},{"piece":[1,4],"direct":"left","step":1},{"piece":[2,3],"direct":"left","step":1}];
        //board = [[1, 2, 2, 2], [2, 2, 2, 2], [2, 1, 3, 3], [4, 4, 1, 0], [4, 4, 0, 1]];
        //board = [[2, 4, 4, 2], [2, 4, 4, 2], [2, 3, 3, 2], [2, 1, 1, 2], [1, 0, 0, 1]];

        allBoardHash = {};
        winBoardHash = [0,0,0,0,0,[[[2,4,4,2],[2,4,4,2],[1,0,3,3],[2,0,1,2],[2,1,1,2]],[[4,4,1,2],[4,4,1,2],[2,0,3,3],[2,1,2,2],[1,0,2,2]],[[4,4,1,2],[4,4,1,2],[2,0,3,3],[2,0,2,2],[1,1,2,2]],[[2,2,2,2],[2,2,2,2],[1,0,4,4],[1,0,4,4],[3,3,1,1]],[[2,2,2,2],[2,2,2,2],[3,3,1,1],[1,0,4,4],[1,0,4,4]]],[[[2,4,4,2],[2,4,4,2],[2,0,3,3],[2,1,1,2],[0,1,1,2]],[[2,4,4,2],[2,4,4,2],[2,1,3,3],[2,0,1,2],[0,1,1,2]],[[2,4,4,2],[2,4,4,2],[0,1,3,3],[2,0,1,2],[2,1,1,2]],[[2,2,2,2],[2,2,2,2],[1,0,4,4],[0,1,4,4],[3,3,1,1]],[[2,2,2,2],[2,2,2,2],[1,1,4,4],[0,0,4,4],[3,3,1,1]],[[2,2,2,2],[2,2,2,2],[1,1,4,4],[3,3,4,4],[0,0,1,1]],[[2,2,2,2],[2,2,2,2],[1,1,4,4],[3,3,4,4],[1,0,1,0]],[[2,2,2,2],[2,2,2,2],[1,0,1,0],[3,3,4,4],[1,1,4,4]],[[2,2,2,2],[2,2,2,2],[0,0,1,1],[3,3,4,4],[1,1,4,4]],[[2,2,2,2],[2,2,2,2],[3,3,1,1],[0,0,4,4],[1,1,4,4]],[[2,2,2,2],[2,2,2,2],[3,3,1,1],[1,0,4,4],[0,1,4,4]]],[[[2,4,4,2],[2,4,4,2],[1,3,3,2],[2,0,1,2],[2,0,1,1]],[[4,4,2,1],[4,4,2,2],[2,3,3,2],[2,0,2,1],[1,0,2,1]],[[4,4,1,1],[4,4,2,2],[3,3,2,2],[1,0,2,2],[1,0,2,2]],[[2,2,2,2],[2,2,2,2],[1,1,4,4],[3,3,4,4],[0,1,0,1]],[[2,2,2,2],[2,2,2,2],[1,1,4,4],[3,3,4,4],[0,1,1,0]],[[2,2,2,2],[2,2,2,2],[1,1,4,4],[3,3,4,4],[1,1,0,0]],[[2,2,2,2],[2,2,2,2],[1,1,0,0],[3,3,4,4],[1,1,4,4]],[[2,2,2,2],[2,2,2,2],[0,1,1,0],[3,3,4,4],[1,1,4,4]],[[2,2,2,2],[2,2,2,2],[0,1,0,1],[3,3,4,4],[1,1,4,4]]],[[[2,4,4,2],[2,4,4,2],[2,3,3,2],[2,1,1,2],[1,0,0,1]],[[2,4,4,2],[2,4,4,2],[2,3,3,2],[2,1,1,2],[1,0,1,0]],[[2,4,4,2],[2,4,4,2],[1,3,3,0],[2,0,1,2],[2,1,1,2]],[[2,4,4,2],[2,4,4,2],[1,3,3,2],[2,0,1,2],[2,1,1,0]],[[2,4,4,2],[2,4,4,2],[1,3,3,2],[2,0,1,2],[2,1,0,1]],[[4,4,2,1],[4,4,2,2],[2,3,3,2],[2,0,2,1],[0,1,2,1]],[[4,4,2,1],[4,4,2,2],[2,3,3,2],[2,1,2,1],[0,0,2,1]],[[4,4,2,1],[4,4,2,2],[0,3,3,2],[2,1,2,1],[2,0,2,1]],[[4,4,2,1],[4,4,2,2],[3,3,0,2],[2,1,2,1],[2,0,2,1]],[[4,4,2,1],[4,4,2,2],[3,3,2,2],[2,1,2,1],[2,0,0,1]],[[4,4,2,1],[4,4,2,2],[3,3,2,2],[2,1,2,1],[2,0,1,0]],[[4,4,1,2],[4,4,1,2],[2,3,3,0],[2,1,2,2],[1,0,2,2]],[[4,4,1,2],[4,4,1,2],[0,2,3,3],[1,2,2,2],[1,0,2,2]],[[4,4,1,2],[4,4,1,2],[0,0,3,3],[1,2,2,2],[1,2,2,2]],[[4,4,1,1],[4,4,2,2],[3,3,2,2],[1,0,2,2],[0,1,2,2]],[[4,4,1,1],[4,4,2,2],[3,3,2,2],[0,0,2,2],[1,1,2,2]],[[4,4,1,1],[4,4,2,2],[0,0,2,2],[3,3,2,2],[1,1,2,2]]],[[[2,4,4,2],[2,4,4,2],[2,3,3,2],[2,1,1,2],[0,1,1,0]],[[2,4,4,2],[2,4,4,2],[2,3,3,0],[2,1,1,2],[0,1,1,2]],[[4,4,2,1],[4,4,2,2],[3,3,2,2],[2,1,2,1],[2,1,0,0]],[[4,4,2,1],[4,4,2,2],[3,3,0,2],[2,1,2,1],[2,1,2,0]],[[4,4,0,1],[4,4,2,2],[3,3,2,2],[2,1,2,1],[2,1,2,0]],[[4,4,1,0],[4,4,2,2],[3,3,2,2],[2,1,2,1],[2,1,2,0]],[[4,4,1,2],[4,4,2,2],[3,3,2,0],[2,1,2,1],[2,1,2,0]],[[4,4,1,2],[4,4,2,2],[3,3,2,1],[2,1,2,0],[2,1,2,0]],[[4,4,1,2],[4,4,2,2],[3,3,2,1],[2,1,0,2],[2,1,0,2]],[[4,4,1,2],[4,4,0,2],[3,3,2,1],[2,1,2,2],[2,1,0,2]],[[4,4,1,2],[4,4,0,2],[3,3,0,1],[2,1,2,2],[2,1,2,2]],[[4,4,1,2],[4,4,0,2],[3,3,1,0],[2,1,2,2],[2,1,2,2]],[[4,4,1,2],[4,4,1,2],[3,3,0,0],[2,1,2,2],[2,1,2,2]],[[4,4,1,2],[4,4,1,2],[0,3,3,0],[2,1,2,2],[2,1,2,2]],[[4,4,1,2],[4,4,1,2],[2,3,3,0],[2,1,2,2],[0,1,2,2]],[[4,4,1,2],[4,4,1,2],[0,2,3,3],[0,2,2,2],[1,1,2,2]],[[4,4,1,2],[4,4,1,2],[0,2,3,3],[1,2,2,2],[0,1,2,2]]],0,[[[2,4,4,2],[2,4,4,2],[1,3,3,2],[0,2,1,2],[0,2,1,1]],[[2,4,4,2],[2,4,4,2],[0,3,3,2],[1,2,1,2],[0,2,1,1]],[[2,4,4,2],[2,4,4,2],[3,3,0,2],[1,2,1,2],[0,2,1,1]],[[2,4,4,2],[2,4,4,2],[3,3,1,2],[1,2,0,2],[0,2,1,1]],[[2,4,4,2],[2,4,4,2],[3,3,1,2],[1,2,1,2],[0,2,0,1]],[[2,4,4,2],[2,4,4,2],[3,3,1,2],[1,2,1,2],[0,2,1,0]],[[2,4,4,2],[2,4,4,2],[3,3,1,0],[1,2,1,2],[0,2,1,2]],[[2,4,4,2],[2,4,4,2],[3,3,0,1],[1,2,1,2],[0,2,1,2]],[[2,4,4,2],[2,4,4,2],[0,3,3,1],[1,2,1,2],[0,2,1,2]],[[2,4,4,2],[2,4,4,2],[0,3,3,1],[0,2,1,2],[1,2,1,2]],[[0,4,4,2],[2,4,4,2],[2,3,3,1],[0,2,1,2],[1,2,1,2]],[[0,4,4,2],[0,4,4,2],[2,3,3,1],[2,2,1,2],[1,2,1,2]],[[4,4,0,2],[4,4,0,2],[2,3,3,1],[2,2,1,2],[1,2,1,2]],[[4,4,2,0],[4,4,2,0],[2,3,3,1],[2,2,1,2],[1,2,1,2]],[[4,4,2,0],[4,4,2,1],[2,3,3,0],[2,2,1,2],[1,2,1,2]],[[4,4,2,0],[4,4,2,1],[2,3,3,2],[2,2,1,2],[1,2,1,0]],[[4,4,2,1],[4,4,2,0],[2,3,3,2],[2,2,1,2],[1,2,1,0]],[[4,4,2,1],[4,4,2,2],[2,3,3,2],[2,2,1,0],[1,2,1,0]],[[4,4,2,1],[4,4,2,2],[2,3,3,2],[2,2,1,0],[1,2,0,1]],[[4,4,2,1],[4,4,2,2],[2,3,3,2],[2,2,0,1],[1,2,0,1]],[[4,4,1,2],[4,4,1,2],[0,3,3,0],[1,2,2,2],[1,2,2,2]],[[4,4,1,2],[4,4,1,2],[3,3,0,0],[1,2,2,2],[1,2,2,2]],[[4,4,1,2],[4,4,1,2],[3,3,2,0],[1,2,2,2],[1,2,0,2]],[[4,4,1,0],[4,4,1,2],[3,3,2,2],[1,2,2,2],[1,2,0,2]],[[4,4,0,1],[4,4,1,2],[3,3,2,2],[1,2,2,2],[1,2,0,2]],[[4,4,1,1],[4,4,0,2],[3,3,2,2],[1,2,2,2],[1,2,0,2]],[[4,4,1,1],[4,4,2,2],[3,3,2,2],[1,2,0,2],[1,2,0,2]],[[1,1,2,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,0,1,0]],[[1,1,2,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[0,0,1,1]],[[1,1,2,2],[4,4,2,2],[4,4,2,2],[0,0,2,2],[3,3,1,1]],[[1,1,2,2],[0,0,2,2],[4,4,2,2],[4,4,2,2],[3,3,1,1]],[[1,0,2,2],[1,0,2,2],[4,4,2,2],[4,4,2,2],[3,3,1,1]],[[2,0,2,2],[2,0,2,2],[1,4,4,2],[1,4,4,2],[3,3,1,1]]],[[[0,0,1,1],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,2,2]],[[0,1,0,1],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,2,2]],[[0,1,1,0],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,2,2]],[[0,1,1,2],[4,4,2,2],[4,4,2,0],[3,3,2,2],[1,1,2,2]],[[0,1,1,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,2,0]],[[1,0,1,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,2,0]],[[1,1,0,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,2,0]],[[1,1,2,2],[4,4,2,2],[4,4,0,2],[3,3,2,2],[1,1,2,0]],[[1,1,2,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[1,1,0,0]],[[1,1,2,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[0,1,1,0]],[[1,1,2,2],[4,4,2,2],[4,4,2,2],[3,3,2,2],[0,1,0,1]],[[1,0,2,2],[0,1,2,2],[4,4,2,2],[4,4,2,2],[3,3,1,1]]],[[[1,2,0,2],[1,2,0,2],[4,4,2,2],[4,4,2,2],[3,3,1,1]],[[1,2,0,2],[1,2,2,2],[4,4,2,2],[4,4,0,2],[3,3,1,1]],[[1,2,2,2],[1,2,2,2],[4,4,0,2],[4,4,0,2],[3,3,1,1]],[[1,2,2,2],[1,2,2,2],[0,4,4,2],[0,4,4,2],[3,3,1,1]],[[1,2,2,2],[0,2,2,2],[1,4,4,2],[0,4,4,2],[3,3,1,1]],[[1,2,2,2],[0,2,2,2],[0,4,4,2],[1,4,4,2],[3,3,1,1]],[[0,2,2,2],[1,2,2,2],[0,4,4,2],[1,4,4,2],[3,3,1,1]],[[0,2,2,2],[0,2,2,2],[1,4,4,2],[1,4,4,2],[3,3,1,1]],[[2,2,0,2],[2,2,0,2],[1,4,4,2],[1,4,4,2],[3,3,1,1]],[[2,2,2,0],[2,2,2,0],[1,4,4,2],[1,4,4,2],[3,3,1,1]],[[2,2,2,0],[2,2,2,2],[1,4,4,2],[1,4,4,0],[3,3,1,1]],[[2,2,2,2],[2,2,2,2],[1,4,4,0],[1,4,4,0],[3,3,1,1]],[[2,2,2,2],[2,2,2,2],[3,3,1,1],[1,4,4,0],[1,4,4,0]]],0,0];
        function deepcopy(nowBoard) {
            var i, retBoard;
            retBoard = [(function () {
                var ՐՏidx1, ՐՏitr1 = ՐՏ_Iterable(nowBoard[0]), ՐՏres = [], i;
                for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
                    i = ՐՏitr1[ՐՏidx1];
                    ՐՏres.push(i)
                }
                return ՐՏres
            })(), (function () {
                var ՐՏidx2, ՐՏitr2 = ՐՏ_Iterable(nowBoard[1]), ՐՏres = [], i;
                for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
                    i = ՐՏitr2[ՐՏidx2];
                    ՐՏres.push(i)
                }
                return ՐՏres
            })(), (function () {
                var ՐՏidx3, ՐՏitr3 = ՐՏ_Iterable(nowBoard[2]), ՐՏres = [], i;
                for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
                    i = ՐՏitr3[ՐՏidx3];
                    ՐՏres.push(i)
                }
                return ՐՏres
            })(), (function () {
                var ՐՏidx4, ՐՏitr4 = ՐՏ_Iterable(nowBoard[3]), ՐՏres = [], i;
                for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
                    i = ՐՏitr4[ՐՏidx4];
                    ՐՏres.push(i)
                }
                return ՐՏres
            })(), (function () {
                var ՐՏidx5, ՐՏitr5 = ՐՏ_Iterable(nowBoard[4]), ՐՏres = [], i;
                for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
                    i = ՐՏitr5[ՐՏidx5];
                    ՐՏres.push(i)
                }
                return ՐՏres
            })()];
            return retBoard
        }

        function calcNextBoard_when0notNeighbor_onePiece(nowBoard, _0xy, direct) {
            var nextBoard;
            nextBoard = deepcopy(nowBoard);
            if (_0xy["y"] > 0 && direct === 0) {
                if (nowBoard[_0xy["y"] - 1][_0xy["x"]] === 1) {
                    nextBoard[_0xy["y"] - 1][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] - 1], direct: "down", step: 1}}
                }
                if (nowBoard[_0xy["y"] - 1][_0xy["x"]] === 2) {
                    nextBoard[_0xy["y"] - 2][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 2;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] - 2], direct: "down", step: 1}}
                }
            }
            if (_0xy["x"] < MAX_X - 1 && direct === 1) {
                if (nowBoard[_0xy["y"]][_0xy["x"] + 1] === 1) {
                    nextBoard[_0xy["y"]][_0xy["x"] + 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 1, _0xy["y"]], direct: "left", step: 1}}
                }
                if (nowBoard[_0xy["y"]][_0xy["x"] + 1] === 3) {
                    nextBoard[_0xy["y"]][_0xy["x"] + 2] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 3
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 1, _0xy["y"]], direct: "left", step: 1}}
                }
            }
            if (_0xy["y"] < MAX_Y - 1 && direct === 2) {
                if (nowBoard[_0xy["y"] + 1][_0xy["x"]] === 1) {
                    nextBoard[_0xy["y"] + 1][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] + 1], direct: "up", step: 1}}
                }
                if (nowBoard[_0xy["y"] + 1][_0xy["x"]] === 2) {
                    nextBoard[_0xy["y"] + 2][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 2;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] + 1], direct: "up", step: 1}}
                }
            }
            if (_0xy["x"] > 0 && direct === 3) {
                if (nowBoard[_0xy["y"]][_0xy["x"] - 1] === 1) {
                    nextBoard[_0xy["y"]][_0xy["x"] - 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] - 1, _0xy["y"]], direct: "right", step: 1}}
                }
                if (nowBoard[_0xy["y"]][_0xy["x"] - 1] === 3) {
                    nextBoard[_0xy["y"]][_0xy["x"] - 2] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 3;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] - 2, _0xy["y"]], direct: "right", step: 1}}
                }
            }
            return null
        }

        function calcNextBoard_when0notNeighbor(nowBoard, direct) {
            var ՐՏupk1, ՐՏupk2;
            var x0, y0, x1, y1;
            ՐՏupk1 = getFirst0(nowBoard);
            x0 = ՐՏupk1[0];
            y0 = ՐՏupk1[1];
            ՐՏupk2 = getSecond0(nowBoard);
            x1 = ՐՏupk2[0];
            y1 = ՐՏupk2[1];
            if (direct < 4) {
                return calcNextBoard_when0notNeighbor_onePiece(nowBoard, {"x": x0, "y": y0}, direct)
            } else {
                return calcNextBoard_when0notNeighbor_onePiece(nowBoard, {"x": x1, "y": y1}, direct - 4)
            }
        }

        function calcNextBoard_when0neighbor_typeI(nowBoard, _0xy, direct) {
            var nextBoard;
            nextBoard = deepcopy(nowBoard);
            if (_0xy["y"] > 0 && direct === 0) {
                if (nowBoard[_0xy["y"] - 1][_0xy["x"]] === 1) {
                    nextBoard[_0xy["y"] - 1][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] - 1], direct: "down", step: 1}}
                }
                if (nowBoard[_0xy["y"] - 1][_0xy["x"]] === 2) {
                    nextBoard[_0xy["y"] - 2][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 2;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] - 2], direct: "down", step: 1}}
                }
            }
            if (_0xy["x"] < MAX_X - 1 && direct === 1) {
                if (nowBoard[_0xy["y"]][_0xy["x"] + 1] === 1) {
                    nextBoard[_0xy["y"]][_0xy["x"] + 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 1, _0xy["y"]], direct: "left", step: 1}}
                }
                if (nowBoard[_0xy["y"]][_0xy["x"] + 1] === 3) {
                    nextBoard[_0xy["y"]][_0xy["x"] + 2] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 3;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 1, _0xy["y"]], direct: "left", step: 1}}
                }
            }
            if (_0xy["x"] < MAX_X - 1 && direct === 2) {
                if (nowBoard[_0xy["y"]][_0xy["x"] + 1] === 2 && nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] === 2 && !(_0xy["y"] > 0 && _0xy["y"] < MAX_Y - 2 && nowBoard[_0xy["y"] + 2][_0xy["x"] + 1] === 2 && nowBoard[_0xy["y"] - 1][_0xy["x"] + 1] === 2)) {
                    nextBoard[_0xy["y"]][_0xy["x"] + 1] = 0;
                    nextBoard[_0xy["y"] + 1][_0xy["x"] + 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 2;
                    nextBoard[_0xy["y"] + 1][_0xy["x"]] = 2;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 1, _0xy["y"]], direct: "left", step: 1}}
                }
                if (nowBoard[_0xy["y"]][_0xy["x"] + 1] === 4 && nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] === 4) {
                    nextBoard[_0xy["y"]][_0xy["x"] + 2] = 0;
                    nextBoard[_0xy["y"] + 1][_0xy["x"] + 2] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 4;
                    nextBoard[_0xy["y"] + 1][_0xy["x"]] = 4;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 1, _0xy["y"]], direct: "left", step: 1}}
                }
            }
            if (_0xy["x"] < MAX_X - 1 && direct === 3) {
                if (nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] === 1) {
                    nextBoard[_0xy["y"] + 1][_0xy["x"] + 1] = 0;
                    nextBoard[_0xy["y"] + 1][_0xy["x"]] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 1, _0xy["y"] + 1], direct: "left", step: 1}}
                }
                if (nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] === 3) {
                    nextBoard[_0xy["y"] + 1][_0xy["x"] + 2] = 0;
                    nextBoard[_0xy["y"] + 1][_0xy["x"]] = 3;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 1, _0xy["y"] + 1], direct: "left", step: 1}}
                }
            }
            if (_0xy["y"] < MAX_Y - 2 && direct === 4) {
                if (nowBoard[_0xy["y"] + 2][_0xy["x"]] === 1) {
                    nextBoard[_0xy["y"] + 2][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"] + 1][_0xy["x"]] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] + 2], direct: "up", step: 1}}
                }
                if (nowBoard[_0xy["y"] + 2][_0xy["x"]] === 2) {
                    nextBoard[_0xy["y"] + 3][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"] + 1][_0xy["x"]] = 2;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] + 2], direct: "up", step: 1}}
                }
            }
            if (_0xy["x"] > 0 && direct === 5) {
                if (nowBoard[_0xy["y"] + 1][_0xy["x"] - 1] === 1) {
                    nextBoard[_0xy["y"] + 1][_0xy["x"] - 1] = 0;
                    nextBoard[_0xy["y"] + 1][_0xy["x"]] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] - 1, _0xy["y"] + 1], direct: "right", step: 1}}
                }
                if (nowBoard[_0xy["y"] + 1][_0xy["x"] - 1] === 3) {
                    nextBoard[_0xy["y"] + 1][_0xy["x"] - 2] = 0;
                    nextBoard[_0xy["y"] + 1][_0xy["x"]] = 3;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] - 1, _0xy["y"] + 1], direct: "right", step: 1}}
                }
            }
            if (_0xy["x"] > 0 && direct === 6) {
                if (nowBoard[_0xy["y"]][_0xy["x"] - 1] === 2 && nowBoard[_0xy["y"] + 1][_0xy["x"] - 1] === 2 && !(_0xy["y"] > 0 && _0xy["y"] < MAX_Y - 2 && nowBoard[_0xy["y"] + 2][_0xy["x"] - 1] === 2 && nowBoard[_0xy["y"] - 1][_0xy["x"] - 1] === 2)) {
                    nextBoard[_0xy["y"]][_0xy["x"] - 1] = 0;
                    nextBoard[_0xy["y"] + 1][_0xy["x"] - 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 2;
                    nextBoard[_0xy["y"] + 1][_0xy["x"]] = 2;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] - 1, _0xy["y"]], direct: "right", step: 1}}
                }
                if (nowBoard[_0xy["y"]][_0xy["x"] - 1] === 4 && nowBoard[_0xy["y"] + 1][_0xy["x"] - 1] === 4) {
                    nextBoard[_0xy["y"]][_0xy["x"] - 2] = 0;
                    nextBoard[_0xy["y"] + 1][_0xy["x"] - 2] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 4;
                    nextBoard[_0xy["y"] + 1][_0xy["x"]] = 4;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] - 1, _0xy["y"]], direct: "right", step: 1}}
                }
            }
            if (_0xy["x"] > 0 && direct === 7) {
                if (nowBoard[_0xy["y"]][_0xy["x"] - 1] === 1) {
                    nextBoard[_0xy["y"]][_0xy["x"] - 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] - 1, _0xy["y"]], direct: "right", step: 1}}
                }
                if (nowBoard[_0xy["y"]][_0xy["x"] - 1] === 3) {
                    nextBoard[_0xy["y"]][_0xy["x"] - 2] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 3;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] - 1, _0xy["y"]], direct: "right", step: 1}}
                }
            }
            return null
        }

        function calcNextBoard_when0neighbor_type_(nowBoard, _0xy, direct) {
            var nextBoard;
            nextBoard = deepcopy(nowBoard);
            if (_0xy["y"] > 0 && direct === 0) {
                if (nowBoard[_0xy["y"] - 1][_0xy["x"]] === 1) {
                    nextBoard[_0xy["y"] - 1][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] - 1], direct: "down", step: 1}}
                }
                if (nowBoard[_0xy["y"] - 1][_0xy["x"]] === 2) {
                    nextBoard[_0xy["y"] - 2][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 2;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] - 2], direct: "down", step: 1}}
                }
            }
            if (_0xy["y"] > 0 && direct === 1) {
                if (nowBoard[_0xy["y"] - 1][_0xy["x"]] === 3 && nowBoard[_0xy["y"] - 1][_0xy["x"] + 1] === 3) {
                    nextBoard[_0xy["y"] - 1][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"] - 1][_0xy["x"] + 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 3;
                    nextBoard[_0xy["y"]][_0xy["x"] + 1] = 3;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] - 1], direct: "down", step: 1}}
                }
                if (nowBoard[_0xy["y"] - 1][_0xy["x"]] === 4 && nowBoard[_0xy["y"] - 1][_0xy["x"] + 1] === 4) {
                    nextBoard[_0xy["y"] - 2][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"] - 2][_0xy["x"] + 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 4;
                    nextBoard[_0xy["y"]][_0xy["x"] + 1] = 4;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] - 2], direct: "down", step: 1}}
                }
            }
            if (_0xy["y"] > 0 && direct === 2) {
                if (nowBoard[_0xy["y"] - 1][_0xy["x"] + 1] === 1) {
                    nextBoard[_0xy["y"] - 1][_0xy["x"] + 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"] + 1] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 1, _0xy["y"] - 1], direct: "down", step: 1}}
                }
                if (nowBoard[_0xy["y"] - 1][_0xy["x"] + 1] === 2) {
                    nextBoard[_0xy["y"] - 2][_0xy["x"] + 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"] + 1] = 2;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 1, _0xy["y"] - 2], direct: "down", step: 1}}
                }
            }
            if (_0xy["x"] < MAX_X - 2 && direct === 3) {
                if (nowBoard[_0xy["y"]][_0xy["x"] + 2] === 1) {
                    nextBoard[_0xy["y"]][_0xy["x"] + 2] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"] + 1] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 2, _0xy["y"]], direct: "left", step: 1}}
                }
                if (nowBoard[_0xy["y"]][_0xy["x"] + 2] === 3) {
                    nextBoard[_0xy["y"]][_0xy["x"] + 3] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"] + 1] = 3;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 2, _0xy["y"]], direct: "left", step: 1}}
                }
            }
            if (_0xy["y"] < MAX_Y - 1 && direct === 4) {
                if (nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] === 1) {
                    nextBoard[_0xy["y"] + 1][_0xy["x"] + 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"] + 1] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 1, _0xy["y"] + 1], direct: "up", step: 1}}
                }
                if (nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] === 2) {
                    nextBoard[_0xy["y"] + 2][_0xy["x"] + 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"] + 1] = 2;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] + 1, _0xy["y"] + 1], direct: "up", step: 1}}
                }
            }
            if (_0xy["y"] < MAX_Y - 1 && direct === 5) {
                if (nowBoard[_0xy["y"] + 1][_0xy["x"]] === 3 && nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] === 3) {
                    nextBoard[_0xy["y"] + 1][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"] + 1][_0xy["x"] + 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 3;
                    nextBoard[_0xy["y"]][_0xy["x"] + 1] = 3;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] + 1], direct: "up", step: 1}}
                }
                if (nowBoard[_0xy["y"] + 1][_0xy["x"]] === 4 && nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] === 4) {
                    nextBoard[_0xy["y"] + 2][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"] + 2][_0xy["x"] + 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 4;
                    nextBoard[_0xy["y"]][_0xy["x"] + 1] = 4;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] + 1], direct: "up", step: 1}}
                }
            }
            if (_0xy["y"] < MAX_Y - 1 && direct === 6) {
                if (nowBoard[_0xy["y"] + 1][_0xy["x"]] === 1) {
                    nextBoard[_0xy["y"] + 1][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] + 1], direct: "up", step: 1}}
                }
                if (nowBoard[_0xy["y"] + 1][_0xy["x"]] === 2) {
                    nextBoard[_0xy["y"] + 2][_0xy["x"]] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 2;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"], _0xy["y"] + 1], direct: "up", step: 1}}
                }
            }
            if (_0xy["x"] > 0 && direct === 7) {
                if (nowBoard[_0xy["y"]][_0xy["x"] - 1] === 1) {
                    nextBoard[_0xy["y"]][_0xy["x"] - 1] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 1;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] - 1, _0xy["y"]], direct: "right", step: 1}}
                }
                if (nowBoard[_0xy["y"]][_0xy["x"] - 1] === 3) {
                    nextBoard[_0xy["y"]][_0xy["x"] - 2] = 0;
                    nextBoard[_0xy["y"]][_0xy["x"]] = 3;
                    return {nextBoard: nextBoard, move: {piece:[_0xy["x"] - 2, _0xy["y"]], direct: "right", step: 1}}
                }
            }
            return null
        }

        function calcNextBoard_when0neighbor(nowBoard, direct) {
            ;var ՐՏupk3;
            var x0, y0;
            ՐՏupk3 = getFirst0(nowBoard);
            x0 = ՐՏupk3[0];
            y0 = ՐՏupk3[1];
            if (x0 + 1 < 4 && nowBoard[y0][x0 + 1] === 0) {
                return calcNextBoard_when0neighbor_type_(nowBoard, {"x": x0, "y": y0}, direct)
            }
            if (y0 + 1 < 5 && nowBoard[y0 + 1][x0] === 0) {
                return calcNextBoard_when0neighbor_typeI(nowBoard, {"x": x0, "y": y0}, direct)
            }
            return null
        }

        function two0AreNeighbor(nowBoard) {
            ;var ՐՏupk4;
            var x0, y0;
            ՐՏupk4 = getFirst0(nowBoard);
            x0 = ՐՏupk4[0];
            y0 = ՐՏupk4[1];
            if (x0 + 1 < 4 && nowBoard[y0][x0 + 1] === 0) {
                return true
            }
            if (y0 + 1 < 5 && nowBoard[y0 + 1][x0] === 0) {
                return true
            }
            if (y0 - 1 >= 0 && nowBoard[y0 - 1][x0] === 0) {
                return true
            }
            if (x0 - 1 >= 0 && nowBoard[y0][x0 - 1] === 0) {
                return true
            }
            return false
        }

        function getFirst0(nowBoard) {
            var y, x;
            for (y = 0; y < MAX_Y; y++) {
                for (x = 0; x < MAX_X; x++) {
                    if (nowBoard[y][x] === 0) {
                        return [x, y]
                    }
                }
            }
        }

        function getSecond0(nowBoard) {
            var ՐՏupk5;
            var x0, y0, y, x;
            ՐՏupk5 = getFirst0(nowBoard);
            x0 = ՐՏupk5[0];
            y0 = ՐՏupk5[1];
            for (y = 0; y < MAX_Y; y++) {
                for (x = 0; x < MAX_X; x++) {
                    if (nowBoard[y][x] === 0 && !(x === x0 && y === y0)) {
                        return [x, y]
                    }
                }
            }
        }

        var dupBoardError = (ՐՏ_1 = function dupBoardError() {
        }, ՐՏ_1);

        function findBoardInTree(board, r) {
            var ՐՏ_2, ՐՏ_3, ՐՏitr6, ՐՏidx6;
            var child;
            if ((r === (ՐՏ_2 = null) || typeof r === "object" && ՐՏ_eq(r, ՐՏ_2))) {
                return
            }
            if (((ՐՏ_3 = r.board) === board || typeof ՐՏ_3 === "object" && ՐՏ_eq(ՐՏ_3, board))) {
                throw new dupBoardError
            }
            ՐՏitr6 = ՐՏ_Iterable(r.children);
            for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
                child = ՐՏitr6[ՐՏidx6];
                findBoardInTree(board, child)
            }
        }

        var BinaryTree = (ՐՏ_4 = function BinaryTree() {
            BinaryTree.prototype.__init__.apply(this, arguments)
        }, Object.defineProperties(ՐՏ_4.prototype, {
            __init__: {
                enumerable: true,
                writable: true,
                value: function __init__(rootObj) {
                    var self = this;
                    var i;
                    self.board = rootObj;
                    self.parent = null;
                    self.children = (function () {
                        var ՐՏidx7, ՐՏitr7 = ՐՏ_Iterable(range(MAX_CAN_MOVE_DIRECT)), ՐՏres = [], i;
                        for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
                            i = ՐՏitr7[ՐՏidx7];
                            ՐՏres.push(null)
                        }
                        return ՐՏres
                    })();
                    self.direct = 0
                }
            }, calcNextBoard: {
                enumerable: true, writable: true, value: function calcNextBoard(nowBoard, direct) {
                    var self = this;
                    if (two0AreNeighbor(nowBoard)) {
                        return calcNextBoard_when0neighbor(nowBoard, direct)
                    } else {
                        return calcNextBoard_when0notNeighbor(nowBoard, direct)
                    }
                }
            }, calcLeafs: {
                enumerable: true, writable: true, value: function calcLeafs() {
                    var ՐՏ_5;
                    var self = this;
                    var leafsCnt, i, d, nextBoard, move, nextBoardAndMove;
                    leafsCnt = 0;
                    // try 2, 6 , 1 ,5 first , can increase the chance of  piece 4 moves.
                    for (i = 0; i < MAX_CAN_MOVE_DIRECT; i++) {
                        d = MOVE_DIRECT_TABLE[i];
                        nextBoardAndMove = self.calcNextBoard(self.board, d);
                        if (nextBoardAndMove === null) {
                            continue;
                        }
                        nextBoard = nextBoardAndMove.nextBoard;
                        move = nextBoardAndMove.move;
                        if ((nextBoard !== (ՐՏ_5 = null) && (typeof nextBoard !== "object" || !ՐՏ_eq(nextBoard, ՐՏ_5))) && (!isInHash(nextBoard, allBoardHash) && !isInHash(mirrorBoard(nextBoard), allBoardHash))) {
                            self.children[d] = new BinaryTree(nextBoard);
                            self.children[d].parent = self;
                            self.children[d].move = move;
                            addToHash(nextBoard, allBoardHash);
                            addToScanQueue(self.children[d]);
                            if (winBoard(self.children[d])) {
                                makeWinPath(self.children[d])
                                return true
                            }
                        }
                    }
                    return false
                }
            }, getNextNode: {
                enumerable: true, writable: true, value: function getNextNode(afterD) {
                    ;var ՐՏ_6, ՐՏ_7;
                    var self = this;
                    afterD = afterD === void 0 ? -1 : afterD;
                    var d;
                    for (d = 0; d < MAX_CAN_MOVE_DIRECT; d++) {
                        if (((ՐՏ_6 = self.children[d]) !== (ՐՏ_7 = null) && (typeof ՐՏ_6 !== "object" || !ՐՏ_eq(ՐՏ_6, ՐՏ_7))) && afterD < d) {
                            return [self.children[d], d]
                        }
                    }
                    return null
                }
            }, setRootVal: {
                enumerable: true, writable: true, value: function setRootVal(obj) {
                    var self = this;
                    self.key = obj
                }
            }, getRootVal: {
                enumerable: true, writable: true, value: function getRootVal() {
                    var self = this;
                    return self.key
                }
            }
        }), ՐՏ_4);
        root = new BinaryTree(board);

        function winBoard(node) {
            if (isInWinBoardHash(node.board, winBoardHash) || node.board[MAX_Y - 1][1] === 4 && node.board[MAX_Y - 1][2] === 4) {
                return true
            }
            return false
        }

        function makeWinPath(node) {
            ;var ՐՏ_8;
            var temp;
            temp = node;
            while ((temp !== (ՐՏ_8 = null) && (typeof temp !== "object" || !ՐՏ_eq(temp, ՐՏ_8)))) {
                winPath.unshift(temp.board);
                if ('move' in temp) {
                    winMove.unshift(temp.move);
                }
                temp = temp.parent
            }
            console.log();
            var index = boardIndexOf(node.board, OnePath)
            if (index >= 0) {
                winPath = winPath.concat(OnePath.slice(index + 1));
                winMove = winMove.concat(OneMove.slice(index));
            }
        }

        function getWinBoardHashKey(board) {
            return board[1][1] + board[2][1] + board[3][1] + board[4][1]
        }

        function addToWinBoardHash(board, hash) {
            var boardKey;
            boardKey = getWinBoardHashKey(board);
            if (hash[boardKey] === 0) {
                hash[boardKey] = [board]
            } else {
                hash[boardKey].push(board)
            }
        }

        function mirrorBoard(board) {
            var mirror = [];
            for(var i in board) {
                mirror.push(board[i].slice().reverse())
            }
            return mirror
        }

        function mirrorMoveArray(moveArray) {
            var mirrorArray = [];
            var getMirrorDirect = function (direct) {
                if (direct == "right")
                    return "left";
                else if (direct == "left")
                    return "right";
                else return direct;
            };
            var getMirrorXY = function (XY) {
                return [3 - XY[0], XY[1]];
            };
            for(var i in moveArray) {
                mirrorArray.push({"piece":getMirrorXY(moveArray[i].piece), "direct":getMirrorDirect(moveArray[i].direct),"step":1})
            }
            return mirrorArray
        }
        function min(i, j) {
            return i < j? i : j;
        }

        function boardCmp(board1, board2) {
            return board1.toString() === board2.toString()
        }

        function boardIn(board, boardArray) {
            for (var i in boardArray) {
                if (boardCmp(board, boardArray[i])) {
                    return true;
                }
            }
            return false;
        }

        function boardIndexOf(board, boardArray) {
            for (var i in boardArray) {
                if (boardCmp(board, boardArray[i])) {
                    return parseInt(i);
                }
            }
            return -1;
        }

        function isInWinBoardHash(board, hash) {
            var ՐՏ_9, ՐՏ_10;
            var boardKey;
            boardKey = getWinBoardHashKey(board);

            if (hash[boardKey] != 0) {
                return boardIn(board, hash[boardKey])
            } else {
                return false
            }
        }

        function getHashKey(board) {
            return (board[3] + board[4])
        }

        function addToHash(board, hash) {
            var boardKey;
            boardKey = getHashKey(board);
            if (!(boardKey in hash)) {
                hash[boardKey] = [board]
            } else {
                hash[boardKey].push(board)
            }
        }

        function isInHash(board, hash) {
            var boardKey;
            boardKey = getHashKey(board);
            if (boardKey in hash) {
                return boardIn(board, hash[boardKey])
            } else {
                return false
            }
        }

        var scanQueue = []
        var scanPoint = 0
        function addToScanQueue(node) {
            scanQueue.push(node)
        }

        function doScanQueue() {
            var lenBeforeScan = scanQueue.length
            var findWin = false

            var needScan = scanQueue.slice(scanPoint)
            for(var nodeIndex in needScan) {
                findWin = needScan[nodeIndex].calcLeafs()
                if (findWin) {
                    return true
                }
            }
            scanPoint = lenBeforeScan
            return false
        }

        function checkDupBoard (winPath) {
            for (var b in winPath) {
                if (boardIn(winPath[b], winPath.slice(b + 1))) {
                    console.log("dup happen!!!");
                    return;
                }
            }
            console.log("no dup ");
        }

        function main2() {
            var ՐՏupk6, ՐՏ_11, ՐՏ_12, ՐՏupk7;
            var d, node;

            d = 0;
            node = root;
            while (true) {
                if (node.calcLeafs() === true) {
                    ՐՏupk6 = node.getNextNode();
                    node = ՐՏupk6[0];
                    d = ՐՏupk6[1]
                } else {
                    d = node.direct;
                    node = node.parent;
                    while (((ՐՏ_11 = node.getNextNode(d)) === (ՐՏ_12 = null) || typeof ՐՏ_11 === "object" && ՐՏ_eq(ՐՏ_11, ՐՏ_12))) {
                        d = node.direct;
                        node = node.parent
                    }
                    ՐՏupk7 = node.getNextNode(d);
                    node = ՐՏupk7[0];
                    d = ՐՏupk7[1]
                }
                node.direct = d;
                if (winBoard(node)) {
                    makeWinPath(node);
                    break
                }
            }
        }

        function main() {
            addToScanQueue(root)
            while(!doScanQueue()) {
                console.log("%s", scanQueue.length)
            }
        }

        if (__name__ === "__main__") {
            ՐՏ_print("run ai!");
            main();
/*
            ՐՏ_print(len(winPath));
            ՐՏ_print(len(winMove));
            var fs = require("fs");
            console.log("准备写入文件");
            fs.writeFileSync('wp', JSON.stringify(winPath));
            console.log("准备写入文件");
            fs.writeFileSync('wm',  JSON.stringify(winMove));
            for (var i in winPath) {
                addToWinBoardHash(winPath[i], winBoardHash)
            }
            fs.writeFileSync('wh', JSON.stringify(winBoardHash));
*/
            console.log("finish with step %s , move %s", winPath.length, winMove.length);
            return winMove
        }
    }
}

var getAiMoveArray = Ai ();

module.exports.getAiMoveArray = getAiMoveArray;
//getAiMoveArray([[2,4,4,2],[2,4,4,2],[2,3,3,2],[2,1,1,2],[1,0,0,1]]);