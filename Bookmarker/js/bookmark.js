//get listener from submit button
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save bookmaek when button subbmit
function saveBookmark(event) {
    //get value from myForm
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    //saved valuees in array
    var bookmarks = {
        name: siteName,
        url: siteUrl
    }

    //local values in HTML5
    //saved it in array
    if(localStorage.getItem('Storage') === null)
    {
        //create new Array
        var aBookmarks = [];
        aBookmarks.push(bookmarks);

        //saved values
        localStorage.setItem('Storage', JSON.stringify(aBookmarks));
    }else
    {
        //get olds values
        var aBookmarks = JSON.parse(localStorage.getItem('Storage'));
        //push new values 
        aBookmarks.push(bookmarks);
        //saved values
        localStorage.setItem('Storage', JSON.stringify(aBookmarks));
    } 

    updateBookmark();

    event.preventDefault();
}

function updateBookmark(){
    //get values from localStorage
    var aResults = JSON.parse(localStorage.getItem('Storage'));

    //element for update
    var update = document.getElementById('showBookmark');
    update.innerHTML = '';
    
    for(var i = 0; i < aResults.length; i++)
    {
        update.innerHTML += '<div class="well">' 
                            + '<div class="row">'
                            + '<div class="col-md-8"><h3>' + aResults[i].name
                            + '</h3></div><div class="col-md-2">'
                            + '<a class="btn btn-info btn-block" href="' + aResults[i].url + '" target="_blank"><i class="fa fa-paper-plane">Go</i></a>' 
                            + '</div><div class="col-md-2">'
                            + '<a class="btn btn-danger btn-block" onclick="deleteBookmark(\''+aResults[i].url+'\')" href="#"><i class="fa fa-trash">Delete</i></a>' 
                            + '</div></div>';
    }


}
function deleteBookmark(url) {
    var aResults = JSON.parse(localStorage.getItem('Storage'));
    for(var i = 0; i < aResults.length; i++)
    {
        if(url == aResults[i].url) { aResults.splice(i, 1); break; }
    }
    //update values
    localStorage.setItem('Storage', JSON.stringify(aResults));

    updateBookmark();
}