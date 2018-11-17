function postData(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
    })
        .then(response => response.json());
}

const form = document.querySelector('form');
const url = 'https://boristane-blog-api.herokuapp.com/users/login';
form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('auth').style.display = 'none';
    localStorage.setItem('token', JSON.stringify({}));
    const email = e.target.email.value;
    const password = e.target.psw.value;
    postData(url, {
        email,
        password,
    }).then((data) => {
        if (!data.token) {
            document.getElementById('auth').style.display = 'block';
            return;
        }
        localStorage.setItem('token', JSON.stringify(data.token));
    });
});
