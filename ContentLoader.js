
function LoadJsonContentJumbled(){
    var jsonContent = getProjectJson("./projects.json");
    jsonContent.then((data) => JumbledJsonToHtmlListings(data));
}

function LoadJsonContentByType(ContentType){
    var jsonContent = getProjectJson("./projects.json");
    jsonContent.then((data) => JsonToHtmlListings(data,ContentType));
}

async function getProjectJson(file){
    let fetchObject = await fetch(file);
    let jsonObject = await fetchObject.json();
    return jsonObject;
}

function JumbledJsonToHtmlListings(JsonData){
    var ContentTypes = Object.keys(JsonData);
    var HtmlMap = new Map();
    for(let Type of ContentTypes){
        if(!(Type === "InProgress")){
            var ListNames = Object.keys(JsonData[Type]);
            for(let Name of ListNames){
                var ListingInfo = JsonData[Type][Name];
                var HtmlString = CreateHtmlStringFromDetails(Type, Name,ListingInfo["Title"],ListingInfo["Description"],ListingInfo["src"],ListingInfo["Year"]);
                if(HtmlMap.has(ListingInfo["Year"])){
                   var HtmlMapValue = HtmlMap.get(ListingInfo["Year"]);
                   HtmlMap.set(ListingInfo["Year"],[HtmlMapValue,[HtmlString]]);
                }else{
                    HtmlMap.set(ListingInfo["Year"],[HtmlString]);
                }
            }
        }
    }
    console.log(HtmlMap);

    var JumbledContainer = document.getElementsByClassName("AllProjectsJumbled")[0];
    var YearList = Array.from(HtmlMap.keys());

    for(const Year of YearList){
        var HtmlContentList = HtmlMap.get(Year);
        for(let HtmlContent of HtmlContentList){
            JumbledContainer.innerHTML += HtmlContent;
        }
    }
}

function JsonToHtmlListings(JsonData,ContentType){
    var ListNames = Object.keys(JsonData[ContentType]);
    for(let Name of ListNames){
        AddHtmlTileToPage(ContentType,Name,JsonData[ContentType][Name]);
    }
}

function AddHtmlTileToPage(ContentType,ListingName,ListingInfo){
    var HtmlString = CreateHtmlStringFromDetails(ContentType,ListingName,ListingInfo["Title"],ListingInfo["Description"],ListingInfo["src"],ListingInfo["Year"])
    var ProjectContainer = document.getElementById("ProjectsDiv");
    ProjectContainer.innerHTML += HtmlString;
}


function PopulatePageBar(LinkPrefix){
    var listingClass = "LinkTile PageText";
    var htmlLinkBar = "<a href=\""+LinkPrefix+"/index.html\"><li>Home</li></a>\n"+
                    "<a href=\""+LinkPrefix+"/aboutme.html\"><li>Me</li></a>\n"+
                    "<a href=\""+LinkPrefix+"/blog.html\"><li>Blog</li></a>\n"+
                    "<a href=\""+LinkPrefix+"/ai.html\"><li>AI</li></a>\n"+
                    "<a href=\""+LinkPrefix+"/gamedev.html\"><li>Game Dev</li></a>\n"+
                    "<a href=\""+LinkPrefix+"/art.html\"><li>Art</li></a>\n"+
                    "<a href=\""+LinkPrefix+"/contact.html\"><li>Contact</li></a>\n"+
                    "<a href=\""+LinkPrefix+"/TimothyDeutschResume.pdf\"><li>Resume</li></a>\n";

    var pageBarElement = document.getElementById("PageBar");
    pageBarElement.innerHTML += htmlLinkBar;
}


/*
 <a href="./index.html">
                <div class="ProjectTitleTile">
                    <h1>Title</h1>
                    <p>Description</p>
                    <img src="source.png" alt="source"/>
                </div>
            </a>
*/
function CreateHtmlStringFromDetails(ContentType,ListingName,Title,Description,SourceType,Year){
    var htmlString = "<a href=\"./"+ContentType+"/"+ListingName+".html\">\n";
    htmlString += "<div class = \"ProjectTitleTile LinkTile\">\n";
    htmlString += "<h1 class = \"PageText\">" + Title + "</h1>\n";
    htmlString += "<p class = \"PageText\">" + Description + "</p>\n";
    htmlString += "<img src=\"./"+ ContentType + "/images/" + ListingName + "."+SourceType+"\" alt=\""+ListingName+"\"/>\n";
    htmlString += "</div>\n";
    htmlString += "</a>\n";


    return htmlString;
}
