/**
 * Created by bryce on 2/8/17.
 */

import {Product} from './Product';
import {CookieFactory} from './CookieFactory';

export class ShoppingCart {

    /**
     * Constructor for this shopping cart instance
     *
     * @param productsForm the dom form
     */
    constructor (productsForm) {
        ShoppingCart.PRODUCTS_COOKIE = 'product_quantities';

        this.productsForm = productsForm;
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
    }

    /**
     * Called whenever a quantity has changed
     *
     * @param product Product
     */
    quantityChanged (product) {
        this.productQuantities[product.id] = product.quantity;
        this.cookieFactory.saveJSON(ShoppingCart.PRODUCTS_COOKIE, this.productQuantities);
    }
}