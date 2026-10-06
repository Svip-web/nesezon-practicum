const dialog = document.querySelector('.register-dialog');

const typographyRoot = document.querySelector('.page');

if (typographyRoot) {
  const shortWordPattern = /(^|[\s([\{«„"])([A-Za-zА-Яа-яЁёІіЇїЄєҐґ]{1,2})[ \t]+(?=[A-Za-zА-Яа-яЁёІіЇїЄєҐґ])/g;
  const textWalker = document.createTreeWalker(typographyRoot, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest('script, style, noscript, .program-card')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const textNodes = [];

  while (textWalker.nextNode()) textNodes.push(textWalker.currentNode);

  textNodes.forEach((node) => {
    node.nodeValue = node.nodeValue.replace(shortWordPattern, '$1$2\u00A0');
  });
}

document.querySelectorAll('.js-open-form').forEach((button) => {
  button.addEventListener('click', () => {
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('dialog-open');
    window.setTimeout(() => dialog.querySelector('.dialog-close')?.focus(), 80);
  });
});

const fixedCta = document.querySelector('.site-fixed-cta');

if (fixedCta && 'IntersectionObserver' in window) {
  const visiblePageCtas = new Set();
  const pageCtas = [...document.querySelectorAll('.js-open-form')]
    .filter((button) => button !== fixedCta);

  const fixedCtaObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visiblePageCtas.add(entry.target);
      else visiblePageCtas.delete(entry.target);
    });

    fixedCta.classList.toggle('is-hidden', visiblePageCtas.size > 0);
  }, {
    threshold: 0.15
  });

  pageCtas.forEach((button) => fixedCtaObserver.observe(button));
}

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) dialog.close();
});

dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));

const revealItems = [...document.querySelectorAll('[data-reveal]')];

revealItems.forEach((item, index) => {
  item.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);
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
      rootMargin: '0px 0px -7% 0px'
    });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
}
