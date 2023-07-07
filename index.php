<!doctype html>
<html lang="en" data-bs-theme="light">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Snippet Builder</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./style.css">
  </head>
  <body>
    <div class="d-flex h-100 flex-column">

      <!-- NAVBAR -->
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-sm d-flex justify-content-between p-0">
          <a class="navbar-brand" href="#">Snippet Builder</a>
          <div class="row">
            <div class="col-md-6 align-self-center">
              <div class="form-check form-switch">
                <label class="form-check-label" for="themeSwitch">Dark Mode</label>
                <input class="form-check-input" type="checkbox" role="switch" id="themeSwitch">
              </div>
            </div>
            <div class="col-md-6">
              <button class="btn btn-outline-success" type="button" id="buttonTestBuild" data-bs-toggle="modal" data-bs-target="#modalBuild"><i class="bi bi-braces"></i> Generate</button>
            </div>
          </div>
        </div>
      </nav>

      <div class="container-fluid flex-grow-1 pt-3 pb-3">
        <div class="container-sm p-0 h-100">
          <div class="row h-100">
            <div class="col-md-9 d-flex flex-column h-100">
              <div class="row">
                <div class="col-md-3">
                  <label for="inputTrigger" class="form-label">Trigger</label>
                  <input type="text" id="inputTrigger" class="form-control">
                </div>
                <div class="col-md-9">
                  <label for="inputDescription" class="form-label">Description</label>
                  <input type="text" id="inputDescription" class="form-control">
                </div>
              </div>
              <div class="row h-100">
                <div class="col-md-12 mt-3 flex-grow-1">
                  <div class="h-100 border" id="code-editor"></div>
                </div>
              </div>
            </div>
            <div class="col-md-3 d-flex flex-column h-100">
              <div class="row">
                <label class="mb-2">Saved Snippets</label>
              </div>
              <div class="row h-100 mh-100 overflow-auto">
                <div class="list-group">
                  
                </div>
              </div>
              <div class="row">
                <button type="submit" class="btn btn-success mt-3" id="button-save"><i class="bi bi-plus-lg"></i> Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="modal fade modal-xl" id="modalBuild" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row h-100">
              <div class="col-md-7 d-flex flex-column align-items-center text-center">
                <h3>Test</h3>
                <span>(Ctrl + Space to show your snippets)</span>
                <div class="h-100 w-100 mt-3 border text-start" id="test-code-editor"></div>
              </div>
              <div class="col-md-5 d-flex flex-column align-items-center text-center">
                <h3>Generate</h3>
                <span>(Select your favorite code editor)</span>
                <div class="w-100 h-50 mt-3 select-code-editors d-flex flex-column overflow-auto">
                  <?php 
                    $files = glob('./generators/*.php');
                    foreach ($files as $file) {
                      require($file);
                      
                      $classFileName = substr($file, 13);
                      $className = substr($classFileName, 0, -4);
                        
                        
                      $instance = new $className;
                      
                      echo '<button 
                                class="btn w-100 mb-1"
                                id="'.get_class($instance).'" 
                                style="background-color: '.$instance->color.'; color: '.$instance->textColor.';"
                                onclick="copyGeneratedSnippets(this)"
                                >'.$instance->displayName.'</button>';
                    }
                  ?>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <script src="./monaco-editor/min/vs/loader.js"></script>
    <script src="./editor.js"></script>
    <script src="./form.js"></script>
  </body>
</html>