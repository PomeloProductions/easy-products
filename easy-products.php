<?php
/**
 * Plugin Name: Easy Products
 * Plugin URI: https://github.com/pomeloproductions/easy-products
 * Version: 0.3.1
 * Author: Pomelo Productions
 * Description: Easily manage products, and allow users to add products to a shopping cart
 * Text Domain: easy-products
 * License: GPLv3
 */

namespace EasyProducts;

use WordWrap;

function showInstallErrorMessage(){
    echo '<div class="error"><p>Sorry, but Easy Products requires Word Wrap to be installed and active.</p></div>';
}

function hasWordWrap() {
    if ( is_admin() && current_user_can( 'activate_plugins' ) &&  !is_plugin_active( 'word-wrap/word-wrap.php' ) ) {
        add_action( 'admin_notices', '\EasyProducts\showInstallErrorMessage' );

        deactivate_plugins( plugin_basename( __FILE__ ) );

        if ( isset( $_GET['activate'] ) ) {
            unset( $_GET['activate'] );
        }
    }
}

add_action( 'admin_init', '\EasyProducts\hasWordWrap' );

require ('vendor/autoload.php');

include_once(__DIR__ . '/../word-wrap/word-wrap.php');
WordWrap::init(basename(__DIR__));
