<!doctype html>
<html>
    <head>
        <h1 style="border-bottom-style: solid; text-align: center; font-size: 4em;">Produkte</h1>
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <script src="API.js"></script>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="overlay.css">

      <!--  <script type="text/javascript">
            jQuery(function($){
                $('#add').load('http://localhost/Bartool #productButtons');
            });
        </script> -->
    <head>

    <body>

    <form action="http://localhost/Bartool/index.php">
            <button style="position: fixed; top: 0; right: 0; width: 30%; height: 6%; font-size: 2em;" class="btn btn-primary">Zurück</button>
        </form>
       

        <div>
            <form action="http://localhost/Bartool/index.php" method="get" class="form-group">
                <input style="width: 60%; float: left; font-size: 3em;" type="text" id="productName" placeholder="Produkt Name" name="productName">
                <?php $productName = $_GET['productName'] ?>
                
                <button style="float: right; position: fixed; width: 35%; font-size: 3em;" type="submit" class="btn btn-secondary">Produkt hinzufügen</button>
            </form>
        </div>
    </body>
</html>
