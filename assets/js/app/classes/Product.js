/**
 * Created by bryce on 2/8/17.
 */

export class Product {

    /**
     * Creates a new instance of a product
     *
     * @param productContainer The container that will hold all data for this product
     * @param quantityChangedCallback
     */
    constructor (productContainer, quantityChangedCallback) {

        this.quantityChangedCallback = quantityChangedCallback;

        this.shippingOptions = [];
        this.quantity = 0;
        this.total = 0;

        this.id = productContainer.dataset['id'];
        this.cost = productContainer.dataset['cost'];
        this.weight = productContainer.dataset['weight'];

        let shippingDivs = productContainer.getElementsByClassName('easy_products-shipping_option');

        for (let i = 0; i < shippingDivs.length; i++) {

            let shippingDiv = shippingDivs[i];
            this.shippingOptions.push({
                primary_rate: shippingDiv.dataset['primary_rate'],
                add_on_rate: shippingDiv.dataset['add_on_rate']
            });
        }

        this.quantityInput = productContainer.querySelector('.easy_products-quantity_input');
        this.totalDisplay = productContainer.querySelector('.easy_products-product_total_display');
        this.productTotal = productContainer.querySelector('.easy_products-product_total');

        this.quantityInput.addEventListener('change', this.quantityChanged.bind(this));
    }

    /**
     * Sets the quantity and updates the cost variables
     *
     * @param quantity
     */
    setQuantity (quantity) {
        this.quantity = quantity;
        this.total = quantity * this.cost;

        if (this.quantity != this.quantityInput.value) {
            this.quantityInput.value = this.quantity;
        }

        if (this.total > 0) {
            this.productTotal.innerHTML = this.total.toFixed(2);
            this.totalDisplay.style.display = ''
        }
        else {
            this.totalDisplay.style.display = 'none';
        }
    }

    /**
     * Called when quantity has changed in the input, and will recalculate the totals for this product
     *
     * @param event The event listener
     */
    quantityChanged (event) {

        let quantity = Number(this.quantityInput.value);

        if (isNaN(quantity)) {
            quantity = 0;
        }

        this.setQuantity(quantity);

        if (typeof this.quantityChangedCallback == 'function') {
            this.quantityChangedCallback(this);
        }
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