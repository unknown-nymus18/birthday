// Truly endless horizontal scroll animation with perfect centering
window.addEventListener('DOMContentLoaded', function() {
  const beltContainer = document.querySelector('.belt-container');
  const belt = document.querySelector('.horizontal-belt');
  const items = Array.from(document.querySelectorAll('.belt-item'));
  let currentIndex = 0;
  let actualPosition = 0; // Track actual position for endless scrolling
  let isAnimating = false;
  let itemWidth, containerWidth, offset;
  
  // Initialize confetti
  createConfetti();
  
  // Auto-play music
  const audio = document.getElementById('play-music');
  if (audio) {
    audio.volume = 0.3;
    // Try to auto-play (will work on user interaction)
    audio.play().catch(() => {
      // Auto-play failed, will play on first user interaction
      document.addEventListener('click', () => {
        audio.play();
      }, { once: true });
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
  
  // Create multiple sets of items
  for (let copy = 0; copy < totalCopies; copy++) {
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add(`clone-${copy}`);
      belt.appendChild(clone);
    });
  }

  const allItems = Array.from(belt.children);
  
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

  // Initialize
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
  
  // Handle resize events
  window.addEventListener('resize', handleResize);
});
