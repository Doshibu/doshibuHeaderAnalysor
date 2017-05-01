var features = {
	'Strict-Transport-Security' : 'HTTP Strict Transport Security is an excellent feature to support on your site and strengthens your implementation of TLS by getting the User Agent to enforce the use of HTTPS. Recommended value "strict-transport-security: max-age=31536000; includeSubDomains".',
	'Content-Security-Policy' : 'Content Security Policy is an effective measure to protect your site from XSS attacks. By whitelisting sources of approved content, you can prevent the browser from loading malicious assets.',
	'Public-Key-Pins' : 'HTTP Public Key Pinning protects your site from MiTM attacks using rogue X.509 certificates. By whitelisting only the identities that the browser should trust, your users are protected in the event a certificate authority is compromised.',
	'X-Frame-Options' : 'X-Frame-Options tells the browser whether you want to allow your site to be framed or not. By preventing a browser from framing your site you can defend against attacks like clickjacking. Recommended value "x-frame-options: SAMEORIGIN".',
	'X-XSS-Protection' : 'X-XSS-Protection sets the configuration for the cross-site scripting filter built into most browsers. Recommended value "X-XSS-Protection: 1; mode=block".',
	'X-Content-Type-Options' : 'X-Content-Type-Options stops a browser from trying to MIME-sniff the content type and forces it to stick with the declared content-type. The only valid value for this header is "X-Content-Type-Options: nosniff".',
	'Referrer-Policy' :	'Referrer Policy is a new header that allows a site to control how much information the browser includes with navigations away from a document and should be set by all sites.'
}

var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);
var headers = req.getAllResponseHeaders().toLowerCase();
headers = parseResponseHeaders(headers);
//alert(headers);

$('body').prepend('<div class="alert alert-danger widget-container" style="width: 80%; margin: 15px 10%; text-align: center;">'+
	'<p><strong>Potential vulnerability</strong></p>'+
	'<div class="widget-vert-rotate well well-lg"></div>'+
	'</div>');

var container = $('.widget-container'),
	content = $('.widget-vert-rotate'),
	t = 3000;

$.each(features, function( i, val ) {
	if(! (i in (Object.keys(headers)))) {
		$('<p />').text(i + ' : ' + val).appendTo(content);
	}
});

if(content.children().length === 0) {
	container.removeClass('alert-danger').addClass('alert-success');
	content.preprend('No vulnerability !');
} else if(content.children().length === 1 || content.children().length === 2) {
	container.removeClass('alert-danger').addClass('alert-warning');
}

// Set the interval function
var itv = setInterval(function() {
	var child = content.children().first();
	child.slideUp(1000, function() {
		child.remove();

		content.append(
			$('<p />').text(child.text())
			);
	});
}, t);


function parseResponseHeaders(headerStr) {
	var headers = {};
	if (!headerStr) {
		return headers;
	}
	var headerPairs = headerStr.split('\u000d\u000a');
	for (var i = 0; i < headerPairs.length; i++) {
		var headerPair = headerPairs[i];
    // Can't use split() here because it does the wrong thing
    // if the header value has the string ": " in it.
    var index = headerPair.indexOf('\u003a\u0020');
    if (index > 0) {
    	var key = headerPair.substring(0, index);
    	var val = headerPair.substring(index + 2);
    	headers[key] = val;
    }
}
return headers;
}