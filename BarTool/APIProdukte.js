
/**
 * schaltet das Overlay für das jeweilige Produkt ein.
 * fügt dem Overlay weiter hinzu: 
 * den Produktnamen, den Entfernen Button, 
 * die jeweiligen Größen des Produkts
 * @Name {Für Welches Produkt soll das Overlay kommen} name 
 */
function onForProductPage(name) {
    document.getElementById("overlay").style.display = "block"; 
    var title = document.createElement("h2");
    title.id = "productName";
    title.innerText = name;
    document.getElementById("overlay").prepend(title);
  
    appendSizesToProductForDelete(name);
}

function offProduct() {
    $("h2").remove();
    $("#del").remove();
    while(document.getElementById("sizes") != null){
      $("#sizes").remove();
    }
  
    document.getElementById("overlay").style.display = "none";   

    LoadProducts();
}

function LoadProducts() {
    
    productArray = Array();
    $.ajax({
        url: "../BarTool/Controller.php",
        type: 'POST',
        async: false,
        data: {cmd: '1'},
  
        success: function(response){ 
          productArray = JSON.parse(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert("Load DB xhr.status " + xhr.status);
          alert("Load DB thrownError" + thrownError);
        }
    });
   
   
    for(var i = 0; i < productArray.length; i++){
        
        // jeder 3. Wert ist immer ein Name da immer (Name, Menge, Preis)
        if(i % 3 == 0 && document.getElementById(productArray[i]) == null){
            var e = document.createElement("button");
            e.id = productArray[i];
            e.className = "btn btn-danger btn-lg";
            e.textContent = productArray[i];
            document.getElementById("products").appendChild(e);

            document.getElementById(e.id).setAttribute("onclick","onForProductPage(id)");
            document.getElementById(e.id).style = "border: 1px solid black;";

            e.style.fontSize = "40px";
            e.style.fontSize = adjustFontSize(e);    
        }
    }
}

function appendSizesToProductForDelete(productName){
    $.ajax({
      url: "../BarTool/Controller.php",
      type: 'POST',
      data: {
          cmd: '4',
          Art: productName,
          async: false,
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
            sizes.className = "btn btn-danger btn";
            sizes.style = "margin: 0.2em; font-size:5em; width: 2.5em; height: 2em;";
  
            // füge Größen an Produkte an
            document.getElementById("productSizes").appendChild(sizes);
  
            // Für das Entfernen der einzelnen Größen
            sizes.setAttribute("onclick", `removeFromDB(${productName}, ${sizes.value}); offProduct(); refresh();`);
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert("error");
        alert("Insert DB xhr.status" + xhr.status);
        alert("Insert DB thrownError" + thrownError);
      }
    });  
}

// Um Produkte ohne Größen entfernen zu lassen
function refresh() {
    location.reload();
}

  