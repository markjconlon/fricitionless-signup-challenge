$( document ).on('turbolinks:load', function() {
  function validateEmail (email) {
    let valid = false
    let re = new RegExp('[^@]+@[^@]+\\.[^@]+')
    if (re.test(email)) {
      valid = true
    }

    return (valid)
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
          // when the request comes back it remove hidden class from form fields
          revealFields();
          console.log(data);
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
        console.log('nope not valid')
      }

    }, 750);
  })
});
