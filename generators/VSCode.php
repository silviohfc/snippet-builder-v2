<?php 
  class VSCode {
    public function __construct() {
      $this->displayName = "VS Code";
      $this->color = "#0078d7";
      $this->textColor = "white";
    }

    public function generate($snippets) {
      $configArray = array();

      foreach($snippets as $trigger => $config) {
        $parsedConfig = json_decode($config);
        
        $codeParts = preg_split("/(\n)/", $parsedConfig->code);
        $tempObject = (object)array(
          "prefix" => $trigger, 
          "body" => $codeParts,
          "description" => $parsedConfig->description
        );

        $configArray[$trigger] = $tempObject;
      }

      return json_encode($configArray);
    }
  }
?>
