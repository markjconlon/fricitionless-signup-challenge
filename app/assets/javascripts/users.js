$( document ).on('turbolinks:load', function() {
  function validateEmail (email) {
    var isValid = false
    var re = new RegExp('[^@]+@[^@]+\\.[^@]+')
    if (re.test(email)) {
      isValid = true
    }

    return (isValid)
  }

  function revealFields(){
    $('#fullNameDiv').removeClass("hidden")
    $('#companyNameDiv').removeClass("hidden")
    $('#employeesDiv').removeClass("hidden")
    $('#phoneDiv').removeClass("hidden")
  }

  var debounceTimer;
  $('#email').on('keyup', function () {
    email = this.value
    clearTimeout( debounceTimer );
    debounceTimer = setTimeout( function() {
      if (validateEmail(email)) {
        $.ajax({
          url: '/users/check_email',
          method: 'GET',
          data: {"q": $('#email').val()},
          dataType: 'json'
        }).done(function(data){
          $('#valid').html('')
          // when the request comes back it remove hidden class from form fields
          revealFields();
          // fill the fields with the data that comes back, UsersController
          // already protects against nothing for the corressponding key and nilClass
          $('#fullName').val(data.person.fullName);
          $('#companyName').val(data.person.companyName);
          $('#employees').val(data.person.employees);
          $('#phone').val(data.person.phone);
        }).fail(function(){
          // if nothing is returned whether it be from an internal error or
          // an error at Clearbit reveal the fields so the client can still
          // complete the form
          revealFields();
        });
      } else {
        $('#valid').html('*Invalid*')
      }

    }, 750);
  })
});
