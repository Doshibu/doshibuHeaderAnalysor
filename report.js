var features = {
	'Strict-Transport-Security' : {
		'definition' : 'HTTP Strict Transport Security is an excellent feature to support on your site and strengthens your implementation of TLS by getting the User Agent to enforce the use of HTTPS. Recommended value "strict-transport-security: max-age=31536000; includeSubDomains".',
		'ressource' : 'https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security'
	},
	'Content-Security-Policy' : {
		'definition' : 'Content Security Policy is an effective measure to protect your site from XSS attacks. By whitelisting sources of approved content, you can prevent the browser from loading malicious assets.',
		'ressource' : 'https://en.wikipedia.org/wiki/Content_Security_Policy'
	},
	'Public-Key-Pins' : {
		'definition' : 'HTTP Public Key Pinning protects your site from MiTM attacks using rogue X.509 certificates. By whitelisting only the identities that the browser should trust, your users are protected in the event a certificate authority is compromised.',
		'ressource' : 'https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning'
	},
	'X-Frame-Options' : {
		'definition' : 'X-Frame-Options tells the browser whether you want to allow your site to be framed or not. By preventing a browser from framing your site you can defend against attacks like clickjacking. Recommended value "x-frame-options: SAMEORIGIN".',
		'ressource' : 'https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/X-Frame-Options'
	},
	'X-XSS-Protection' : {
		'definition' : 'X-XSS-Protection sets the configuration for the cross-site scripting filter built into most browsers. Recommended value "X-XSS-Protection: 1; mode=block".',
		'ressource' : 'https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/X-XSS-Protection'
	},
	'X-Content-Type-Options' : {
		'definition' : 'X-Content-Type-Options stops a browser from trying to MIME-sniff the content type and forces it to stick with the declared content-type. The only valid value for this header is "X-Content-Type-Options: nosniff".',
		'ressource' : 'https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/X-Content-Type-Options'
	},
	'Referrer-Policy' : {
		'definition' : 	'Referrer Policy is a new header that allows a site to control how much information the browser includes with navigations away from a document and should be set by all sites.',
		'ressource' : 'https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Referrer-Policy'
	}
}

var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);
var headers = req.getAllResponseHeaders().toLowerCase();
headers = parseResponseHeaders(headers);

$('body').prepend('<div id="doshibuAddon_container" class="alert alert-info alert-dismissable">'+
						'<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
						'<p id="doshibuAddon_title"><strong>Security Report</strong></p>'+
						'<div id="doshibuAddon_list" class=""></div>'+
					'</div>');

var container = $('#doshibuAddon_container'),
	title = $('#doshibuAddon_title'),
	list = $('#doshibuAddon_list'),
	note = Object.keys(features).length;

$.each(features, function( i, val ) {
	if(! (i in (Object.keys(headers)))) {
		note--;
		list.append('<span class="label label-warning" data-toggle="collapse" data-target="#'+ i +'"><i class="fa fa-times"></i>'+ i +'</span>');
		container.append('<div id="'+ i +'" class="well collapse"><p>'+ val['definition'] +'</p>'+
						'<a class="btn btn-default" href="'+ val['ressource'] +'" target="_blank">Ressource</a></div>');	
	}
});
title.append(' : '+ note +' / '+ Object.keys(features).length)

if(list.children().length === 0) {
	list.preprend('No vulnerability !');
}

$(".collapse").on('show.bs.collapse', function(){
    $('.collapse.in').removeClass('in');
});

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