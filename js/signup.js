document.getElementById('signupForm').addEventListener('submit', registerUser);
const url = 'https://wasibani-sendit.herokuapp.com/api/v2/auth/signup/';

function registerUser(event){
    event.preventDefault();

    let username = document.getElementById('usrname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('psw').value;
    let role = document.getElementById('role').value;
    // for (let i = 0; i < radioInput.length; i++){
    //     if (radioInput[i].checked){
    //         role = radioInput[i].value;
    //         break;
    //     }
    // }
    let data = {
        username: username,
        email: email,
        password: password,
        role: role
    }

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        console.log(response);
        if (response.message === 'you have succesfully signed up') {
            alert(`You have registered as ${data['username']}`);
            window.location.replace('index.html');
        } else {
            alert(response.message);
        }
    })
    .catch(err => console.log(err));
}