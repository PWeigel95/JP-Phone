<?php

class Product {
  
  public $product_id;
  public $name;
  public $price;
  public $description;
  public $image_url;

  function __construct(
    $product_id,
    $name,
    $price,
    $description,
    $image_url,
  ) {
    $this->product_id = $product_id;
    $this->name = $name;
    $this->price = $price;
    $this->description = $description;
    $this->image_url = $image_url;
  }

}
