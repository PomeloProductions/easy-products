/**
 * Created by bryce on 2/8/17.
 */

export class Product {

    /**
     * Creates a new instance of a product
     *
     * @param productContainer The container that will hold all data for this product
     */
    constructor (productContainer) {

        this.id = productContainer.dataset['id'];
        this.cost = productContainer.dataset['cost'];
        this.weight = productContainer.dataset['weight'];

        this.shippingOptions = [];

        let shippingDivs = productContainer.getElementsByClassName('easy_products-shipping_option');

        for (let i = 0; i < shippingDivs.length; i++) {

            let shippingDiv = shippingDivs[i];
            this.shippingOptions.push({
                primary_rate: shippingDiv.dataset['primary_rate'],
                add_on_rate: shippingDiv.dataset['add_on_rate']
            });
        }

        this.quantityInput = productContainer.querySelector('.easy_products-quantity_input');

        this.quantityInput.addEventListener('change', this.quantityChanged.bind(this));
    }

    /**
     * Called when quantity has changed in the input, and will recalculate the totals for this product
     *
     * @param event The event listener
     */
    quantityChanged (event) {

        console.log('changed');
    }

    /**
     * Compare function for comparing weights of two products
     *
     * @param a Product
     * @param b Product
     * @returns {number}
     */
    static compareWeights (a, b) {
        if (a.weight < b.weight) {
            return -1;
        }
        if (a.weight > b.weight) {
            return 1;
        }
        return 0;
    }
}