// Listen for form submit
document.getElementById('myForm2').addEventListener('submit', saveArticle);

// Save article
function saveArticle(e){
	
	// get form values
	var articleName = document.getElementById('articleName').value;
	var articleUrl = document.getElementById('articleUrl').value;

	if(!validateForm(articleName, articleUrl)){
		return false;
	}

	var article = {
		name: articleName,
		url: articleUrl
	}

	
	/*
		// local storage
		localStorage.setItem('test', 'Hello World');
		console.log(localStorage.getItem('test'));
		localStorage.removeItem('test');
		console.log('test');
	*/

	// see if articles is null
	if(localStorage.getItem('articles') === null){
		// initialise array
		var articles = [];
		// add to array
		articles.push(article);
		// set to localStorage
		localStorage.setItem('articles', JSON.stringify(articles));
	} else {
		// get articles from localStorage
		var articles = JSON.parse(localStorage.getItem('articles'));
		// add article to array
		articles.push(article);
		// reset to localStorage
		localStorage.setItem('articles', JSON.stringify(articles));
	}
	// clear form
	document.getElementById('myForm2').reset();

	// fetch articles
	fetchArticles();	

	// prevent form from submitting
	e.preventDefault();
}

// Delete article
function deleteArticle(url){
	// get articles from localStorage
	var articles = JSON.parse(localStorage.getItem('articles'));
	// loop through articles
	for(var i=0; i < articles.length; i++){
		if(articles[i].url == url){
			// remove from array
			articles.splice(i,1);
		}
	}
	// reset to localStorage
	localStorage.setItem('articles', JSON.stringify(articles));
	// fetch articles
	fetchArticles();	
}


// Fetch articles
function fetchArticles(){
	// get articles from localStorage
	var articles = JSON.parse(localStorage.getItem('articles'));
	// get output id
	var articlesResults = document.getElementById('articlesResults');
	// build output
	articlesResults.innerHTML = '';

	for(var i=0; i < articles.length; i++) {
		var name = articles[i].name;
		var url = articles[i].url;

		articlesResults.innerHTML += '<td style="border:0px;"><a target="_blank" href="'+url+'">'+name+'</a>' +
									  ' <a class="close" onclick="deleteArticle(\''+url+'\')">&times;</a>' +
									  //' <a onclick="deleteArticle(\''+url+'\')" class="btn btn-default btn-xs"> delete</a>' +
									  '</td>';
	}
}

// Validation
function validateForm(articleName, articleUrl){

	if(!articleName || !articleUrl){
		alert('Please fill in both boxes');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!articleUrl.match(regex)){
		alert('Please enter a valid URL');
		return false;
	}

return true;

}
