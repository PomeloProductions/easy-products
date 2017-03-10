<?php
/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 3/10/17
 * Time: 4:11 AM
 */

namespace EasyProducts\Admin;



class CreateProduct extends ViewProduct
{


    /**
     * override this to setup anything that needs to be done before
     * @param $action string the action the user is trying to complete
     */
    public function processRequest($action = null)
    {
        parent::processRequest($action);

        if ($action == 'save') {
            header('Location: /wp-admin/admin.php?page=easy_products&task=view_product&id=' . $this->product->id);
            exit;
        }
    }
}