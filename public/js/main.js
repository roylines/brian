var ids = {
  default: 'ab0TSkLe-E0',
  action: 'WUFxARB880E'
};

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    ratio: 16 / 9,
    height: $(window).height(),
    width: $(window).width(),
    mute: true,
    repeat: true,
    videoId: ids.default,
    playerVars: {
      controls: 0,
      showinfo: 0,
      autohide: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  player.mute();
  player.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data === 0) {
    player.mute();
    player.loadVideoById(ids.default, 0, 'highres');
  }
}

$().ready(function() {
  var socket = io();

  socket.on('abc', function(data) {
    player.loadVideoById(ids.action, 0, 'highres');
    player.unMute();
  });

  /*
  function setSrc(id) {
    $('#brianplayer')[0].src = 'https://youtube.com/embed/' + id + '?autoplay=1&controls=0&showinfo=0&autohide=1&enablejsapi=1';
  }

  setSrc(ids.default);

  var socket = io();

  socket.on('abc', function(data) {
    setSrc(ids.action);
  });
  */
});
