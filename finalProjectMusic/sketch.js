// Music Visualizer
// Noah Besse
// May the fourth be with you, 2018
let state;
let musicFile;
let dropZone = rect(windowWidth/2,windowHeight/2,200,200);

function setup(){
  state = 1;
  createCanvas(windowWidth,windowHeight);
}

function draw(){
  background(0);
  stateScreens();
}

function stateScreens(){
  if (state === 1 /*Welcome Screen*/){
    fill(0, 255, 0);
    textFont("Agency FB");
    textSize(windowWidth/25);
    text("Welcome to Noah's Music Visualizer",windowWidth/8,windowHeight/2-200);
    rect(windowWidth/10,windowHeight/2,50,25);
  }
  if (state === 2/*Upload Screen*/){
    dropZone.drop(gotFile);
  }
}

function gotFile(file){
  if (file.type === "wav" || file.type === "mp3"){
    musicFile = loadSound(file);
  }
}
