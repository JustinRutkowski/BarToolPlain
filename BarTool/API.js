function on(name) {
  document.getElementById("overlay").style.display = "block"; 
  var node = document.createElement("h2");
  node.id = "productName";
  node.innerText = name;
  document.getElementById("overlay").prepend(node);

  $( ".bt" ).each(function() {
    $( this ).insertHTML('div');
  });
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

function off() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("shoppingCartOverlay").style.display = "none";
  document.getElementById("productCollectionOverlay").style.display = "none";
  // remove ohne JQuery nicht hinbekommen
  $("h2").remove();
}

function addProduct(name){
  var newProduct = document.createElement("button");
  newProduct.textContent = name;
  newProduct.id = name;
  
  //newProduct.class = "btn btn-secondary btn-lg";
  document.body.append(newProduct);
}

function productCollectionOverlay(){
  document.getElementById("productCollectionOverlay").style.display = "block"; 
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
        
        if(i % 3 == 0 && document.getElementById(productArray[i]) == null){
          var e = document.createElement("button");
          e.id = productArray[i];
          e.className = "btn btn-secondary btn-lg";
          e.textContent = productArray[i];
          document.getElementById("products").append(e);

          // so wirds geamcht
          document.getElementById(e.id).setAttribute("onclick","on(id)");
        }
      }
    })
}

function InsertProductIntoDB(productName, amount, prize){
    
    $.ajax({
        
        url: "http://localhost/BarTool/Controller.php",
        type: 'POST',
        data: {
            cmd: '2',
            Art: productName,
            Groesse: amount,
            Preis: prize
    },
        success: function(response){ 
        alert(response);
        
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert("Insert DB xhr.status" + xhr.status);
          alert("Insert DB thrownError" + thrownError);
        }
      });
}

function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

