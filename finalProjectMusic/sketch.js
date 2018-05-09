// Music Visualizer
// Noah Besse
// May the fourth be with you, 2018
let state;
let musicFile;
let dropZone = rect(windowWidth/2,windowHeight/2,200,200);
stroke(2);

function setup(){
  state = "warning";
  createCanvas(windowWidth,windowHeight);
}

function draw(){
  background(0);
  stateScreens();
}

function stateScreens(){

  if (state === "warning"){
    background(0);
    fill(0,255,0);
    textSize(windowWidth/28);
    text("O N L Y  W O R K S  I N   F U L L S C R E E N ",windowWidth/10,windowHeight/2);
    text("C L I C K  T O  C O N T I N U E",windowWidth/4,windowHeight/1.5);
    if (mouseIsPressed){
      state = 1;
    }
  }
  if (state === 1 /*Welcome Screen*/){
    fill(0, 255, 0);
    textAlign(CENTER);
    textFont("Agency FB");
    textSize(windowWidth/25);
    text("Welcome to Noah's Music Visualizer",windowWidth/2,windowHeight/4);
    rectMode(CENTER);
    rect(windowWidth/2,windowHeight/2,windowWidth/8,windowHeight/16);
    textSize(windowWidth/35);
    fill(0);
    text("U P L O A D",windowWidth/2,windowHeight/1.9);
    fill(0,255,0);
    if (mouseX >= windowWidth/16+windowWidth/2 || mouseX <= windowWidth/16-windowWidth/2){
      state = 2;
    }
  }
  if (state === 2/*Upload Screen*/){
    dropZone.drop(gotFile);
  }
}

function gotFile(file){
  if (file.type === "wav" || file.type === "mp3"){
    musicFile = loadSound(file);
  }
  else{
    text("Thats not a wav file",windowWidth/2,windowHeight/2);
  }
}
