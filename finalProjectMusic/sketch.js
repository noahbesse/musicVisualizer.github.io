// Music Visualizer
// Noah Besse
// May the fourth be with you, 2018
let state;
let musicFile;
let testSong1;
let testSong1Thumbnail;
stroke(2);

function setup(){
  state = "warning";
  createCanvas(windowWidth,windowHeight);
}
function preload(){
  testSong1 = loadSound("assets/testSong1.wav");
  testSong1Thumbnail = loadSound("assets/5hoursThumbnail.jpg");
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
    let rectWidth = windowWidth/8;
    let rectLength = windowHeight/16;
    background(0);
    fill(0, 255, 0);
    textAlign(CENTER);
    textFont("Agency FB");
    textSize(windowWidth/25);
    text("Welcome to Noah's Music Visualizer",windowWidth/2,windowHeight/4);
    rectMode(CENTER);
    textSize(windowWidth/35);
    text("UPLOAD",windowWidth/2,windowHeight/1.5);
    text("USE PRESET SONGS",windowWidth/2,windowHeight/1.9);
    if (mouseX >= windowWidth/25 || mouseX <= windowWidth/25 ){
      if (mouseIsPressed){
        state = 2;
      }
    }
  }
  if (state === 2/*Preset Songs*/){
    background(0);

  }
}
