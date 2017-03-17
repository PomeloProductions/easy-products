/**
 * Created by bryce on 3/17/17.
 */

export class ShippingRateTemplate {

    /**
     * Creates a new template holder for easily duplicating the shipping rate template
     *
     * @param templateContent Node
     */
    constructor(templateContent) {

        this.template = templateContent.cloneNode(true);

        let regionSelect = this.template.querySelector('.shipping_rate-region');

        regionSelect.selectedIndex = 0;

        let inputs = this.template.getElementsByTagName('input');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }

    }

    /**
     * Clones the template, so a new node can be added to the page
     *
     * @returns {Node}
     */
    cloneTemplate () {
        return this.template.cloneNode(true);
    }
}