<?php
/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 2/4/17
 * Time: 4:26 PM
 */

namespace EasyProducts\Model;

use WordWrap\ORM\BaseModel;

class Region extends BaseModel
{

    /**
     * @var string The name of the region
     */
    public $name;

    /**
     * Overwrite this in your concrete class. Returns the table name used to
     * store models of this class.
     *
     * @return string the table name without a prefix
     */
    public static function getTableName() {
        return "regions";
    }

    /**
     * Get an array of fields to search during a search query.
     *
     * @return array
     */
    public static function getSearchableFields() {
        // TODO: Implement get_searchable_fields() method.
    }

    /**
     * Get an array of all fields for this Model with a key and a value
     * The key should be the name of the column in the database and the value should be the structure of it
     *
     * @return array
     */
    public static function getFields() {
        return [
            'name' => 'VARCHAR(255)'
        ];
    }

    /**
     * Fetches all regions ordered by their name descending
     *
     * @return Region[]
     */
    public static function fetchAll () {
        return static::fetchOrderedBy('name', 'ASC');
    }
}