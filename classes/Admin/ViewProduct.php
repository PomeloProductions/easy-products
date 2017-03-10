<?php
/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 3/10/17
 * Time: 3:00 AM
 */

namespace EasyProducts\Admin;


use EasyProducts\Model\Product;
use WordWrap\Admin\TaskController;
use WordWrap\Assets\Template\Mustache\MustacheTemplate;
use WordWrap\Assets\View\Editor;

class ViewProduct extends TaskController
{

    /**
     * @var Product the template data needed
     */
    private $product;

    /**
     * override this to setup anything that needs to be done before
     * @param $action string the action the user is trying to complete
     */
    public function processRequest($action = null)
    {

        $this->product = Product::find_one($_GET['id']);

        if ($action == 'edit') {
            $this->product->name = $_POST['name'];
            $this->product->description = $_POST['description'];
            $this->product->weight = $_POST['weight'];
            $this->product->cost = $_POST['cost'];

            $this->product->active = $_POST['active'] == 'on';

            $this->product->save();
        }

        $editor = new Editor($this->lifeCycle, 'description', $this->product->description, 'Description');

        $this->product->description = $editor->export();
    }

    /**
     * override to render the main page
     */
    protected function renderMainContent()
    {
        $template = new MustacheTemplate($this->lifeCycle, 'admin/view_product', $this->product);

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