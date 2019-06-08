/**
 * schaltet das Overlay für das jeweilige Produkt ein.
 * fügt dem Overlay weiter hinzu: 
 * den Produktnamen, den Entfernen Button, 
 * die jeweiligen Größen des Produkts
 * @Name {Für Welches Produkt soll das Overlay kommen} name 
 */
function on(name) {
  document.getElementById("overlay").style.display = "block"; 
  var title = document.createElement("h2");
  title.id = "productName";
  title.innerText = name;
  document.getElementById("overlay").prepend(title);

  var del = document.createElement("button");
  del.id = "del";
  del.name = name;
  del.className = "btn btn-primary";
  del.style = "font-size: 2em; background-color: red; color: black;";
  del.innerText = "Entfernen";
  document.getElementById("overlay").prepend(del); 
  $("#del").click(function(){
    document.getElementById(name).remove();
    removeFromDB(name);
    off();
  });

  appendSizesToProduct(name);
}

/**
 * eine Funktion um jedes Overlay auszuschalten und zuvor angehängte Objekte
 * wieder zu entfernen
 */
function off() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("shoppingCartOverlay").style.display = "none";
  document.getElementById("orderOverlay").style.display = "none";
  document.getElementById("loginOverlay").style.display = "none";
  // remove ohne JQuery nicht hinbekommen
  $("h2").remove();
  $("#del").remove();
  while(document.getElementById("sizes") != null){
    $("#sizes").remove();
  }
}



function cartItemOverlayOn(productName) {
  // For the Name of the choosed Product in the overlay
  var node = document.createElement("h2");
  node.id = "productName";
  var name = document.createTextNode(productName);
  node.appendChild(name);
  // --------------------------------------------------

  document.getElementById("overlay").style.display = "block"; 
  document.getElementById("heading").append(node);
}

function addToShoppingCart(Size){
  document.getElementById("order").style.display = "block";
  document.getElementById("info").style.display = "block";
  var container = document.getElementById("shoppingContainer");
  container.style.display = "block";
  var name = document.getElementById("productName").textContent;
  var quantity = document.getElementById("quantity").textContent; 

  var shopppingCartItem = document.createElement("button");
  shopppingCartItem.classList.add("btnCard");
  container.appendChild(shopppingCartItem);
  shopppingCartItem.id = "shopppingCartItem";
  shopppingCartItem.name = name + quantity + Size;
  
  var name = document.createTextNode(name);
  var quantity = document.createTextNode(" | " + quantity);
  var Size = document.createTextNode(" | " + Size);
  shopppingCartItem.appendChild(name);
  shopppingCartItem.appendChild(quantity);
  shopppingCartItem.appendChild(Size);

  shopppingCartItem.onclick = shoppingCartOverlay;

  // Overlay bei anklicken der einzelnen Produkte
  function shoppingCartOverlay(){
    document.getElementById("shoppingCartOverlay").style.display = "block"; 
    $("#delete").click(function(){
      shopppingCartItem.remove();
      if (document.getElementById("shoppingContainer").childElementCount == 2){
        document.getElementById("order").style.display = "none";
        document.getElementById("info").style.display = "none";
      }
      off();
    });
    $("#edit").click(function(){
      
    });
  }
  if(document.getElementById("shopppingCartItem" == null)){
    container.style.display = "none";
  }
  off();
}

/**
 * speichert die aktuell Ausgewählte Menge als p tag im Dokument zwischen
 * @Quantity {Die aktuell ausgewählte Menge (default = 1)} Quantity 
 */
function setQuantity(Quantity){
  if (document.getElementById("quantity") == null){
    var quantity = document.createElement("p")
    quantity.id = "quantity";
    quantity.style.visibility = "hidden";
    var qName = document.createTextNode(Quantity);
    quantity.innerText = qName;
    document.getElementById("overlay").append(quantity);
  }
  document.getElementById("quantity").innerText = Quantity;  
}

function calculateChange(){
  var price = document.getElementById("price").innerHTML.replace('€','');
  var moneyReceived = document.getElementById("moneyReceived").value;
  var voucher = document.getElementById("voucher").value;
  var voucherLeft = document.getElementById("voucherLeft").innerHTML.replace('€','');
  var drinkMoney = document.getElementById("drinkMoney").value;
  
  if(voucher != 0 || voucher != ""){
    document.getElementById("voucherLeft").innerHTML = (voucher - price).toFixed(2) + " €";
    if(document.getElementById("voucherLeft").innerHTML.replace('€','') >= 0){
      document.getElementById("change").innerHTML = "0.00€"
      document.getElementById("Restbetrag").innerHTML = "Rest vom Gutschein:"
    }
    if(document.getElementById("voucherLeft").innerHTML.replace('€','') < 0){
      document.getElementById("Restbetrag").innerHTML = "noch zu zahlen:"
      document.getElementById("change").innerHTML = (moneyReceived - - voucherLeft).toFixed(2) + " €"; 
    }
  } 
  else {
    document.getElementById("voucherLeft").innerHTML = "";
    document.getElementById("change").innerHTML = (moneyReceived - price).toFixed(2) + " €";
  }

  if(drinkMoney != 0 || drinkMoney != ""){
    document.getElementById("change").innerHTML = (document.getElementById("change").innerHTML.replace('€','') - drinkMoney).toFixed(2) + " €";
  }
}

//------------Funktionen zur Datenbank Kommunikation----------

/**
 * SELECT alle gefundenen Produkte und erstellt aus Ergbennis Buttons zur Auswahl (keine Duplikate)   
 */
function LoadDBData(){

  // Einblenden der Loginpage wenn es keinen Loginnamen gibt
  document.getElementById("loginOverlay").style.display = "block";
  if(document.getElementById("login") == null){
    $('#loginButton').click(function(){
      var loginname = document.createElement("p");
      loginname.id = "login";
      loginname.style.visibility = "hidden";
      loginname.innerHTML = document.getElementById("loginName").value;
      document.body.append(loginname);
      if(document.getElementById("loginName").value != ""){
        off();
      }
      if(document.getElementById("loginName").value == ""){
        $('#login').remove();
      }
    });
  }

  productArray = Array();
  $.ajax({
      url: "../BarTool/Controller.php",
      type: 'POST',
      
      data: {cmd: '1'},

      success: function(response){ 
        productArray = JSON.parse(response);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert("Load DB xhr.status " + xhr.status);
        alert("Load DB thrownError" + thrownError);
      }
    });
 
  // Sleep um synchronen ajax call zu vermeiden
  Sleep(50).then(() => {
    for(var i = 0; i < productArray.length; i++){
      // jeder 3. Wert ist immer ein Name da immer (Name, Menge, Preis)
      if(i % 3 == 0 && document.getElementById(productArray[i]) == null){
        var e = document.createElement("button");
        e.id = productArray[i];
        e.className = "btn btn-secondary btn-lg";
        e.textContent = productArray[i];
        document.getElementById("heading").appendChild(e);

        // so wirds geamcht
        document.getElementById(e.id).setAttribute("onclick","on(id)");
        document.getElementById(e.id).style = "border: 1px solid black;";
      }
    }
    document.getElementById(e.id).parentElement.style = "border: solid black; padding-bottom: 15px;";
  })
}

/**
 * nimmt Informationen und fügt sie der getraenke Tabelle hinzu
 * @Name {INSERT INTO DB} productName 
 * @Menge {INSERT INTO DB} amount 
 * @Preis {INSERT INTO DB} prize 
 */
function InsertProductIntoDB(productName, amount, prize){
  if(amount != "" && productName != "" && prize != ""){
    console.log(productName + amount + prize);
    $.ajax({
        
        url: "../BarTool/Controller.php",
        type: 'POST',
        data: {
            cmd: '2',
            Art: productName,
            Groesse: amount,
            Preis: prize,
        },
        success: function(response){ 

        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert("error");
          alert("Insert DB xhr.status" + xhr.status);
          alert("Insert DB thrownError" + thrownError);
        }
      });
      alert(productName + " hinzugefügt");
    }    
}

/**
 * Entfernt anhand des Namens alle Vorkommnisse aus der DB
 * @Name {alle Einträge des Namens werden entfernt} productName 
 */
function removeFromDB(productName){
  $.ajax({
    url: "../BarTool/Controller.php",
    type: 'POST',
    data: {
        cmd: '3',
        Art: productName,
    },
    success: function(response){ 
      // keine Rückantwort nötig nur delete
     // alert(response);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert("error");
      alert("Insert DB xhr.status" + xhr.status);
      alert("Insert DB thrownError" + thrownError);
    }
  });
}

/**
 * Fügt für einen Produktnamen alle Größen Varianten aus der DB als Button zum Auswahloverlay hinzu 
 * @Name {Name des Produkts} productName 
 */
function appendSizesToProduct(productName){
  $.ajax({
    url: "../BarTool/Controller.php",
    type: 'POST',
    data: {
        cmd: '4',
        Art: productName,
    },
    success: function(response){ 
      // enthällt die Größen für das angeklickte Produkt
      response = JSON.parse(response);
      
      // erstelle für die gefundenen Größen Buttons
      for (i = 0; i < response.length; i++){
          var sizes = document.createElement("button");
          sizes.id = "sizes";
          sizes.value = response[i];
          sizes.innerText = response[i] + "l";
          sizes.className = "btn btn-secondary btn";
          sizes.style = "margin: 0.2em; font-size:5em; width: 2.5em; height: 2em;";
          document.getElementById("productSizes").appendChild(sizes);

          // adde onClick für jeden erstellen Button
          sizes.setAttribute("onclick","addToShoppingCart(value + ' Liter')");
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert("error");
      alert("Insert DB xhr.status" + xhr.status);
      alert("Insert DB thrownError" + thrownError);
    }
  });
}

/**
 * 
 */
function placeOrder(){

  // reset the inputs and labels
  document.getElementById("price").innerHTML = "";
  document.getElementById("change").innerHTML = "";
  document.getElementById("drinkMoney").value = "";
  document.getElementById("moneyReceived").value = "";
  document.getElementById("voucher").value = "";
  document.getElementById("voucherLeft").innerHTML = "";


  var priceSum = 0;
  var quantity = Array();
  var priceArray = Array();
  var shoppingContainer = document.getElementById("shoppingContainer");
  for (i=2; i < shoppingContainer.childElementCount ; i++ ){
    var buttonText = shoppingContainer.children.item(i).innerText;
    var name = buttonText.split("|", 3)[0];
    quantity.push(buttonText.split("|", 3)[1]);
    var size = buttonText.split("|", 3)[2];
    $.ajax({
      url: "../BarTool/Controller.php",
      type: 'POST',
      async: false,
      data: {
          cmd: '5',
          Art: name,
          Groesse: size,
      },
      success: function(response){ 
        var price = JSON.parse(response);
        priceArray.push(price.toString());
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert("error");
        alert("Insert DB xhr.status" + xhr.status);
        alert("Insert DB thrownError" + thrownError);
      }
    });
  }

 
  for (i=0; i < shoppingContainer.childElementCount -2; i++ ){
    var priceSumPerProduct = quantity[i] * priceArray[i];
    priceSum = priceSumPerProduct + priceSum; 
  }
  document.getElementById("orderOverlay").style.display = "block";
  document.getElementById("price").innerHTML = priceSum.toFixed(2) + " €";
  $('#moneyReceived').focus();

}

function finishOrder(){
  var price = parseInt(document.getElementById("price").innerHTML.replace('€',''));
  var moneyReceived = parseInt(document.getElementById("moneyReceived").value);
  var voucher = parseInt(document.getElementById("voucher").value);
  var drinkMoney = parseInt(document.getElementById("drinkMoney").value);
  var change = parseInt(document.getElementById("change").innerHTML.replace('€',''));

  var condition = false;

  // Control when the order can be finished
  if((moneyReceived >= price || voucher + moneyReceived >= price || voucher >= price)){
    
    condition = true;

    if(drinkMoney != null){
      if(drinkMoney > change){
        condition = false;
      }
    }
  }


  if(condition){
      // gather all the things to send
      var price = document.getElementById("price").innerHTML.replace('€','');
      var moneyReceived = document.getElementById("moneyReceived").value;
      var voucher = document.getElementById("voucher").value;
      var drinkMoney = document.getElementById("drinkMoney").value;
      var change = document.getElementById("change").innerHTML.replace('€','');
      var BestellungsID;
      var user = document.getElementById("login").innerHTML;

      // for inserting to table Bestellungen and simultaniesly get the highest BestellungsID
      
      $.ajax({
        url: "../BarTool/Controller.php",
        type: 'POST',
        async: false,
        data: {
            cmd: '6',
            Bestellungspreis: price,
            GutscheinWert: voucher,
            GeldErhalten: moneyReceived,
            TrinkGeld: drinkMoney,
            RueckGeld: change,
            Nutzer: user,
        },
        success: function(response){
          var res = JSON.parse(response);
          BestellungsID = res["MAX(BestellungsID)"];
          console.log("BestellungsID: " + BestellungsID);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert("error");
          alert("Insert DB xhr.status" + xhr.status);
          alert("Insert DB thrownError" + thrownError);
        }
      });

      
      var shoppingContainer = document.getElementById("shoppingContainer");
      for (i=2; i < shoppingContainer.childElementCount ; i++ ){
       
        var buttonText = shoppingContainer.children.item(i).innerText;
        var name = buttonText.split("|", 3)[0];
        var quantity = buttonText.split("|", 3)[1];
        var size = buttonText.split("|", 3)[2];
        var price;
        var productID;

        $.ajax({
          url: "../BarTool/Controller.php",
          type: 'POST',
          async: false,
          data: {
              cmd: '5',
              Art: name,
              Groesse: size,
          },
          
          success: function(response){ 
            price = JSON.parse(response);
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert("error");
            alert("Insert DB xhr.status" + xhr.status);
            alert("Insert DB thrownError" + thrownError);
          }
        });

        
        $.ajax({
          url: "../BarTool/Controller.php",
          type: 'POST',
          async: false,
          data: {
              cmd: '7',
              Art: name,
              Groesse: size,
              Preis: price,
          },
          success: function(response){ 
            productID = JSON.parse(response);
            console.log("produkteID: " + productID);
            console.log("menge: " + quantity);
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert("error");
            alert("Insert DB xhr.status" + xhr.status);
            alert("Insert DB thrownError" + thrownError);
          }
        });

        $.ajax({
          url: "../BarTool/Controller.php",
          type: 'POST',
          async: false,
          data: {
              cmd: '8',
              BestellungsID: BestellungsID,
              ProdukteID: productID,
              Menge: quantity,
          },
          success: function(response){ 
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert("error");
            alert("Insert DB xhr.status" + xhr.status);
            alert("Insert DB thrownError" + thrownError);
          }
        });

      }
      
      $('.btnCard').remove();
      document.getElementById("shoppingContainer").style.display = "none";
      off();
      
    }
  }

/**
 * um manchen Datentransfer abwarten zu können wennn benötigt
 * @milliseconds {Zeit zu warten in Millisekunden} milliseconds 
 */
function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
