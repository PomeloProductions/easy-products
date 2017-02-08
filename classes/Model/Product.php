<?php
/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 2/8/17
 * Time: 2:00 PM
 */

namespace EasyProducts\Model;


use WordWrap\ORM\BaseModel;

class Product extends BaseModel
{

    /**
     * @var String the name of this product to display to the user
     */
    public $name;

    /**
     * @var String the url to the image file that will be used for this product
     */
    public $image_url;

    /**
     * @var String the full description of this product to display to the user
     */
    public $description;

    /**
     * @var int where in the larger list of products this will be displayed
     */
    public $order;

    /**
     * @var float the total weight of the product in pounds
     */
    public $weight;

    /**
     * @var float How much the product will cost
     */
    public $cost;

    /**
     * @var bool
     */
    public $active = false;

    /**
     * Overwrite this in your concrete class. Returns the table name used to
     * store models of this class.
     *
     * @return string the table name without a prefix
     */
    public static function getTableName() {
        return "easy_products_products";
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
            "name" => "VARCHAR(255)",
            "image_url" => "VARCHAR(255)",
            "description" => "TEXT",
            "order" => "INTEGER(11) DEFAULT NULL",
            "weight" => "FLOAT(10,4)",
            "cost" => "FLOAT(10,2)",
            "active" => "TINYINT(1) DEFAULT 0"
        ];
    }
}