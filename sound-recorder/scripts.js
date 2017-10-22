var mic, recorder, soundFile;

function setup() {
  // Connect to the mic
  mic = new p5.AudioIn();
  mic.start();

  // Create a sound recorder
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);

  // Initialize sound file
  soundFile = new p5.SoundFile();
}

function start() {
  if (mic.enabled) {
    recorder.record(soundFile);
    console.log('Recording');
  } else {
    console.log('Microphone is not enabled.');
  }
}

function stop() {
  recorder.stop();
  console.log('Stopped.');
}

function play() {
  soundFile.onended(() => {
    console.log('Finished.');
  });
  soundFile.play();
  console.log('Playing...');
}
