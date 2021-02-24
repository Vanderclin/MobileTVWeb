var firebaseConfig = {
	apiKey: "AIzaSyBtpfagzOWwjYT6krRNb8BbnpOiWBiGkiU",
	authDomain: "mobiletv-app.firebaseapp.com",
	databaseURL: "https://mobiletv-app-default-rtdb.firebaseio.com",
	projectId: "mobiletv-app",
	storageBucket: "mobiletv-app.appspot.com",
	messagingSenderId: "129006063129",
	appId: "1:129006063129:web:5e0f41a26e2ebef14de488",
	measurementId: "G-BFKG4E0G8Q"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//document.getElementById("page-splash").style.display = "block";

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		var displayName = user.displayName;
		var email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var isAnonymous = user.isAnonymous;
		var uid = user.uid;
		var providerData = user.providerData;

		document.getElementById("page-splash").style.display = "none";
		startView();
	}
	if (displayName === null) {
		document.getElementById("user_name").innerHTML = "Sem nome";
		document.getElementById("user_email").innerHTML = email;
		$("#modal_update_user").modal({
			backdrop: 'static',
			keyboard: false
		});
	} else if (displayName) {
		document.getElementById("user_name").innerHTML = displayName;
		document.getElementById("user_email").innerHTML = email;
	} else {

		// Página Inicial
		document.getElementById("page-splash").style.display = "block";

	}
});

function signIn() {
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	if (email.length < 4) {
		alert('Por favor insira um endereço de e-mail.');
		return;
	}
	if (password.length < 4) {
		alert('Por favor insira uma senha.');
		return;
	}

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// [START_EXCLUDE]
		if (errorCode === 'auth/wrong-password') {
			alert('Senha incorreta.');
		} else if (errorCode === 'auth/user-not-found') {
			alert('Usuário não registrado.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
		document.getElementById('button-sign-in').disabled = false;
		// [END_EXCLUDE]
	});
	// [END authwithemail]
	document.getElementById('button-sign-in').disabled = true;

}

function signOut() {
	setTimeout(function () {
		firebase.auth().signOut().then(function () {
			// Sign-out successful.
			window.location.reload();
		}).catch(function (error) {
			// An error happened.
		});
	}, 1000);
}

function updateProfile() {
	var username = document.getElementById("input_user_name").value;
	var user = firebase.auth().currentUser;
	user.updateProfile({
		displayName: username
	}).then(function () {
		// Update successful.
		$("#modal_update_user").modal("hide");
	}).catch(function (error) {
		// An error happened.
	});
}

function startView() {
	$(document).ready(function () {

		firebase.database().ref('channels').on('child_added', function (snapshot) {

			var thumbnail;
			var title = snapshot.child("title").val();
			var address = snapshot.child("address").val();
			var key = snapshot.child('key').val();

			if (snapshot.child("thumbnail").val() === "") {
				thumbnail = "assets/images/logo_empty.png";
			} else {
				thumbnail = snapshot.child("thumbnail").val();
			}

			var channels =
				"<div class='card'>" +
				"<img src='" + thumbnail + "' id='" + snapshot.child('key').val() + "' onClick='viewContent(this.id)'/>" +
				"<h6 class='hide'>'" + snapshot.child('title').val() + "'</h6>" +
				"</div>";


			$("#channels_post").html($("#channels_post").html() + channels);
			var video = document.getElementById("change");
			video.play();
		});

	});
}

function viewContent(clicked_id) {
	var video = document.getElementById('change');
	$('#myModal').modal('show');
	if(!$('#video-content').hasClass('show')){
	}
	else {
		$('#video-content').collapse('hide');
		video.pause();
		video.removeAttribute('src');
		video.load();
	}
	firebase.database().ref('channels').child(clicked_id).once('value', function (snapshot) {
		if (snapshot.child('thumbnail').val() === "") {
			document.getElementById('m_thumbnail').src = "assets/images/logo_empty.png";
		} else {
			document.getElementById('m_thumbnail').src = snapshot.child('thumbnail').val();
		}

		document.getElementById('m_title').innerText = "Filme: " + snapshot.child('title').val();
		document.getElementById('m_year').innerText = "Ano: " + snapshot.child('year').val();
		document.getElementById('m_genre').innerText = "Gênero: " + snapshot.child('genre').val();
		document.getElementById('m_director').innerText = "Diretor: " + snapshot.child('director').val();
		document.getElementById('m_description').innerText = snapshot.child('description').val();
		$('#watching').click(function (e) {
			var player= document.getElementById('change');
			player.src = snapshot.child('address').val();
			$('#video-content').collapse('show');
			player.play();
			
		});
	});
}


var vid = document.getElementById("change");
vid.onended = function() {
	$('#video-content').collapse('hide');
};
