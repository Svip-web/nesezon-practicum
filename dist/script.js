const dialog = document.querySelector('.register-dialog');
const form = dialog.querySelector('form');
const status = dialog.querySelector('.form-status');

document.querySelectorAll('.js-open-form').forEach((button) => {
  button.addEventListener('click', () => {
    status.textContent = '';
    dialog.showModal();
    window.setTimeout(() => dialog.querySelector('input')?.focus(), 80);
  });
});

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) dialog.close();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  status.textContent = 'Спасибо! Данные формы готовы к подключению к сервису регистрации.';
});
