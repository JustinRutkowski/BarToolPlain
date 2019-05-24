function on(productName) {
  var node = document.createElement("h2");
  node.id = "productName";
  var name = document.createTextNode(productName);
  node.appendChild(name);
  document.getElementById("overlay").style.display = "block"; 
  document.getElementById("overlay").append(node);
}

function off() {
  document.getElementById("overlay").style.display = "none";

  // remove ohne JQuery nicht hinbekommen
  $("h2").remove();
} 

function addToShoppingCart(Size){
  var name = document.getElementById("productName").textContent;
  var quantity = document.getElementById("quantity").textContent; 
  

  var container = document.getElementById("shoppingContainer");


  var shopppingCart = document.createElement("button");
  
  shopppingCart.classList.add("btnCard");
  container.appendChild(shopppingCart);
  shopppingCart.id = "shopppingCart";
  shopppingCart.name = name + quantity + Size;
  
  
  var name = document.createTextNode(name);
  var quantity = document.createTextNode("   | "+quantity);
  var Size = document.createTextNode("   | "+Size);
  shopppingCart.appendChild(name);
  shopppingCart.appendChild(quantity);
  shopppingCart.appendChild(Size);

  shopppingCart.onclick = removeFromCart;

  
}

function removeFromCart(){
 
 document.getElementById("shopppingCart").remove()
  //alert("da");
}

function setQuantity(Quantity){
  if (document.getElementById("quantity") == null){
    var quantity = document.createElement("p")
    quantity.id = "quantity";
    quantity.style.display = "none";
    var qName = document.createTextNode(Quantity);
    quantity.innerText = qName;
    document.getElementById("overlay").append(quantity);
  }
    
  document.getElementById("quantity").innerText = Quantity;
    
    
    
}

function LoadDBData(){

  $.ajax({
      
      url: "http://localhost/BarTool/Controller.php",
      type: 'POST',
      
      data: {cmd: '1'},

      success: function(response){ 
        
      //alert(response);
      
      },
      error: function(){
        alert('error!');
        console.log(error);
      }
    });

    productArray = Array();
    productArray[0] = "Cola";
    productArray[1] = "Fanta";
    productArray[2] = "Kaffee";
    productArray[3] = "Sekt";
    productArray[4] = "Tee";
    productArray[5] = "Bier";
    productArray[6] = "Rotwein";
    productArray[7] = "Weißwein";
    productArray[8] = "Orangensaft";
    productArray[9] = "Apfelsaft";

    document.getElementById("Cola").textContent = productArray[0];
    document.getElementById("Fanta").textContent = productArray[1];
    document.getElementById("Kaffee").textContent = productArray[2];
    document.getElementById("Sekt").textContent = productArray[3];
    document.getElementById("Tee").textContent = productArray[4];
    document.getElementById("Bier").textContent = productArray[5];
    document.getElementById("Rotwein").textContent = productArray[6];
    document.getElementById("Weißwein").textContent = productArray[7];
    document.getElementById("Orangensaft").textContent = productArray[8];
    document.getElementById("Apfelsaft").textContent = productArray[9];

    return productArray;   
}

function InsertIntoDB(productName, amount, quantity){
    
    $.ajax({
        
        url: "http://localhost/BarTool/Controller.php",
        type: 'POST',
        
        data: {
            cmd: '2',
            name: productName,
            amount: amount,
            quantity: quantity
    },

        success: function(response){ 
          
        alert(response);
        
        },
        error: function(){
          alert('error!');
          console.log(error);
        }
      });
}



