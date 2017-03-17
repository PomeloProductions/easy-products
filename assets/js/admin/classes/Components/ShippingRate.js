/**
 * Created by bryce on 3/17/17.
 */

export class ShippingRate {

    /**
     * Creates a new instance of a shipping rate
     *
     * @param domNode Node
     */
    constructor (domNode) {

        this.node = domNode;

        let removeButton = this.node.querySelector('.remote_rate');

        removeButton.addEventListener('click', this.remove.bind(this));
    }

    /**
     * Removes this rate from the page
     *
     * @param event Event
     */
    remove (event) {

        if (event) {
            event.preventDefault();
        }

        this.node.parentNode.removeChild(this.node);
    }

}