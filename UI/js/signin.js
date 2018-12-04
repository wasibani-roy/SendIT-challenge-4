document.getElementById('signinForm').addEventListener('submit', loginUser);
const url_login = 'https://wasibani-sendit.herokuapp.com/api/v2/auth/login/';

function loginUser(e){
    e.preventDefault();
    let username = document.getElementById('user').value;
    let password = document.getElementById('pass').value;
    let data = {
        username: username,
        password: password,
    }
    fetch(url_login, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        console.log(response);
        if (response.message === 'You have successfully logged in'){
            token = response.access_token;
            localStorage.setItem('token', token)
            UserIdentity = JSON.parse(atob(token.split('.')[1]));
            role = UserIdentity['identity']['role'];
            if (role === 'admin') {
                        window.location.href = "UI/admin.html";
                    } else {
                        window.location.href = "UI/user.html";
                    }
            alert(`Welcome back ${username}`);
        } else {
            alert(response.message);
        }
    })
    .catch(err => console.log(err));
}