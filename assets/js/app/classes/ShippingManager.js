/**
 * Created by bryce on 2/16/17.
 */

import {ShippingField} from './ShippingField';

export class ShippingManager {

    /**
     * Manages the current state of the shipping options
     *
     * @param form
     * @param addressChangeCallback function
     * @param cookieFactory CookieFactory
     */
    constructor (form, addressChangeCallback, cookieFactory) {

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

        this.nameField = new ShippingField(nameInput, addressChangeCallback, cookieFactory, ShippingManager.NAME_COOKIE);
        this.address1Field = new ShippingField(address1Input, addressChangeCallback, cookieFactory, ShippingManager.ADDRESS_1_COOKIE);
        this.address2Field = new ShippingField(address2Input, addressChangeCallback, cookieFactory, ShippingManager.ADDRESS_2_COOKIE);
        this.cityField = new ShippingField(cityInput, addressChangeCallback, cookieFactory, ShippingManager.CITY_COOKIE);
        this.postalCodeField = new ShippingField(postalCodeInput, addressChangeCallback, cookieFactory, ShippingManager.POSTAL_CODE_COOKIE);
        this.stateField = new ShippingField(stateInput, addressChangeCallback, cookieFactory, ShippingManager.STATE_COOKIE);
        this.countryField = new ShippingField(countrySelect, addressChangeCallback, cookieFactory, ShippingManager.COUNTRY_COOKIE);
    }

    /**
     * Checks all fields to see if the shipping is ready to go
     *
     * @returns {Boolean}
     */
    checkIfShippingComplete() {

        return this.nameField.checkIfComplete() && this.address1Field.checkIfComplete()
                && this.address2Field.checkIfComplete() && this.cityField.checkIfComplete()
                && this.postalCodeField.checkIfComplete() && this.stateField.checkIfComplete()
                && this.countryField.checkIfComplete();
    }

    /**
     * Bundles the entire address component into a JSON
     *
     * @returns {{name: *, addressLine1: *, addressLine2: *, city: *, postalCode: *, country: {id: *, name: *}}}
     */
    bundleAddress () {

        let selectedOption = this.countryField.field.options[this.countryField.field.selectedIndex];

        return {
            name: this.nameField.field.value,
            addressLine1: this.address1Field.field.value,
            addressLine2: this.address2Field.field.value,
            city: this.cityField.field.value,
            postalCode: this.postalCodeField.field.value,
            country: {
                id: selectedOption.value,
                name: selectedOption.text
            }
        }
    }

    /**
     * Gets the selected region id or undefined if none has been found
     *
     * @returns Boolean|undefined
     */
    getRegionId () {
        return this.countryField.checkIfComplete() ? this.countryField.field.value : undefined;
    }
}