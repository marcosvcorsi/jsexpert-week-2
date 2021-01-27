class View {
  constructor() {

  }

  createVideoElement({ muted = true, src, srcObject }) {
    const video = document.createElement('video');

    video.muted = muted;
    video.src = src;
    video.srcObject = srcObject;

    if(src) {
      video.controls = true;
      video.loop = true;
      Util.sleep(200).then(() => video.play())
    }

    if(srcObject) {
      video.addEventListener("loadedmetadata", () => video.play())
    }

    return video;
  }

  renderVideo({ stream = null, url = null, userId, isCurrentId = false, muted = true }) {
    const video = this.createVideoElement({ src: url, muted, srcObject: stream })

    this.appendToHtmlTree(userId, video, isCurrentId);
  }

  appendToHtmlTree(userId, video, isCurrentId) {
    const div = document.createElement('div');

    div.id = userId;
    div.classList.add('wrapper');
    div.append(video);

    const div2 = document.createElement('div');
    div2.innerText = !isCurrentId ? userId : '';
    div.append(div2);

    const videoGrid = document.getElementById('video-grid');
    videoGrid.append(div);
  }

  setParticipants(count) {
    const myself = 1;

    const participants = document.getElementById('participants');

    participants.innerHTML = (count + myself);
  }
}