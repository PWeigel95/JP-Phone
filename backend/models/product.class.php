<?php

class Product {
  
  public $product_id;
  public $name;
  public $price;
  public $description;
  public $image_url;
  public $category_id;

  // Optional, if loaded:
  public $category;

  function __construct(
    $product_id,
    $name,
    $price,
    $description,
    $image_url,
    $category_id,
  ) {
    $this->product_id = $product_id;
    $this->name = $name;
    $this->price = $price;
    $this->description = $description;
    $this->image_url = $image_url;
    $this->category_id = $category_id;
  }

}
