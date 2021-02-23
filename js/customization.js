$("#input_user_name").on('input', function () {
    if ($(this).val().length >= 27) {
        // document.getElementById("input_user_name").disabled = true;
        document.getElementById("buttonUpdate").disabled = false;
        $('.collapse').collapse();
    }
});

function change(url) {
	document.getElementById('change').src = url;
	var title = document.getElementById('title-video');
	title.innerHTML = url;
}

$(document).ready(function () {
    $("#searchbox").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $('div[class="card"]').filter(function () {
            $(this).toggle($(this).find('h6').text().toLowerCase().indexOf(value) > -1);
        });
    });
});



$('.marquee').each(function() {
  var th = $(this);
  var ih = $(this).outerHeight(); // outer height
  var oh = $(this).find('.status').outerHeight(); // inner height
  var txt = $(this).find('.status').html(); // so that the inline styles remains the same

  // if outer height is less that inner hieight

  if (oh > ih) {
    th.html('');
    th.html('<marquee class="status">' + txt + '</marquee>');
  }
});

/*
var monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "June",
        "July", "August", "September", "October", "November", "December"];
var dateObj = new Date();
var month = monthNames[dateObj.getMonth()];
var day = String(dateObj.getDate()).padStart(2, '0');
var year = dateObj.getFullYear();
var output = day  + ' / '+ month  + ' / ' + year;
*/



$( "#modal-content-movie" ).click(function() {
  alert( "Handler for .click() called." );
});



 
