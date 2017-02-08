<?php

namespace EasyProducts;

use EasyProducts\Model\Product;
use EasyProducts\Model\ShippingOption;
use WordWrap\ShortCodeLoader;

/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 2/8/17
 * Time: 4:38 PM
 */
class ShortCode extends ShortCodeLoader
{


    /**
     * Where the short code gets called
     *
     * @param  $atts array shortcode inputs
     * @return string shortcode content
     */
    public function onShortcode($atts) {

        $products = Product::fetchAllActive();

        foreach ($products as $product) {
            $product->shippingOptions = ShippingOption::fetchForProduct($product);
        }

        return 'products short code';
    }

    public function addScript() {
        // TODO: Implement addScript() method.
    }
}