
var editingProd

$(document).ready( function() {

  $(document).on('submit', '#postData', function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    var url = 'http://json-server.devpointlabs.com/api/v1/products';
    var method = 'POST';
    if (editingProd) {
      url = url + '/' + editingProd;
      method = 'PUT'
    }

    $.ajax({
      url: url,
      type: method, 
      dataType: 'JSON', 
      data: data 
    }).done( function(prod) {
      //getProd(prod.id)
      var row = $('#list-products')
      var item = '<li data-id="' + prod.base_price + '">' + prod.description + '</li>';
      row.append(item);
      // debugger
      $('#postData')[0].reset()
    }).fail( function(err) {
      alert(err.responseJSON.errors)
    })
    // $('#postData').reset()
  })

  $("#click-form").on('click', function() {
    toggleForm()
  })

  $('#click-me').on('click', function() {
    var row = $('#list-products');
    row.empty();
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products',
      type: 'GET',

    }).done( function(p) {
      p.forEach( function(prod) {
        var item = '<li data-id="' + prod.id + '">' + prod.description + '</li>';
        row.append(item);
      })
    })
  })
})

