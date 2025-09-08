// Truly endless horizontal scroll animation with perfect centering
window.addEventListener('DOMContentLoaded', function() {
  const beltContainer = document.querySelector('.belt-container');
  const belt = document.querySelector('.horizontal-belt');
  const items = Array.from(document.querySelectorAll('.belt-item'));
  const mobileCenterView = document.querySelector('.mobile-center-view');
  // Mobile data: images and card
  const mobileData = [
    { type: 'img', src: 'assets/img1.JPG', alt: 'Memory 1', text: 'SO CUTE 🫢🫢' },
    { type: 'img', src: 'assets/img2.JPG', alt: 'Memory 2', text: 'How can someone be so cute ❤️' },
    { type: 'img', src: 'assets/img5.JPG', alt: 'Memory 5', text: 'One more memory just for you! 🌟' },
    { type: 'img', src: 'assets/img8.JPG', alt: 'Memory 8', text: 'My fav picture 🫢🫢' },
    { type: 'img', src: 'assets/img3.JPG', alt: 'Memory 3', text: 'Drag the papers 🤭' },
    { type: 'img', src: 'assets/img4.JPG', alt: 'Memory 4', text: 'Happy Birthday 💐🎉' },
    { type: 'img', src: 'assets/img6.JPG', alt: 'Memory 6', text: 'Another special moment! ✨' },
    { type: 'img', src: 'assets/img7.JPG', alt: 'Memory 7', text: 'Enjoy your day 💕' },
    { type: 'card' }
  ];
  function renderMobileView(idx) {
    mobileCenterView.innerHTML = '';
    const data = mobileData[idx];
    if (data.type === 'img') {
      const img = document.createElement('img');
      img.src = data.src;
      img.alt = data.alt;
      const p = document.createElement('p');
      p.textContent = data.text;
      p.style.textAlign = 'center';
      mobileCenterView.appendChild(img);
      mobileCenterView.appendChild(p);
    } else if (data.type === 'card') {
      const card = document.createElement('div');
      card.className = 'mobile-card';
      card.innerHTML = `
        <div class="card-header">
          <h1>🎂 Happy Birthday Jessica! 🎂</h1>
        </div>
        <div class="card-content">
          <p class="main-message">
            Wishing you a magical birthday filled with love, laughter, and your favorite moments.
          </p>
          <p class="special-message">
            You are truly special and deserve all the happiness in the world. 💕
          </p>
          <div class="signature">
            With all my love,<br>
            <strong>Felix</strong>
          </div>
        </div>
      `;
      mobileCenterView.appendChild(card);
    }
  }
  
  let mobileTransitionInterval; // Track the interval
  let isTransitioning = false; // Prevent multiple simultaneous transitions
  
  function handleMobileTransition() {
    // Prevent multiple simultaneous calls
    if (isTransitioning) {
      return;
    }
    
    isTransitioning = true;
    
    // Clear any existing interval first
    if (mobileTransitionInterval) {
      clearInterval(mobileTransitionInterval);
    }
    
    let idx = 0;
    renderMobileView(idx);
    mobileTransitionInterval = setInterval(() => {
      idx = (idx + 1) % mobileData.length;
      renderMobileView(idx);
    }, 2500);
    
    // Reset the flag after a brief delay
    setTimeout(() => {
      isTransitioning = false;
    }, 100);
  }
  
  function stopMobileTransition() {
    if (mobileTransitionInterval) {
      clearInterval(mobileTransitionInterval);
      mobileTransitionInterval = null;
    }
    isTransitioning = false;
  }
  function isMobile() {
    return window.innerWidth <= 480;
  }
  
  let currentIndex = 0;
  let actualPosition = 0; // Track actual position for endless scrolling
  let isAnimating = false;
  let itemWidth, containerWidth, offset;
  
  // Initialize confetti
  createConfetti();
  
  // Auto-play music on any user interaction
  const audio = document.getElementById('play-music');
  let musicStarted = false;
  
  if (audio) {
    audio.volume = 0.3;
    
    // Function to start music
    function startMusic() {
      if (!musicStarted) {
        audio.play().then(() => {
          musicStarted = true;
          console.log('🎵 Music started playing!');
          showMusicNotification();
        }).catch(error => {
          console.log('Music play failed:', error);
        });
      }
    }
    
    // Function to show music notification
    function showMusicNotification() {
      const notification = document.createElement('div');
      notification.innerHTML = '🎵 Music Started! 🎵';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,192,203,0.8));
        color: #d63384;
        padding: 12px 20px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 1000;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255,192,203,0.5);
        box-shadow: 0 4px 15px rgba(255,192,203,0.3);
        animation: slideInFade 3s ease-out forwards;
        font-size: 14px;
        text-align: center;
      `;
      
      document.body.appendChild(notification);
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.style.animation = 'fadeOut 0.5s ease-out forwards';
          setTimeout(() => {
            notification.remove();
          }, 500);
        }
      }, 2500);
    }
    
    // Add event listeners for any user interaction
    const interactionEvents = ['click', 'touchstart', 'mousedown', 'keydown'];
    
    interactionEvents.forEach(event => {
      document.addEventListener(event, startMusic, { once: true });
    });
    
    // Also try auto-play immediately
    audio.play().catch(() => {
      // Auto-play failed, music will start on first interaction
      console.log('Auto-play blocked, waiting for user interaction...');
    });
  }
  
  // Add click effects to images
  items.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
      img.addEventListener('click', () => {
        createClickEffect(img);
        playClickSound();
      });
    }
  });
  
  function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    if (!confettiContainer) return;
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      confettiContainer.appendChild(confetti);
    }
  }
  
  function createClickEffect(element) {
    const rect = element.getBoundingClientRect();
    const effect = document.createElement('div');
    effect.style.position = 'fixed';
    effect.style.left = rect.left + rect.width/2 + 'px';
    effect.style.top = rect.top + rect.height/2 + 'px';
    effect.style.width = '20px';
    effect.style.height = '20px';
    effect.style.background = '#ff69b4';
    effect.style.borderRadius = '50%';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '1000';
    effect.style.transform = 'translate(-50%, -50%) scale(0)';
    effect.style.transition = 'all 0.6s ease-out';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
      effect.style.transform = 'translate(-50%, -50%) scale(3)';
      effect.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
      document.body.removeChild(effect);
    }, 600);
  }
  
  function playClickSound() {
    // Create a subtle click sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }
  
  function calculateDimensions() {
    // Get responsive dimensions
    containerWidth = beltContainer.offsetWidth;
    
    // Calculate item width including margins based on actual screen size
    if (window.innerWidth <= 480) {
      itemWidth = 180; // 160px + 20px margin
    } else if (window.innerWidth <= 768) {
      itemWidth = 240; // 210px + 30px margin  
    } else {
      itemWidth = 320; // 280px + 40px margin (updated for larger card)
    }
    
    // Calculate offset to center the first item
    offset = (containerWidth / 2) - (itemWidth / 2);
  }
  
  // Create multiple copies for truly endless scrolling
  const originalCount = items.length;
  const totalCopies = 20; // Create many copies for smooth endless scrolling
  let allItems;
  
  // Only run belt logic if not mobile
  if (!isMobile()) {
    // Create multiple sets of items
    for (let copy = 0; copy < totalCopies; copy++) {
      items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.add(`clone-${copy}`);
        belt.appendChild(clone);
      });
    }
  }

  allItems = Array.from(belt.children);
  
  function positionBelt() {
    calculateDimensions();
    
    // Position belt based on actual position
    const totalOffset = offset - actualPosition * itemWidth;
    belt.style.transform = `translateX(${totalOffset}px)`;
  }
  
  function animateToNext() {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // Remove center class from all items
    allItems.forEach(item => item.classList.remove('center'));
    
    // Move to next position
    actualPosition++;
    currentIndex = actualPosition % originalCount;
    
    calculateDimensions();
    const totalOffset = offset - actualPosition * itemWidth;
    
    // Add center class to next item immediately when animation starts
    allItems.forEach((item, index) => {
      const itemPattern = index % originalCount;
      if (itemPattern === currentIndex) {
        item.classList.add('center');
      }
    });
    
    // Smooth transition to next item
    belt.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    belt.style.transform = `translateX(${totalOffset}px)`;
    
    // Reset position when we've moved too far (seamless reset)
    if (actualPosition >= originalCount * (totalCopies - 5)) {
      setTimeout(() => {
        belt.style.transition = 'none';
        actualPosition = actualPosition % originalCount;
        const resetOffset = offset - actualPosition * itemWidth;
        belt.style.transform = `translateX(${resetOffset}px)`;
        
        setTimeout(() => {
          belt.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 50);
      }, 800);
    }
    
    // Wait for animation to complete
    setTimeout(() => {
      isAnimating = false;
      
      // Wait 2.5 seconds before next animation
      setTimeout(animateToNext, 2500);
    }, 800);
  }

  // Handle window resize
  function handleResize() {
    if (!isAnimating) {
      belt.style.transition = 'none';
      positionBelt();
      
      // Re-highlight center item after resize
      allItems.forEach(item => item.classList.remove('center'));
      allItems.forEach((item, index) => {
        const itemPattern = index % originalCount;
        if (itemPattern === currentIndex) {
          item.classList.add('center');
        }
      });
      
      // Re-enable transitions after repositioning
      setTimeout(() => {
        belt.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }, 50);
    }
  }

  // Mobile display management
  function updateMobileDisplay() {
    if (isMobile()) {
      beltContainer.style.display = 'none';
      mobileCenterView.style.display = 'flex';
      handleMobileTransition();
    } else {
      stopMobileTransition(); // Stop mobile transition when switching to desktop
      beltContainer.style.display = '';
      mobileCenterView.style.display = 'none';
    }
  }
  
  // Initial setup - set display first
  updateMobileDisplay();
  
  // Then initialize desktop animation if not mobile
  if (!isMobile()) {
    calculateDimensions();
    belt.style.transition = 'none';
    positionBelt();
    
    // Initialize first center item after a delay
    setTimeout(() => {
      allItems.forEach((item, index) => {
        const itemPattern = index % originalCount;
        if (itemPattern === currentIndex) {
          item.classList.add('center');
        }
      });
      belt.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }, 500);
    
    // Start animation after 3 seconds
    setTimeout(animateToNext, 3000);
  }
  
  window.addEventListener('resize', () => {
    updateMobileDisplay();
    if (!isMobile()) {
      handleResize();
    }
  });
  
  // Make sure handleResize is available for desktop
  if (!isMobile()) {
    window.addEventListener('resize', handleResize);
  }
});
