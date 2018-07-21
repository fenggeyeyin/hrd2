#!/usr/bin/python
# -*- coding: utf-8 -*-
from __future__ import print_function
from time import sleep
MAX_CAN_MOVE_DIRECT = 8
MAX_X = 4
MAX_Y = 5
import random
import unittest
import copy
import sys
import json
try:
    import cPickle as pickle
except ImportError:
    import pickle
sys.setrecursionlimit(100000000)
class TestSequenceFunctions(unittest.TestCase):

    def setUp(self):
        self.seq = range(10)
        self.orgin_board = [[2,4,4,2],[2,4,4,2],[2,3,3,2],[2,1,1,2],[1,0,0,1]]
        self.no_neighbor_board = [[2,4,4,2],[2,4,4,2],[2,3,3,0],[2,0,1,2],[1,1,1,2]]
        self.neighbor_board_I = [[4,4,2,2],[4,4,2,2],[3,3,0,2],[2,1,0,2],[2,1,1,1]]
        self.neighbor_board__ = [[2,4,4,2],[2,4,4,2],[1,0,0,2],[2,3,3,2],[2,1,1,1]]
        self.neighbor_board_I_2 = [[4,4,2,1],[4,4,2,2],[3,3,0,2],[2,1,0,2],[2,1,1,2]]
        self.winBoardTest = [[2,2,1,1],[2,2,2,2],[3,3,2,2],[0,0,4,4],[1,1,4,4]]
        global winBoardHash
        global OnePath
        with open('w', 'rb') as f:
            winBoardHash = pickle.load(f)
        with open('wp', 'rb') as f2:
            OnePath = json.load(f2)

    def test_winBoardHash(self):
        self.assertTrue(isInHash(self.winBoardTest, winBoardHash))
        self.assertTrue(isInHash(self.orgin_board, winBoardHash))
        self.assertFalse(isInHash(self.neighbor_board_I, winBoardHash))

    def test_OnePath(self):
        self.assertTrue(self.winBoardTest in OnePath)
        self.assertTrue(self.orgin_board in OnePath)
        self.assertFalse(self.neighbor_board_I in OnePath)

    def test_move_type_I(self):
        print("type_I  orgin:")
        printBoard(self.neighbor_board_I)
        for d in range(MAX_CAN_MOVE_DIRECT):
            if two0AreNeighbor(self.neighbor_board_I):
                nextBoard = calcNextBoard_when0neighbor(self.neighbor_board_I, d)
            else:
                nextBoard = calcNextBoard_when0notNeighbor(self.neighbor_board_I, d)
            if nextBoard != None:
                printBoard(nextBoard)

    def test_move_type_I_2(self):
        print("type_I 2  orgin:")
        printBoard(self.neighbor_board_I_2)
        for d in range(MAX_CAN_MOVE_DIRECT):
            if two0AreNeighbor(self.neighbor_board_I_2):
                nextBoard = calcNextBoard_when0neighbor(self.neighbor_board_I_2, d)
            else:
                nextBoard = calcNextBoard_when0notNeighbor(self.neighbor_board_I_2, d)
            if nextBoard != None:
                printBoard(nextBoard)

    def test_move_type__(self):
        print("type__  orgin:")
        printBoard(self.neighbor_board__)
        for d in range(MAX_CAN_MOVE_DIRECT):
            if two0AreNeighbor(self.neighbor_board__):
                nextBoard = calcNextBoard_when0neighbor(self.neighbor_board__, d)
            else:
                nextBoard = calcNextBoard_when0notNeighbor(self.neighbor_board__, d)
            if nextBoard != None:
                printBoard(nextBoard)

    def test_move_type_no_neighbor(self):
        print("no_neighbor orgin:")
        printBoard(self.no_neighbor_board)
        for d in range(MAX_CAN_MOVE_DIRECT):
            if two0AreNeighbor(self.no_neighbor_board):
                nextBoard = calcNextBoard_when0neighbor(self.no_neighbor_board, d)
            else:
                nextBoard = calcNextBoard_when0notNeighbor(self.no_neighbor_board, d)
            if nextBoard != None:
                printBoard(nextBoard)

    def test_shuffle(self):
        # make sure the shuffled sequence does not lose any elements
        random.shuffle(self.seq)
        self.seq.sort()
        self.assertEqual(self.seq, range(10))

        # should raise an exception for an immutable sequence
        self.assertRaises(TypeError, random.shuffle, (1,2,3))

    def test_choice(self):
        element = random.choice(self.seq)
        self.assertTrue(element in self.seq)

    def test_sample(self):
        with self.assertRaises(ValueError):
            random.sample(self.seq, 20)
        for element in random.sample(self.seq, 5):
            self.assertTrue(element in self.seq)

def printBoard(board):
    for y in range(MAX_Y):
        for x in range(MAX_X):
            print(board[y][x], end = " ")
        print("")
    print("")
    return

def test_haha():
    return

def calcNextBoard_when0notNeighbor_onePiece(nowBoard, _0xy, direct):
    nextBoard = copy.deepcopy(nowBoard)
    if _0xy["y"] > 0 and direct == 0:
        if nowBoard[_0xy["y"] - 1][_0xy["x"]] == 1:
            nextBoard[_0xy["y"] - 1][_0xy["x"]] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 1
            return nextBoard, (_0xy["y"] - 1, _0xy["x"], "down", 1)
        if nowBoard[_0xy["y"] - 1][_0xy["x"]] == 2:
            nextBoard[_0xy["y"] - 2][_0xy["x"]] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 2
            return nextBoard, (_0xy["y"] - 1, _0xy["x"], "down", 1)
    if _0xy["x"] < MAX_X - 1 and direct == 1:
        if nowBoard[_0xy["y"]][_0xy["x"] + 1] == 1:
            nextBoard[_0xy["y"]][_0xy["x"] + 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 1
            return nextBoard, (_0xy["y"], _0xy["x"] + 1, "left", 1)
        if nowBoard[_0xy["y"]][_0xy["x"] + 1] == 3:
            nextBoard[_0xy["y"]][_0xy["x"] + 2] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 3
            return nextBoard, (_0xy["y"], _0xy["x"] + 1, "left", 1)
    if _0xy["y"] < MAX_Y - 1 and direct == 2:
        if nowBoard[_0xy["y"] + 1][_0xy["x"]] == 1:
            nextBoard[_0xy["y"] + 1][_0xy["x"]] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 1
            return nextBoard, (_0xy["y"] + 1, _0xy["x"], "up", 1)
        if nowBoard[_0xy["y"] + 1][_0xy["x"]] == 2:
            nextBoard[_0xy["y"] + 2][_0xy["x"]] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 2
            return nextBoard, (_0xy["y"] + 1, _0xy["x"], "up", 1)
    if _0xy["x"]  > 0 and direct == 3:
        if nowBoard[_0xy["y"]][_0xy["x"] - 1] == 1:
            nextBoard[_0xy["y"]][_0xy["x"] - 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 1
            return nextBoard, (_0xy["y"], _0xy["x"] - 1, "right", 1)
        if nowBoard[_0xy["y"]][_0xy["x"] - 1] == 3:
            nextBoard[_0xy["y"]][_0xy["x"] - 2] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 3
            return nextBoard, (_0xy["y"], _0xy["x"] - 1, "right", 1)
    return None

def calcNextBoard_when0notNeighbor(nowBoard, direct):
    x0, y0 = getFirst0(nowBoard)
    x1, y1 = getSecond0(nowBoard)
    if direct < 4:
        return calcNextBoard_when0notNeighbor_onePiece(nowBoard, {"x" : x0, "y" : y0}, direct)
    else :
        return calcNextBoard_when0notNeighbor_onePiece(nowBoard, {"x" : x1, "y" : y1}, direct - 4)

def calcNextBoard_when0neighbor_typeI(nowBoard, _0xy, direct):
    nextBoard = copy.deepcopy(nowBoard)
    if _0xy["y"]  > 0 and direct == 0:
        if nowBoard[_0xy["y"] - 1][_0xy["x"]] == 1:
            nextBoard[_0xy["y"] - 1][_0xy["x"]] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 1
            return nextBoard, (_0xy["y"] - 1, _0xy["x"], "down", 1)
        if nowBoard[_0xy["y"] - 1][_0xy["x"]] == 2:
            nextBoard[_0xy["y"] - 2][_0xy["x"]] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 2
            return nextBoard, (_0xy["y"] - 1, _0xy["x"], "down", 1)
    if _0xy["x"] < MAX_X - 1 and direct == 1:
        if nowBoard[_0xy["y"]][_0xy["x"] + 1] == 1:
            nextBoard[_0xy["y"]][_0xy["x"] + 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 1
            return nextBoard, (_0xy["y"], _0xy["x"] + 1, "left", 1)
        if nowBoard[_0xy["y"]][_0xy["x"] + 1] == 3:
            nextBoard[_0xy["y"]][_0xy["x"] + 2] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 3
            return nextBoard, (_0xy["y"], _0xy["x"] + 1, "left", 1)
    if _0xy["x"] < MAX_X - 1 and direct == 2:
        if nowBoard[_0xy["y"]][_0xy["x"] + 1]  == 2 and nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] == 2 and \
          (not (_0xy["y"] > 0 and _0xy["y"] < MAX_Y - 2 and nowBoard[_0xy["y"] + 2][_0xy["x"] + 1] == 2 and nowBoard[_0xy["y"] - 1][_0xy["x"] + 1] == 2)):
            nextBoard[_0xy["y"]][_0xy["x"] + 1] = 0
            nextBoard[_0xy["y"] + 1][_0xy["x"] + 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 2
            nextBoard[_0xy["y"] + 1][_0xy["x"]] = 2
            return nextBoard, (_0xy["y"], _0xy["x"] + 1, "left", 1)
        if nowBoard[_0xy["y"]][_0xy["x"] + 1]  == 4 and nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] == 4:
            nextBoard[_0xy["y"]][_0xy["x"] + 2] = 0
            nextBoard[_0xy["y"] + 1][_0xy["x"] + 2] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 4
            nextBoard[_0xy["y"] + 1][_0xy["x"]] = 4
            return nextBoard, (_0xy["y"], _0xy["x"] + 1, "left", 1)
    if _0xy["x"] < MAX_X - 1 and direct == 3:
        if nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] == 1:
            nextBoard[_0xy["y"] + 1][_0xy["x"] + 1] = 0
            nextBoard[_0xy["y"] + 1][_0xy["x"]] = 1
            return nextBoard, (_0xy["y"] + 1, _0xy["x"] + 1, "left", 1)
        if nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] == 3:
            nextBoard[_0xy["y"] + 1][_0xy["x"] + 2] = 0
            nextBoard[_0xy["y"] + 1][_0xy["x"]] = 3
            return nextBoard, (_0xy["y"] + 1, _0xy["x"] + 1, "left", 1)
    if _0xy["y"] < MAX_Y - 2 and direct == 4:
        if nowBoard[_0xy["y"] + 2][_0xy["x"]] == 1:
            nextBoard[_0xy["y"] + 2][_0xy["x"]] = 0
            nextBoard[_0xy["y"] + 1][_0xy["x"]] = 1
            return nextBoard, (_0xy["y"] + 2, _0xy["x"], "up", 1)
        if nowBoard[_0xy["y"] + 2][_0xy["x"]] == 2:
            nextBoard[_0xy["y"] + 3][_0xy["x"]] = 0
            nextBoard[_0xy["y"] + 1][_0xy["x"]] = 2
            return nextBoard, (_0xy["y"] + 2, _0xy["x"], "up", 1)
    if _0xy["x"] > 0 and direct == 5:
        if nowBoard[_0xy["y"] + 1][_0xy["x"] - 1] == 1:
            nextBoard[_0xy["y"] + 1][_0xy["x"] - 1] = 0
            nextBoard[_0xy["y"] + 1][_0xy["x"]] = 1
            return nextBoard, (_0xy["y"] + 1, _0xy["x"] - 1, "right", 1)
        if nowBoard[_0xy["y"] + 1][_0xy["x"] - 1] == 3:
            nextBoard[_0xy["y"] + 1][_0xy["x"] - 2] = 0
            nextBoard[_0xy["y"] + 1][_0xy["x"]] = 3
            return nextBoard, (_0xy["y"] + 1, _0xy["x"] - 1, "right", 1)
    if _0xy["x"] > 0 and direct == 6:
        if nowBoard[_0xy["y"]][_0xy["x"] - 1]  == 2 and nowBoard[_0xy["y"] + 1][_0xy["x"] - 1] == 2 and \
           (not (_0xy["y"] > 0 and _0xy["y"] < MAX_Y - 2 and nowBoard[_0xy["y"] + 2][_0xy["x"] - 1] == 2 and nowBoard[_0xy["y"] - 1][_0xy["x"] - 1] == 2)):
            nextBoard[_0xy["y"]][_0xy["x"] - 1] = 0
            nextBoard[_0xy["y"] + 1][_0xy["x"] - 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 2
            nextBoard[_0xy["y"] + 1][_0xy["x"]] = 2
            return nextBoard, (_0xy["y"], _0xy["x"] - 1, "right", 1)
        if nowBoard[_0xy["y"]][_0xy["x"] - 1]  == 4 and nowBoard[_0xy["y"] + 1][_0xy["x"] - 1] == 4:
            nextBoard[_0xy["y"]][_0xy["x"] - 2] = 0
            nextBoard[_0xy["y"] + 1][_0xy["x"] - 2] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 4
            nextBoard[_0xy["y"] + 1][_0xy["x"]] = 4
            return nextBoard, (_0xy["y"], _0xy["x"] - 1, "right", 1)
    if _0xy["x"] > 0 and direct == 7:
        if nowBoard[_0xy["y"]][_0xy["x"] - 1] == 1:
            nextBoard[_0xy["y"]][_0xy["x"] - 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 1
            return nextBoard, (_0xy["y"], _0xy["x"] - 1, "right", 1)
        if nowBoard[_0xy["y"]][_0xy["x"] - 1] == 3:
            nextBoard[_0xy["y"]][_0xy["x"] - 2] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 3
            return nextBoard, (_0xy["y"], _0xy["x"] - 1, "right", 1)
    return None

def calcNextBoard_when0neighbor_type_(nowBoard, _0xy, direct):
    nextBoard = copy.deepcopy(nowBoard)
    if _0xy["y"] > 0 and direct == 0:
        if nowBoard[_0xy["y"] - 1][_0xy["x"]] == 1:
            nextBoard[_0xy["y"] - 1][_0xy["x"]] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 1
            return nextBoard, (_0xy["y"] - 1, _0xy["x"], "down", 1)
        if nowBoard[_0xy["y"] - 1][_0xy["x"]] == 2:
            nextBoard[_0xy["y"] - 2][_0xy["x"]] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 2
            return nextBoard, (_0xy["y"] - 1, _0xy["x"], "down", 1)
    if _0xy["y"] > 0 and direct == 1:
        if nowBoard[_0xy["y"] - 1][_0xy["x"]]  == 3 and nowBoard[_0xy["y"] - 1][_0xy["x"] + 1] == 3:
            nextBoard[_0xy["y"] - 1][_0xy["x"]] = 0
            nextBoard[_0xy["y"] - 1][_0xy["x"] + 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 3
            nextBoard[_0xy["y"]][_0xy["x"] + 1] = 3
            return nextBoard, (_0xy["y"] - 1, _0xy["x"], "down", 1)
        if nowBoard[_0xy["y"] - 1][_0xy["x"]]  == 4 and nowBoard[_0xy["y"] - 1][_0xy["x"] + 1] == 4:
            nextBoard[_0xy["y"] - 2][_0xy["x"]] = 0
            nextBoard[_0xy["y"] - 2][_0xy["x"] + 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 4
            nextBoard[_0xy["y"]][_0xy["x"] + 1] = 4
            return nextBoard, (_0xy["y"] - 1, _0xy["x"], "down", 1)
    if _0xy["y"] > 0 and direct == 2:
        if nowBoard[_0xy["y"] - 1][_0xy["x"] + 1] == 1:
            nextBoard[_0xy["y"] - 1][_0xy["x"] + 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"] + 1] = 1      
            return nextBoard, (_0xy["y"] - 1, _0xy["x"] + 1, "down", 1)
        if nowBoard[_0xy["y"] - 1][_0xy["x"] + 1] == 2:
            nextBoard[_0xy["y"] - 2][_0xy["x"] + 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"] + 1] = 2
            return nextBoard, (_0xy["y"] - 1, _0xy["x"] + 1, "down", 1)
    if _0xy["x"] < MAX_X - 2 and direct == 3:
        if nowBoard[_0xy["y"]][_0xy["x"] + 2] == 1:
            nextBoard[_0xy["y"]][_0xy["x"] + 2] = 0
            nextBoard[_0xy["y"]][_0xy["x"] + 1] = 1
            return nextBoard, (_0xy["y"], _0xy["x"] + 2, "left", 1)
        if nowBoard[_0xy["y"]][_0xy["x"] + 2] == 3:
            nextBoard[_0xy["y"]][_0xy["x"] + 3] = 0
            nextBoard[_0xy["y"]][_0xy["x"] + 1] = 3
            return nextBoard, (_0xy["y"], _0xy["x"] + 2, "left", 1)
    if _0xy["y"] < MAX_Y - 1 and direct == 4:
        if nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] == 1:
            nextBoard[_0xy["y"] + 1][_0xy["x"] + 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"] + 1] = 1
            return nextBoard, (_0xy["y"] + 1, _0xy["x"] + 1, "up", 1)
        if nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] == 2:
            nextBoard[_0xy["y"] + 2][_0xy["x"] + 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"] + 1] = 2
            return nextBoard, (_0xy["y"] + 1, _0xy["x"] + 1, "up", 1)
    if _0xy["y"] < MAX_Y - 1 and direct == 5:
        if nowBoard[_0xy["y"] + 1][_0xy["x"]]  == 3 and nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] == 3:
            nextBoard[_0xy["y"] + 1][_0xy["x"]] = 0
            nextBoard[_0xy["y"] + 1][_0xy["x"] + 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 3
            nextBoard[_0xy["y"]][_0xy["x"] + 1] = 3
            return nextBoard, (_0xy["y"] + 1, _0xy["x"] + 1, "up", 1)
        if nowBoard[_0xy["y"] + 1][_0xy["x"]]  == 4 and nowBoard[_0xy["y"] + 1][_0xy["x"] + 1] == 4:
            nextBoard[_0xy["y"] + 2][_0xy["x"]] = 0
            nextBoard[_0xy["y"] + 2][_0xy["x"] + 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 4
            nextBoard[_0xy["y"]][_0xy["x"] + 1] = 4
            return nextBoard, (_0xy["y"] + 1, _0xy["x"] + 1, "up", 1)
    if _0xy["y"] < MAX_Y - 1 and direct == 6:
        if nowBoard[_0xy["y"] + 1][_0xy["x"]] == 1:
            nextBoard[_0xy["y"] + 1][_0xy["x"]] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 1
            return nextBoard, (_0xy["y"] + 1, _0xy["x"], "up", 1)
        if nowBoard[_0xy["y"] + 1][_0xy["x"]] == 2:
            nextBoard[_0xy["y"] + 2][_0xy["x"]] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 2
            return nextBoard, (_0xy["y"] + 1, _0xy["x"], "up", 1)
    if _0xy["x"]  > 0 and direct == 7:
        if nowBoard[_0xy["y"]][_0xy["x"] - 1] == 1:
            nextBoard[_0xy["y"]][_0xy["x"] - 1] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 1
            return nextBoard, (_0xy["y"], _0xy["x"] - 1, "right", 1)
        if nowBoard[_0xy["y"]][_0xy["x"] - 1] == 3:
            nextBoard[_0xy["y"]][_0xy["x"] - 2] = 0
            nextBoard[_0xy["y"]][_0xy["x"]] = 3
            return nextBoard, (_0xy["y"], _0xy["x"] - 1, "right", 1)
    return None

def calcNextBoard_when0neighbor(nowBoard, direct):
    x0, y0 = getFirst0(nowBoard)
    if x0 + 1 < 4  and nowBoard[y0][x0 + 1] == 0:
        return calcNextBoard_when0neighbor_type_(nowBoard, {"x" : x0, "y" : y0}, direct)
    if y0 + 1 < 5 and nowBoard[y0 + 1][x0] == 0:
        return calcNextBoard_when0neighbor_typeI(nowBoard, {"x" : x0, "y" : y0}, direct)
    return None


def two0AreNeighbor(nowBoard):
    x0, y0 = getFirst0(nowBoard)
    if x0 + 1 < 4  and nowBoard[y0][x0 + 1] == 0 :
        return True
    if y0 + 1 < 5 and nowBoard[y0 + 1][x0] == 0 :
        return True
    if y0 - 1 >= 0 and nowBoard[y0 - 1][x0] == 0 :
        return True
    if x0 - 1 >= 0 and nowBoard[y0][x0 - 1] == 0 :
        return True
    return False

def getFirst0(nowBoard):
    for y in range(MAX_Y):
        for x in range(MAX_X):
            if nowBoard[y][x] == 0:
                return x, y

def getSecond0(nowBoard):
    x0, y0 = getFirst0(nowBoard)
    for y in range(MAX_Y):
        for x in range(MAX_X):
            if nowBoard[y][x] == 0 and not (x == x0 and y == y0):
                return x, y

class dupBoardError(StandardError):
    pass

def findBoardInTree(board, r):
    if(r == None):
        return
    if r.board == board:
        raise dupBoardError()
    for child in r.children:
        findBoardInTree(board, child)

class BinaryTree:
    def __init__(self,rootObj,moveInfo):
        self.board = rootObj
        self.moveInfo = moveInfo
        self.parent = None
        self.children = [None] * MAX_CAN_MOVE_DIRECT
        self.direct = 0
    def calcNextBoard(self, nowBoard, direct):
        if two0AreNeighbor(nowBoard):
            return calcNextBoard_when0neighbor(nowBoard, direct)
        else:
            return calcNextBoard_when0notNeighbor(nowBoard, direct)

    def calcLeafs(self):
        leafsCnt = 0
        for d in range(MAX_CAN_MOVE_DIRECT):
            nextBoard, moveInfo = self.calcNextBoard(self.board, d)
            if nextBoard != None and not isInHash(nextBoard, allBoardHash):
                self.children[d] = BinaryTree(nextBoard, moveInfo)
                self.children[d].parent = self
                addToHash(nextBoard, allBoardHash)
                leafsCnt += 1
        if leafsCnt > 0:
            return True
        else:
            return False

    def getNextNode(self, afterD = -1):
        for d in range(MAX_CAN_MOVE_DIRECT):
            if self.children[d] != None and afterD < d:
                return self.children[d], d
        return None

    def setRootVal(self,obj):
        self.key = obj

    def getRootVal(self):
        return self.key

def winBoard(node):
    if isInHash(node.board, winBoardHash) or (node.board[MAX_Y - 1][1] == 4 and node.board[MAX_Y - 1][2] == 4):
        return True
    return False

def makeWinPathAndMove(node):
    global winPath
    global winMove
    temp = node
    while temp != None :
        winPath.insert(0, temp.board)
        winMove.insert(0, temp.MoveInfo)
        temp = temp.parent
    winPath = winPath + OnePath[OnePath.index(node.board) + 1:]
    winMove = winMove + OneMove[OnePath.index(node.board) + 1:]

def getHashKey(board):
    return tuple(board[2] + board[3])

def addToHash(board, hash):
    boardKey = getHashKey(board)
    if boardKey not in hash:
        hash[boardKey] = [board]
    else:
        hash[boardKey].append(board)

def isInHash(board, hash):
    boardKey = getHashKey(board)
    if boardKey in hash:
        return board in hash[boardKey]
    else:
        return False

winPath = []
winMove = []
OnePath = []
OneMove = []
#board = [[2,4,4,2],[2,4,4,2],[2,3,3,2],[2,1,1,2],[1,0,0,1]]
board = [[4,4,2,2],[4,4,2,2],[3,3,0,2],[2,1,0,2],[2,1,1,1]]
root = BinaryTree(board, None)
allBoardHash = {}
winBoardHash = {}
def main():
    global winBoardHash
    with open('w', 'rb') as f:
        winBoardHash = pickle.load(f)
    global OnePath
    with open('wp', 'rb') as f2:
        OnePath = json.load(f2)
    global root
    d = 0
    node = root
    while(True):
        if node.calcLeafs() == True:
            node, d = node.getNextNode()
        else:
            d = node.direct
            node = node.parent
            while (node.getNextNode(d) == None):
                d = node.direct
                node = node.parent
            node, d = node.getNextNode(d)
        node.direct = d
        if winBoard(node):
            makeWinPathAndMove(node)
            break

if __name__ == '__main__':
    print("no test run main!")
    main()

