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
    
    <body onload="LoadDBData(); setQuantity(1)">
        <div class="navbar">
            <h1 style="text-align: left; margin-right: 2em; font-size: 4em;">BarTool</h1>     
                <form action="../Bartool/Produkte.php">
                    <button id="productCollection" style="width: auto;" class="btn btn-primary">Produktverwaltung</button>
                </form> 
        </div>
    <hr>

        <!-- Product Buttons -->
        <div class="navbar" id="products">
        </div>  
          
        <!-- Product Overlay -->
        <div id="overlay" class="overlay">
            <!-- Button to close the overlay navigation -->
            <a href="javascript:void(0)" class="closebtn" onclick="off()">&times;</a>
            <!-- Overlay content -->
            <div style="margin-top:20%" class="overlay-content" id="ps">      
                <div style="font-size: 2em; top: 0;" class="form-group">
                    <label style="color: white;" for="sellist">Menge</label>
                    <select style="border-radius: 25px;" class="form-control navbar" id="sellist" onclick="if (typeof(this.selectedIndex) != 'undefined') setQuantity(this.selectedIndex + 1)">        
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
                
            </div>
        </div>


        <!-- Shopping Cart Overlay -->
        <div id="shoppingCartOverlay" class="overlay">
            <!-- Button to close the overlay navigation -->
            <a href="javascript:void(0)" class="closebtn" onclick="off()">&times;</a>
            <!-- Overlay content -->
            <div class="overlay-content navbar">      
                <div style="font-size: 2em; margin-top: 40%;" class="form-group">
                    <button style="width: 100%; font-size: 2em; margin-bottom: 2em;" id="delete" type="submit" class="btn-secondary btn">Entfernen</button>
                    <button style="width: 100%; font-size: 2em;" id="edit" type="submit" class="btn-secondary btn">Bearbeiten</button>
                </div>
            </div>
        </div>

        <hr>

        <!-- Container for Shopping Cart Items -->
        <div style="display: none" id="shoppingContainer" class="navbar shopppingCart">
            <button id="order" class="btn-success" onclick="placeOrder()">zur Kasse</button>
            <h3 class="h3" id="info" style="text-align: center;">Produkt | Menge | Größe</h3>
            <h3 class="h3" id="info" style="text-align: left;">letzte Bestellung</h3>
            <h3 class="h3" id="info" style="position: absolute; right: 0; top: 200px;">aktuelle Bestellung</h3>

            <div style="margin-left:0; margin-right:0; width:50%; position: absolute; right: 0;" id="containerNew" class="navbar"> 
            </div>
            <div style="margin-left:0; margin-right:0; width:52%" id="containerOld" class="navbar"> 
            </div>
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
                         <input style="margin-top: 1em; text-align: center;" type="number" step="0.01" min="0" oninput="validity.valid||(value='');" id="voucher" placeholder="Gutscheinbetrag?" onkeyup="calculateChange()">
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

                    <div style="text-align: center;">
                        <input style="margin-top: 1em; text-align: center;" type="number" step="0.01" min="0" oninput="validity.valid||(value='');" id="moneyReceived" placeholder="Eingabe Geld erhalten" onkeyup="calculateChange()">
                    </div>

                    <div style="text-align: center;">
                        <input style="margin-top: 1em; text-align: center;" type="number" step="0.01" min="0" oninput="validity.valid||(value='');"; id="drinkMoney" placeholder="Trinkgeld?" onkeyup="calculateChange()">
                    </div> 

                    <button style=" font-size: 1.5em; margin-top:1em;" id="edit" type="submit" class="btn-success navbar form-control" onclick="finishOrder()">Bestellung abschließen</button>
                </div>

                <h3 class="h3" id="info" style="color: white; text-align: center;">Übersicht</h3>
                <div id="shoppingContainer2" class="navbar shopppingCart">

                </div>
     
            </div>
        </div>

        <!-- Login Overlay -->
        <div id="loginOverlay" class="overlay">
            <!-- Overlay content -->
            <div style="height: 80%" class="overlay-content navbar">      
                <div style="font-size:2em;" class="form-group">
                    <h3>Bitte gib deinen Namen ein!</h3>
                    <input style="border-radius: 25px" required class="form-control form-control-lg" type="text" id="loginName" placeholder="Name">
                    <button style="width: 100%; font-size:2em; margin-left:0; height: auto" id="loginButton" type="submit" class="btn-secondary btn">Login</button>
                </div>
            </div>
        </div>

    </body>
</html>
