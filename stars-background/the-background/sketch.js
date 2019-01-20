
// stars

// made by Christian Tsalidis 
// References

// https://www.openprocessing.org/sketch/651847

// https://www.youtube.com/watch?v=17WoOqgXsRM

class Star
{
  constructor(temp_x, temp_y, temp_z)
  {
    this.x = temp_x;
    this.y = temp_y;
    this.z = temp_z;
    this.width = 5;
    this.height = 5;
    this.speed = 5;
  }

	show()
  {
    
    let sx = map(this.x / this.z, 0, 1, 0, width);
		let sy = map(this.y / this.z, 0, 1, 0, width);
    
    fill(255, 200);
    noStroke();
    ellipse(sx, sy, this.width, this.height);
  }
  
  update()
  {
    this.z+=this.speed;
    
    if(this.z > 2000)
    {
      this.z = random(width);
    }
  }
 
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}

let stars = [new Star()];
stars.length = 750;

/*
window.addEventListener('scroll', function()
{
  for(let i=0;i<stars.length;i++)
	{
    stars[i].speed+=0.01;
    console.log("scrolling");
  }
});
*/

let state = 0;
let starsBackgroundState = 0;
let plainBackground = 1;

function setup()
{
  var starsBackgroundCanvas = createCanvas(windowWidth, windowHeight);
  if(width > 700)
  {
  	state = starsBackgroundState;
	for(let i = 0; i < stars.length; i++)
	{
	let x = floor(random(-width, width));
	let y = floor(random(-height, height));
	let z = floor(random(0, width));
		stars[i] = new Star(x, y, z); 
	}
  }
  else
  {
  	state = starsBackgroundState;
  }
  // starsBackgroundCanvas.position(0,0);
  // starsBackgroundCanvas.position = "fixed";
  // starsBackgroundCanvas.style('z-index', '-1');


}

function draw()
{
	if (state === starsBackgroundState) 
	{
	  background(20, 75);
	  translate(width/2, height/2);
	  
	  
	  for(let i = 0; i < stars.length; i++)
	  {
	    let star = stars[i];
	    star.show();
	    star.update();
	  }
	}
	else
	{
		background(0);
	}

}