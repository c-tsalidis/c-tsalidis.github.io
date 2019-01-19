// player class
class Player
{

  // constructor
  constructor(temp_name, temp_number, temp_color_text, temp_infoPanelX, temp_infoPanelY, temp_position_in_properties_x, temp_position_in_properties_y)
  {
    this.name = temp_name; // name of the player
    this.number = temp_number; // number of the player
    if (temp_color_text === "red") // if the let is red
    {
      this.playerColor = color(255, 0, 0); // player color is red
			this.infoColor = color(255, 0, 0, 100);
    } else if (temp_color_text === "green") // if let is green
    {
      this.playerColor = color(50, 205, 50); // player color is green
			this.infoColor = color(50, 205, 50, 100);
    } else if (temp_color_text === "blue") // if let is blue
    {
      this.playerColor = color(0, 0, 255); // player color is blue
			this.infoColor = color(0, 0, 255, 100);
    } else if (temp_color_text === "yellow") // if let is yellow
    {
      this.playerColor = color(255, 215, 0); // player color is yellow
			this.infoColor = color(255, 215, 0, 100);
    }

    this.positionInPropertiesX = temp_position_in_properties_x;
    this.positionInPropertiesY = temp_position_in_properties_y;

	this.counter = 0; // the index number of the GO property block
	this.x = 0; // x coordinate of the player
	this.y = 0; // y coordinate of the player
	this.position = 0; // by default the players position is 0, which is the GO block position. Each property has a position, and the player heads over to that position depending on the number of the dice
	this.money = 1500; // the starting amount of money of the players
	this.moneyGained = 0; // total amount of money gained in the game
	this.moneySpent = 0; // total amount of money spent in the game
	this.revenue = 0; // total revenue of the player in the game
	this.moneyPaid = 0; // total amount of money paid to other players in the game
	this.tradePropertyPrice = 0; // the player's trading property price 
	this.tradePropertyName = 0; // the name of the property the player wants to trade for money
	this.propertyToTrade = new Property(); // property that the player wants to trade
	this.isBankrupt = false; // if the player is bankrupt he won't have any more turns

	this.isLoser = false; // to check if the player is a loser


	// info panel
    this.infoPanelX = temp_infoPanelX;
    this.infoPanelY = temp_infoPanelY;
	this.infoPanelWidth = 125;  // width of the info panel
	this.infoPanelHeight = 100;  // height of the info panel
	// Property [] propertiesOwned = new Property[10]; // the properties owned by the player. The total amount of properties is 16
	this.propertiesOwned = []; 
	this.propertiesOwned.length = totalAmountOfBlocks; // by default booleans are false
	this.propertiesOwnedNames = [];
	this.propertiesOwnedNames.length = totalAmountOfBlocks;

  }

  show(property) // shows the player in the screen
  {
    fill(this.playerColor); // palet the player with its corresponding color
    // player's avatar
    let avatarX = property.x + this.positionInPropertiesX;
    let avatarY = property.y + this.positionInPropertiesY;
    let avatarWidth = 20;
    let avatarHeight = 20;
    rect(avatarX, avatarY, avatarWidth, avatarHeight);
    // text(name, property.x + 100, property.y + 100);
    this.revenue = this.moneyGained - this.moneySpent; // revenue of the player is the same as total money gained - total money spent
    // text(name + ": " + money + "€" + "\nGained: " + moneyGained + "€" + "\nPaid: " + moneyPaid + "€", infoPanelX, infoPanelY);
    
    // the player's info panel
    fill(0);
    text(this.name + "" + "\n" + this.money + "€", this.infoPanelX, this.infoPanelY); // text that shows the player's money inside the player's info panel
    let infoPanelTransparency = 50; // transparency level of the info panel
    fill(this.infoColor); // palets the info panel of the player's color with a transparency level
    let infoPanelRectX = this.infoPanelX - (this.infoPanelWidth / 2);
    let infoPanelRectY = this.infoPanelY - (this.infoPanelHeight / 2);
    rect(infoPanelRectX, infoPanelRectY, this.infoPanelWidth, this.infoPanelHeight); // draws the info panel rectangle
    // strokeWeight(40);
    // line(infoPanelX, infoPanelY, infoPanelX, (infoPanelY - money));

    // money bars
    if (substate != tradeState) // if the substate of the game is not the trading substate
    {
      fill(this.infoColor);
      let moneyBarsX = this.infoPanelX;
      let moneyBarsY = this.infoPanelY - (this.infoPanelHeight / 2);
      let moneyBarsWidth = 20;
      let moneyBarsHeight = (-this.money / 10);
      rect(moneyBarsX, moneyBarsY, moneyBarsWidth, moneyBarsHeight); // draws the player's money bar on top of the payer's info panel
    }
    // money bar shown when the user is trading
    else if (substate == tradeState) // if the substate of the game is the trading substate
    {
      fill(this.infoColor);
      let tradeMoneyBarsX = this.infoPanelX;
      let tradeMoneyBarsY = this.infoPanelY - (this.infoPanelHeight / 2);
      let tradeMoneyBarsWidth = 20;
      let tradeMoneyBarsHeight = (-this.tradePropertyPrice / 10);
      rect(tradeMoneyBarsX, tradeMoneyBarsY, tradeMoneyBarsWidth, tradeMoneyBarsHeight); // draws the trading money bar on top of the player's info panel
    }
  }

  move() // moves the player to the correct place
  {
    // As the properties index are in order, the player's x and y are the same as the x and y coordinates of the property's position
    this.x = properties[this.position].x; // move the player to the property's x position
    this.y = properties[this.position].y; // move the player to the property's y position
    // console.log("Player " + turn + " is in "+ "property: " + properties[position].name);
    statusOfGame = this.name + " is in " + properties[this.position].name;
  }

  checkPosition() // updates and checks the position of the player depending on the dice number and its previous position
  {
    this.counter += dice; // adds the dice value to the player's counter
    this.position += this.counter; // the player's position is his last position plus the counter
    if (this.position >= totalAmountOfBlocks) // if the player's position is bigger than or the same as the total amount of blocks it means that the player has gone through the entire board
    {
      this.position = this.position - totalAmountOfBlocks; // so that it doesn't go to zero, but to the differnece between them
    }
    this.counter = 0; // reset the players' counter to zero
    // console.log("Counter: " + counter + "  |  Position: " + position);
  }

  buy(property) // the player buys the property he chose
  {
    this.money -= property.buyPrice; // the player's money is decreased by the property's buy price
    property.ownedByPlayer = this.number; // the property is assigned as owned by the player number
    // if the player has option to buy more properties, he will. That means that if the properties owned by player array is not still full, it has null

    // console.log(name + " has bought " + property.name + " for " + property.buyPrice + "€");
    statusOfGame = (this.name + " has bought " + property.name + " for " + property.buyPrice + "€"); // updates the status of the game
    this.moneySpent += property.buyPrice; // the total money spent by the player is increased by the value of the property's buy price
    // console.log(name + "has spent a total of " + moneySpent + "€");
    // fill(0, 0, 200, 50); // palet it blue with a transparency of 50
    // rect(infoPanelX, infoPanelY, 200, 50);

    coinsSound.play(); // play the coin sound
  }


  addHouse(property) // the player adds a house to the property he chooses
  {
    let count = 0; // to count the amount of properties of a same monopoly that the player owns. As the code is right now, the amount of houses needed of the same monopoly are two

    // check if the player has all of the properties that make the monopoly

    if (property.houseCounter <= property.maximumHouses) // if the property's house counter is smaller than the property's maximum amount of houses he can still add more houses to that property
    {
      for (let i = 0; i < properties.length; i++) // it goes through all the properties
      { 
        let p = properties[i];
        // console.log("Monopoly number: " + p.monopolyNumber);
          debugger;
        if (p.monopolyNumber === property.monopolyNumber && p.ownedByPlayer === this.number) // if the property's monopoly number is the same as the chosen property's number and the property is owned by the player 
        {
          console.log("Monopoly number: " + p.monopolyNumber);
          count++; // increase the monopoly counter
          console.log("Count: " + count);
          // if(count == 2) hasMonopoly = true;
        }
      }
      // if(count == amountOfPropertiesForMonopoly && hasMonopoly == true)
      if (count == amountOfPropertiesForMonopoly) // if the moonopoly counter is the same as the amount of properties needed to have a monopoly it means that this player has the chosen property's monopoly
      {
        console.log("As " + this.name + " has the monopoly it is possible to add a house in " + property.name);
        if (this.money >= property.housePrice) // if the player's money is bigger than or equal than the property's house price
        {
          this.money -= property.housePrice; // decrease the player's money by the value of the property's house price
          property.houseCounter += 1; // increase the amount of houses that the property has by one
          console.log(name + " has added a house in " + property.name);
          statusOfGame = (name + " has added a house in " + property.name); // update the status of the game
          coinsSound.play(); // play the coins shuffling sound
        } else // if the player doesn't have enough money to add houses
        {
          statusOfGame = (name + " doesn't have enough money to \n perform this operation"); // update the status of the game
        }
      }
    } else // if the player's house counter is bigger than the maximum amount of houses of a property
    {
      console.log(property.name + " already has the maximum house quantity");
      statusOfGame = (property.name + " already has the maximum house quantity"); // update the status of the game
    }
  }

  showProperties() // show the properties
  {
    // console.log(name + "'s properties:");
    for (let i = 0; i < this.propertiesOwned.length; i++)
    {
      if (this.propertiesOwnedNames[i] != null)
      {
        // console.log(propertiesOwned[i]);
        // console.log(propertiesOwnedNames[i]);

        // color owned properties
        // fill(playerColor, 200);
        // rect(properties[i].x, properties[i].y, properties[i].propertyWidth, properties[i].propertyHeight);
      }
    }
  }

  trade(property) // the player wants to trade the selected property
  {
    this.tradePropertyPrice += property.tradePrice; // increase the trade property price by the value of the property's trade price
    console.log(this.name + " wants to trade " + property.name + " for " + this.tradePropertyPrice + "€ from player " + property.ownedByPlayer);
    statusOfGame = (this.name + " wants to trade " + property.name + " for " + this.tradePropertyPrice + "€"); // update the status of the game
  }

  tradeAccepted() // if the trade has been accepted
  {
    if (this.propertyToTrade != null) // if the property to trade is not null
    {
      console.log(this.name + " has successfully traded " + this.propertyToTrade.name + " for " + this.tradePropertyPrice + "€ from " + this.propertyToTrade.ownedByPlayer);
      statusOfGame = (this.name + " has successfully traded " + this.propertyToTrade.name + " for " + this.tradePropertyPrice + "€\nfrom " + this.propertyToTrade.ownedByPlayer); // update the status of the game

      if (this.money >= this.tradePropertyPrice) // if the money of the player is bigger than or equal to the property trade price 
      {
        this.money -= this.tradePropertyPrice; // decrease the player's money by the value of the property's trade price
        for (let i = 0; i < players.length; i++) // it goes through all the properties
        {
          let player = players[i];
          if (player.number == this.propertyToTrade.ownedByPlayer) // if the player's number is owned by the same player that owns the property that is to be traded
          {
            player.money += this.tradePropertyPrice; // increase that player's money to the value of the player's property trade price
          }
        }
        this.propertyToTrade.ownedByPlayer = this.number; // the traded house is now owned by this player
        coinsSound.play(); // play the coins shuffling sound
      } else // if the player doesn't have enough money to trade
      {
        statusOfGame = (name + " doesn't have enough money to \n perform this operation"); // update the status of the game
      }
    } else // if the property is null (owned by the bank)
    {
      console.log("Cannot trade a not owned property");
      statusOfGame = ("Cannot trade a not owned property"); // update the status of the game
    }
  }

}

