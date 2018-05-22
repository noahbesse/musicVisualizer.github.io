// Music Visualizer
// Noah Besse
// May the fourth be with you, 2018
let state;
let musicFile;
let testSong1;
let testSong1Thumbnail, testSong2Thumbnail;
let backgroundMusic;
let testSong2;

function setup(){
  state = "warning";
  let canvas = createCanvas(800, 800);
  canvas.position(windowWidth/4, 0);
}
function preload(){
  testSong1 = loadSound("assets/testSong1.wav");
  testSong1Thumbnail = loadImage("assets/5hoursThumbnail.jpg");
  backgroundMusic = loadSound("assets/beginningbackgroundMusic.wav");
  testSong2 = loadSound("assets/nevergonnadoittoem.mp3");
  testSong2Thumbnail = loadImage("assets/fatherRick.png");
}
function draw(){
  background(0);
  stateScreens();
}

function stateScreens(){

  if (state === "warning"){
    background(0);
    textAlign(CENTER);
    fill(0,255,0);
    textSize(30);
    text("L O O K S  B E S T  I N   F U L L S C R E E N ",400,windowHeight/2);
    text("C L I C K  T O  C O N T I N U E",400,windowHeight/1.5);
    if (mouseIsPressed && state === "warning"){
      backgroundMusic.play();
      backgroundMusic.amp(1);
      backgroundMusic.loop();
      state = 1;
    }
  }
  if (state === 1 /*Welcome Screen*/){
    background(0);
    fill(0, 255, 0);
    textAlign(CENTER);
    textFont("Agency FB");
    textSize(60);
    text("Welcome to Noah's Music Visualizer",400,200);
    rectMode(CENTER);
    textSize(30);

    //text("UPLOAD",400,windowHeight/1.5);
    text("SONG SELECTION",400,500);
    if (mouseX <= 400+77.5 && mouseX >= 400-77.5 && mouseY <=487+12.5 && mouseY >= 487-12.5){
      if (mouseIsPressed){
        state = 2;
      }
    }
  }
  if (state === 2/*Preset Songs*/){
    background(0);
    textAlign(LEFT);
    textSize(20);
    text("Five Hours - Deorro",0,400);
    text("Never Gonna Give You Up - Rick Astley",200,400);
    image(testSong1Thumbnail,0,200,150,150);
    image(testSong2Thumbnail,250,200,150,150);
    if (mouseY <= 350 && mouseY >= 200 && mouseIsPressed){
      if (mouseX >= 0 && mouseX <= 150){
        state = 3.1/*Five Hours - Deorro*/;
      }
      if (mouseX >= 250 && mouseX <= 400){
        state = 3.2/*Rick Roll*/;
      }
    }
    if (state === 3.1/*Five Hours*/){
      background(0);
      textAlign(LEFT);
      textSize(20);
    }
    if (state === 3.2/*Never gonna give you up*/){
      background(0);
      textAlign(LEFT);
      textSize(20);
    }
  }
  // if (state === 3.1){
  //
  // }
}
function Visualizer(song){
  setInput(song);
  waveform(1024);
  let songAnalyze = analyze();
  for (let i = 0; i < songAnalyze.length; i++){

  }

}
