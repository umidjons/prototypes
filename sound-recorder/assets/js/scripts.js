const Rec = {

  init() {
    this.state = false;
    this.playing = false;
    this.files = [];

    this.ui = {
      btnToggle: document.getElementById('btn-toggle'),
      btnPlay: document.getElementById('btn-play'),
      audioList: document.getElementById('audio-list')
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
    this.soundFile.fileName = 'Audio-' + this.files.length + '.wav';

    if (this.mic.enabled) {
      this.recorder.record(this.soundFile);
      this.state = true;
      this.ui.btnToggle.innerHTML = '<i class="fa fa-fw fa-stop"></i> Stop';
    } else {
      console.log('Mic is not enabled.');
    }
  },

  stop() {
    this.recorder.stop();
    this.state = false;
    this.ui.btnToggle.innerHTML = '<i class="fa fa-fw fa-microphone"></i> Start';
    this.addFile();
  },

  play() {
    if (!this.playing) {
      this.soundFile.onended(() => {
        this.playing = false;
        this.ui.btnPlay.innerHTML = '<i class="fa fa-fw fa-play"></i> Play';
        console.log('Finished');
      });

      this.soundFile.play();
      this.playing = true;
      this.ui.btnPlay.innerHTML = '<i class="fa fa-fw fa-stop"></i> Stop';
    } else {
      this.soundFile.stop();
    }
  },

  addFile() {
    this.files.push(this.soundFile);

    let item = document.createElement('li');
    item.innerHTML = this.soundFile.fileName;
    this.ui.audioList.appendChild(item);
  }
};

Rec.init();
