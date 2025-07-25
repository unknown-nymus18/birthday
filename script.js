document.addEventListener('DOMContentLoaded', function() {
  var notes = [
    document.querySelector('.note1'), // top-left
    document.querySelector('.note3'), // top-right
    document.querySelector('.note5'), // mid-left
    document.querySelector('.note6'), // mid-right
    document.querySelector('.note2'), // bottom-left
    document.querySelector('.note4'), // bottom-right
    document.querySelector('.note7'),
    document.querySelector('.note8')
  ];
  var birthdayRightSpace = document.querySelector('.birthday-right-space');
  var wish = document.getElementById('birthdayWish');
  var animating = false;
  var interval = null;
  var zBase = 10;

  // Polaroid shuffle animation: bring each note to front in turn, with smoother transitions and delay
  function startShuffle() {
    var idx = 0;
    var allItems = notes.concat([birthdayRightSpace]);
    interval = setInterval(function() {
      allItems.forEach(function(n, i) {
        if (!n) return;
        if (n.classList) n.classList.remove('bring-to-front');
        if (n.style) {
          n.style.transition = 'transform 0.7s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.6s, z-index 0s';
          n.style.zIndex = zBase + i;
          if (n.classList && !n.classList.contains('birthday-right-space')) {
            n.style.transform = n.style.transform.replace(/scale\([^)]+\)/, '').trim();
          }
        }
      });
      setTimeout(function() {
        var current = allItems[idx];
        if (!current) return;
        if (current === birthdayRightSpace) {
          current.classList.add('bring-to-front');
        } else {
          current.style.transition = 'transform 0.7s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.6s, z-index 0s';
          current.style.zIndex = zBase + 10;
          current.style.transform += ' scale(1.15)';
        }
      }, 120);
      idx = (idx + 1) % allItems.length;
    }, 3000);
  }

  function stopShuffle() {
    clearInterval(interval);
    notes.forEach(function(n, i) {
      if (!n) return;
      n.style.transition = 'transform 0.7s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.6s, z-index 0s';
      n.style.zIndex = '';
      n.style.transform = n.style.transform.replace(/scale\([^)]+\)/, '').trim();
    });
    if (birthdayRightSpace) {
      birthdayRightSpace.classList.remove('bring-to-front');
      birthdayRightSpace.style.zIndex = 5;
    }
  }

  // Start shuffle animation on load
  startShuffle();

  // Optionally, you can trigger the "move away" animation by clicking the birthday message
  var birthdayMessage = document.querySelector('.birthday-message');
  if (birthdayMessage) {
    birthdayMessage.style.cursor = 'pointer';
    birthdayMessage.addEventListener('click', function() {
      if (animating) return;
      animating = true;
      stopShuffle();
      setTimeout(function() {
        // Add staggered delays for each note's "away" animation
        notes.forEach(function(note, i) {
          if (!note) return;
          setTimeout(function() {
            note.classList.add('away' + (i + 1));
          }, i * 350); // 350ms delay between each note
        });
        // If you want to show a wish overlay, add it here
        // setTimeout(function() {
        //   wish.classList.add('visible');
        // }, 700);
      }, 5000);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('play-music');

  const enableAudio = () => {
    audio.play().then(() => {
      console.log("Audio is playing");
    }).catch(e => {
      console.warn("Autoplay blocked or audio failed:", e);
    });
    document.removeEventListener('click', enableAudio);
  };

  document.addEventListener('click', enableAudio);
});
