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
    }
}