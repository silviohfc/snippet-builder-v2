<?php
  $className = isset($_POST['className']) ? $_POST['className'] : null;
  $snippets = isset($_POST['snippets']) ? $_POST['snippets'] : null;

  if(!isset($snippets)) {
    echo json_encode((object)array());
    return;
  }

  require_once("./generators/".$className.".php");

  $instance = new $className;

  echo $instance->generate($snippets);
?>