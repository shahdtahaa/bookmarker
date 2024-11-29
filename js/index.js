var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteURL');
var addBookmarkBtn = document.getElementById('addBookmark');
var tableBody = document.getElementById('websiteWrapper');

var bookmarks = [];

bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []
displayBookmarks(bookmarks);

function addBookmark() {
    var websiteName = siteNameInput.value.trim();
    var websiteURL = siteUrlInput.value.trim();

    if (!websiteName || !websiteURL) {
        alert("Both fields are required!");
        return;
    
    }

    if (!isValidURL(websiteURL)) {
        alert("Please enter a valid URL");
        return;
    }

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].name.toLowerCase() === websiteName.toLowerCase()) {
            alert("Bookmark name must be unique!");
            return;
        }
    }


    var website = {
        name: websiteName,
        url: websiteURL
    };

    bookmarks.push(website);
    displayBookmarks(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    siteNameInput.value = '';
    siteUrlInput.value = '';
}


function displayBookmarks(array) {
    var cartoona = '';

    for (var i = 0; i < array.length; i++) {
        cartoona += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${array[i].name}</td>
                <td><a href="${array[i].url}" target="_blank" class="btn btn-sm btn-success onclick="visitWebsite(${i})"><i class="fa-solid fa-eye me-2"></i>Visit</a></td>
                <td><button class="btn btn-sm btn-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
            </tr>
        `;
    }

    tableBody.innerHTML = cartoona;
}
function visitWebsite(index) {
    var websiteURL = bookmarks[index].url.trim();
    var httpsRegex = /^https?:\/\//;

    // Add "https://" if the URL does not already start with "http://" or "https://"
    if (!httpsRegex.test(websiteURL)) {
        websiteURL = `https://${websiteURL}`;
    }

    // Open the website in a new tab
    window.open(websiteURL, '_blank');
}

function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    displayBookmarks(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}


function isValidURL(url) {
    var pattern = /^(https?:\/\/)?(www\.)?[\w\-]+\.\w{2,}(\/\S*)?$/;
    return pattern.test(url);
}

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}