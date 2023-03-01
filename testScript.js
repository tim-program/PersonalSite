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
        AddHtmlTileToPage(Name,JsonData[ContentType][Name]);
    }
}

function AddHtmlTileToPage(ListingName,ListingInfo){
    var HtmlString = CreateHtmlStringFromDetails(ListingName,ListingInfo["ProjectTitle"],ListingInfo["Description"],ListingInfo["Year"])
    var ProjectContainer = document.getElementById("ProjectsDiv");
    ProjectContainer.innerHTML += HtmlString;
}

function CreateHtmlStringFromDetails(ListingName,ProjectTitle,Description,Year){
    var htmlString = "<a href=\""+ListingName+".html\">\n";
    htmlString += "<div class = \"ProjectTitleTile\">\n";
    //htmlString += "<h1>" + ProjectTitle + "</h1>\n";
    htmlString += "<p>" + ProjectTitle+ " "+ Description + "</p>\n";
    htmlString += "</div>\n";
    htmlString += "</a>\n";


    return htmlString;
}