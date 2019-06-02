<!doctype html>
<html>
    <head>
        <h1 style="border-bottom-style: solid; text-align: left; font-size: 4em;">Produkte</h1>
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <script src="API.js"></script>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="overlay.css">

        <!-- load available products
        <script type="text/javascript">
            jQuery(function($){
                $('#available').load('http://localhost/Bartool #products');
            });
        </script>
        -->
    <head>

    <body>

    <form action="http://localhost/Bartool/index.php">
            <button style="position: fixed; top: 0; right: 0; width: 30%; font-size: 1.8em;" class="btn btn-primary">Zurück</button>
        </form>
       
        
        <form action="http://localhost/Bartool/Produkte.php" method="GET">
            <div class="form-group">
                <input type="text" placeholder="Produktname" name="Art" id="a" class="wantclick">
                <input type="number" placeholder="Größe in Liter" step="0.01" name="Groesse" id="g">
                <input type="number" placeholder="Preis in Euro" step="0.01"name="Preis" id="p">
                <button style="float:right;" class="btn btn-secondary btn" type="submit" onclick="InsertProductIntoDB(a.value, g.value ,p.value)">Produkt Hinzufügen</button>
            </div>
        </form> 
        
        


        <div id="available">
        </div>
    </body>
</html>
