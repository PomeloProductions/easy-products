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
     * Marks the object as having been shipped
     */
    public function shipped () {
        $this->shipped = true;
        $this->save();
    }

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
            'name' => 'VARCHAR(255)',
            'address_line_1' => 'VARCHAR(255)',
            'address_line_2' => 'VARCHAR(255)',
            'postal_code' => 'VARCHAR(255)',
            'state' => 'VARCHAR(255)',
            'region_id' => 'INTEGER(11)',
            'amount' => 'FLOAT(11, 2)',
            'reference_number' => 'VARCHAR(255)',
            'shipped' => 'TINYINT(1) DEFAULT 0'
        ];
    }

    /**
     * Creates a new order object
     *
     * @param String $name
     * @param String $addressLine1
     * @param String $addressLine2
     * @param String $postalCode
     * @param String $state
     * @param Region $region
     * @param float $amount
     * @param String $referenceNumber
     * @return Order The new order object
     */
    public static function create (String $name, String $addressLine1, String $addressLine2,
                                    String $postalCode, String $state, Region $region, float $amount,
                                    String $referenceNumber) : Order{

        $order = new Order();

        $order->name = $name;
        $order->address_line_1 = $addressLine1;
        $order->address_line_2 = $addressLine2;
        $order->postal_code = $postalCode;
        $order->state = $state;
        $order->region_id = $region->id;
        $order->amount = $amount;
        $order->reference_number = $referenceNumber;

        $order->save();

        return $order;
    }

    /**
     * Fetches all orders that have been shipped or not shipped
     *
     * @param $shipped
     * @return Order[]
     * @throws \Exception
     */
    public static function fetchShipped ($shipped = true) {
        return self::fetchWhere(['shipped' => $shipped ? '1' : '0']);
    }
}