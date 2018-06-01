// Music playAudio
// Noah Besse
// May the fourth be with you, 2018
let state, semiState;
let musicFile;
let testSong1, testSong2, testSong3;
let testSong1Thumbnail, testSong2Thumbnail, testSong3Thumbnail;
let backgroundMusic;
let ampSlider;
let volumeOfSong, volumeSliderMade, songPlaying;
let fft;
let spectrum;

function setup(){
  fft = new p5.FFT();
  semiState = 1;
  volumeSliderMade = false;
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
  testSong3 = loadSound("assets/oceanman.mp3");
  testSong3Thumbnail = loadImage("assets/hqdefault.jpg");
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
      state = 1;
    }
  }
  if (state === 1 /*Welcome Screen*/){
    background(0);
    fill(0, 255, 0);
    textAlign(CENTER);
    textFont("Agency FB");
    textSize(60);
    text("Welcome to Noah's Music playAudio",400,200);
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
    text("Ocean Man - Ween",525,400);
    image(testSong1Thumbnail,0,200,150,150);
    image(testSong2Thumbnail,250,200,150,150);
    image(testSong3Thumbnail,500,200,150,150);
    if (mouseY <= 350 && mouseY >= 200 && mouseIsPressed){
      if (mouseX >= 0 && mouseX <= 150){
        backgroundMusic.amp(0);
        state = 3/*Five Hours - Deorro*/;
      }
      if (mouseX >= 250 && mouseX <= 400){
        backgroundMusic.amp(0);
        state = 4/*Rick Roll*/;

      }
      if (mouseX >= 500 && mouseX <= 650){
        backgroundMusic.amp(0);
        state = 5/*OCEAN MAN, TAKE ME BY THE HAND, LEAD ME TO THE LAND*/;

      }
    }
  }
  if (state === 3/*Five Hours*/){
    playAudio(testSong1);
    volumeSlider();
    volumeSliderMade = true;
  }
  if (state === 4/*Never gonna give you up*/){
    playAudio(testSong2);
    volumeSlider();
    volumeSliderMade = true;
  }
  if (state === 5/*Never gonna give you up*/){
    playAudio(testSong3);
    volumeSlider();
    volumeSliderMade = true;
  }
}

function playAudio(song){
  song.amp(volumeOfSong);
  if (semiState === 1){
    background(0);
    textAlign(LEFT);
    textSize(20);
    fill(0, 255, 0);
    ellipse(200,600,50);
    fill(50);
    triangle(187.5,583.3,220,600,187.5,616.7);

  }
  if (semiState === 2){
    fill(0, 255, 0);
    ellipse(200,600,50);
    fill(50);
    rectMode(CENTER);
    rect(200,600,25,25);
    visualize(song);
  }
}

function visualize(song){

  spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length; i++){
    let amp = spectrum[i];
    let y = map(amp,0,256,height-400,0);
    stroke(0,255,0);
    line(i + 395,height-400,i+395,y);
    line(405 - i,height-400,405 - i,y);
  }
}

function mousePressed(){
  if (state === 3){
    if (mouseX >= 175 && mouseX <= 225 && mouseY >= 575 && mouseY <= 625){


      if (semiState === 2){
        semiState = 1;
        testSong1.pause();
        songPlaying = false;
        return false;
      }
      if (semiState === 1){
        semiState = 2;
        testSong1.play();
        songPlaying = true;
        return false;
      }
    }
  }
  if (state === 4){
    if (mouseX >= 175 && mouseX <= 225 && mouseY >= 575 && mouseY <= 625){


      if (semiState === 2){
        semiState = 1;
        testSong2.pause();
        songPlaying = false;
        return false;
      }
      if (semiState === 1){
        semiState = 2;
        testSong2.play();
        songPlaying = true;
        return false;
      }
    }
  }
  if (state === 5){
    if (mouseX >= 175 && mouseX <= 225 && mouseY >= 575 && mouseY <= 625){


      if (semiState === 2){
        semiState = 1;
        testSong3.pause();
        songPlaying = false;
        return false;
      }
      if (semiState === 1){
        semiState = 2;

        testSong3.play();
        songPlaying = true;
        return false;
      }
    }
  }
}

function volumeSlider(){
  if (volumeSliderMade === false){
    ampSlider = createSlider(0,1,0.3,0);
    ampSlider.position(700,600);
  }
  volumeOfSong = ampSlider.value();
}
