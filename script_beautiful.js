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
      
      // Enhanced celebration effect with sparkles
      this.style.transform += ' scale(1.15)';
      this.classList.add('celebration-glow');
      
      // Create mini sparkles around the photo
      createMiniSparkles(this);
      
      setTimeout(() => {
        this.style.transform = this.style.transform.replace(' scale(1.15)', '');
        this.classList.remove('celebration-glow');
      }, 1500);
    });
  });

  // Enhanced folded birthday card click effect
  const birthdayCard = document.getElementById('birthdayCard');
  let isCardOpen = false;
  
  birthdayCard.addEventListener('click', function() {
    // Toggle card open/close state
    isCardOpen = !isCardOpen;
    
    if (isCardOpen) {
      // Open the card
      this.classList.add('opened');
      
      // Create enhanced celebration particles
      setTimeout(() => {
        createEnhancedCelebrationParticles();
      }, 400); // Delay to sync with card opening animation
      
      console.log("🎂✨ Birthday card opened! Happy Birthday Jessica! 🎉💖");
    } else {
      // Close the card
      this.classList.remove('opened');
      
      // Add subtle closing effect
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = 'gentleFloat 0.6s ease-in-out';
      }, 10);
      
      console.log("💝 Birthday card closed gently");
    }
    
    // Add temporary magical glow
    this.classList.add('magical-glow');
    setTimeout(() => {
      this.classList.remove('magical-glow');
    }, 1500);
  });

  // Function to create mini sparkles around photos
  function createMiniSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div');
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.style.position = 'fixed';
      sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
      sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
      sparkle.style.fontSize = (Math.random() * 15 + 10) + 'px';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '10000';
      sparkle.style.animation = 'miniSparkle 1.5s ease-out forwards';
      
      document.body.appendChild(sparkle);
      
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 1500);
    }
  }

  // Function to create enhanced celebration particles
  function createEnhancedCelebrationParticles() {
    const particles = ['🎉', '✨', '🎊', '💖', '🌟', '💫', '🎈', '🎂', '💕', '⭐'];
    const container = document.querySelector('.main-container');
    
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      particle.style.position = 'absolute';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.fontSize = (Math.random() * 25 + 15) + 'px';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      particle.style.animation = 'enhancedParticleFade 3s ease-out forwards';
      
      container.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 3000);
    }
  }

  // Add enhanced animations to CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes gentleFloat {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-8px) scale(1.02); }
    }
    
    @keyframes enhancedParticleFade {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1) rotate(0deg);
      }
      50% {
        opacity: 1;
        transform: translateY(-80px) scale(1.2) rotate(180deg);
      }
      100% {
        opacity: 0;
        transform: translateY(-150px) scale(0.3) rotate(360deg);
      }
    }
    
    @keyframes miniSparkle {
      0% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
      50% {
        opacity: 1;
        transform: scale(1.3) rotate(180deg);
      }
      100% {
        opacity: 0;
        transform: scale(0.5) rotate(360deg);
      }
    }
    
    .celebration-glow {
      box-shadow: 0 0 30px rgba(255, 107, 157, 0.6) !important;
      background: rgba(255, 255, 255, 0.4) !important;
    }
    
    .magical-glow {
      box-shadow: 0 0 50px rgba(102, 126, 234, 0.8) !important;
      background: rgba(255, 255, 255, 0.3) !important;
    }
  `;
  document.head.appendChild(style);

  // Enhanced photo shuffle animation
  function shufflePhotos() {
    photoNotes.forEach((photo, index) => {
      setTimeout(() => {
        // Store original values
        const originalTransform = photo.style.transform || '';
        
        // Add magical animation effect
        photo.classList.add('animating');
        photo.style.transform = originalTransform + ' scale(1.2)';
        photo.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        photo.classList.add('magical-glow');
        
        // Reset after animation with enhanced timing
        setTimeout(() => {
          photo.style.transform = originalTransform;
          photo.classList.remove('animating');
          photo.classList.remove('magical-glow');
          photo.style.transition = '';
        }, 1000);
      }, index * 1500); // Slightly longer delay for more dramatic effect
    });
  }

  // Start shuffle animation after page loads
  setTimeout(shufflePhotos, 3000);

  // Repeat shuffle every 20 seconds (longer interval)
  setInterval(shufflePhotos, 20000);

  // Enhanced interactive messages for folded card
  const messages = [
    "Tap the birthday card to open it! 🎂✨",
    "Click on the photos to see them sparkle! ✨📸", 
    "Open the card to reveal the special birthday message! 💝",
    "Happy Birthday Jessica! You're absolutely amazing! 💖🌟",
    "May your day be filled with magic and wonder! 🎂✨",
    "Celebrating the wonderful person you are! 🎉💫",
    "Tap the card again to close it gently! 💌"
  ];

  let messageIndex = 0;
  function showInteractiveMessage() {
    console.log("💝 " + messages[messageIndex]);
    messageIndex = (messageIndex + 1) % messages.length;
  }

  // Show interactive messages every 12 seconds
  setInterval(showInteractiveMessage, 12000);
  
  // Show first message after 4 seconds
  setTimeout(showInteractiveMessage, 4000);

  console.log("🎂✨ Beautiful Birthday website loaded successfully! Happy Birthday Jessica! 🎉💖");
});
