// Endless horizontal scroll animation with center enlargement
window.addEventListener('DOMContentLoaded', function() {
  const belt = document.querySelector('.horizontal-belt');
  const items = Array.from(document.querySelectorAll('.belt-item'));
  let beltWidth = belt.offsetWidth;
  let itemWidth = items[0].offsetWidth + 40; // margin
  let scrollPos = 0;
  let speed = 1.5; // px per frame

  // Clone items for seamless loop
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.add('clone');
    belt.appendChild(clone);
  });

  function animate() {
    scrollPos += speed;
    if (scrollPos >= itemWidth * items.length) {
      scrollPos = 0;
    }
    belt.style.transform = `translateX(${-scrollPos}px)`;
    highlightCenter();
    requestAnimationFrame(animate);
  }

  function highlightCenter() {
    const beltRect = belt.getBoundingClientRect();
    const centerX = beltRect.left + beltRect.width / 2;
    let closest = null;
    let minDist = Infinity;
    Array.from(belt.children).forEach(item => {
      item.classList.remove('center');
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(centerX - itemCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = item;
      }
    });
    if (closest) closest.classList.add('center');
  }

  animate();
});
