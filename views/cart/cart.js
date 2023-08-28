$(document).ready(function() {
  
    // AJAX request to fetch cart items
    console.log("in js")
    $.ajax({
      url: '/carts/items',
      method: 'GET',
      success: function(data) {
        // Iterate over the cart items and populate the table
        var totalPrice = 0;
        data.forEach(function(cartItem) {
            var sizeOptions = 
                '<option value="S"' + (cartItem.size === 'S' ? ' selected' : '') + '>S</option>' +
                '<option value="M"' + (cartItem.size === 'M' ? ' selected' : '') + '>M</option>' +
                '<option value="L"' + (cartItem.size === 'L' ? ' selected' : '') + '>L</option>' +
                '<option value="XL"' + (cartItem.size === 'XL' ? ' selected' : '') + '>XL</option>';
        
            var row = '<tr>' +
                '<td>' + cartItem.kitDescription + '</td>' +
                '<td><select class="form-control size-selector" data-initial-size="' + cartItem.size + '">' + sizeOptions + '</select></td>' +
                '<td><input type="number" class="form-control quantity-input" value="' + cartItem.quantity + '" data-cart-item="' + cartItem.productId + '" min="1" ></td>' +
                '<td>' + cartItem.totalPrice + '</td>' +
                '<td><button class="btn btn-primary update-btn" data-cart-item="' + cartItem.kit + '">Update</button></td>' +
                '<td><button class="btn btn-danger remove-btn" data-cart-item="' + cartItem.kit + '">Remove</button></td>' +
                '</tr>';
        
            $('#cartTable').append(row);
            totalPrice += cartItem.totalPrice;
        });
        
        // Display the total price
        $('#totalPrice').html('<span>Total Price: $' + totalPrice + '</span>');

        // Attach event handlers for update and remove buttons
        $('.update-btn').click(function() {
          var productItemId = $(this).data('cart-item');
          var newQuantity = parseInt($(this).closest('tr').find('.quantity-input').val(), 10);
          var newSize = $(this).closest('tr').find('.size-selector').val();
          var oldSize = $(this).closest('tr').find('.size-selector').data('initial-size');
          
          // Ensure the newQuantity is at least 1
          if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
          }

          // AJAX request to update cart item
          $.ajax({
            url: '/carts/items/' + productItemId,
            method: 'PUT',
            data: {
              kitId: productItemId,
              size: oldSize,
              newsize: newSize,
              quantity: newQuantity
            },
            success: function() {
              console.log('Cart item updated successfully');
              // Refresh the page to reflect the updated quantity
              location.reload();
            },
            error: function() {
              console.log('Error: Failed to update cart item');
            }
          });
});


        $('.remove-btn').click(function() {
          var productItemId = $(this).data('cart-item');
          // AJAX request to remove cart item
          $.ajax({
            url: '/carts/items/' + productItemId,
            method: 'DELETE',
            data:{kitId:productItemId},
            success: function() {
              console.log('Cart item removed successfully');
              // Refresh the page to reflect the removed item
              location.reload();
            },
            error: function() {
              console.log('Error: Failed to remove cart item');
            }
          });
        });

        // Attach event handler for checkout button
        $('.checkout-btn').click(function() {
          // AJAX request for checkout
          $.ajax({
            url: '/cart/checkout',
            method: 'POST',
            success: function(response) { 
             if(response.isloggedin===false)
              window.location.href="/login"
            else window.location.href="/finalOrder.html"
            },
            error: function(jqXHR) {
              if(jqXHR.responseJSON && jqXHR.responseJSON.error === 'NoItemsInCart') {
                  // Redirect the user to the products page with an error query param
                  window.location.href = "/allKits?error=NoItemsInCart";
              } else {
                  console.log('Error: Checkout failed');
                  // Handle other potential errors here
              }
          }
          });
        });
      },
      error: function() {
        // Handle error if AJAX request fails
        console.log('Error: Failed to fetch cart items');
      }
    });
  });