/**
 * Created by bryce on 2/16/17.
 */

import {ShippingField} from './ShippingField';

export class ShippingManager {

    /**
     * Manages the current state of the shipping options
     *
     * @param form
     * @param cookieFactory CookieFactory
     */
    constructor (form, cookieFactory) {

        ShippingManager.NAME_COOKIE = "name";
        ShippingManager.ADDRESS_1_COOKIE = "address_1";
        ShippingManager.ADDRESS_2_COOKIE = "address_2";
        ShippingManager.CITY_COOKIE = "city";
        ShippingManager.POSTAL_CODE_COOKIE = "postal_code";
        ShippingManager.STATE_COOKIE = "state";
        ShippingManager.COUNTRY_COOKIE = "country";

        let nameInput = form.querySelector("#easy_products-name");
        let address1Input = form.querySelector("#easy_products-address_1");
        let address2Input = form.querySelector("#easy_products-address_2");
        let cityInput = form.querySelector("#easy_products-city");
        let postalCodeInput = form.querySelector("#easy_products-postal_code");
        let stateInput = form.querySelector("#easy_products-state");
        let countrySelect = form.querySelector("#easy_products-country");

        this.nameField = new ShippingField(nameInput, cookieFactory, ShippingManager.NAME_COOKIE);
        this.address1Field = new ShippingField(address1Input, cookieFactory, ShippingManager.ADDRESS_1_COOKIE);
        this.address2Field = new ShippingField(address2Input, cookieFactory, ShippingManager.ADDRESS_2_COOKIE);
        this.cityField = new ShippingField(cityInput, cookieFactory, ShippingManager.CITY_COOKIE);
        this.postalCodeField = new ShippingField(postalCodeInput, cookieFactory, ShippingManager.POSTAL_CODE_COOKIE);
        this.stateField = new ShippingField(stateInput, cookieFactory, ShippingManager.STATE_COOKIE);
        this.countryField = new ShippingField(countrySelect, cookieFactory, ShippingManager.COUNTRY_COOKIE);
    }
}