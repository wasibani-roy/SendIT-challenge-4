document.getElementById('parcelForm').addEventListener('submit', postOrder);
document.getElementById('orderEdit').addEventListener('load', editorders());
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
            window.location.replace('UI/user.html');
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
            <th>Parcel Order Id</th>
            <th>Parcel Name</th>
            <th>Receiver Name</th>
            <th>Location</th>
            <th>Delivery Status</th>
            <th>destination</th>
            <th>Status</th>
        </tr>`
        for(let k in response){
            console.log(response[k].item);
            output += `
            <tr class="orders">
                <td>${response[k].parcel_order_id}</td>
                <td>${response[k].parcel_name}</td>
                <td>${response[k].receiver}</td>
                <td>${response[k].location}</td>
                <td>${response[k].delivery_status}</td>
                <td>${response[k].destination}</td>
                <td>${response[k].status}</td>
            </tr>`;
            console.log(output);}
        document.getElementById('orderItem').innerHTML = output;};
        
    })
}

function editorders() {
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
        document.getElementById('orderEdit').innerHTML = output;
        } 
        else{let output = `
        <tr class="titles">
            <th>Parcel Name</th>
            <th>Parcel Order Id</th>
            <th>Receiver Name</th>
            <th>Location</th>
            <th>Delivery Status</th>
            <th>Action</th>
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
                <td><button class="btn1 btn1-primary" onclick="singleOrder(${response[k].parcel_order_id})">Edit destination</button><button class="btn1 btn1-primary" onclick="cancelOrder(${response[k].parcel_order_id})">Cancel Order</button></td>
            </tr>`;
            console.log(output);}
        document.getElementById('orderEdit').innerHTML = output;};
        
    })
}

function singleOrder(parcel_id){
    localStorage.setItem("parcel_order_id", parcel_id);
    let parcel_order_id=parcel_id
    let newoutput = `
            <div class="container">
                <h1 class="destination">Change Destination</h1>
                    <form action="#Tokyo" id="updateorder">
                     <label class="desti">Parcel order ID</label>
                    <input type="hidden" name="parcel_number" value=${parcel_id} id="parcelId" class="change-location" title="Parcel ID"> <br> 
                    <input type="text" name="new_area" id="destination" class="change-location" placeholder="Enter new Destination"> <br>
                        <button onclick="updateDestination();">Change Destination</button>
                    </form>
            </div>`;
    document.getElementById('orderEdit').innerHTML = newoutput;

}
function updateDestination() {
    // e.preventDefault();
    let destiurl = 'https://wasibani-sendit.herokuapp.com/api/v2/parcels/';
    let destination = document.getElementById('destination').value;
    let parcel_id = document.getElementById('parcelId').value;
    token = localStorage.getItem('token')

    // console.log(destination);
    fetch(destiurl + parcel_id + '/destination', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                destination: destination
            })
        })
        .then(res => res.json())
        .then(response => {
            // console.log(data)
            if (response.message === "destination updated succesfully") {
                alert(`Order destination succesfully updated`);
                window.location.replace('UI/user.html');
            } else if (response.msg === "Token has expired") {
                alert(`You token has expired please login again`);
                window.location.replace('UI/index.html');
            } else if (response.message === "You can not change the destination of a delivered product") {
                alert(`You can not change the destination of a delivered product`);
                window.location.replace('UI/user.html');
            } else if (response.message === "Failed to update destination") {
                alert(`Failed to update the destination please try again`);
                window.location.replace('UI/user.html');
            } else {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            }

        })
}
function cancelOrder(parcel_id) {
    // e.preventDefault();
    let destiurl = 'https://wasibani-sendit.herokuapp.com/api/v2/parcels/';
    let parcel_order_id=parcel_id
    token = localStorage.getItem('token')

    // console.log(destination);
    fetch(destiurl + parcel_order_id + '/cancel', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            // console.log(data)
            if (response.message === "You have successfully cancelled the order") {
                alert(`You have successfully cancelled the order`);
                window.location.replace('UI/user.html');
            } else if (response.msg === "Token has expired") {
                alert(`You token has expired please login again`);
                window.location.replace('UI/index.html');
            } else if (response.message === "You can not cancel a delivered product") {
                alert(`You can not cancel a delivered product`);
                window.location.replace('UI/user.html');
            } else if (response.message === "Failed to cancel order") {
                alert(`Failed to cancel order`);
                window.location.replace('UI/user.html');
            } else {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            }

        })
}