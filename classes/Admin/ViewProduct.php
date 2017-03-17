<?php
/**
 * Created by PhpStorm.
 * User: bryce
 * Date: 3/10/17
 * Time: 3:00 AM
 */

namespace EasyProducts\Admin;


use EasyProducts\Model\Product;
use EasyProducts\Model\Region;
use EasyProducts\Model\ShippingOption;
use WordWrap\Admin\TaskController;
use WordWrap\Assets\Template\Mustache\MustacheTemplate;
use WordWrap\Assets\View\Editor;

class ViewProduct extends TaskController
{

    /**
     * @var Product the template data needed
     */
    protected $product;

    /**
     * @var ShippingOption the default shipping rate for this product
     */
    private $defaultRate;

    /**
     * override this to setup anything that needs to be done before
     * @param $action string the action the user is trying to complete
     */
    public function processRequest($action = null)
    {

        if (isset ($_GET['id'])) {
            $this->product = Product::find_one($_GET['id']);
        }
        else {
            $this->product = new Product();
        }

        for ($i = 0; $i < count($this->product->shippingOptions); $i++) {

            $shippingOption = $this->product->shippingOptions[$i];
            if (!$shippingOption->region_id) {

                $this->defaultRate = $shippingOption;
            }
        }

        if (!$this->defaultRate) {
            $this->defaultRate = new ShippingOption();
        }

        if ($action == 'save') {
            $this->product->name = $_POST['name'];
            $this->product->description = $_POST['description'];
            $this->product->weight = $_POST['weight'];
            $this->product->cost = $_POST['cost'];
            $this->product->image_url = $_POST['image_url'];

            $this->product->active = $_POST['active'] == 'on';

            $this->product->save();
        }
    }

    /**
     * override to render the main page
     */
    protected function renderMainContent()
    {
        $editor = new Editor($this->lifeCycle, 'description', $this->product->description, 'Description');
        $regions = Region::fetchAll();

        $shippingOptions = [];

        foreach ($this->product->shippingOptions as $shippingOption) {
            if ($shippingOption->region_id) {

                $shippingOption->regions = $regions;

                foreach ($shippingOption->regions as $region) {

                    if ($region->id == $shippingOption->region_id) {
                        $region->selected = true;
                    }
                }

                $shippingOptions[] = $shippingOption;
            }
        }

        $data = [
            'regions' => $regions,
            'shipping_options' => $shippingOptions,
            'product' => $this->product,
            'description' => $editor->export(),
            'default_rate' => $this->defaultRate
        ];

        $template = new MustacheTemplate($this->lifeCycle, 'admin/view_product', $data);

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