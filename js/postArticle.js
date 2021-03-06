const token = JSON.parse(localStorage.getItem('token')) || '';
const url = 'https://glddw4ljnl.execute-api.eu-west-2.amazonaws.com/prod/articles/';
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', e.target.title.value);
    data.append('description', e.target.description.value);
    data.append('tags', e.target.tags.value);

    data.append('content', e.target.content.files[0]);
    data.append('image', e.target.image.files[0]);
    postData(url, token, data).then((res) => {
        document.getElementById('message').textContent = res.message;
    });
});
