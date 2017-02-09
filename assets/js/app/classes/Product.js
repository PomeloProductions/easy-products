/**
 * Created by bryce on 2/8/17.
 */

class Product {

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
            })
        }
    }
}