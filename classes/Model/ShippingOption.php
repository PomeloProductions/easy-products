<?php
/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 2/8/17
 * Time: 3:06 PM
 */

namespace EasyProducts\Model;


use WordWrap\ORM\BaseModel;

class ShippingOption extends BaseModel
{

    /**
     * @var int the key to the product for this shipping option
     */
    public $product_id;

    /**
     * @var Product the product model for this shipping option
     */
    public $product;

    /**
     * @var int the key to the region for this shipping option
     */
    public $region_id;

    /**
     * @var Region the region mode for this shipping option
     */
    public $region;

    /**
     * @var float the primary rate if the linked product is the biggest product
     */
    public $primary_rate;

    /**
     * @var float the amount to add on if the linked product is not the largest product by weight in the
     *              users shopping cart
     */
    public $add_on_rate;

    /**
     * Overwrite this in your concrete class. Returns the table name used to
     * store models of this class.
     *
     * @return string the table name without a prefix
     */
    public static function getTableName() {
        return "easy_products_shipping_options";
    }

    /**
     * Get an array of fields to search during a search query.
     *
     * @return array
     */
    public static function getSearchableFields()
    {
        // TODO: Implement getSearchableFields() method.
    }

    /**
     * Get an array of all fields for this Model with a key and a value
     * The key should be the name of the column in the database and the value should be the structure of it
     *
     * @return array
     */
    public static function getFields() {
        return [
            "product_id" => "INTEGER(11)",
            "region_id" => "INTEGER(11)",
            "primary_rate" => "FLOAT(10,2)",
            "add_on_rate" => "FLOAT(10,2)"
        ];
    }
}