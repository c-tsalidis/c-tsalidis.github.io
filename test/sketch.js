var linkPosY = 0;
var stars = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	textAlign(CENTER);
	imageMode(CENTER);
	
	linkPosY = height / 2 + 80;
	
	for (let i = 0; i < 100; i++) {
		stars.push({
			x: random(width),
			y: random(0, height / 4),
			rad: random(4),
			opacity: random(50, 255)
		});
	}
}

function draw() {
	colorMode(RGB, 255);
	background(5, 20, 65);
	
	for (let i = 0; i < stars.length; i++) {
		strokeWeight(stars[i].rad);
		stroke(255, stars[i].opacity);
		point(stars[i].x, stars[i].y);
	}
	
	// image(logoImg, width / 2, 100);
	
	colorMode(HSB, 360);
	noStroke();
	
	let waveCount = 10;
	
	for (let i = 0; i < waveCount; i++) {
		wave(
			map(i, 0, waveCount, 220, 250), 
			map(i, 0, waveCount, 200, 100),
			height / 2 + pow(i, 2.5),
			map(i, 0, waveCount, 0.1, 0.75), 
			map(i, 0, waveCount, 4, 15)
		);
	}
	
	colorMode(RGB, 255);
	
	fill(255);
	textSize(30);
	text("NFTs now available at", width / 2, height / 2);
	
	textSize(15);
	text("(come get some!)", width / 2, height / 2 + 130);
	
	textSize(80);
	
	if (isOverLink()) {
		fill(255, 255, 0);
	}
	text("OpenSea", width / 2, linkPosY);
}

function mouseClicked() {
	if (isOverLink()) {
		// window.open("https://opensea.io/theRussetPotato");
	}
}

function isOverLink() {
	return (
		mouseX > width / 2 - 170 && 
		mouseX < width / 2 + 170 && 
		mouseY > linkPosY - 65 && 
		mouseY < linkPosY + 30
	);
}

function wave(waveHue, waveBrightness, waveHeight, speed, amp) {
	fill(waveHue, 255, waveBrightness);
	
	let count = 25;
	
	beginShape();
	
	vertex(0, waveHeight / 2);
	vertex(0, waveHeight / 2);
	
	for (let x = 0; x < width; x+=width / count) {
		let y = waveHeight / 2 + sin(frameCount * 0.02 - x * speed) * amp;
		curveVertex(x, y);
	}
	
	vertex(width, waveHeight / 2);
	vertex(width, waveHeight / 2);
	vertex(width, height);
	vertex(0, height);
	vertex(0, waveHeight / 2);
	
	endShape();
}