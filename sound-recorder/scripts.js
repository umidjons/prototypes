const Rec = {

  init() {
    this.state = false;
    this.playing = false;

    this.ui = {
      btnToggle: document.getElementById('btn-toggle'),
      btnPlay: document.getElementById('btn-play')
    };

    this.initRecorder();
  },

  toggle() {
    if (!this.state) {
      this.start();
    } else {
      this.stop();
    }
  },

  initRecorder() {
    this.mic = new p5.AudioIn();
    this.mic.start();

    this.recorder = new p5.SoundRecorder();
    this.recorder.setInput(this.mic);

    this.soundFile = new p5.SoundFile();
  },

  start() {
    this.soundFile = new p5.SoundFile();

    if (this.mic.enabled) {
      this.recorder.record(this.soundFile);
      this.state = true;
      this.ui.btnToggle.textContent = 'Stop';
    } else {
      console.log('Mic is not enabled.');
    }
  },

  stop() {
    this.recorder.stop();
    this.state = false;
    this.ui.btnToggle.textContent = 'Start';
  },

  play() {
    if (!this.playing) {
      this.soundFile.onended(() => {
        this.playing = false;
        this.ui.btnPlay.textContent = 'Play';
        console.log('Finished');
      });

      this.soundFile.play();
      this.playing = true;
      this.ui.btnPlay.textContent = 'Abort';
    } else {
      this.soundFile.stop();
    }
  }
};

Rec.init();
