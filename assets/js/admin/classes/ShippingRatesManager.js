/**
 * Created by bryce on 3/17/17.
 */

import {ShippingRate} from './Components/ShippingRate';
import {ShippingRateTemplate} from './Components/ShippingRateTemplate';

export class ShippingRatesManager {

    /**
     * Creates a new shipping rate manager for keeping track of all shipping rates
     *
     * @param shippingRatesList Node
     */
    constructor (shippingRatesList) {

        this.shippingRateList = shippingRatesList;

        let shippingRates = document.getElementsByClassName('shipping_rate_specific');

        if (!shippingRates.length) {
            throw error('No shipping rates found on this page');
        }

        for (let i = 0; i < shippingRates.length; i++) {
            new ShippingRate(shippingRates[i]);
        }

        this.template = new ShippingRateTemplate(shippingRates[0]);

        let addButton = document.querySelector('#btn_add_shipping_rate');

        addButton.addEventListener('click', this.addShippingRate.bind(this));
    }

    /**
     * Adds a shipping rate to the page
     *
     * @param event Event
     */
    addShippingRate (event) {
        if (event) {
            event.preventDefault();
        }

        let newNode = this.template.cloneTemplate();

        new ShippingRate(newNode);

        this.shippingRateList.appendChild(newNode);
    }
}