// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e){
	
	// get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	
	/*
		// local storage
		localStorage.setItem('test', 'Hello World');
		console.log(localStorage.getItem('test'));
		localStorage.removeItem('test');
		console.log('test');
	*/

	// see if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		// initialise array
		var bookmarks = [];
		// add to array
		bookmarks.push(bookmark);
		// set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// add bookmark to array
		bookmarks.push(bookmark);
		// reset to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	// clear form
	document.getElementById('myForm').reset();

	// fetch bookmarks
	fetchBookmarks();	

	// prevent form from submitting
	e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
	// get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// loop through bookmarks
	for(var i=0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			// remove from array
			bookmarks.splice(i,1);
		}
	}
	// reset to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	// fetch bookmarks
	fetchBookmarks();	
}


// Fetch bookmarks
function fetchBookmarks(){
	// get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// get output id
	var bookmarksResults = document.getElementById('bookmarksResults');
	// build output
	bookmarksResults.innerHTML = '';

	for(var i=0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<td style="border:0px;"><a target="_blank" href="'+url+'">'+name+'</a>' +
									  ' <a class="close" onclick="deleteBookmark(\''+url+'\')">&times;</a>' +
									  //' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-default btn-xs"> delete</a>' +
									  '</td>';
	}
}

// Validation
function validateForm(siteName, siteUrl){

	if(!siteName || !siteUrl){
		alert('Please fill in both boxes');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please enter a valid URL');
		return false;
	}

return true;

}
