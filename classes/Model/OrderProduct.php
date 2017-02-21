<?php
/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 2/21/17
 * Time: 4:16 PM
 */

namespace EasyProducts\Model;


use WordWrap\ORM\BaseModel;

class OrderProduct extends BaseModel
{

    /**
     * @var int the primary id of the order
     */
    public $order_id;

    /**
     * @var int the primary id of the product
     */
    public $product_id;

    /**
     * @var int how many products were purchased
     */
    public $quantity;

    /**
     * Overwrite this in your concrete class. Returns the table name used to
     * store models of this class.
     *
     * @return string the table name without a prefix
     */
    public static function getTableName() {
        return "easy_products_order_products";
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
            'order_id' => 'INTEGER(11) NOT NULL',
            'product_id' => 'INTEGER(11) NOT NULL',
            'quantity' => 'INTEGER(11) NOT NULL'
        ];
    }

    /**
     * Creates a brand new order product model
     *
     * @param Order $order
     * @param Product $product
     * @param int $quantity
     * @return OrderProduct
     */
    public static function create (Order $order, Product $product, int $quantity) : OrderProduct {

        $orderProduct = new OrderProduct();

        $orderProduct->order_id = $order->id;
        $orderProduct->product_id = $product->id;
        $orderProduct->quantity = $quantity;

        $orderProduct->save();

        return $orderProduct;
    }

    /**
     * Fetches all order products associated with an order
     *
     * @param Order $order
     * @return OrderProduct[]
     * @throws \Exception
     */
    public static function fetchForOrder (Order $order) {

        return static::fetchWhere(['order_id' => $order->id]);
    }
}