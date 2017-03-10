<?php
namespace EasyProducts\Admin;

use WordWrap\Admin\TaskController;
use WordWrap\Assets\Template\Mustache\MustacheTemplate;

/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 3/10/17
 * Time: 1:23 AM
 */
class Index extends TaskController
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
        $template = new MustacheTemplate($this->lifeCycle, "admin/index", []);

        return $template->export();
    }

    /**
     * override to render the main page
     */
    protected function renderSidebarContent()
    {
        // TODO: Implement renderSidebarContent() method.
    }
}