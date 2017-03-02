<?php
/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 3/1/17
 * Time: 7:44 PM
 */

namespace EasyProducts\Admin\Orders;


use EasyProducts\Model\Order;
use Exception;
use WordWrap\Admin\TaskController;
use WordWrap\Assets\Template\Mustache\MustacheTemplate;

class ViewOrder extends TaskController
{

    /**
     * @var Order The order we are viewing
     */
    private $order;

    /**
     * override this to setup anything that needs to be done before
     * @param $action string the action the user is trying to complete
     * @throws Exception
     */
    public function processRequest($action = null) {

        $this->order = Order::find_one($_GET['id']);

        if (!$this->order) {
            throw new Exception('Order not found');
        }
    }

    /**
     * override to render the main page
     */
    protected function renderMainContent() {

        $template = new MustacheTemplate($this->lifeCycle, "admin/orders/view_order", $this->order);

        return $template->export();
    }

    /**
     * override to render the main page
     */
    protected function renderSidebarContent() {
        // TODO: Implement renderSidebarContent() method.
    }
}