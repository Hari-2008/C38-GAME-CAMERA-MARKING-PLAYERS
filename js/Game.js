class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    //player1 => cars[0], player2 => cars[1]
    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    this.handleElements();

    Player.getPlayersInfo();

    //console.log(allPlayers)
    //allPlayers
    //player1:{name: "A", positionX: 540, positionY: 0}
    //player2:{name: "B", positionX: 740, positionY: 0}
    if (allPlayers !== undefined) { //if there are players in the database: if 2 players have logged in
      background("black");
      image(track, 0, -height * 5, width, height * 6);

      //index of the array
      var index = 0;

      //plr => player1, player2
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        //at the start of the game, the sprites in the cars array will hold the below values
        //cars[0].position.x = 540
        //cars[0].position.y = 0
        //cars[1].position.x = 740
        //cars[1].position.y = 0
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if(index===player.index){
          stroke(10)
          fill("red")
          ellipse(x,y,60,60);

           //Changing camera position in y direction
         camera.position.x = cars[index - 1].position.x
         camera.position.y = cars[index - 1].position.y
         
        }

        
      }

      this.handlePlayerControls();

      drawSprites();
    }
  }

  handlePlayerControls() {
    // handling keyboard events
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
  }
}
