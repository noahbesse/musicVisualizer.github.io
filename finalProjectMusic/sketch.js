// Music playAudio
// Noah Besse
// May the fourth be with you, 2018
//thanks to tony for the upload scripts
let state, semiState;
let musicFile;
let testSong1, testSong2, testSong3;
let testSong1Thumbnail, testSong2Thumbnail, testSong3Thumbnail;
let backgroundMusic;
let ampSlider;
let volumeOfSong, volumeSliderMade, songPlaying, uploadedSong;
let fft;
let spectrum;
let canvas, canvasIsCreated;
let rValue, gValue, bValue;
let rSlider,gSlider, bSlider;
let waveformBandSpectrum;
let createdColorSliders;
let rainbowModeSelected;

function setup(){
  createdColorSliders = false;
  rValue = 0;
  gValue = 255;
  bValue = 0;
  canvasIsCreated = true;
  fft = new p5.FFT();
  semiState = 1;
  volumeSliderMade = false;
  state = 1;
  canvas = createCanvas(800, 800);
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
  colorSliders();
  background(0);
  stateScreens();
}
// function checkForRainbow(){
//   if (rainbowModeSelected === false){
//
//   }
// if (rainbowModeSelected){
//
// }
//}

function stateScreens(){
  if (state === 1 /*Welcome Screen*/){
    background(0);
    fill(rValue,gValue,bValue);
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
    text("UPLOAD",400,600);
    if (mouseX <= 400+77.5 && mouseX >= 400-77.5 && mouseY <=587+12.5 && mouseY >= 587-12.5){
      if (mouseIsPressed){
        state = 6;
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
  if (state === 5/*ocean man*/){
    playAudio(testSong3);
    volumeSlider();
    volumeSliderMade = true;
  }
  if (state === 6/*upload songs*/){
    canvas.drop(dropFile);
    textAlign(CENTER);
    fill(rValue,gValue,bValue);
    textSize(30);
    textFont("Agency FB");
    text("Drag in a file to upload",400,400);

  }
  if (state === 7 /*uploaded song visualizer*/) {
    playAudio(uploadedSong);
    volumeSlider();
    volumeSliderMade = true;
  }
}

function dropFile(file){
  if (file.type === "audio"){
    uploadedSong = loadSound(file.data);
    state = 7;
  }
  else{
    print("That is not an audio file!");
  }
}

function playAudio(song){
  song.amp(volumeOfSong);
  rValue = rSlider.value();
  gValue = gSlider.value();
  bValue = bSlider.value();
  fill(rValue,gValue,bValue);
  strokeWeight(10);
  line(0,500,song.currentTime(),500);
  strokeWeight(1);

  if (semiState === 1){
    background(0);
    textAlign(LEFT);
    textSize(20);
    fill(255,0,0);
    /*red square*/rect(150,710,10,10);
    fill(0,255,0);
    /*green square*/rect(150,735,10,10);
    fill(0,0,255);
    /*blue square*/rect(150,760,10,10);
    fill(200);
    ellipse(200,600,50);
    fill(50);
    triangle(187.5,583.3,220,600,187.5,616.7);

  }
  if (semiState === 2){
    fill(255,0,0);
    /*red square*/rect(150,710,10,10);
    fill(0,255,0);
    /*green square*/rect(150,735,10,10);
    fill(0,0,255);
    /*blue square*/rect(150,760,10,10);
    fill(200);
    ellipse(200,600,50);
    fill(50);
    rectMode(CENTER);
    rect(200,600,25,25);
    visualize(song);

  }
}

function visualize(song){
  spectrum = fft.analyze(4096);
  for (let i = 0; i < spectrum.length; i++){
    let amp = spectrum[i];
    let y = map(amp,0,256,height-400,0);
    stroke(rValue,gValue,bValue);
    line(i + 397,height-400,i+397,y);
    line(403 - i,height-400,403 - i,y);
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
  if (state === 7){
    if (mouseX >= 175 && mouseX <= 225 && mouseY >= 575 && mouseY <= 625){


      if (semiState === 2){
        semiState = 1;
        uploadedSong.pause();
        songPlaying = false;
        return false;
      }
      if (semiState === 1){
        semiState = 2;

        uploadedSong.play();
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

function colorSliders(){
  if (createdColorSliders === false){
    rSlider = createSlider(0,255,0,0);
    rSlider.position(400,700);

    gSlider = createSlider(0,255,255,0);
    gSlider.position(400,725);


    bSlider = createSlider(0,255,0,0);
    bSlider.position(400,750);

    createdColorSliders = true;
  }

}
