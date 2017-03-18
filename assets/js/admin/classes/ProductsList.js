/**
 * Created by bryce on 3/17/17.
 */

import 'jquery-sortable';

export class ProductsList {

    constructor(productsTable) {

        this.products = document.getElementsByClassName('crud_rows');
        jQuery(productsTable).find('tbody').sortable({
            itemSelector: 'tr'
        });

        jQuery(productsTable).find('tr').on('mouseup', this.reorderedProducts.bind(this));
        jQuery(productsTable).find('tr').on('touchend', this.reorderedProducts.bind(this));
    }

    /**
     * Reorders the products on the server
     */
    reorderedProducts () {

        setTimeout(function() {
            let newOrder = [];

            for (let i = 0; i < this.products.length; i++) {
                newOrder.push(this.products[i].dataset['id']);
            }

            console.log(newOrder);
            jQuery.ajax('/wp-admin/admin-ajax.php', {
                method: 'POST',
                data: {
                    action: 'reorder_products',
                    order: newOrder
                }
            });
        }.bind(this), 10);
    }
}