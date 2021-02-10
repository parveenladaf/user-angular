/* ------------------------------------------------------------------------------
 *
 *  # Basic map
 *
 *  Specific JS code additions for maps_google_basic.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var GoogleMapBasic = function() {


    //
    // Setup module components
    //

    // Line chart
    var _googleMapBasic = function() {
        if (typeof google == 'undefined') {
            console.warn('Warning - Google Maps library is not loaded.');
            return;
        }

        // Map settings
        function initialize() {

            // Define map element
            var homeAddressMap_element = document.getElementById('homeAddressMap');

            // Optinos
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(47.496, 19.037)
            };

            // Apply options
            var map = new google.maps.Map(homeAddressMap_element, mapOptions);

            var nodalAddressMap_element = document.getElementById('nodalAddressMap');

            // Optinos
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(47.496, 19.037)
            };

            // Apply options
            var map1 = new google.maps.Map(nodalAddressMap_element, mapOptions);
        }

        // Load map
        google.maps.event.addDomListener(window, 'load', initialize);
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _googleMapBasic();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    GoogleMapBasic.init();
});
