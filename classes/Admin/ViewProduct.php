<?php
/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 3/10/17
 * Time: 3:00 AM
 */

namespace EasyProducts\Admin;


use WordWrap\Admin\TaskController;

class ViewProduct extends TaskController
{

    /**
     * override this to setup anything that needs to be done before
     * @param $action string the action the user is trying to complete
     */
    public function processRequest($action = null)
    {
        // TODO: Implement processRequest() method.
    }

    /**
     * override to render the main page
     */
    protected function renderMainContent()
    {
        // TODO: Implement renderMainContent() method.
    }

    /**
     * override to render the main page
     */
    protected function renderSidebarContent()
    {
        // TODO: Implement renderSidebarContent() method.
    }
}