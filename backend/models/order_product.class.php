<?php

class OrderProduct {
  
  public $order_product_id;
  public $order_id;
  public $product_id;
  public $amount;
  public $price_per_item;
  public $total_price;
  
  // Optional:
  public $product;

  function __construct(
    $order_product_id,
    $order_id,
    $product_id,
    $amount,
    $price_per_item,
    $total_price,
  ) {
    $this->order_product_id = $order_product_id;
    $this->order_id = $order_id;
    $this->product_id = $product_id;
    $this->amount = $amount;
    $this->price_per_item = $price_per_item;
    $this->total_price = $total_price;
  }

}
