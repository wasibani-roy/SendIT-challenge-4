document.getElementById('parcelForm').addEventListener('submit', postOrder);
document.getElementById('orderItem').addEventListener('load', getOrderHistory());
const orderUrl = 'https://wasibani-sendit.herokuapp.com/api/v2/parcels/';

function postOrder(e){
    e.preventDefault();
    token = localStorage.getItem('token')
    let parcel_name = document.getElementById('parcelname').value;
    let receiver_name = document.getElementById('receiver').value;
    let destination = document.getElementById('destination').value;
    let price = document.getElementById('price').value;
    
    let data = {
        parcel_name: parcel_name,
        destination: destination,
        receiver: receiver_name,
        price: price
    }


    fetch(orderUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        console.log(response);
        if (response.message === 'you have succesfully placed order'){
            alert('Your order has been placed');
            window.location.replace('user.html');
        } else {
            alert(response.message);
        }
    })
    .catch(err => console.log(err));
}


function getOrderHistory() {
    let histUrl = 'https://wasibani-sendit.herokuapp.com/api/v2/parcels/user';
    token = localStorage.getItem('token')
    console.log(token);
    fetch(histUrl, {
        headers: {
            'Authorization': `Bearer ${token}`
        } 
    })
    .then(res => res.json())
    .then(response => {
        if (response.message === "you have no orders at this time")
         {let output = `
        <tr class="titles">
            <th>No Orders currently in progress</th>
        </tr>`
        document.getElementById('orderItem').innerHTML = output;
        } 
        else{let output = `
        <tr class="titles">
            <th>Parcel Name</th>
            <th>Parcel Order Id</th>
            <th>Receiver Name</th>
            <th>Location</th>
            <th>Delivery Status</th>
        </tr>`
        for(let k in response){
            console.log(response[k].item);
            output += `
            <tr class="orders">
                <td>${response[k].parcel_name}</td>
                <td>${response[k].parcel_order_id}</td>
                <td>${response[k].receiver}</td>
                <td>${response[k].location}</td>
                <td>${response[k].delivery_status}</td>
            </tr>`;
            console.log(output);}
        document.getElementById('orderItem').innerHTML = output;};
        
    })
}
