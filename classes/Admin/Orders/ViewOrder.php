<?php
/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 3/1/17
 * Time: 7:44 PM
 */

namespace EasyProducts\Admin\Orders;


use EasyProducts\Model\Order;
use EasyProducts\Model\OrderProduct;
use EasyProducts\Model\Product;
use EasyProducts\Model\Region;
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
     * @var Region[] All available regions for
     */
    private $regions;

    /**
     * @var OrderProduct[] All order products for the associated order
     */
    private $orderProducts;

    /**
     * @var Product[] All products in the system
     */
    private $products;

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

        $this->regions = Region::fetchAll();

        $this->products = Product::fetchAll();

        $this->orderProducts = OrderProduct::fetchForOrder($this->order);

        if ($action == 'edit') {
            $this->updateOrder();
        }
    }

    /**
     * updates the order data based on the post info that was passed in
     */
    private function updateOrder() {

        $this->order->name = $_POST['name'];
        $this->order->address_line_1 = $_POST['address_line_1'];
        $this->order->address_line_2 = $_POST['address_line_2'];
        $this->order->postal_code = $_POST['postal_code'];
        $this->order->state = $_POST['state'];
        $this->order->amount = $_POST['amount'];
        $this->order->region_id = $_POST['region_id'];
        $this->order->reference_number = $_POST['reference_number'];
        $this->order->shipped = $_POST['shipped'] == 'on';

        $this->order->save();

        foreach ($this->orderProducts as $orderProduct) {
            foreach ($_POST['quantities'] as $orderProductId => $quantity) {

                if ($orderProduct->id == $orderProductId) {
                    $orderProduct->quantity = $quantity;

                    $orderProduct->save();
                }
            }
        }
    }

    /**
     * override to render the main page
     */
    protected function renderMainContent() {

        $data = (array) $this->order;

        $data['regions'] = [];

        foreach ($this->regions as $region) {
            $data['regions'][] = [
                'id' => $region->id,
                'name' => $region->name,
                'selected' => $region->id == $this->order->region_id
            ];
        }

        $data['products'] = [];

        foreach ($this->products as $product) {
            foreach ($this->orderProducts as $orderProduct) {

                if ($product->id == $orderProduct->product_id) {

                    $data['products'][] = [
                        'order_product_id' => $orderProduct->id,
                        'quantity' => $orderProduct->quantity,
                        'name' => $product->name
                    ];
                }
            }
        }

        $template = new MustacheTemplate($this->lifeCycle, "admin/orders/view_order", $data);

        return $template->export();
    }

    /**
     * override to render the main page
     */
    protected function renderSidebarContent() {
        // TODO: Implement renderSidebarContent() method.
    }
}