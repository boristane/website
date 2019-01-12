const token = JSON.parse(localStorage.getItem('token')) || '';
const url = 'https://boristane-blog-api.herokuapp.com/projects/';
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', e.target.title.value);
    data.append('url', e.target.url.value);
    data.append('github', e.target.github.value);
    data.append('description', e.target.description.value);
    data.append('stack', e.target.stack.value);

    data.append('image', e.target.image.files[0]);
    postData(url, token, data).then((res) => {
        document.getElementById('message').textContent = res.message;
    });
});
