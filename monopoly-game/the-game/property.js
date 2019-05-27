// property class
class Property
{
  // constructor
  constructor(temp_x, temp_y, temp_name, temp_buyPrice, temp_board_position, temp_monopoly_number)
  {
    this.x = temp_x;
    this.y = temp_y;
    this.name = temp_name;
    this.boardPosition = temp_board_position;
    this.buyPrice = temp_buyPrice;
    this.rentPrice = this.buyPrice / 5;
    this.housePrice = this.buyPrice - (this.buyPrice / 4);
    this.houseRent = this.housePrice / 5;
    this.tradePrice = (this.houseRent * 2);
    this.monopolyNumber = temp_monopoly_number;  // the monopoly number of the property. If a player has all of the properties that make a monopoly he can start adding houses

    this.propertyWidth = 200;
    this.propertyHeight = 200;

    // this.propertyWidth = 1000 / 1.25 / 5; // width of the property
    // this.propertyHeight = 1000 / 1.25 / 5; // height of the property
    this.houseCounter = 1; // the number of houses that the property has. By default it's only one
    this.ownedByPlayer = 0; // by default, the property is not owned by any of the players
    // this.propertyColor = 100; // the color of the property
    this.propertyColor = [];

    // maximum number of houses that the user can add in one property
    this.maximumHouses = 4; // this excludes the already existing house that comes when buying the property --> this means that the total amount of houses in a property is 5

    this.ownedByBank = 0; // the bank's properties (properties that weren't bought)

  }

  show() // show the properties blocks
  {
      
    // to give the property the color of the player
    for (let i = 0; i < players.length; i++)
    {
      let player = players[i];
      if (this.ownedByPlayer === player.number) // if yhe player owns the property
      {
        // this.propertyColor = player.playerColor; // set the property color to be the same as the player color
        for(let j = 0; j < player.playerColor.levels.length; j++)
        {
          this.propertyColor[j] = player.playerColor.levels[j];
          this.propertyColor[3] = 100;
        }
      }
      if(state === 1 && this.ownedByPlayer === 0)
      {
        for(let j = 0; j < player.playerColor.levels.length; j++)
        {
          this.propertyColor[j] = 100;
        }
      } 

    }
    
    // palet the property with its corresponding color with a transparency of 50
    // fill(this.propertyColor);
    // fill(this.propertyColorR, this.propertyColorR, this.propertyColorR);
    fill(this.propertyColor[0], this.propertyColor[1], this.propertyColor[2], this.propertyColor[3]);
    rect(this.x, this.y, this.propertyWidth, this.propertyHeight);

    fill(0); // black
    // houses text
    let housesTextX = this.x + (this.propertyWidth / 2);
    let housesTextY = this.y + (this.propertyHeight / 2 + 75);
    text("Houses: " + this.houseCounter, housesTextX, housesTextY);
    // houses name text
    let housesNameX = this.x + 100;
    let housesNameY = this.y + 50;
    text(this.name, housesNameX, housesNameY);


    let cornerProperties = [0, 4, 8, 12]; // the corner properties

    if (this.ownedByPlayer == this.ownedByBank) // if the bank owns the property
    {
      // buy price text
      let buyTextX = this.x + 100;
      let buyTextY = this.y + 150;
      text("Buy: " + this.buyPrice + "€", buyTextX, buyTextY);
    } else if (this.boardPosition == cornerProperties[0] || this.boardPosition == cornerProperties[1] || this.boardPosition == cornerProperties[2] || this.boardPosition == cornerProperties[3])
    {
      // public property text
      let publicTextX = this.x + 100;
      let publicTextY = this.y + 150;
      text("Public", publicTextX, publicTextY);
    } else
    {
      // rent house text
      let rentTextX = this.x + 100;
      let rentTextY = this.y + 150;
      text("Rent: " + (this.houseRent * this.houseCounter) + "€", rentTextX, rentTextY);
    }
  }

  showPricePerHouse() // shows the price per house text
  {
    // price per house text
    let housePriceTextX = this.x + (this.propertyWidth / 2);
    let housePriceTextY = this.y + (this.propertyHeight / 2);
    text(this.housePrice + "€ / house", housePriceTextX, housePriceTextY);
  }

  rent(playerWhoPays)
  {
    let payAmount = (this.houseRent * this.houseCounter); // the amount of money that the player who landed on this property needs to pay to its rightful owner

    for (let i = 0; i < players.length; i++) // goes through all the players
    {
      let player = players[i];
      if (player.number == (this.ownedByPlayer)) // if the player's number is the same as the player's number who owns the property
      {
        if (playerWhoPays.money >= payAmount) // if the player has enough money
        {
          playerWhoPays.money -= payAmount; // the player who landed on the property pays the pay amount
          player.money += payAmount; // the player who owns the property gains the pay amount

          statusOfGame = (playerWhoPays.name + " has paid " + payAmount + "€ to " + player.name + " in " + this.name); // updates the status of the game
          // moneySpent += (property.houseRent * property.houseCounter);
          playerWhoPays.moneyPaid += payAmount; // the player's total pay amount is increased by this pay amount
          // console.log(name + "has spent a total of " + moneySpent + "€");
          // console.log(playerWhoPays.name + "has paid a total of " + playerWhoPays.moneyPaid + "€");
          player.moneyGained += payAmount; // the player who owns the property increases his money gained by the pay amount value
          // console.log(player.name + "has gained a total of " + player.moneyGained + "€");

          // play the coins sound
          coinsSound.play();
        } else // if the player doesn't have enough money to pay
        {
          statusOfGame = (playerWhoPays.name + " has gone bankrupt!!"); // update the status of the game
          playerWhoPays.money -= payAmount; // the player goes bankrupt (minus zero) by paying the price of the rent
          playerWhoPays.isBankrupt = true; // the player is now bankrupt
          changeTurn(); // it changes the player turn
        }
      }
    }

    /*
    money -= payAmount; // the player has to pay the house rent times the number of houses in that property
     playerWhoGetsPaid.money += payAmount;
     console.log(name + " has paid " + (payAmount) + "€ to " + playerWhoGetsPaid.name + " in " + property.name);
     statusOfGame = (name + " has paid " + (payAmount) + "€ to " + playerWhoGetsPaid.name + " in " + property.name);
     // moneySpent += (property.houseRent * property.houseCounter);
     moneyPaid += (payAmount);
     // console.log(name + "has spent a total of " + moneySpent + "€");
     console.log(name + "has paid a total of " + moneyPaid + "€");
     playerWhoGetsPaid.moneyGained += (payAmount);
     console.log(playerWhoGetsPaid.name + "has gained a total of " + playerWhoGetsPaid.moneyGained + "€");
     */
  }

  noLongerOwned() // if the property is no longer owned, the color of the property is set to grey
    {
      this.ownedByPlayer = this.ownedByBank; // the bank now owns the property
      this.propertyColor[0] = color(100); // the property color is set to grey
      this.propertyColor[1] = color(100);
      this.propertyColor[2] = color(100);
      this.propertyColor[3] = color(0);
    }
}
