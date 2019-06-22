<!doctype html>
<html>
    <head>
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <script src="API.js"></script>
        <script src="APIProdukte.js"></script>
        <link rel="stylesheet" href="./Bootstrap/css/bootstrap.min.css">

        <script src="./Dependencies/jquery.min.js"></script>
        <script src="./Dependencies/popper.min.js"></script>
        <script src="./Bootstrap/js/bootstrap.min.js"></script>
        <link rel="stylesheet" type="text/css" href="overlay.css">
        
    <head>

    <body onload="LoadProducts();">
        <div class="navbar">
            <h1 style="text-align: left; margin-right: 2em; font-size: 4em;">Produkte</h1>
            <form action="../Bartool/index.php">
                <button style="width: 7em;" class="btn btn-primary">Zurück</button>
            </form>
        </div>
        <hr>
        <form action="http://localhost/Bartool/Produkte.php" method="GET">
            <div class="navbar">
                <input style="border-radius: 25px;" class="form-control form-control-lg" type="text" placeholder="Produktname" name="Art" id="a">
                <input style="border-radius: 25px;" class="form-control form-control-lg" type="number" placeholder="Größe in Liter" step="0.01" name="Groesse" id="g">
                <input style="border-radius: 25px;" class="form-control form-control-lg" type="number" placeholder="Preis in Euro" step="0.01"name="Preis" id="p">
                <button style="width: 100%; font-size: 2em;" class="btn btn-secondary btn" type="submit" onclick="InsertProductIntoDB(a.value, g.value ,p.value)">Produkt Hinzufügen</button>
            </div>
        </form> 
        
        <h1 class="CustomH2">Produkte entfernen</h1>
        <div class="navbar" id="products">
        </div>  

        <!-- Product Overlay -->
        <div id="overlay" class="overlay">
            <!-- Button to close the overlay navigation -->
            <a href="javascript:void(0)" class="closebtn" onclick="offProduct()">&times;</a>
            <!-- Overlay content -->
            <div class="overlay-content" id="overlayContent">      
                <div class="navbar" id="productSizes">
                </div>
            </div>
        </div>
    </body>
</html>
