function saveOptions(e) {
	browser.storage.sync.set({
		theBestBrowser: document.querySelector("#browser").value
	});
	e.preventDefault();
}

function restoreOptions() {
	var gettingItem = browser.storage.sync.get('theBestBrowser');
	gettingItem.then((res) => {
		document.querySelector("#browser").value = res.theBestBrowser || 'Firefox';
	});
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
