
// Developed by: Christian Tsalidis --> MED1 Medialogy student at Aalborg University, course year 2018-2019

// This is the IP programming course mini-project
// I will develop a Monopoly-like game
// Credits for the concept og the game: Hasbro --> https://monopoly.hasbro.com/

// as the Processing sound library didn't work for me using different methods, I tried out the Minim library, and it worked
// importing the processing sound library 
// import processing.sound.*;
// importing the minim library
// import ddf.minim.*;
// http://code.compartmental.net/tools/minim/quickstart/


// music and sound effects
// Minim minim; // i declare the minim variable of type Minim
// AudioPlayer song, coinsSound; // i declare the song and coins sound variables of type audioplayer

let song;
let coinsSound;

// the game's different scenes, such as the main menu and the game scene, are executed depending on the state of the game.
// Therefore, if the state is the same as the main menu's state, the main menu scene will be drawn
// whereas if the state is the buy state, the program will run the scene to buy properties
// Lastly, if the state is the play state, it will swith to the game scene (playState)
let state = 0; // the state of the game. By default it's zero
let mainMenuState = 0; // the main menu scene state. It's zero because the first thing that happens when the user starts the program is to be presented with the main menu scene
let buyState = 1; // the buy properties scene state
let playState = 2; // the game scene

// subsates are states that happen at the same time as other states.
// the houses substate runs at the same time as the playState to add houses to the player's owned properties
// the trade substate runs at the same time as the playState as well, to trade other player's properties in exchange for money
let substate = 0; // the substate of the game. By default it's zero
let housesState = 1; // the adding houses to the player's owned properties substate
let tradeState = 2; // the trading money for houses substate

// let waitingForAnswerState = 1;


// declaring the dice number
let dice = 0;

// declaring the number of properties needed to have a Monopoly (the different monopolies are specified afterwards in each property)
let amountOfPropertiesForMonopoly = 2;

// declaring the different properties of the game
let totalAmountOfBlocks = 16; // total number of property blocks
let properties = [new Property(totalAmountOfBlocks)]; // the properties

// the status of the game is used to inform the players about what's happening while they play
let statusOfGame = "Start buying properties"; // by default it's dispplaying to the players the message to start buying properties, becuase it what the players need to do after they have clicked on the "START" button


// turns
let turn = 1; // the 1st player starts first, so the first turn is his
let turns = [1, 2, 3, 4]; // an array of turns with the same dimension as the amount of players, specifying whose turn it is

// the players
let amountOfPlayers = 4; // amount of players
players = [new Player(amountOfPlayers)]; // declaring the players with the Player class and the amount of players


// the images of the game
let mainMenuImage; // main menu image
let boardImage; // board image

// the different buttons of the game
let buyButton = new Button(); // buy button to change the state to the buy scene state. Used to start buying and switch to the buy state. Shown in the main menu scene with the text: "START"
let playButton = new Button(); // play button to change the state of the game to the play game scene. shown in the buying properties scene. Used to start playing the game once the players have bought their properties
let diceButton = new Button(); // roll the dice button shown in the game scene
let tradeButton = new Button(); // trade button to change the substate of the game to the trading substate. It's a toggle button. If the player wants to trade, he clicks on it and starts trading, but if he wants to stop trading he clicks on it again. it's like an on/off switch
let increasePropertyTradePriceButton = new Button();
let decreasePropertyTradePriceButton = new Button(); // increase and decrease property trade price buttons. They are used to raise and decrease the amount of money that the player is willing to trade another player's property for
let acceptTradeButton = new Button(); // accept trade button. If both players agree on a trade, they click here to accept the trade
let addHousesButton = new Button(); // add hotels button to change the substate to add hotels state
propertiesButtons = [new Button(totalAmountOfBlocks)]; // the properties buttons. Each property has a button, used for different purposes depending on the state and substate of the game.
let nextTurnButton = new Button(); // next turn button shown, used to develop the game. Only used for development purposes

let mainCanvas;


function preload()
{
  song = loadSound('data/Midnight_Special.mp3');
  coinsSound = loadSound('data/Coins_Shuffling.wav');
  console.log("The songs don't load if they site is not published, therefore the rest of the game will not play");
}

/*
function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}
*/


function setup() // only runs once at the start of the program
{
  // mainCanvas = createCanvas(1000, 1000); // size of the program's window
  mainCanvas = createCanvas(1000, 1000);
  // mainCanvas.position(0, 0);
  // mainCanvas.style('z-index', '-1');



  // The music
  // minim = new Minim(this);
  // song = minim.loadFile("data/Midnight_Special.mp3");
  // coinsSound = minim.loadFile("data/Coins_Shuffling.wav");
  // song.loop(); // a loop is used so as to repeat the song from scratch once the song finishes playing. How it's used:  http://code.compartmental.net/minim-beta/javadoc/ddf/minim/AudioPlayer.html#loop()
  // trying it with the processing sound library
  // music = new SoundFile(this, "data/music.wav");
  // music.play();
  song.loop();
  coinsSound.play();

  // the different images used in the game
  // mainMenuImage = loadImage("data/main-menu-image.png"); // main menu image
  // boardImage = loadImage("data/board.jpg"); // the board image

  // the different buttons of the game
  buyButton = new Button(width / 2 - 100, height / 2 - 100, 200, 200, "START"); // buy properties button
  playButton = new Button(width / 2 - 100, 275, 200, 75, "PLAY"); // play button
  diceButton = new Button(600, 700, 200, 75, "ROLL THE DICE"); // roll the dice button
  nextTurnButton = new Button(width / 2 - 100, 300, 200, 100, "NEXT TURN"); // next turn button --> only used when developing the game
  addHousesButton = new Button(200, 700, 200, 75, "BUY HOUSES"); // add houses button
  // trade buttons
  tradeButton = new Button(width / 2 - 100, 700, 200, 75, "TRADE"); // trade button
  acceptTradeButton = new Button(width / 2 - 100, 375, 200, 75, "ACCEPT TRADE"); // accept trade button
  increasePropertyTradePriceButton = new Button(200, 700, 200, 75, "RAISE"); // increase property trade price
  decreasePropertyTradePriceButton = new Button(600, 700, 200, 75, "DECREASE"); // decrease property trade price

  // the properties
  // Property class has the following parameters: (x coordinate as let, y coordinate as let, name as let, price of the property as let, number of property as let, monopoly number as let)
  // the main properties
  properties[1] = new Property(600, 800, "BARCELONA", 20, 1, 1); // Property 1 (P1)
  properties[3] = new Property(200, 800, "MADRID", 50, 3, 1); // Property 2 (P2)
  properties[5] = new Property(0, 600, "AALBORG", 70, 5, 2); // Property 3 (P3)
  properties[7] = new Property(0, 200, "COPENHAGEN", 100, 7, 2); // Property 4 (P4)
  properties[9] = new Property(200, 0, "BERLIN", 125, 9, 3); // Property 5 (P5)
  properties[11] = new Property(600, 0, "FRANKFURT", 150, 11, 3); // Property 6 (P6)
  properties[13] = new Property(800, 200, "LYON", 175, 13, 4); // Property 7 (P7)
  properties[15] = new Property(800, 600, "PARIS", 200, 15, 4); // Property 8 (P8)

  // declaring and initializing the transport blocks
  properties[2] = new Property(400, 800, "TRANSPORT 1", 100, 2, 5); // t1
  properties[10] = new Property(400, 0, "TRASNPORT 2", 100, 10, 5); // t2

  // declaring and initializing the maletenance blocks
  properties[6] = new Property(0, 400, "WATER", 60, 6, 6); // q1
  properties[14] = new Property(800, 400, "ELECTRICITY", 60, 14, 6); // q2

  // declaring and initializing the other blocks
  properties[0] = new Property(800, 800, "PARK", 0, 0, 0); // GO
  properties[4] = new Property(0, 800, "MUSEUM", 0, 4, 0); // jail
  properties[8] = new Property(0, 0, "GYM", 0, 8, 0); // lottery
  properties[12] = new Property(800, 0, "LIBRARY", 0, 12, 0); // go to jail

  // the properties buttons
  for (let i = 0; i < totalAmountOfBlocks; i++) // it goes through all the properties
  {
    let p = properties[i];
    propertiesButtons[i] = new Button(p.x, p.y, p.propertyWidth, p.propertyHeight, ""); // creates a button for the property with the current value of i 
  }

  // the players
  let playersX = 300; // the player's x coordinate
  let playersY = 600; // the player's y coordinate
  // the Player class has the following parameters: (name of player text as let, player number as let, color of the player as let, x coordinate of the player's info panel, y coordinate of the player's info panel, player's x coordinate as let, player's y coordinate as let)
  players[0] = new Player("NIKOLAS", 1, "red", playersX, playersY, 50, 75); // player 1
  players[1] = new Player("CHRISTIAN", 2, "green", playersX + 125, playersY, 100, 75); // player 2
  players[2] = new Player("IRENE", 3, "blue", playersX + 250, playersY, 50, 100); // player 3
  players[3] = new Player("DIMITRI", 4, "yellow", playersX + 375, playersY, 100, 100); // player 4
	
	
	/*
	for(let i = 0; i < properties.length; i++)
	{
		let p = properties[i];
		for(let j = 0; j < players.length; j++)
		{
			if(p.isOwnedByPlayer == players[j].number)
			{
				p.propertyColor = players[j].playerColor;
			}
		}
	}
	*/
}



function draw()
{ 
  // console.log("X: " + mouseX + "  |  Y: " + mouseY); // used for developing. Comes in handy when placing things in the coordinates I want 
  background(220);
  fill(200); // sets the color to fill shapes -->   fill(gray) --> let number specifying the value between white and black. In this case, 200
  textSize(20); // sets the size of the text --> 20
  imageMode(CENTER); // sets the position of images to center mode --> sets second and third parameters of image to the image's center polet
  showScene(); // function to show the scene
}

function showScene()
{
  if (state == mainMenuState)
  {
    mainMenu(); // runs main menu scene
  } else if (state == buyState)
  {
    buyMenu(); // runs the buying properties scene
  } else if (state == playState)
  {
    play(); // runs the playing the game scene
  }
  if (substate == tradeState)
  {
    trade(); // runs the trading substate
  }
}

function checkTurn() // checks whose turn it is
{
  for (let i = 0; i < turns.length; i++) // goes through all the players
  {
    if (turn == turns[i]) // if the turn is the player's value of i turn, it checks the counter of the player
    {
      checkCounter(players[i]); // because the turns and players indexes are in the same order
      // console.log(players[i].name + "'s turn");
    }
  }
  // this is what's happening in every i value of the for loop:
  /*
  if(turn == turns[0]) // if it's the player 1's turn
   {
   checkCounter(players[0]); // checks the counter of player 1
   // players[0].move(); // check the position of player 1
   }
   else if(turn == turns[1])
   {
   checkCounter(players[1]);
   }
   [...]
   */
}


function checkCounter(player) // checks the counter of the player
{
  player.checkPosition(); // checks the position of the player
  player.move(); // moves the player depending on his position
  checkPropertyInfo(); // checks the info of the property
  // nextTurnButton.show(); // used for developing purposes
}

function changeTurn()
{ 
  if (turn == turns[0]) // if it's the 1st player's turn and he moved, it means he already finished, so now it's the 2nd player's turn
  {
    if (players[1].isBankrupt == false) // if the second player is not bankrupt it's his turn
    {
      turn = turns[1]; // changes the turn to the second player's turn
      // console.log(players[1].name + " 's turn");
      // text(players[1].name + " 's turn", width  / 2 - 200, 250);
    } else // if player 2 is bankrupt, it's the third player's turn
    {
      turn = turns[2]; // changes the turn to the third player
      // statusOfGame = (players[0].name + " has won the game!!");
      // turn = turns[2];
    }
  } else if (turn == turns[1]) // if it's the second player's turn
  {
    if (players[2].isBankrupt == false) // if player 2 is not bankrupt, the next turn is his
      // if(players[0].isBankrupt == false)
    {
      turn = turns[2]; // changes the turn to the third player
      // turn = turns[0]; // third player's turn
      // console.log(players[2].name + " 's turn");
    } else // if the player 3 is bankrupt, it's the fourth player's turn
    {
      // statusOfGame = (players[1].name + " has won the game!!");
      turn = turns[3]; // 4th player's turn
      // turn = turns[2];
    }
  } else if (turn == turns[2]) // if it's player 3's turn
  {
    if (players[3].isBankrupt == false) turn = turns[3]; // if player 4 is not bankrupt, it's his turn
    // console.log(players[3].name + " 's turn");
    else turn = turns[0]; // if player 4 is bankrupt, it's player 1's turn
  } else if (turn == turns[3]) // if it's player 4's turn
  {
    if (players[0].isBankrupt == false) turn = turns[0]; // if player 1 is not bankrupt, it's his turn
    // console.log(players[0].name + " 's turn");
    else turn = turns[1]; // if player 1 is bankrupt then it's player 2's turn
  }

  // checks if there is a winner
  let losers = 0; // amount of losers
  for (let i = 0; i < players.length; i++)
  {
    // Player winner = players[i];
    if (players[i].isLoser == true) // if the player is a loser
    {
      losers += 1; // increase the counter by 1
    }
    if (players[i].isLoser == false && losers == (amountOfPlayers - 1)) // if the player is not a loser and the amount of losers is the same as the amount of players minus one, it means that this player is the winner
    {
      console.log(players[i].name + " has won the game!! Congratulations!!"); // prlet out that this player is the winner
      statusOfGame = (players[i].name + " has won the game!! Congratulations!!"); // changes the status text showing who the winner is
    }
  }
}


function checkPropertyInfo() // checks who owns the property...
{
  // to see if the player has to pay rent when he lands on a property that's not his own
  for (let i = 0; i < turns.length; i++) // for every turn
  {
    let player = players[i]; // create a player refering to the player in the players array with an index of the current value of i
    if (turn == turns[i]) // as turns[] and players[] have the same length, this statement means that if the turn is of the current player's
    {
      for (let j = 0; j < properties.length; j++) // go through all of the properties
      {
        let property = properties[j]; // create a property of the properties array referring to the property of the properties array with an index value of i
        if (player.position == property.boardPosition) // if the player's position is the same as the property's board position
        {
          if (property.ownedByPlayer != player.number) // if the player who owns the property is not the same as the player who landed on the property
          {
            property.rent(player); // the player has to pay rent to the property's rightful owner
          }
        }
      }
    }
  }


  // if a property has the variable ownedByPlayer number the same as the player's number (player 1 || 2 || 3 || 4) 1, it means that it is owned by player 1
  // if we go through all the properties, if properties[i].ownedByPlayer == 1 --> player[0].owned[i] == true
  // and always set the non-property blocks ownedByPlayer to 0
  for (let i = 0; i < properties.length; i++)
  {
    let property = properties[i];
    for (let j = 0; j < players.length; j++)
    {
      let player = players[j];
      if (property.ownedByPlayer == player.number) // if the property is owned by the player
      {
        player.propertiesOwned[i] = true; // the player's boolean to check if the player owns the property is true
        player.propertiesOwnedNames[i] = property.name;
      if(player.isBankrupt == true)
      {
        property.noLongerOwned();    
      }
      }
    }
    /*
    // this is what happens inside the for loop with every value of j
     if(property.ownedByPlayer == players[0].number)
     {
     players[0].propertiesOwned[i] = true;
     players[0].propertiesOwnedNames[i] = property.name;
     }
     else if(property.ownedByPlayer == players[1].number)
     {
     players[1].propertiesOwned[i] = true;
     players[1].propertiesOwnedNames[i] = property.name;
     }
     [...]
     */
  }

  // show each player's owned properties
  for (let j = 0; j < players.length; j++)
  {
    players[j].showProperties();
  }
}


function mainMenu() // main menu scene
{
  // image(mainMenuImage, width / 2, height / 2, width, height); // shows the image of the main menu
  buyButton.show(); // shows the buy properties button to start the buying properties
}

function buyMenu() // buying properties menu
{
  // image(boardImage, width / 2, height / 2, width, height); // shows the image of the board
  playButton.show(); // shows the play button
  // nextTurnButton.show(); // only used for development purposes
  
  // show the players on the screen on their respective positions
  for (let i = 0; i < players.length; i++)
  {
    players[i].show(properties[players[i].position]);
  }

  // shows the properties
  for (let i=0; i < properties.length; i++)
  {
    properties[i].show();
  }

  showPlayerTurn(); // shows the player's turn on screen
  checkMoney(); // checks the amount of money of the players
  text(statusOfGame, width / 2, 250); // shows the statue of the game
}

function play() // play game state
{
  // image(boardImage, width / 2, height / 2, 1000, 1000); // shows the board's image
  diceButton.show(); // shows the roll the dice button on screen
  // nextTurnButton.show(); // used for development purposes
  addHousesButton.show(); // shows the add houses button
  tradeButton.show(); // shows the trade button

  // shows the properties
  for (let i=0; i < properties.length; i++)
  {
    // fill(100); // sets the color used to fill shapes to 100 --> gray color (difference between black and white)
    properties[i].show(); // shows the properties
  }
  // shows the players in their respective positions
  for (let i = 0; i < players.length; i++)
  {
    players[i].show(properties[players[i].position]);
  }

  showPlayerTurn(); // shows the player's turn on screen
  checkMoney(); // checks for the player's money

  if (substate == housesState) // if the substate is the same as the houses substate
  {
    for (let i = 0; i < properties.length; i++) // goes through all the properties
    {
      if (isInHitbox(propertiesButtons[i], playState) === true) // checks if the mouse is inside the properties hitboxes
      {
        properties[i].showPricePerHouse(); // shoes the price per house on screen
      	for(let j = 0; j < players.length; j++)
      	{
      		if(turn === turns[j])
      		{
      			console.log(players[j].name + " wants to buy houses in " + properties[i].name);
      			statusOfGame = players[j].name + " wants to buy houses in " + properties[i].name;
      		}
      	}
      }
    }
  }

  // show dice number in screen
  fill(0); // sets the color used to fill shapes to black
  text("Dice: " + dice, width / 2, 350); // shows the value of the dice on screen

  // show the status of the player: who has paid what to who?...
  text(statusOfGame, width / 2, 250);
 
}

function trade() // trade substate
{
  increasePropertyTradePriceButton.show(); // shows the button to increase the value of the property
  decreasePropertyTradePriceButton.show(); // shows the button to decrease the value of the property
  acceptTradeButton.show();

  fill(0); // sets the color used to fill shapes to black
  text(statusOfGame, width / 2, 250); // shows the status of the game on screen
}

function rollDice() // it rolls the dice --> gives a random number between 1 and 6
{
  dice = Math.floor(Math.random() * 7) + 1; // up to 7 because it's not included
  // console.log("player " + turn + ": " + dice);
  checkTurn(); // checks the player's turn
  changeTurn(); // changes the player's turn
}

function showPlayerTurn()
{
  // show the current player's turn
  for (let i = 0; i < turns.length; i++)
  {
    let player = players[i];
    if (turn == turns[i])
    {
      fill(0);
      text(player.name + "'s turn", width / 2, 225);
      // statusOfGame = (player.name + "'s turn");
    }
  }
}

function checkMoney() // check money to see if anyone is bankrupt
{
}


/*
  The mouseClicked() function is called after a mouse button has been pressed and then released. 

Mouse and keyboard events only work when a program has draw(). Without draw(), the code is only run once and then stops listening for events.
*/

function mouseClicked()
{
	/*
// to buy houses remake to fix bug
if(state === playState && substate === housesState)
{
	for(let i = 0; i < players.length; i++)
	{
		if(turn === turns[i])
		{
			let player = players[i];
			for(let j = 0; j < properties.length; j++)
			{
				let property = propertiesButtons[j];
				if(isInHitbox(property, playState) === true)
				{
					player.addHouse(property);
				}
			}
		}
	}
}
*/


  // if the mouse is clicked inside of the buttons hitboxes and the state of the game is the same as the 2nd parameter state
  // play button
  if (isInHitbox(playButton, buyState) && substate != tradeState) // if the mouse is clicked inside of the play button's hitbox and the game's state is the buyState and the substate is not the trade substate 
    // if (mouseX >= playButton.x && mouseX <= (playButton.x + playButton.buttonWidth) && mouseY >= playButton.y && mouseY <= (playButton.y + playButton.buttonHeight) && (state == mainMenuState || state == buyState))
  {
    playButton.isPressed = true;
    console.log("play button clicked");
    state = playState; // change the state of the game to the play state
  }
  // roll the dice button
  else
    if (isInHitbox(diceButton, playState) && substate != tradeState)
      // if (mouseX >= diceButton.x && mouseX <= (diceButton.x + diceButton.buttonWidth) && mouseY >= diceButton.y && mouseY <= (diceButton.y + diceButton.buttonHeight) && state == playState)
    {
      diceButton.isPressed = true;
      console.log("Roll the dice button clicked");
      rollDice(); // roll the dice function
    }
  // next turn button
    else
      if (isInHitbox(nextTurnButton, playState) && substate != tradeState)
        //if (mouseX >= nextTurnButton.x && mouseX <= (nextTurnButton.x + nextTurnButton.buttonWidth) && mouseY >= nextTurnButton.y && mouseY <= (nextTurnButton.y + nextTurnButton.buttonHeight) && state == playState)
      {
        nextTurnButton.isPressed = true;
        console.log("Next turn button pressed");
        console.log("--------------------------------------------------");
        changeTurn(); // change the turn of the player
      } 



  // trade substate
  for (let i = 0; i < turns.length; i++) // goes through all the turns
  {
    if (turn == turns[i]) // if the turn is the current player's turn
    {
      let player = players[i];
      // trade button
      if (isInHitbox(tradeButton, playState))
      {
        tradeButton.isPressed = true;
        console.log("Trade button pressed");
        if (substate != tradeState) // if the substate is not the trading substate
        {
          substate = tradeState; // change the substate to the trading substate
          console.log("Substate is now tradeState. --> " + substate);
        } else if (substate == tradeState) // if the substate is the trading substate
        {
          let defaultSubstate = 0;
          substate = defaultSubstate; // chage the substate to the default substate (which is zero)
          console.log("Substate is now default substate. --> " + substate);
          player.tradePropertyPrice = 0; // change the player's property trade price to zero
        }
      }
      if (isInHitbox(increasePropertyTradePriceButton, playState) && substate == tradeState)
      {
        increasePropertyTradePriceButton.isPressed = true;
        // console.log("Increase property trade price button pressed");
        let increasePropertyTradePriceValue = 100;
        console.log(player.name + " Increased " + player.tradePropertyName + " price by " + increasePropertyTradePriceValue + "€. Now the trade price is " + player.tradePropertyPrice + "€");
        player.tradePropertyPrice += (increasePropertyTradePriceValue);
        statusOfGame = (player.name + " wants to trade " + player.tradePropertyName + " for " + player.tradePropertyPrice + "€");
      }
      if (isInHitbox(decreasePropertyTradePriceButton, playState) && substate == tradeState)
      {
        decreasePropertyTradePriceButton.isPressed = true;
        // console.log("Decrease property trade price button pressed");
        let decreasePropertyTradePriceValue = 100;
        console.log(player.name + " Decreased " + player.tradePropertyName + " price by " + decreasePropertyTradePriceValue + "€. Now the trade price is " + player.tradePropertyPrice + "€");
        player.tradePropertyPrice -= (decreasePropertyTradePriceValue);
        statusOfGame = (player.name + " wants to trade " + player.tradePropertyName + " for " + player.tradePropertyPrice + "€");
      }
      if (isInHitbox(acceptTradeButton, playState) && substate == tradeState)
      {
        acceptTradeButton.isPressed = true;
        console.log("Accept trade button pressed");
        player.tradeAccepted(); // the players have accepted the trade
      }
    }
  }

  // buy properties button
  // else
  if (isInHitbox(buyButton, mainMenuState))
    // if (mouseX >= buyButton.x && mouseX <= (buyButton.x + buyButton.buttonWidth) && mouseY >= buyButton.y && mouseY <= (buyButton.y + buyButton.buttonHeight) && state == mainMenuState)
  {
    buyButton.isPressed = true;
    console.log("Buy button pressed");
    state = buyState; // change the state to the buy properties state
  }
  // add houses button
  else
    if (isInHitbox(addHousesButton, playState) && substate != tradeState)
      // if (mouseX >= addHousesButton.x && mouseX <= (addHousesButton.x + addHousesButton.buttonWidth) && mouseY >= addHousesButton.y && mouseY <= (addHousesButton.y + addHousesButton.buttonHeight) && (state == playState || state == buyState))
    {
      addHousesButton.isPressed = true;
      console.log("Buy button pressed");
      if (substate == housesState) // if the substate is the same as the adding houses substate
      {
        let defaultSubstate = 0;
        substate = defaultSubstate;
        console.log("substate is now " + substate);
      } else // if the substate is not the same as the addung houses substate
      {
        substate = housesState; // change the substate to the adding houses substate
        //  statusOfGame = players[j].name + " wants to buy houses";
      }
      console.log("substate is now houses state --> " + substate);
    }


  // properties buttons to buy them
  for (let i = 0; i < propertiesButtons.length; i++) // goes through all the properties buttons
    {
    let property = propertiesButtons[i];
    if (isInHitbox(property, 1) || isInHitbox(property, 2)) // if the mouse is clicked inside of the property's hitbox
      // if (mouseX >= propertiesButtons[i].x && mouseX <= (propertiesButtons[i].x + propertiesButtons[i].buttonWidth) && mouseY >= propertiesButtons[i].y && mouseY <= (propertiesButtons[i].y + propertiesButtons[i].buttonHeight))
    {
      // debugger;
      if (state == buyState) // if teh state of the game is the same as the buying properties state
      {
        propertiesButtons[i].isPressed = true;
        console.log(properties[i].name + " buy button pressed");

        for (let j = 0; j < turns.length; j++) // goes through all the turns
        {
          let ownedByBank = 0;
          if (turn == turns[j] && properties[i].ownedByPlayer == ownedByBank) // if it's the current player's turn and the property is owned by the bank
          {
            players[j].buy(properties[i]); // the player buys the property
            changeTurn(); // changes the turn of the player
          }
        }
      }
      // to add houses in the properties
      if ((state == playState || state == buyState) && substate == housesState)
      {
        for (let j = 0; j < players.length; j++) // goes through all the players
        {
          let player = players[j];
          if (turn == turns[j]) // if it's the current player's turn
          {
            if (player.money >= properties[i].housePrice && properties[i].ownedByPlayer == player.number) // if the player's money is higher than the property's house price and the property is owned by the player
            {
              player.addHouse(properties[i]); // the player wants to add a house in that property
            } else // if the player doesn't have enough money or if the property is not owned by the player
            {
              console.log(player.name + " does not have enough money to add a house in " + properties[i].name);
              statusOfGame = (player.name + " does not have enough money to add a house in " + properties[i].name); // update the status of the game
            }
          }
        }
      }
      // if the player is trading properties
      // and the player who wnats to trade pffers more money than the onw he wants to trade from
      if ((state === playState) && substate === tradeState)
      {
        for (let j = 0; j < players.length; j++) // goes through all the players
        {
          let player = players[j];
          let ownedByBank = 0;
          if (turn == turns[j] && properties[i].ownedByPlayer != ownedByBank) // if it's the current player's turn and the propert is not owned by the bank
          {
            // console.log(player.name + " wants to trade " + properties[i].name + " for " + player.tradePropertyPrice + "€ from player " + properties[i].ownedByPlayer);
            // player.tradePropertyPrice = (properties[i].tradePrice);
            player.propertyToTrade = properties[i]; // the player wants to trade this property
            player.tradePropertyName = properties[i].name; // the player's trade property name is this property's name
            player.trade(properties[i]); // the player wants to trade this property
          }
        }
      }
    }
   }
}



// CAUTION --> THERE IS NO FUNCTION OVERLOADING IN JS!!!!

/*
// the function isInHitbox has something called overloading. this means that depending on the parameters received when the function is called, it will run one of both
function isInHitbox(property) // if the mouse is inside of the property's hitbox
{

  if (mouseX >= property.x && mouseX <= (property.x + property.propertyWidth) && mouseY >= property.y && mouseY <= (property.y + property.propertyHeight))
  {
    return true; // the mouse is inside of the hitbox
  } else
    return false; // the mouse is not inside of the hitbox
}
*/

function isInHitbox(button, currentState) // if the mouse is inside of the button's hitbox and the game is in a specific state
{
  if (mouseX >= button.x && mouseX <= (button.x + button.buttonWidth) && mouseY >= button.y && mouseY <= (button.y + button.buttonHeight) && (state == currentState))
  {
    return true; // the mouse is inside of the hitbox
  } else
  {
  	
    return false; // the mouse is not inside of the hitbox
  }
}

