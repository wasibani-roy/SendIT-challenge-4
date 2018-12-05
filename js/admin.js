document.getElementById('orderItem').addEventListener('load', getAdminOrderHistory());
function getAdminOrderHistory() {
    let histUrl = 'https://wasibani-sendit.herokuapp.com/api/v2/parcels/';
    token = localStorage.getItem('token')
    console.log(token);
    fetch(histUrl, {
        headers: {
            'Authorization': `Bearer ${token}`
        } 
    })
    .then(res => res.json())
    .then(response => {
        if (response.message === "No orders placed so far")
         {let output = `
        <tr class="titles">
            <th>No Orders currently in progress</th>
        </tr>`
        document.getElementById('orderItem').innerHTML = output;
        } 
        else{let output = `
        <tr class="titles">
            <th>Parcel Order Id</th>
            <th>username</th>
            <th>Parcel Name</th>
            <th>Receiver Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Delivery Status</th>
            <th>destination</th>
            <th>Status</th>
        </tr>`
        for(let k in response){
            console.log(response[k].item);
            output += `
            <tr class="orders">
                <td>${response[k].parcel_order_id}</td>
                <td>${response[k].username}</td>
                <td>${response[k].parcel_name}</td>
                <td>${response[k].receiver}</td>
                <td>${response[k].location}</td>
                <td>${response[k].price}</td>
                <td>${response[k].delivery_status}</td>
                <td>${response[k].destination}</td>
                <td>${response[k].status}</td>
            </tr>`;
            console.log(output);}
        document.getElementById('orderItem').innerHTML = output;};
        
    })
}
document.getElementById('orderEdit').addEventListener('load', editUserOrders());
function editUserOrders() {
    let histUrl = 'https://wasibani-sendit.herokuapp.com/api/v2/parcels/';
    token = localStorage.getItem('token')
    console.log(token);
    fetch(histUrl, {
        headers: {
            'Authorization': `Bearer ${token}`
        } 
    })
    .then(res => res.json())
    .then(response => {
        if (response.message === "No orders placed so far")
         {let output = `
        <tr class="titles">
            <th>No Orders currently in progress</th>
        </tr>`
        document.getElementById('orderEdit').innerHTML = output;
        } 
        else{let output = `
        <tr class="titles">
        	<th>Parcel Order Id</th>
            <th>Parcel Name</th>
            <th>Username</th>
            <th>Receiver Name</th>
            <th>Location</th>
            <th>Delivery Status</th>
            <th>Action</th>
        </tr>`
        for(let k in response){
            console.log(response[k].item);
            output += `
            <tr class="orders">
            	<td>${response[k].parcel_order_id}</td>
                <td>${response[k].parcel_name}</td>
                <td>${response[k].username}</td>
                <td>${response[k].receiver}</td>
                <td>${response[k].location}</td>
                <td>${response[k].delivery_status}</td>
                <td><button class="btn1 btn1-primary" onclick="singleOrderLocation(${response[k].parcel_order_id})">Edit location</button><button class="btn1 btn1-primary" onclick="singleOrderStatus(${response[k].parcel_order_id})">Edit status</button></td>
            </tr>`;
            console.log(output);}
        document.getElementById('orderEdit').innerHTML = output;};
        
    })
}
function singleOrderLocation(parcel_id){
    localStorage.setItem("parcel_order_id", parcel_id);
    let parcel_order_id=parcel_id
    let newoutput = `
            <div class="container">
                <h1>Change Location</h1>
                    <form action="" id="updateorder">
                     
                    <input type="text" name="parcel_number" value=${parcel_id} id="parcelId" class="change-location" title="Parcel ID"> <br> 
                    <input type="text" name="new_location" id="location" class="change-location" placeholder="Enter parcel present location"> <br>
                        <button onclick="updateLocation();">Change location</button>
                    </form>
            </div>`;
    document.getElementById('orderEdit').innerHTML = newoutput;

}
function updateLocation() {
    // e.preventDefault();
    let destiurl = 'https://wasibani-sendit.herokuapp.com/api/v2/parcels/';
    let new_location = document.getElementById('location').value;
    let parcel_id = document.getElementById('parcelId').value;
    token = localStorage.getItem('token')

    // console.log(destination);
    fetch(destiurl + parcel_id + '/presentLocation', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                location: new_location
            })
        })
        .then(res => res.json())
        .then(response => {
            // console.log(data)
            if (response.message === "present location updated succesfully") {
                alert(`present location updated succesfully`);
                window.location.replace('admin.html');
            } else if (response.msg === "Token has expired") {
                alert(`You token has expired please login again`);
                window.location.replace('index.html');
            } else if (response.message === "Failed to update present location") {
                alert(`Failed to update present location`);
                window.location.replace('admin.html');
            } else {
                alert(response.message);
                window.location.replace('admin.html');
            }

        })
}
function singleOrderStatus(parcel_id){
    localStorage.setItem("parcel_order_id", parcel_id);
    let parcel_order_id=parcel_id
    let newoutput = `
            <div class="container">
                <h1 style="color:#111;">Change Delivery Status</h1>
                    <form action="" id="updateorder">
                     <label class="status">Parcel order ID</label>
                    <input type="text" name="parcel_number" value=${parcel_id} id="parcelId" class="change-location" title="Parcel ID"> <br> 
                    <input type="radio" value="delivered" checked name="statusType"><label class="status">Delivered</label>
                    <input type="radio" value="transit" name="statusType"><label class="status">In Transit</label><br>
                        <button onclick="updateDeliveryStatus();">Change Delivery Status</button>
                    </form>
            </div>`;
    document.getElementById('orderEdit').innerHTML = newoutput;

}
function updateDeliveryStatus() {
    // e.preventDefault();
    let destiurl = 'https://wasibani-sendit.herokuapp.com/api/v2/parcels/';
    let new_status = document.getElementsByName('statusType');
    for (let i = 0; i < new_status.length; i++){
        if (new_status[i].checked){
            status = new_status[i].value;
            break;
        }
    }
    let parcel_id = document.getElementById('parcelId').value;
    token = localStorage.getItem('token')

    // console.log(destination);
    fetch(destiurl + parcel_id + '/status', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                delivery_status: status
            })
        })
        .then(res => res.json())
        .then(response => {
            // console.log(data)
            if (response.message === "Delivery status updated succesfully") {
                alert(`Delivery status updated succesfully`);
                window.location.replace('admin.html');
            } else if (response.msg === "Token has expired") {
                alert(`You token has expired please login again`);
                window.location.replace('index.html');
            } else if (response.message === "Failed to update delivery status") {
                alert(`Failed to update delivery status`);
                window.location.replace('admin.html');
            } else {
                alert(response.message);
                window.location.replace('admin.html');
            }

        })
}