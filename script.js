function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var all = ["origin","nothing","time","more","story","stand","poem","uniform","music","new","length","combine","lost"]; /* ALSO UPDATE ADVANCED.HTML */
all.push("final");
var start=getRandomInt(0,all.length-5);
var newest = all.slice(start,start+4);
console.log(all.length);

function reRandom() {
  start=getRandomInt(0,all.length-5);
  newest=all.slice(start,start+4);
  loadsidebar();
}

function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

function openText(post){
  const text=loadFile("posts/"+post+".txt");
  document.getElementById("text").innerHTML=formatText(text);
  closeNav();
}

function formatText(text){
  var splitted=text.split("\n");
  var current="";
  var start;
  var end;
  for (var line of splitted){
    start="<p>";
    end="</p>";
    if (line.startsWith("#")){
      start="<h1>";
      end="</h1>";
    } else if (line.startsWith("_")){
      start="<h2>";
      end="</h2>";
    } else if (line.startsWith("+")){
      start="<h3>";
      end="</h3>";
    } else if (line.startsWith("-")){
      start=" - ";
    } else if (line.startsWith("/")) {
      start="</br>"
    } else if (line.startsWith("\\")){
      start="";
      end=""
    } else {
      line="*"+line;
    }
    current+=start+line.slice(1)+end;
  }
  return current;
}

async function smoothText(url){
  var content = document.getElementById("text");
  content.classList.add("blurOut");
  await new Promise((resolve, reject) => {
    content.addEventListener("animationend", resolve);
    content.addEventListener("animationerror", reject);
    setTimeout(reject, 5000);
  }).catch((err) => {
    console.error(err);
  });
  content.style.filter="blur(20px)";
  content.classList.remove("blurOut");
  openText(url);
  content.classList.add("blurIn");
  await new Promise((resolve, reject) => {
    content.addEventListener("animationend", resolve);
    content.addEventListener("animationerror", reject);
    setTimeout(reject, 5000);
  }).catch((err) => {
    console.error(err);
  });
  content.style.filter="blur(0px)";
  content.classList.remove("blurIn");
}

function loadsidebar() {
  var sidebar = document.getElementById("sidebar");
  sidebar.innerHTML=`<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>`;
  for (const post of newest) {
    sidebar.innerHTML=`<a href=\"javascript:void(0)\" onclick=\"openText('${post}')\">${post}</a>`+sidebar.innerHTML;
  }
  sidebar.innerHTML+="<a class='differ' href='https://magician357.github.io/opinions/advanced.html'>or try something else</a>"
}

openText("origin");
loadsidebar();

function openNav() {
  reRandom();
  document.getElementById("sidebar").style.width = "100%";
  document.getElementById("main").style.marginLeft = "50vw";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function toggleDarkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
