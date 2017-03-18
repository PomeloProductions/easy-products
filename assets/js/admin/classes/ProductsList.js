/**
 * Created by bryce on 3/17/17.
 */

import 'jquery-sortable';

export class ProductsList {

    constructor(productsTable) {

        let options = {
            perPageSelect: []
        };
        jQuery(productsTable).find('tbody').sortable({
            itemSelector: 'tr'
        });
    }
}