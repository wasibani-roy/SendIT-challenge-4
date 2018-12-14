function autoCompleteLocation(place){
    var input = document.getElementById(place);
    new google.maps.places.Autocomplete(input);
}