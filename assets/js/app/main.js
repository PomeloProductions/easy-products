/**
 * Created by bryce on 2/8/17.
 */

import {ShoppingCart} from './classes/ShoppingCart';

let productsForm = document.getElementById('easy_products-products_list');

if (typeof productsForm != 'undefined') {
    new ShoppingCart(productsForm);
}