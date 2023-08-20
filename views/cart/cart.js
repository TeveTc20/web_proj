// $(document).ready(function() {
//     const cartItemsContainer = $('#cartContent');
//     let totalAmount = 0;

//     // Fetch cart items from the server using AJAX
//     $.ajax({
//         url: '/carts/items',
//         method: 'GET',
//         dataType: 'json',
//         success: function(cartItems) {
//             console.log(cartItems);

//             cartItems.forEach(function(cartItem) {
//                 const itemRow = $(`
//                     <tr>
//                         <td>${cartItem.kitDescription}</td>
//                         <td>
//                             <select class="form-control size-selector">
//                                 <option value="S"${cartItem.size === 'S' ? ' selected' : ''}>S</option>
//                                 <option value="M"${cartItem.size === 'M' ? ' selected' : ''}>M</option>
//                                 <option value="L"${cartItem.size === 'L' ? ' selected' : ''}>L</option>
//                                 <option value="XL"${cartItem.size === 'XL' ? ' selected' : ''}>XL</option>
//                             </select>
//                         </td>
//                         <td><input type="number" class="form-control quantity-input" value="${cartItem.quantity}" data-cart-item="${cartItem.kit}"></td>
//                         <td>$${cartItem.totalPrice.toFixed(2)}</td>
//                         <td>
//                         <button id="updateBtn_${cartItem.kit}" class="btn btn-primary update-btn" data-cart-item="${cartItem.kit}">Update</button>

//                            <button class="btn btn-danger remove-btn" data-cart-item="${cartItem.kit}">Remove</button>
//                         </td>
//                     </tr>
//                 `);
//                 cartItemsContainer.append(itemRow);
//                 totalAmount += cartItem.totalPrice;
//             });
//             updateTotalAmount(totalAmount);

//             // Attach event handlers for .update-btn and .remove-btn here
//             $('.update-btn').click(function()   {
//                 console.log("update button")
//                 var kitId = $(this).data('cart-item');
//                 var newQuantity = parseInt($(this).closest('tr').find('.quantity-input').val(), 10);
//                 var newSize = $(this).closest('tr').find('.size-selector').val();

//                 if (!isNaN(newQuantity)) {
//                     // AJAX request to update cart item
//                     $.ajax({
//                         url: '/cart/items/' + kitId,
//                         method: 'PUT',
//                         data: {
//                             kitId: kitId,
//                             quantity: newQuantity,
//                             size: newSize
//                         },
//                         success: function() {
//                             console.log('Cart item updated successfully');
//                             location.reload();
//                         },
//                         error: function() {
//                             console.log('Error: Failed to update cart item');
//                         }
//                     });
//                 }
//             });

//             $('.remove-btn').click(function() {
//                 console.log("remove button")
//                 var productItemId = $(this).data('cart-item');
//                 // AJAX request to remove cart item
//                 $.ajax({
//                     url: '/cart/items/' + productItemId,
//                     method: 'DELETE',
//                     success: function() {
//                         console.log('Cart item removed successfully');
//                         location.reload();
//                     },
//                     error: function() {
//                         console.log('Error: Failed to remove cart item');
//                     }
//                 });
//             });

//         },
//         error: function(error) {
//             console.error('Error fetching cart items:', error);
//         }
//     });

//     function updateTotalAmount(amount) {
//         $('#totalAmount').text(amount.toFixed(2));
//     }

// });
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
                '<td><input type="number" class="form-control quantity-input" value="' + cartItem.quantity + '" data-cart-item="' + cartItem.productId + '"></td>' +
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
          if (!isNaN(newQuantity)) {
            // AJAX request to update cart item
            $.ajax({
              url: '/carts/items/' + productItemId,
              method: 'PUT',
              data: { kitId:productItemId,
                    size:oldSize,
                    newsize:newSize
                    ,quantity: newQuantity},
              success: function() {
                console.log('Cart item updated successfully');
                // Refresh the page to reflect the updated quantity
                location.reload();
              },
              error: function() {
                console.log('Error: Failed to update cart item');
              }
            });
          }
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
              window.location.href="/login.html"
            else window.location.href="/finalOrder.html"
            },
            error: function(jqXHR) {
              if(jqXHR.responseJSON && jqXHR.responseJSON.error === 'NoItemsInCart') {
                  // Redirect the user to the products page with an error query param
                  window.location.href = "/allKits.html?error=NoItemsInCart";
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