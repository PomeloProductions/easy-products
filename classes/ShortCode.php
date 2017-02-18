<?php

namespace EasyProducts;

use EasyProducts\Model\Product;
use EasyProducts\Model\Region;
use EasyProducts\Model\ShippingOption;
use WordWrap\Assets\Script\JavaScript;
use WordWrap\Assets\Template\Mustache\MustacheTemplate;
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

        $submitCallback = $atts['submit_callback'] ?? null;

        $products = Product::fetchAllActive();

        foreach ($products as $product) {
            $product->shippingOptions = ShippingOption::fetchForProduct($product);
        }

        $data = [
            'submit_button_text' => 'Checkout',
            'regions' => Region::fetchAll(),
            'products' => $products
        ];

        if ($submitCallback) {
            $data['submit_callback'] = $submitCallback;
        }

        $template = new MustacheTemplate($this->lifeCycle, "products", $data);

        $content = $template->export();

        $js = new JavaScript($this->lifeCycle, 'app.min');

        $content.= $js->export();

        return $content;
    }

    public function addScript() {
        // TODO: Implement addScript() method.
    }
}