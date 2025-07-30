document.addEventListener('DOMContentLoaded', function() {
  // Audio functionality
  const audio = document.getElementById('play-music');
  let audioStarted = false;

  // Start audio on first user interaction
  function enableAudio() {
    if (!audioStarted) {
      audio.play().then(() => {
        console.log("🎵 Birthday music is playing!");
        audioStarted = true;
      }).catch(e => {
        console.warn("Audio autoplay blocked:", e);
      });
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    }
  }

  document.addEventListener('click', enableAudio);
  document.addEventListener('touchstart', enableAudio);

  // Photo note interactions
  const photoNotes = document.querySelectorAll('.photo-note');
  let currentZIndex = 1000;

  photoNotes.forEach(photo => {
    // Store original z-index
    const originalZIndex = photo.style.zIndex || '5';
    
    photo.addEventListener('click', function() {
      this.style.zIndex = currentZIndex++;
      
      // Add a little celebration effect
      this.style.transform += ' scale(1.1)';
      setTimeout(() => {
        this.style.transform = this.style.transform.replace(' scale(1.1)', '');
      }, 2000);
    });
  });

  // Birthday card click effect
  const birthdayCard = document.querySelector('.birthday-card');
  birthdayCard.addEventListener('click', function() {
    // Add a gentle shake animation
    this.style.animation = 'none';
    setTimeout(() => {
      this.style.animation = 'cardShake 0.5s ease-in-out';
    }, 10);
    
    // Create some celebration particles
    createCelebrationParticles();
  });

  // Function to create celebration particles
  function createCelebrationParticles() {
    const particles = ['🎉', '✨', '🎊', '💖', '🌟'];
    const container = document.querySelector('.main-container');
    
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      particle.style.position = 'absolute';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.fontSize = (Math.random() * 20 + 20) + 'px';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      particle.style.animation = 'particleFade 2s ease-out forwards';
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 2000);
    }
  }

  // Add celebration animations to CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes cardShake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    @keyframes particleFade {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-100px) scale(0.5);
      }
    }
  `;
  document.head.appendChild(style);

  // Random photo shuffle animation
  function shufflePhotos() {
    photoNotes.forEach((photo, index) => {
      setTimeout(() => {
        // Store original transform and position
        const originalTransform = photo.style.transform || '';
        const originalPosition = photo.style.position || 'absolute';
        const originalZIndex = photo.style.zIndex || '5';
        
        // Animate to front with scale and position change
        photo.style.transform = originalTransform + ' scale(1.15)';
        photo.style.zIndex = '10000'; // High z-index to appear above birthday card
        photo.style.position = 'fixed'; // Ensure it breaks out of stacking context
        photo.style.transition = 'transform 0.3s ease-in-out';
        
        // Reset after animation
        setTimeout(() => {
          photo.style.transform = originalTransform;
          photo.style.zIndex = originalZIndex;
          photo.style.position = originalPosition;
        }, 800); // Longer duration to see the effect better
      }, index * 1200); // Delay between each image
    });
  }

  // Start shuffle animation after page loads
  setTimeout(shufflePhotos, 2000);

  // Repeat shuffle every 15 seconds
  setInterval(shufflePhotos, 15000);

  // Add some interactive messages
  const messages = [
    "Click on the photos to bring them forward! 📸",
    "Click the birthday card for a surprise! 🎁",
    "Happy Birthday Jessica! You're amazing! 💖",
    "Enjoy this special day filled with love! 🌟"
  ];

  let messageIndex = 0;
  function showInteractiveMessage() {
    // You could implement a toast notification system here
    console.log("💝 " + messages[messageIndex]);
    messageIndex = (messageIndex + 1) % messages.length;
  }

  // Show interactive messages every 10 seconds
  setInterval(showInteractiveMessage, 10000);
  
  // Show first message after 3 seconds
  setTimeout(showInteractiveMessage, 3000);

  console.log("🎂 Birthday website loaded successfully! Happy Birthday Jessica! 🎉");
});
