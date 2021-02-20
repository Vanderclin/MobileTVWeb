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
