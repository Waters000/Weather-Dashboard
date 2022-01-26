 // make a request to the url
 fetch(apiUrl).then(function (response) {
    // request was success ful
    if (response.ok) {
        response.json().then(function (data) {
            displayRepos(data, user);
        });
    } else {
        alert("Error: Github user Not Found");
    }
})
    