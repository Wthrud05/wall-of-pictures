import './content';
import { createPostModal } from './modal';
import { upload } from './post';
import { renderPosts } from './content';



let postsData = [];

upload({
  onUpload(post) {
    fetch('https://wall-app-4f289-default-rtdb.europe-west1.firebasedatabase.app/files.json', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        getData()
        document.querySelector('.open-file').classList.add('hidden')
        document.querySelector('.first').classList.add('hidden')
        document.querySelector('.loader').classList.add('visible')
      })
      .then(() => setTimeout(() => {
        document.querySelector('.modal-layout').classList.remove('modal-open')
        document.querySelector('.loader').classList.remove('visible')
        document.querySelector('.open-file').classList.remove('hidden')
        document.querySelector('.first').classList.remove('hidden')
      }, 500))
  },
});

async function getData() {
  const res = await fetch(
    'https://wall-app-4f289-default-rtdb.europe-west1.firebasedatabase.app/files.json',
  );
  const data = await res.json();
  postsData = Object.keys(data).map(key => ({
    ...data[key],
    id: key,
  }))
  renderPosts(postsData)
  const allPosts = document.querySelectorAll('.post')

  allPosts.forEach(post => post.addEventListener('click', function(e) {
    createPostModal(e.target)
  }))
}

getData()
