import { windowWidth, closeSidebar, getDataFromStorage, sidebar } from "./content";

const createPostBtn = document.querySelector('.create-btn')
const mainModal =  document.querySelector('.modal-layout')
const closeMainModalBtn = document.querySelector('.close')

// Модальное окно для создания поста

const openModal = () => {
  document.querySelector('.modal-layout').classList.add('modal-open');
  setTimeout(() => document.querySelector('.modal').style.transform = 'scale(1)', 100)
  sidebar.classList.contains('open') ? closeSidebar() : null
  document.body.style.overflow = 'hidden'
};

const closeModal = (e) => {
  if (
    e.target === document.querySelector('.modal-layout') ||
    e.target === document.querySelector('.close')
  ) {
    setTimeout(() => document.querySelector('.modal-layout').classList.remove('modal-open'), 100)
    document.querySelector('.modal').style.transform = 'scale(0)'
    document.body.style.overflow = 'visible'
  } else return;
};

createPostBtn.addEventListener('click', openModal);
mainModal.addEventListener('click', closeModal);
closeMainModalBtn.addEventListener('click', closeModal);

// Модальное окно для настроек

const settingsLayout = document.querySelector('.settings-layout')
const settings = document.querySelector('.settings')
const settingsBtn = document.querySelector('#settings-btn')
const settingsClose = document.querySelector('.settings-close')

settingsBtn.addEventListener('click', openSettings)
settingsClose.addEventListener('click', closeSettings)
settingsLayout.addEventListener('click', closeSettings)

function openSettings() {
  windowWidth <= 820 ? closeSidebar() : null
  settingsLayout.style.display = 'flex'
  document.body.style.overflow = 'hidden'
  setTimeout(() => {
    settings.style.opacity = '1'
    settings.style.transform = 'translate(0%)'
  }, 200)
}

function closeSettings(e) {
  if (e.target === settingsClose || e.target === settingsLayout) {
    setTimeout(() => settingsLayout.style.display = 'none', 150)
    settings.style.opacity = '0'
    settings.style.transform = 'translate(0%)'
    document.body.style.overflow = 'visible'
  }
  return
}

const themeControls = document.querySelectorAll('.switch-theme')
const themeLink = document.querySelector('#theme-css')


themeControls.forEach(control => {
  control.addEventListener('click', function() {
    changeTheme(control.dataset.theme)
    localStorage.setItem('theme', control.dataset.theme)
    windowWidth <= 820 ? closeSidebar() : null
  })
})

function changeTheme(themeName) {
  let themeUrl = `../src/assets/styles/${themeName}.css`
  themeLink.href = themeUrl
}

let activeTheme = localStorage.getItem('theme')

if (!activeTheme) {
  changeTheme('light')
} else {
  changeTheme(activeTheme)
}


// Модальное окно для описания и скачивания поста

export function createPostModal(elem) {
  const savedPosts = getDataFromStorage()

  const clickedPost = elem.closest('.post')
  const target = savedPosts.filter(post => post.id === clickedPost.dataset.id)

  const modalPostLayout = document.createElement('div')
  modalPostLayout.classList.add('modalpost-layout')
  const modalPost = document.createElement('div')
  modalPost.classList.add('modal-post')

  const {date, description, src, type} = target[0]
  const imgType = type.slice(6)

  modalPost.insertAdjacentHTML('afterbegin', `
    <div class="post-close">&times;</div>
    <img class="modal-post_img" src=${src} />
    <div class="post-details">
      <p>Published:<span> ${date}</span></p>
      <h3>${description}</h3>
      <a href="${src}" class="download" download="${description}.${imgType}">Download<img class="donwload-img" src="../src/assets/images/download.svg" /></a>
    </div>
  `)

  modalPostLayout.append(modalPost)
  document.querySelector('#root').append(modalPostLayout)

  setTimeout(() => { document.body.style.overflow = 'hidden'}, 100)

  const postClose = document.querySelector('.post-close')
  postClose.addEventListener('click', removePostModal)

  const downloadBtn = document.querySelector('.download')

  modalPostLayout.addEventListener('click', removePostModal)
  downloadBtn.addEventListener('click', removePostModal)

  function removePostModal(e) {
    if (e.target === modalPostLayout || e.target === postClose || e.target === downloadBtn) {
      modalPost.style.transform = 'scale(0)'
      setTimeout(() =>  modalPostLayout.remove(), 300)
      document.body.style.overflow = 'visible'
    } else return
  }

  setTimeout(() => modalPost.style.transform = 'scale(1)', 100)
}

