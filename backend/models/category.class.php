<?php

class Category {
  
  public $category_id;
  public $name;

  function __construct(
    $category_id,
    $name,
  ) {
    $this->category_id = $category_id;
    $this->name = $name;
  }

}
