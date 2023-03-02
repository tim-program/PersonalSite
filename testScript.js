function LoadJsonContentByType(ContentType){
    var jsonContent = getProjectJson("./projects.json");
    jsonContent.then((data) => JsonToHtmlListings(data,ContentType));
}

async function getProjectJson(file){
    let fetchObject = await fetch(file);
    let jsonObject = await fetchObject.json();
    return jsonObject;
}

function JsonToHtmlListings(JsonData,ContentType){
    var ListNames = Object.keys(JsonData[ContentType]);
    for(let Name of ListNames){
        AddHtmlTileToPage(ContentType,Name,JsonData[ContentType][Name]);
    }
}

function AddHtmlTileToPage(ContentType,ListingName,ListingInfo){
    var HtmlString = CreateHtmlStringFromDetails(ContentType,ListingName,ListingInfo["Title"],ListingInfo["Description"],ListingInfo["Year"])
    var ProjectContainer = document.getElementById("ProjectsDiv");
    ProjectContainer.innerHTML += HtmlString;
}

/*
 <a href="./index.html">
                <div class="ProjectTitleTile">
                    <h1>Title</h1>
                    <p>Description</p>
                </div>
            </a>
*/
function CreateHtmlStringFromDetails(ContentType,ListingName,Title,Description,Year){
    var htmlString = "<a href=\"./"+ContentType+"/"+ListingName+".html\">\n";
    htmlString += "<div class = \"ProjectTitleTile\">\n";
    htmlString += "<h1>" + Title + "</h1>\n";
    htmlString += "<p>" + Description + "</p>\n";
    htmlString += "</div>\n";
    htmlString += "</a>\n";


    return htmlString;
}