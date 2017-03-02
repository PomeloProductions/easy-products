<?php

namespace EasyProducts\Admin\Orders;

use EasyProducts\Model\Order;
use WordWrap\Admin\TaskController;
use WordWrap\Assets\Template\Mustache\MustacheTemplate;

/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 3/1/17
 * Time: 5:46 PM
 */
class ViewAll extends TaskController
{

    /**
     * @var int the current page the user is viewing
     */
    private $page;

    /**
     * @var Order[] All orders to currently list
     */
    private $orders;

    /**
     * @var int how many total pages there are of orders
     */
    private $totalPages;

    /**
     * override this to setup anything that needs to be done before
     * @param $action string the action the user is trying to complete
     */
    public function processRequest($action = null) {

        $this->page = (isset($_GET['page']) ?? 1) - 1;

        $this->orders = Order::fetchPage($this->page);

        $this->totalPages = ceil(Order::countRows() / 20);
    }

    /**
     * override to render the main page
     */
    protected function renderMainContent() {

        $orders = [];

        foreach ($this->orders as $order) {
            $orders[] = [
                'id' => $order->id,
                'name' => $order->name,
                'shipped_message' => $order->shipped ? 'Shipped' : 'Not Shipped'
            ];
        }

        $links = '';

        $i = 0;
        while ($i < $this->totalPages) {

            $data = [
                'page' => $i + 1,
                'active' => $i == $this->page
            ];

            $template = new MustacheTemplate($this->lifeCycle, "admin/orders/page_link", $data);

            $links.= $template->export();

            $i++;
        }

        $data = [
            "orders" => $orders,
            "page_links" => $links,
            "first_page" => $this->page == 0,
            "previous_page" => $this->page - 1,
            "last_page" => $this->page == $this->totalPages - 1,
            "next_page" => $this->page + 1,
        ];

        $template = new MustacheTemplate($this->lifeCycle, "admin/orders/view_all", $data);

        return $template->export();

    }

    /**
     * override to render the main page
     */
    protected function renderSidebarContent() {
    }
}