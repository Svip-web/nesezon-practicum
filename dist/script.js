const dialog = document.querySelector('.register-dialog');

document.querySelectorAll('.js-open-form').forEach((button) => {
  button.addEventListener('click', () => {
    if (!dialog.open) dialog.showModal();
    window.setTimeout(() => dialog.querySelector('.dialog-close')?.focus(), 80);
  });
});

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) dialog.close();
});

const revealGroups = [
  [...document.querySelectorAll('.program-card')],
  [...document.querySelectorAll('.situation-list li')],
  [...document.querySelectorAll('.audience-copy p')],
  [...document.querySelectorAll('.speaker-captions span')]
];

const revealItems = revealGroups.flat();

revealGroups.forEach((group) => {
  group.forEach((item, index) => {
    item.classList.add('reveal-on-scroll');
    item.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 70}ms`);
  });
});

if (revealItems.length) {
  document.body.classList.add('reveal-ready');

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
}
