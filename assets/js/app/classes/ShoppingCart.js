/**
 * Created by bryce on 2/8/17.
 */

import {Product} from './Product';
import {CookieFactory} from './CookieFactory';
import {ShippingManager} from './ShippingManager';

export class ShoppingCart {

    /**
     * Constructor for this shopping cart instance
     *
     * @param productsForm the dom form
     */
    constructor (productsForm) {
        ShoppingCart.PRODUCTS_COOKIE = 'product_quantities';

        this.productsForm = productsForm;

        this.subtotalDisplay = this.productsForm.querySelector('#easy_products-subtotal');
        this.shippingDisplay = this.productsForm.querySelector('#easy_products-shipping_total');
        this.totalDisplay = this.productsForm.querySelector('#easy_products-total');

        this.submitButton = this.productsForm.querySelector('#easy_products-submit');

        this.cookieFactory = new CookieFactory('easy_products');

        this.productQuantities = this.cookieFactory.loadJSON(ShoppingCart.PRODUCTS_COOKIE);
        let unsortedProducts = [];

        let productContainers = this.productsForm.getElementsByClassName('easy_products-product');

        for (let i = 0; i < productContainers.length; i++) {

            let product = new Product(productContainers[i], this.quantityChanged.bind(this));

            let storedQuantity = this.productQuantities[product.id];

            if (typeof storedQuantity != 'number') {
                storedQuantity = 0;
            }

            product.setQuantity(storedQuantity);

            unsortedProducts.push(product);
        }

        this.products = unsortedProducts.sort(Product.compareWeights).reverse();

        this.shippingManager = new ShippingManager(this.productsForm, this.checkShippingAddress.bind(this), this.cookieFactory);

        this.calculateTotals();
    }

    /**
     * checks to see if the shipping address has been changed
     */
    checkShippingAddress () {

        if (this.shippingManager.checkIfShippingComplete()) {
            this.calculateTotals();
        }
        else {
            this.shippingDisplay.innerHTML = 'Please Enter Your Shipping Address';
            this.totalDisplay.innerHTML = 'Please Enter Your Shipping Address';

            this.submitButton.disabled = true;
        }
    }

    /**
     * Called whenever a quantity has changed
     *
     * @param product Product
     */
    quantityChanged (product) {
        this.productQuantities[product.id] = product.quantity;
        this.cookieFactory.saveJSON(ShoppingCart.PRODUCTS_COOKIE, this.productQuantities);

        this.calculateTotals();
    }

    /**
     * Recalculates all totals
     */
    calculateTotals () {

        let subtotal = 0;
        for (let i = 0; i < this.products.length; i++) {
            subtotal+= this.products[i].total;
        }

        this.subtotalDisplay.innerHTML = '$' + subtotal.toFixed(2);

        if (this.shippingManager.checkIfShippingComplete()) {

            let shippingTotal = 0;
            let regionId = this.shippingManager.getRegionId();

            for (let i = 0; i < this.products.length; i++) {
                let product = this.products[i];

                if (product.quantity) {

                    let shippingRates = product.retrieveShippingRates(regionId);

                    let addOnQuantity = product.quantity;

                    if (shippingTotal == 0) {
                        shippingTotal+= shippingRates.primary_rate;
                        addOnQuantity--;
                    }
                    if (addOnQuantity) {
                        shippingTotal+= shippingRates.add_on_rate * addOnQuantity;
                    }
                }
            }

            this.shippingDisplay.innerHTML = '$' + shippingTotal.toFixed(2);

            this.total = subtotal + shippingTotal;

            this.totalDisplay.innerHTML = '$' + this.total.toFixed(2);

            this.submitButton.disabled = false;
        }
    }
}