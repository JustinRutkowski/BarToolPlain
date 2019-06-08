<!doctype html>
<html>
    <head>
        <h1 style="text-align: left; font-size: 4em;">Auswahl</h1>     
        <form action="../Bartool/Produkte.php">
            <button id="productCollection" style="position: absolute; float: right; top: 0; right: 0; width: 40%; font-size: 2em;" class="btn btn-primary">Produkte</button>
        </form> 
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <script src="API.js"></script>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="overlay.css">
    <head>   
    
    <body onload="LoadDBData(); setQuantity(1)">
    <label id="heading" style="color: white; padding-bottom: 10px;" for="productButtons"><?php echo @$_GET['name'] ?></label>
        <!-- Product Buttons -->
        <div id="products">

        <!--
            <button type="submit" class="btn btn-secondary btn-lg" value="Cola" name="name" id="Cola" onclick="on(id)"></button>
            <button type="submit" class="btn btn-secondary btn-lg" value="Fanta" name="name" id="Fanta" onclick="on(id)"></button>
            <button type="submit" class="btn btn-secondary btn-lg" value="Kaffee" name="name" id="Kaffee" onclick="on(id)"></button>
            <button type="submit" class="btn btn-secondary btn-lg" value="Sekt" name="name" id="Sekt" onclick="on(id)"></button>
            <button type="submit" class="btn btn-secondary btn-lg" value="Tee" name="name" id="Tee" onclick="on(id)"></button>
            <button type="submit" class="btn btn-secondary btn-lg" value="Bier" name="name" id="Bier" onclick="on(id)"></button>
            <button type="submit" class="btn btn-secondary btn-lg" value="Rotwein" name="name" id="Rotwein" onclick="on(id)"></button>
            <button type="submit" class="btn btn-secondary btn-lg" value="Weißwein" name="name" id="Weißwein" onclick="on(id)"></button>
            <button type="submit" class="btn btn-secondary btn-lg" value="Orangensaft" name="name" id="Orangensaft" onclick="on(id)"></button>
            <button type="submit" class="btn btn-secondary btn-lg" value="Apfelsaft" name="name" id="Apfelsaft" onclick="on(id)"></button>
        -->
        </div>  
          
        <!-- Product Overlay -->
        <div id="overlay" class="overlay">
            <!-- Button to close the overlay navigation -->
            <a href="javascript:void(0)" class="closebtn" onclick="off()">&times;</a>
            <!-- Overlay content -->
            <div class="overlay-content">      
                <div style="font-size: 3em; top: 0;" class="form-group">
                    <label style="color: white;" for="sellist">Menge</label>
                    <select class="form-control" id="sellist" onclick="if (typeof(this.selectedIndex) != 'undefined') setQuantity(this.selectedIndex + 1)">        
                        <option id="1" name="amount" value="1">1</option>
                        <option id="2" name="amount" value="2">2</option>
                        <option id="3" name="amount" value="3">3</option>
                        <option id="4" name="amount" value="4">4</option>
                        <option id="5" name="amount" value="5">5</option>
                        <option id="6" name="amount" value="6">6</option>
                        <option id="7" name="amount" value="7">7</option>
                        <option id="8" name="amount" value="8">8</option>
                        <option id="9" name="amount" value="9">9</option>
                        <option id="10" name="amount" value="10">10</option>
                    </select>
                </div>
                <div id="productSizes">
                </div>
            </div>
        </div>


        <!-- Shopping Cart Overlay -->
        <div id="shoppingCartOverlay" class="overlay">
            <!-- Button to close the overlay navigation -->
            <a href="javascript:void(0)" class="closebtn" onclick="off()">&times;</a>
            <!-- Overlay content -->
            <div class="overlay-content">      
                <div style="font-size: 2em; margin-top: 1em;" class="form-group">
                    <button style="width: 70%; font-size: 2em;" id="delete" type="submit" class="btn btn-secondary btn">Entfernen</button>
                    <button style="width: 70%; font-size: 2em;" id="edit" type="submit" class="btn btn-secondary btn">Bearbeiten</button>
                </div>
            </div>
        </div>
        <!-- Container for Shopping Cart Items -->
        <div style="display: none" id="shoppingContainer" class="shopppingCart">
            <button id="order" class="btn btn-success" style="text-align:center; width:100%; margin-left: 0; margin-bottom: 1em;" onclick="placeOrder()">zur Kasse</button>
            <h3 class="h3" id="info" style="text-align: center;">Produkt | Menge | Größe</h3>
        </div>
    
         <!-- Order Overlay -->
         <div id="orderOverlay" class="overlay">
            <!-- Button to close the overlay navigation -->
            <a href="javascript:void(0)" class="closebtn" onclick="off()">&times;</a>
            <!-- Overlay content -->
            <div class="overlay-content">   
            <h1 style="color: white;">Zahlungsabwicklung</h1>   
                <div style="font-size: 2em; margin-top: 1em;">
                   
                    <div style="text-align: center;">
                         <input style="margin-top: 1em; text-align: center;" type="number" step="0.01" min="0" oninput="validity.valid||(value='');" id="voucher" placeholder="Gutscheinbetrag" onkeyup="calculateChange()">
                    </div>

                    <div style="text-align: center; font-size: 1.2em; color: white; top: 8em; left: 0.5em;">
                        <label id="Restbetrag">Restbetrag:</label>
                        <label id="voucherLeft"></label>
                    </div>

                    <div style="float: left; font-size: 1.2em; color: white; top: 3em; left: 0.5em;">
                        <label>Kosten:</label>
                        <label id="price"></label>
                    </div>

                    <div style="text-align: right; font-size: 1.2em; color: white; top: 3em; right: 0;">
                        <label>Rückgeld:</label>
                        <label id="change">€</label>
                    </div>

                    <div style="text-align: right;">
                        <input style="height: 1.3em; width: 6em; text-align: center;" type="number" step="0.01" min="0" oninput="validity.valid||(value='');"; id="drinkMoney" placeholder="Trinkgeld" onkeyup="calculateChange()">
                    </div> 

                    <div style="text-align: center;">
                        <input style="margin-top: 1em; text-align: center;" type="number" step="0.01" min="0" oninput="validity.valid||(value='');" id="moneyReceived" placeholder="Eingabe Geld erhalten" onkeyup="calculateChange()">
                    </div>
                    <button style="width: 100%; margin-left: 0; font-size: 2em; margin-top:1em;" id="edit" type="submit" class="btn btn-success" onclick="finishOrder()">Bestellung abschließen</button>
                </div>
            </div>
        </div>

        <!-- Login Overlay -->
        <div id="loginOverlay" class="overlay">
            <!-- Overlay content -->
            <div class="overlay-content">      
                <div style="font-size: 2em; margin-top: 3em;" class="form-group">
                    <input required class="form-control form-control-lg" type="text" id="loginName" placeholder="Name">
                    <button style="width: 100%; font-size: 2em;" id="loginButton" type="submit" class="btn btn-secondary btn">Login</button>
                </div>
            </div>
        </div>

    </body>
</html>
