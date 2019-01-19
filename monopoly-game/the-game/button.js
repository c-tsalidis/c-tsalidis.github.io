// button class
class Button
{
  // Constructor of the Button
  constructor(temp_x, temp_y, temp_buttonWidth, temp_buttonHeight, temp_text)
  {
    this.x = temp_x;
    this.y = temp_y;
    this.buttonWidth = temp_buttonWidth;
    this.buttonHeight = temp_buttonHeight;
    this.text = temp_text;
  	this.isPressed = false; // to check if the button is pressed or not
  }

  show() // show the button
  {
    fill(100); // give the button a grey color
    rect(this.x, this.y, this.buttonWidth, this.buttonHeight); // draw the button's rectangle
    fill(200); // palet the text of the button in an almost white color
    textAlign(CENTER); // align the text in the center
    // button text
    let textX = this.x + (this.buttonWidth / 2);
    let textY = this.y + (this.buttonHeight / 2); 
    text(this.text, textX, textY);
  }
}


