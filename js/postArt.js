const token = JSON.parse(localStorage.getItem('token')) || '';
const url = 'http://127.0.0.1:3000/artpieces/';
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', e.target.title.value);
    data.append('inspiration', e.target.inspiration.value);
    data.append('lang', e.target.lang.value);
    data.append('author', e.target.author.value);
    data.append('ref', e.target.ref.value);
    data.append('url', e.target.url.value);
    data.append('text', e.target.text.value);

    data.append('js', e.target.js.files[0]);
    data.append('image', e.target.image.files[0]);
    postData(url, token, data).then((res) => {
        document.getElementById('message').textContent = res.message;
    });
});
