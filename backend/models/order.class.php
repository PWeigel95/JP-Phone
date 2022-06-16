<?php

class Order {
  
  public $order_id;
  public $user_id;
  public $total_price;
  public $creation_date;
  public $billing_name;
  public $billing_address;
  public $billing_zipcode;
  public $billing_place;
  public $invoice_id;

  public $order_products = array();

  function __construct(
    $order_id,
    $user_id,
    $total_price,
    $creation_date,
    $billing_name,
    $billing_address,
    $billing_zipcode,
    $billing_place,
    $invoice_id,
  ) {
    $this->order_id = $order_id;
    $this->user_id = $user_id;
    $this->total_price = $total_price;
    $this->creation_date = $creation_date;
    $this->billing_name = $billing_name;
    $this->billing_address = $billing_address;
    $this->billing_zipcode = $billing_zipcode;
    $this->billing_place = $billing_place;
    $this->invoice_id = $invoice_id;
  }

  function addProduct($order_product) {
    array_push($this->order_products, $order_product);
  }

}
