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

        this.shippingManager = new ShippingManager(this.productsForm, this.cookieFactory);

        this.calculateTotals();
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
    }
}