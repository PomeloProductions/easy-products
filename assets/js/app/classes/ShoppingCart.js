/**
 * Created by bryce on 2/8/17.
 */

import {Product} from './Product';

export class ShoppingCart {

    /**
     * Constructor for this shopping cart instance
     *
     * @param productsForm the dom form
     */
    constructor(productsForm) {
        this.productsForm = productsForm;
        let unsortedProducts = [];

        let productContainers = this.productsForm.getElementsByClassName('easy_products-product');

        for (let i = 0; i < productContainers.length; i++) {
            unsortedProducts.push(new Product(productContainers[i]));
        }

        this.products = unsortedProducts.sort(Product.compareWeights).reverse();
    }
}