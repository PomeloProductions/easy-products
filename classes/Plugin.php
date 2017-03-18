<?php
/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 3/17/17
 * Time: 11:26 PM
 */

namespace EasyProducts;


use EasyProducts\Model\Product;
use WordWrap\LifeCycle;

class Plugin extends LifeCycle
{

    /**
     * Overrides the parent function in order to setup our custom actions
     */
    public function onInitActionsAndFilters () {
        add_action('wp_ajax_reorder_products', [$this, 'reorderOrders']);
    }

    /**
     * Reorders all of the orders
     */
    public function reorderOrders () {

        for ($i = 0; $i < count($_POST['order']); $i++) {
            $product = Product::find_one($_POST['order'][$i]);

            if ($product) {
                $product->order = $i;

                $product->save();
            }
        }

        exit(json_encode(['status' => 'success']));
    }
}