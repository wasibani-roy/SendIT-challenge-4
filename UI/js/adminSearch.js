document.getElementById('searchForm').addEventListener('submit', searchOrders);
const searchUrl = 'https://wasibani-sendit.herokuapp.com/api/v2/parcels/search/admin';
function searchOrders(e){
    e.preventDefault();
    token = localStorage.getItem('token')
    let search_data = document.getElementById('searchdata').value;
    
    let data = {
        search_item: search_data
    }


    fetch(searchUrl, {
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
        if (response.message === "Error in search")
         {let output = `
        <tr class="titles">
            <th>parcel order not found</th>
        </tr>`
        document.getElementById('orderSearch').innerHTML = output;
        } 
        else{let output = `
        <tr class="titles">
            <th>ParcelId</th>
            <th>Parcel</th>
            <th>Sender</th>
            <th>Receiver</th>
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
                <td>${response[k].username}</td>
                <td>${response[k].receiver}</td>
                <td>${response[k].location}</td>
                <td>${response[k].delivery_status}</td>
                <td>${response[k].destination}</td>
                <td>${response[k].status}</td>
            </tr>`;
            console.log(output);}
        document.getElementById('orderSearch').innerHTML = output;};
    })
    .catch(err => console.log(err));
}