const Rec = {

  init() {
    this.state = false;
    this.files = [];

    this.ui = {
      btnToggle: document.getElementById('btn-toggle'),
      btnUpload: document.getElementById('btn-upload'),
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
      this.ui.btnToggle.innerHTML = this.icon('microphone-slash', 'Stop');
    } else {
      console.log('Mic is not enabled.');
    }
  },

  stop() {
    this.recorder.stop();
    this.state = false;
    this.ui.btnToggle.innerHTML = this.icon('microphone', 'Start');
    this.addFile();
  },

  upload() {
    // TODO: implement uploading
  },

  addFile() {
    this.files.push(this.soundFile);

    let play = (fileName, btn) => {
      return () => {
        // find soundFile by fileName
        let soundFiles = this.files.filter(soundFile => soundFile.fileName === fileName);
        let soundFile = soundFiles[0];

        if (!soundFile.playing) {
          soundFile.onended(() => {
            btn.innerHTML = this.icon('play');
          });

          btn.innerHTML = this.icon('stop');
          soundFile.play();
          soundFile.playing = true;
        } else {
          soundFile.stop();
          soundFile.playing = false;
        }
      };
    };

    let remove = (fileName) => {
      return () => {
        if (confirm(`Do you want to delete ${fileName}?`)) {
          // remove soundFile from files array
          for (let idx=0; idx < this.files.length; idx++) {
            if (this.files[idx].fileName === fileName) {
              this.files.splice(idx, 1);
              break;
            }
          }

          // remove appropriate list item
          document.querySelector(`#audio-list>li[data-file-name="${fileName}"]`).remove();
        }
      };
    };

    let btnPlay = document.createElement('button');
    btnPlay.className = 'btn-li btn-play';
    btnPlay.innerHTML = this.icon('play');
    btnPlay.addEventListener('click', play(this.soundFile.fileName, btnPlay));

    let btnRemove = document.createElement('button');
    btnRemove.className = 'btn-li btn-remove';
    btnRemove.innerHTML = this.icon('times');
    btnRemove.addEventListener('click', remove(this.soundFile.fileName));

    let text = document.createTextNode(` ${this.soundFile.fileName}`);

    let item = document.createElement('li');
    item.appendChild(btnPlay);
    item.appendChild(btnRemove);
    item.appendChild(text);
    item.dataset.fileName = this.soundFile.fileName;
    
    this.ui.audioList.appendChild(item);
  },

  icon(name, title) {
    let icon = `<i class="fa fa-fw fa-${name}"></i>`;
    if (title) {
      icon += ` ${title}`;
    }
    return icon;
  }
};

Rec.init();
