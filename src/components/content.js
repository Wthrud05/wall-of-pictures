export const windowWidth = document.documentElement.clientWidth
const container = document.querySelector('.container-posts');

export function renderPosts(data) {
  saveDataToStorage(data)
  container.innerHTML = ''

  data.forEach((e) => {
    container.insertAdjacentHTML(
      'afterbegin',
      `<div data-id=${e.id} class="post"><img src="${e.src}" /><p>${e.description}</p></div>`,
    );
  }) 
}

function saveDataToStorage(data) {
  localStorage.setItem('posts', JSON.stringify(data))
}

export function getDataFromStorage() {
  return JSON.parse(localStorage.getItem('posts') || '[]')
}

// Sidebar

const infoBtn = document.querySelector('#info-btn')
const info = document.querySelector('#info')

const startBtn = document.querySelector('#close-info')

const burger = document.querySelector('.burger')
export const sidebar = document.querySelector('.sidebar')
const sidebarCloseBtn = document.querySelector('.close-sidebar')

const contentLayout = document.querySelector('.content-layout')

infoBtn.addEventListener('click', openInfo)

function openInfo() {
    info.style.transform = 'translateX(0%)'
    windowWidth <= 820 ? closeSidebar() : null
    document.body.style.overflow = 'hidden'
}

startBtn.addEventListener('click', closeInfo)

function closeInfo() {
  info.style.transform = 'translateX(100%)'
  document.body.style.overflow = 'visible'
  localStorage.setItem('session', 'session on proccess')
}

if (localStorage.getItem('session')) {
  closeInfo()
}

burger.addEventListener('click', openSideBar)
sidebarCloseBtn.addEventListener('click', closeSidebar)

windowWidth <= 820 ? contentLayout.addEventListener('click', closeSidebar) : null;

function openSideBar() {
  sidebar.style.transform = 'translateX(0px)'
  sidebar.classList.add('open')
  burger.style.display = 'none'
  sidebarCloseBtn.style.display = 'block'
  document.body.style.overflow = 'hidden'
  container.style.pointerEvents = 'none'
  windowWidth <= 820 ? contentLayout.style.opacity = '.1' : null
}

export function closeSidebar() {
  sidebar.style.transform = 'translateX(-260px)'
  sidebar.classList.remove('open')
  burger.style.display = 'block'
  sidebarCloseBtn.style.display = 'none'
  document.body.style.overflow = 'visible'
  container.style.pointerEvents = 'unset'
  windowWidth <= 820 ? contentLayout.style.opacity = '1' : null
}

const wallBtn = document.querySelector('#wall-btn')
wallBtn.addEventListener('click', scrollUp)

function scrollUp() {
  if (sidebar.classList.contains('open')) {
    closeSidebar()
    document.body.style.overflow = 'visible'
  } 


  window.scrollTo(0, 0)
}
