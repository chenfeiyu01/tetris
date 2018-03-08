var Local = function() {
  //时间间隔常量
  var INTERVAL = 200;
  //游戏对象
  var game;
  //定时器
  var timer = null;
  //时间计数器
  var timeCount=0;
  //时间
  var time=0;
  //绑定键盘事件
  var bindKeyEvent = function() {
    document.onkeydown = function(e) {
      if (e.keyCode == 38) { //up
        game.rotate()
      } else if (e.keyCode == 39) { //right
        game.right()
      } else if (e.keyCode == 40) { //down
        game.down()
      } else if (e.keyCode == 37) { //left
        game.left()
      } else if (e.keyCode == 32) { //space
        game.fall()
      }
    }
  }
  // 随时间移动
  var move = function() {
    timeFunc();
    if (!game.down()) {
      game.fixed()
      var line=game.checkClear();
      console.log("line的值为"+line)
      if (line){
        game.addScore(line);
      }
      let gameOver = game.checkGameOver();
      if (gameOver == true) {
        stop();
      } else {
        game.performNext(generateType(), 0)
      }
      // console.log ("随机的index为"+generateType())
    }
  }
  //计时函数
  var timeFunc=function(){
    var times=1000/INTERVAL;
    timeCount++;
    if (times==timeCount){
      timeCount=0;
      time++;
      game.setTime(time)
    }
  }
  //生成下一块方块
  var generateType = function() {
    return Math.ceil(Math.random() * 7) - 1
  }
  // 开始
  var start = function() {
    var doms = {
      gameDiv: document.getElementById("game"),
      nextDiv: document.getElementById("next"),
      timeDiv:document.getElementById("time"),
      scoreDiv:document.getElementById("score")
    }
    game = new Game();
    game.init(doms,generateType(),0);
    bindKeyEvent();
    game.performNext(generateType(),0)
    timer = setInterval(move, INTERVAL);
  }
  //结束
  var stop=function(){
    if (timer){
      clearInterval(timer);
      timer=null;
      document.onkeydown=null;
    }
  }
  //到处appendChild
  this.start = start;
}
