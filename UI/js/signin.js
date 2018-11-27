document.getElementById('signinForm').addEventListener('submit', loginUser);
const url_login = 'https://wasibani-sendit.herokuapp.com/api/v2/auth/login/';

function loginUser(e){
    e.preventDefault();
    let username = document.getElementById('user').value;
    let password = document.getElementById('pass').value;
    let radioInput = document.getElementsByName('clientType');
    for (let i = 0; i < radioInput.length; i++){
        if (radioInput[i].checked){
            role = radioInput[i].value;
            break;
        }
    }
    let data = {
        username: username,
        password: password,
        role: role
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
            switch (role) {
                case 'admin':
                    window.location.replace('UI/admin.html');
                    break;
                case 'user':
                    window.location.replace('UI/user.html');
                    break;
                default:
                    break;
            }
            alert(`Welcome back ${username}`);
        } else {
            alert(response.message);
        }
    })
    .catch(err => console.log(err));
}
