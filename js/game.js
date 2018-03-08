var Game = function() {
  //DOM元素
  var gameDiv;
  var nextDiv;
  var timeDiv;
  var scoreDiv;
  //分数
  var score = 0;
  //游戏矩阵
  var nextData = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  var gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  //当前方块
  var cur;
  //下一个方块
  var next;
  //divs
  var nextDivs = [

  ];
  var gameDivs = [

  ];
  //初始化div
  var initDiv = function(container, data, divs) { //第一个参数 是游戏操作界面的dom元素  第二个参数 是要获取的矩阵数据的数组  第三个参数是初始化后的矩阵？？
    for (var i = 0; i < data.length; i++) {
      var Div = [];
      for (var j = 0; j < data[i].length; j++) {
        var newNode = document.createElement("div");
        newNode.className = "none";
        newNode.style.top = (i * 20) + "px";
        newNode.style.left = (j * 20) + "px";
        container.appendChild(newNode);
        Div.push(newNode);
      }
      divs.push(Div);
    }
  }
  //刷新Div
  var refreshDiv = function(data, divs) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].length; j++) {
        if (data[i][j] == 0) {
          divs[i][j].className = "none";
        } else if (data[i][j] == 1) {
          divs[i][j].className = "done";
        } else if (data[i][j] == 2) {
          divs[i][j].className = "current";
        }
      }
    }
  }
  //监测点是否合法
  var check = function(pos, x, y) {
    if (pos.x + x < 0) {
      return false;
    } else if (pos.x + x >= gameData.length) {
      return false;
    } else if (pos.y + y < 0) {
      return false;
    } else if (pos.y + y >= gameData[0].length) {
      return false;
    } else if (gameData[pos.x + x][pos.y + y] == 1) {
      return false;
    } else {
      return true;
    }
  }
  //监测数据是否合法
  var isValid = function(pos, data) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[0].length; j++) {
        if (data[i][j] != 0) {
          if (!check(pos, i, j)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  //清除数据
  var clearData = function() {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[i].length; j++) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = 0;
        }
      }
    }
  }
  //设置数据  将数据反映在界面中
  var setData = function() {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[i].length; j++) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j]
        }
      }
    }
  }
  //下移
  var down = function() {
    if (cur.canDown(isValid)) {
      clearData();
      cur.down()
      setData();
      refreshDiv(gameData, gameDivs);
      return true;
    } else {
      return false;
    }
  }
  //左移
  var left = function() {
    if (cur.canLeft(isValid)) {
      clearData();
      cur.left()
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }
  //右移
  var right = function() {
    if (cur.canRight(isValid)) {
      clearData();
      cur.right()
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }
  //旋转
  var rotate = function() {
    if (cur.canRotate(isValid)) {
      clearData();
      cur.rotate()
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }
  //方块移动到底部，固定住。
  var fixed = function() {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          if (gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
            gameData[cur.origin.x + i][cur.origin.y + j] = 1;
          }
        }
      }
    }
    refreshDiv(gameData, gameDivs)
  }
  //检查游戏结束
  var checkGameOver = function() {
    var gameOver = false;
    for (let i = 0; i < gameData[0].length; i++) {
      if (gameData[1][i] == 1) {
        gameOver = true;
      }
    }
    return gameOver;
  }
  //使用下一个方块
  var performNext = function(type, dir) {
    cur = next;
    setData();
    next = SquareFactory.prototype.make(type, dir);
    refreshDiv(gameData, gameDivs);
    refreshDiv(next.data, nextDivs);
  }
  //加分
  var addScore = function(line) {
    var s = 0;
    switch (line) {
      case 1:
        s = 10;
        break;
      case 2:
        s = 30;
        break;
      case 3:
        s = 60;
        break;
      case 4:
        s = 100;
        break;
      default:
        break;
    }
    score+=s;
    scoreDiv.innerText=score;
  }
  //消行
  var checkClear = function() {
    var line = 0;
    for (var i = gameData.length - 1; i >= 0; i--) {
      var clear = true;
      for (var j = 0; j < gameData[0].length; j++) {
        if (gameData[i][j] != 1) {
          clear = false;
        }
      }
      if (clear == true) {
        line++;
        for (var m = i; m >= 0; m--) {
          for (var n = 0; n < gameData[0].length; n++) {
            gameData[m][n] = gameData[m - 1][n]
          }
        }
          for (var n = 0; n < gameData[0].length; n++) {
            gameData[0][n] = 0
          }
        i++;
      }
    }
    return line;
  }
  //初始化
  var init = function(doms, types, dir) {
    gameDiv = doms.gameDiv;
    nextDiv = doms.nextDiv;
    timeDiv = doms.timeDiv;
    next = SquareFactory.prototype.make(types, dir);
    console.log(next.data)
    initDiv(gameDiv, gameData, gameDivs);
    initDiv(nextDiv, next.data, nextDivs);
    refreshDiv(next.data, nextDivs);
  }
  //设置时间
  var setTime = function(time) {
    timeDiv.innerText = time;
  }
  //导出appendChild
  this.init = init;
  this.down = down;
  this.left = left;
  this.right = right;
  this.rotate = rotate;
  this.fixed = fixed;
  this.performNext = performNext;
  this.checkClear = checkClear;
  this.checkGameOver = checkGameOver;
  this.setTime = setTime;
  this.addScore=addScore;
  this.fall = function() {
    while (down());
  }
}
