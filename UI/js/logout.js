function Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('parcel_order_id');
    window.location.href = 'UI/index.html';
}