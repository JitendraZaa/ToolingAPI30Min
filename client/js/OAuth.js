
$("#prodBtn").click(prodLogin);
$("#sandBtn").click(sandLogin);

var apiVersion = 'v30.0',
    clientId = '3MVG9iTxZANhwHQuSJa6AuCgpr0YL.cTaAGjmBiKxN825pW8DgZzxFzI2RPaz5AlIhz.hFdrYIIIaKn4v3y1V',
    loginUrl = 'https://login.salesforce.com/',
    redirectURI = "https://toolingapi.herokuapp.com/oauthcallback.html", 
    proxyURL = 'https://toolingapi.herokuapp.com/proxy/',
    client = new forcetk.Client(clientId, loginUrl, proxyURL);

 
if($.cookie("AccToken") && $.cookie("APIVer") && $.cookie("InstURL"))
{ 
    client.setSessionToken($.cookie("AccToken"), $.cookie("APIVer"), $.cookie("InstURL"));
}
  

function prodLogin()
{
	loginUrl = 'https://login.salesforce.com/'; 
    login();
}

function sandLogin()
{
    loginUrl = 'https://test.salesforce.com/';
    login();
}
function login() {
    var url = loginUrl + 'services/oauth2/authorize?display=popup&response_type=token' +
        '&client_id=' + encodeURIComponent(clientId) +
        '&redirect_uri=' + encodeURIComponent(redirectURI);
    popupCenter(url, 'login', 700, 600);
}

function oauthCallback(response) {
    if (response && response.access_token) {
        //client.setSessionToken(response.access_token, apiVersion, response.instance_url);
        console.log(response);
        $.cookie("AccToken",response.access_token ) ;
        $.cookie("APIVer", apiVersion) ;
        $.cookie("InstURL",  response.instance_url) ; 
        $.cookie("idURL",  response.id) ;
        
		strngBrks = response.id.split('/');
		$.cookie("LoggeduserId",  strngBrks[strngBrks.length - 1]) ;
		
        window.location = 'Main';
    } else {
        alert("AuthenticationError: No Token");
    }
}

function executeQuery() {
    if (!client.sessionId) {
        alert('You are not authenticated. Please login first.');
        return false;
    }
    client.query($('#query').val(),
        function (data) {
            $('#result').html(JSON.stringify(data, undefined, 3));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

$('#btn-login').click(login);
$('#btn-exec').click(executeQuery);

function popupCenter(url, title, w, h) {
    // Handles dual monitor setups
    var parentLeft = window.screenLeft ? window.screenLeft : window.screenX;
    var parentTop = window.screenTop ? window.screenTop : window.screenY;
    var left = parentLeft + (window.innerWidth / 2) - (w / 2);
    var top = parentTop + (window.innerHeight / 2) - (h / 2);
    return window.open(url, title, 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}