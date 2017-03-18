/**
 * Created by bryce on 2/8/17.
 */
import {ShippingRatesManager} from './classes/ShippingRatesManager';
import {ProductsList} from './classes/ProductsList';

jQuery(document).ready(function($){
    $('#upload-btn').click(function(e) {
        e.preventDefault();
        var image = wp.media({
            title: 'Upload Image',
            // mutiple: true if you want to upload multiple files at once
            multiple: false
        }).open()
            .on('select', function(e){
                // This will return the selected image from the Media Uploader, the result is an object
                var uploaded_image = image.state().get('selection').first();
                // We convert uploaded_image to a JSON object to make accessing it easier
                // Output to the console uploaded_image
                console.log(uploaded_image);
                var image_url = uploaded_image.toJSON().url;
                // Let's assign the url value to the input field
                $('#image_url').val(image_url);
            });
    });

    let shippingRatesList = document.getElementById('shipping_rates');

    if (shippingRatesList != null) {
        new ShippingRatesManager(shippingRatesList);
    }

    let productsList = document.getElementById('admin-wordwrap_crud');

    if (typeof productsList != 'undefined') {
        new ProductsList(productsList);
    }
});