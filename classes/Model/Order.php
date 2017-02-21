<?php
/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 2/21/17
 * Time: 3:35 PM
 */

namespace EasyProducts\Model;


use WordWrap\ORM\BaseModel;

class Order extends BaseModel
{

    /**
     * @var string the name of the person that the order is for
     */
    public $name;

    /**
     * @var string the first line of the address
     */
    public $address_line_1;

    /**
     * @var string the second line of the address
     */
    public $address_line_2;

    /**
     * @var string the postal delivery code for this order
     */
    public $postal_code;

    /**
     * @var string the city for the shipping address
     */
    public $city;

    /**
     * @var string the state for the shipping address
     */
    public $state;

    /**
     * @var int the primary key of the region the address is for
     */
    public $region_id;

    /**
     * @var float the amount recorded for the order
     */
    public $amount;

    /**
     * @var string Any reference number to a transaction that was recorded
     */
    public $reference_number;

    /**
     * @var bool whether or not this order has been shipped
     */
    public $shipped = false;

    /**
     * Overwrite this in your concrete class. Returns the table name used to
     * store models of this class.
     *
     * @return string the table name without a prefix
     */
    public static function getTableName() {
        return "easy_products_orders";
    }

    /**
     * Get an array of fields to search during a search query.
     *
     * @return array
     */
    public static function getSearchableFields() {
    }

    /**
     * Get an array of all fields for this Model with a key and a value
     * The key should be the name of the column in the database and the value should be the structure of it
     *
     * @return array
     */
    public static function getFields() {

        return [
            'name' => 'VARCHAR(255) ALLOW NULL',
            'address_line_1' => 'VARCHAR(255) ALLOW NULL',
            'address_line_2' => 'VARCHAR(255) ALLOW NULL',
            'postal_code' => 'VARCHAR(255) ALLOW NULL',
            'state' => 'VARCHAR(255) ALLOW NULL',
            'region_id' => 'INTEGER(11) ALLOW NULL',
            'amount' => 'FLOAT(11, 2) ALLOW NULL',
            'reference_number' => 'VARCHAR(255) ALLOW NULL',
            'shipped' => 'TINYINT(1) DEFAULT 0'
        ];
    }
}