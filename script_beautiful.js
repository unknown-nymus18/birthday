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

  // Photo note interactions with mobile support
  const photoNotes = document.querySelectorAll('.photo-note');
  let currentZIndex = 1000;

  photoNotes.forEach(photo => {
    // Store original z-index
    const originalZIndex = photo.style.zIndex || '5';
    
    // Function to handle photo interaction
    function handlePhotoInteraction() {
      photo.style.zIndex = currentZIndex++;
      
      // Enhanced celebration effect with sparkles
      photo.style.transform += ' scale(1.15)';
      photo.classList.add('celebration-glow');
      
      // Create mini sparkles around the photo
      createMiniSparkles(photo);
      
      setTimeout(() => {
        photo.style.transform = photo.style.transform.replace(' scale(1.15)', '');
        photo.classList.remove('celebration-glow');
      }, 1500);
    }
    
    // Add both click and touch event listeners
    photo.addEventListener('click', handlePhotoInteraction);
    photo.addEventListener('touchend', function(e) {
      e.preventDefault(); // Prevent double-firing on mobile
      handlePhotoInteraction();
    });
  });

  // Enhanced folded birthday card with mobile support
  const birthdayCard = document.getElementById('birthdayCard');
  let isCardOpen = false;
  
  // Function to handle card toggle
  function handleCardToggle() {
    // Toggle card open/close state
    isCardOpen = !isCardOpen;
    
    if (isCardOpen) {
      // Open the card
      birthdayCard.classList.add('opened');
      
      // Create enhanced celebration particles
      setTimeout(() => {
        createEnhancedCelebrationParticles();
      }, 400); // Delay to sync with card opening animation
      
      console.log("🎂✨ Birthday card opened! Happy Birthday Jessica! 🎉💖");
    } else {
      // Close the card
      birthdayCard.classList.remove('opened');
      
      // Add subtle closing effect
      birthdayCard.style.animation = 'none';
      setTimeout(() => {
        birthdayCard.style.animation = 'gentleFloat 0.6s ease-in-out';
      }, 10);
      
      console.log("💝 Birthday card closed gently");
    }
    
    // Add temporary magical glow
    birthdayCard.classList.add('magical-glow');
    setTimeout(() => {
      birthdayCard.classList.remove('magical-glow');
    }, 1500);
  }
  
  // Card click functionality removed as requested
  
  // Add music playback functionality to card
  function playBirthdayMusic() {
    if (!audioStarted) {
      audio.play().then(() => {
        console.log("🎵 Birthday music started from card interaction!");
        audioStarted = true;
        
        // Add visual feedback for music start
        birthdayCard.classList.add('magical-glow');
        setTimeout(() => {
          birthdayCard.classList.remove('magical-glow');
        }, 2000);
        
      }).catch(e => {
        console.warn("Audio playback failed:", e);
      });
    } else {
      // Music is already playing, just add visual feedback
      birthdayCard.classList.add('magical-glow');
      setTimeout(() => {
        birthdayCard.classList.remove('magical-glow');
      }, 1000);
      console.log("🎵 Birthday music is already playing!");
    }
  }
  
  // Add click and touch event listeners for music playback
  birthdayCard.addEventListener('click', playBirthdayMusic);
  birthdayCard.addEventListener('touchend', function(e) {
    e.preventDefault(); // Prevent double-firing on mobile
    playBirthdayMusic();
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
        // Store original values and position
        const originalTransform = photo.style.transform || '';
        const rect = photo.getBoundingClientRect();
        
        // Add magical animation effect with enhanced z-index
        photo.classList.add('animating');
        photo.style.zIndex = '999999'; // Ensure it's above everything
        
        // Set fixed position to break out of parent stacking context
        photo.style.position = 'fixed';
        photo.style.top = rect.top + 'px';
        photo.style.left = rect.left + 'px';
        photo.style.width = rect.width + 'px';
        photo.style.height = rect.height + 'px';
        
        // Apply animation transform
        photo.style.transform = 'scale(1.3) translateZ(100px)';
        photo.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        photo.classList.add('magical-glow');
        
        // Add extra emphasis - move photo slightly towards center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const photoX = rect.left + rect.width / 2;
        const photoY = rect.top + rect.height / 2;
        
        // Calculate movement towards center (subtle)
        const moveX = (centerX - photoX) * 0.1;
        const moveY = (centerY - photoY) * 0.1;
        
        setTimeout(() => {
          photo.style.transform = `scale(1.3) translate(${moveX}px, ${moveY}px) translateZ(100px)`;
        }, 50);
        
        // Reset after animation with enhanced timing
        setTimeout(() => {
          photo.style.position = '';
          photo.style.top = '';
          photo.style.left = '';
          photo.style.width = '';
          photo.style.height = '';
          photo.style.transform = originalTransform;
          photo.style.zIndex = '';
          photo.classList.remove('animating');
          photo.classList.remove('magical-glow');
          photo.style.transition = '';
        }, 1200);
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
