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

function PopulatePageBar(LinkPrefix){
    var listingClass = "LinkTile PageText";
    var htmlLinkBar = "<a href=\""+LinkPrefix+"\\index.html\"><li class=\""+listingClass+"\">Timothy Deutsch</li></a>\n" +
    "<a href=\""+LinkPrefix+"\\projects.html\"><li class=\""+listingClass+"\">Projects</li></a>\n" +
    "<a href=\""+LinkPrefix+"\\blog.html\"><li class=\""+listingClass+"\">Blog</li></a>\n" +
    "<a href=\""+LinkPrefix+"\\TimothyDeutschResume.pdf\"><li class=\""+listingClass+"\">Resume (revising)</li></a>\n";

    var pageBarElement = document.getElementById("PageBar");
    pageBarElement.innerHTML += htmlLinkBar;
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
    htmlString += "<div class = \"ProjectTitleTile LinkTile\">\n";
    htmlString += "<h1 class = \"PageText\">" + Title + "</h1>\n";
    htmlString += "<p class = \"PageText\">" + Description + "</p>\n";
    htmlString += "</div>\n";
    htmlString += "</a>\n";


    return htmlString;
}