export function upload(options = {}) {
  const nothing = function () {};

  let files = []; // Массив для файла
  let src; // Путь картинки
  let descriptionText = ''; // Описание к посту
  let fileType = ''
  const onUpload = options.onUpload ?? nothing;
  // Инициализация DOM элементов

  const inputFile = document.querySelector('.open-file');
  const input = document.querySelector('#file');
  const preview = document.querySelector('.preview');
  const descriptionInput = document.querySelector('#description');
  const acceptDescBtn = document.querySelector('.accept-description');
  const descriptionBox = document.querySelector('.description-box');
  const appendBtn = document.createElement('button');
  appendBtn.textContent = 'append';
  appendBtn.classList.add('append-btn');
  appendBtn.setAttribute('disabled', true)

  const secondStep = document.querySelector('.second')


  // Триггер инпута с помощью кнопки

  const clickInput = (e) => {
    e.preventDefault();
    input.click();

    descriptionInput.removeAttribute('disabled');
    descriptionInput.style.cursor = 'unset';

    acceptDescBtn.style.color = 'teal';
    acceptDescBtn.style.cursor = 'pointer';
    acceptDescBtn.removeAttribute('disabled');
  };

  // Добавление превью картинки

  const changeHandler = (e) => {
    files = Array.from(e.target.files);

    files.forEach((file) => {
      if (!file.type.match('image')) {
        return;
      }

      const reader = new FileReader();

      preview.innerHTML = '';

      reader.onload = (e) => {
        src = e.target.result;
        preview.insertAdjacentHTML(
          'afterbegin',
          `<div class="preview-box">
            <button class="delete-post" data-name="${file.name}">&times;</button>
            <img id="preview-image" src=${src} />
          </div>
          `,
        );

        preview.append(appendBtn);

        if (file) {
          inputFile.setAttribute('disabled', true);
          inputFile.style.background = 'grey';
          inputFile.style.cursor = 'not-allowed';
          secondStep.style.display = 'inline'

          descriptionBox.style.display = 'flex';
          appendBtn.style.display = 'block';
        }
      };
      fileType = file.type
      reader.readAsDataURL(file);
    });
  };

  // Добавляем описание поста

  const addDesc = (e) => {
    descriptionText = e.target.value;
  };

  const acceptDesc = (e) => {
    e.preventDefault();
    if (!descriptionText) return;

    const description = document.createElement('p');
    description.textContent = descriptionText;
    description.classList.add('desc');
    if (!document.querySelector('.preview-box')) {
      return;
    }

    document.querySelector('.preview-box').append(description);

    descriptionInput.value = '';
    descriptionInput.setAttribute('disabled', true);
    descriptionInput.style.cursor = 'not-allowed';

    acceptDescBtn.style.color = 'grey';
    acceptDescBtn.style.cursor = 'not-allowed';
    acceptDescBtn.setAttribute('disabled', true);

    appendBtn.removeAttribute('disabled')
    appendBtn.style.background = 'teal'
    appendBtn.style.cursor = 'pointer'
  };

  // Удаление поста

  const deletePostHandler = (e) => {
    if (!e.target.dataset.name) {
      return;
    }

    const { name } = e.target.dataset;

    files = files.filter((file) => file.name !== name);

    const elem = preview.querySelector(`[data-name="${name}"]`).closest('.preview-box');
    elem.classList.add('deleting');

    setTimeout(() => {
      elem.remove();
      appendBtn.style.display = 'none';
      descriptionBox.style.display = 'none';
      descriptionText = ''

      inputFile.removeAttribute('disabled');
      inputFile.style.background = 'teal';
      inputFile.style.cursor = 'pointer';
      secondStep.style.display = 'none'
    }, 300);
  };

  // Добавляем пост и очищаем модалку

  const upoloadPost = () => {
    let post = {src, description: descriptionText, date: new Date().toLocaleDateString(), type: fileType}
    onUpload(post);
    descriptionText = ''

   setTimeout(() => {
    appendBtn.style.display = 'none';
    descriptionBox.style.display = 'none';
    inputFile.removeAttribute('disabled');
    inputFile.style.background = 'teal';
    inputFile.style.cursor = 'pointer';
    preview.innerHTML = '';
    appendBtn.setAttribute('disabled', true)
    appendBtn.style.background = 'grey'
    appendBtn.style.cursor = 'not-allowed'
    secondStep.style.display = 'none'
    document.body.style.overflow = 'visible'
   }, 600)
  };
  // Слушатели событий

  inputFile.addEventListener('click', clickInput);
  input.addEventListener('change', changeHandler);
  descriptionInput.addEventListener('change', addDesc);
  descriptionInput.addEventListener('input', function() {
    this.value = this.value.substr(0, 30)
  });
  acceptDescBtn.addEventListener('click', acceptDesc);
  appendBtn.addEventListener('click', upoloadPost);
  preview.addEventListener('click', deletePostHandler);
}
