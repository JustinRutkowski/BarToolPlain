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
  document.getElementById("productCollectionOverlay").style.display = "none";
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

function productCollectionOverlay(){
  document.getElementById("productCollectionOverlay").style.display = "block"; 
}

function addProduct(name){
  var newProduct = document.createElement("button");
  newProduct.textContent = name;
  newProduct.id = name;
  
  //newProduct.class = "btn btn-secondary btn-lg";
  document.body.append(newProduct);
}

function addToShoppingCart(Size){

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
  function shoppingCartOverlay(){

    document.getElementById("shoppingCartOverlay").style.display = "block"; 
    $("#delete").click(function(){
      shopppingCartItem.remove();
      off();
    });
    $("#edit").click(function(){
      
    });
  }
  if(document.getElementById("shopppingCartItem" == null)){
    container.style.display = "none";
  }
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

//------------Funktionen zur Datenbank Kommunikation----------

/**
 * SELECT alle gefundenen Produkte und erstellt aus Ergbennis Buttons zur Auswahl (keine Duplikate)   
 */
function LoadDBData(){
  productArray = Array();
  $.ajax({
      
      url: "http://localhost/BarTool/Controller.php",
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

   
    // wait for the data to transfer
    Sleep(100).then(() => {
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
        
        url: "http://localhost/BarTool/Controller.php",
        type: 'POST',
        data: {
            cmd: '2',
            Art: productName,
            Groesse: amount,
            Preis: prize,
        },
        success: function(response){ 
        alert(response);

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
        
    url: "http://localhost/BarTool/Controller.php",
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
        
    url: "http://localhost/BarTool/Controller.php",
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
          sizes.setAttribute("onclick","addToShoppingCart(value)");
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
 * Warten um manchen Datentransfer abwarten zu können wennn benötigt
 * @milliseconds {Zeit zu warten in Millisekunden} milliseconds 
 */
function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
