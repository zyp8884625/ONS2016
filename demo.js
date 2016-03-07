var xmlhttp;
var JenClose = false;
var stationStart = false;
var node1Closed = false;
var node2Closed = false;
var node3Closed = false;
var MiniNetClosed = false;
var commandList = []
var timmer;
function loadXMLDoc(url){
    xmlhttp=null;
    if (window.XMLHttpRequest){// code for Firefox, Opera, IE7, etc.
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject){// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp!=null){
        xmlhttp.onreadystatechange=state_Change;
        xmlhttp.open("GET",url,true);
        xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
        xmlhttp.send(null);
    }
    else{
        $(".testTittle").html("<h1>No Test Running</h1>")
    }
}

function processCommand() {
    for(var i = 0; i < commandList.length; i++){
        if (commandList[i].search("Starting Jenkins job") >= 0){
            
            
            $("#JenToGerrit").empty();
            $("#JenToWiki").empty();
            $("#StationToMiniLink").empty();
            $("#StationToCluster").empty();
            if(i >= commandList.length-1){
                $(".JenImg").fadeOut("slow");
                $(".JenImg").fadeIn("slow");
            }
                $("#JenToStationLink").empty();
                JenToTestStation(commandList[i]);
        }
        if (commandList[i].search("TestStation") >= 0){
            if(!stationStart){
                $(".testStationImg").fadeOut("slow");
                $(".testStationImg").fadeIn("slow");
                $("#JenToStationLink").empty();
                JenToTestStation(commandList[i]);
                stationStart = true;
            }
        }
        if (commandList[i].search("Clean up test environment") >= 0) {
            if (i >= commandList.length - 1) {
                $("#StationToMiniLink").empty();
                $("#StationToCluster").empty();
                $("#JenToWiki").empty();
                $(".MiniNetImg").attr("src","MiniNet-gray.png");
                $(".TopoImg").attr("src", "topo-gray.png")
                $(".node1imgs").attr("src","onos-logo-gray.png");
                $(".node2imgs").attr("src","onos-logo-gray.png");
                $(".node3imgs").attr("src","onos-logo-gray.png");
            }
                $("#JenToStationLink").empty();
                JenToTestStation(commandList[i])
            
        }
        
        if (commandList[i].search("ONOS1") >= 0 && 
            commandList[i].search("disconnect") < 0 &&
            !node1Closed){
                if(i >= commandList.length-1){
                    $(".node1imgs").fadeOut("slow");
                    $(".node1imgs").attr("src","onos-logo-lg.png");
                    $(".node1imgs").fadeIn("slow");
                }
            $("#StationToCluster").empty();
            StationToCluster(commandList[i]);
        }
        
        if (commandList[i].search("ONOS2") >= 0 && 
            commandList[i].search("disconnect") < 0 &&
            !node1Closed){
                if(i >= commandList.length-1){
                    $(".node2imgs").fadeOut("slow");
                    $(".node2imgs").attr("src","onos-logo-lg.png");
                    $(".node2imgs").fadeIn("slow");
                }
            $("#StationToCluster").empty();
            StationToCluster(commandList[i]);
        }
        
        if (commandList[i].search("ONOS3") >= 0 && 
            commandList[i].search("disconnect") < 0 &&
            !node1Closed){
                if(i >= commandList.length-1){
                    $(".node3imgs").fadeOut("slow");
                    $(".node3imgs").attr("src","onos-logo-lg.png");
                    $(".node3imgs").fadeIn("slow");
                }
            $("#StationToCluster").empty();
            StationToCluster(commandList[i]);
        }
        
        if (commandList[i].search("ONOS Cluster") >= 0 && 
            commandList[i].search("disconnect") < 0 &&
            !node1Closed){
                if(i >= commandList.length-1){
                    $(".node1imgs").fadeOut("slow");
                    $(".node1imgs").fadeIn("slow");
                    $(".node2imgs").fadeOut("slow");
                    $(".node2imgs").fadeIn("slow");
                    $(".node3imgs").fadeOut("slow");
                    $(".node3imgs").fadeIn("slow");
                }
            $("#StationToCluster").empty();
            StationToCluster(commandList[i]);
        }
        if (commandList[i].search("ONOS") >= 0 && 
            commandList[i].search("Installing") >= 0 &&
            !node1Closed){
                if(i >= commandList.length-1){
                    $(".node1imgs").fadeOut("slow");
                    $(".node1imgs").attr("src","onos-logo-lg.png");
                    $(".node1imgs").fadeIn("slow");
                    $(".node2imgs").fadeOut("slow");
                    $(".node2imgs").attr("src","onos-logo-lg.png");
                    $(".node2imgs").fadeIn("slow");
                    $(".node3imgs").fadeOut("slow");
                    $(".node3imgs").attr("src","onos-logo-lg.png");
                    $(".node3imgs").fadeIn("slow");
                }
            $("#StationToCluster").empty();
            StationToCluster(commandList[i]);
        }
        
        if ( (commandList[i].search("Mininet") >= 0 || commandList[i].search("Quagga") >= 0)&& 
            commandList[i].search("Bringing down links") < 0 &&
            !MiniNetClosed) {
                $(".MiniNetImg").attr("src","MiniNet.png");
                if(i >= commandList.length-1){
                    $(".MiniNetImg").fadeOut("slow");
                    $(".MiniNetImg").fadeIn("slow");
                }
                if (commandList[i].search("Connecting switches") >= 0){
                    $(".TopoImg").attr("src","topo.png");
                    if(i >= commandList.length-1){
                        $(".TopoImg").fadeOut("slow");
                        $(".TopoImg").fadeIn("slow");
                    }
                }
            $("#StationToMiniLink").empty();
            testStationToMiniNet(commandList[i]);
        }
        if (commandList[i].search("Mininet") >= 0 && 
            commandList[i].search("Bringing down links") >= 0) {
            $(".TopoImg").attr("src","topo-linkdown.png");
            $(".TopoImg").fadeIn("slow");
            $("#StationToMiniLink").empty();
            testStationToMiniNet(commandList[i]);
        }
        
        if (commandList[i].search("Mininet") >= 0 && 
            commandList[i].search("Bring back up links") >= 0) {
            $(".TopoImg").attr("src","topo.png");
            $(".TopoImg").fadeIn("slow");
            $("#StationToMiniLink").empty();
            testStationToMiniNet(commandList[i]);
        }   
        
        if (commandList[i].search("Gerrit") >= 0 && 
            commandList[i].search("Pulling") >= 0) {
                if(i >= commandList.length-1){
                    $(".gerritImg").fadeOut("slow");
                    $(".gerritImg").fadeIn("slow");
                }
                $("#JenToGerrit").empty();
                JenToGerrit(commandList[i]);
        }
        if (commandList[i].search("Wiki") >= 0 && 
            commandList[i].search("Sending Test report") >= 0) {
                if(i >= commandList.length-1){
                    $(".wikiImg").fadeOut("slow");
                    $(".wikiImg").fadeIn("slow");
                }
                $("#JenToWiki").empty();
                JenToWiki(commandList[i]);
            }
    }
}

function state_Change(){
    if (xmlhttp.readyState==4){// 4 = "loaded"
        if (xmlhttp.status==200){// 200 = "OK"
            var Response = xmlhttp.responseText;
            var responseList = Response.split("\n");
            commandList = []
            for (var i = 0; i < responseList.length; i++){
                if (responseList[i].search("DEMO:") >= 0){
                    commandList.push(responseList[i]);
                }
            }
            if (commandList.length>0 && commandList[commandList.length-1].search("STOP") >= 0) {
                clearTimeout(timmer);
                return;
            }
            processCommand();
        }else{
            $("#testTittle").html("<h1>No Test Running</h1>")
        }
    }
}

function transport(startX, startY, endX, endY, command, container) {

    var node = document.createElement('div');  
    node.className = 'Ami';
    node.style.marginTop = startY;
    node.style.marginLeft = startX;
    command = command.substring(5);
    node.innerHTML = command;
    container.appendChild(node);
    
    $(".Ami").animate({marginLeft:endX, marginTop:endY},3000)
}

function JenToTestStation(command) {
    var sY = getElemPos(document.getElementsByClassName("JenImg")[0]).y + $(".JenImg").height();
    var sX = getElemPos(document.getElementsByClassName("JenImg")[0]).x + $(".JenImg").width()/2;
    var eY = getElemPos(document.getElementsByClassName("testStationImg")[0]).y;
    var eX = getElemPos(document.getElementsByClassName("testStationImg")[0]).x + $(".testStationImg").width()/2 + 2;
    line(sX,sY,eX,eY,document.getElementById('JenToStationLink'));
    if (commandList[commandList.length-1].search(command) >= 0) {
        transport(sX,sY,eX,eY,command,document.getElementById('JenToStationLink'));
    }
    
}

function JenToGerrit(command) {
    var sY = getElemPos(document.getElementsByClassName("JenImg")[0]).y + $(".JenImg").height()/2;
    var sX = getElemPos(document.getElementsByClassName("JenImg")[0]).x + $(".JenImg").width();
    var eY = getElemPos(document.getElementsByClassName("JenImg")[0]).y + $(".JenImg").height()/2;
    var eX = getElemPos(document.getElementsByClassName("gerritImg")[0]).x;
    $("#JenToGerrit").empty();
    line(sX,sY,eX,eY,document.getElementById('JenToGerrit'));
    if (commandList[commandList.length-1].search(command) >= 0) {
        transport(eX,eY,sX,sY,command,document.getElementById('JenToGerrit'));
    }
}

function JenToWiki(command) {
    var sY = getElemPos(document.getElementsByClassName("JenImg")[0]).y + $(".JenImg").height()/2;
    var sX = getElemPos(document.getElementsByClassName("JenImg")[0]).x + $(".JenImg").width();
    var eY = getElemPos(document.getElementsByClassName("wikiImg")[0]).y;
    var eX = getElemPos(document.getElementsByClassName("wikiImg")[0]).x;
    $("#JenToWiki").empty();
    line(sX,sY,eX,eY,document.getElementById('JenToWiki'));
    if (commandList[commandList.length-1].search(command) >= 0) {
        transport(sX,sY,eX,eY,command,document.getElementById('JenToWiki'));
    }
}

function testStationToMiniNet(command){
    var sY = getElemPos(document.getElementsByClassName("testStationImg")[0]).y + $(".testStationImg").height() - 15;
    var sX = getElemPos(document.getElementsByClassName("testStationImg")[0]).x + $(".testStationImg").width()/2;
    var eY = getElemPos(document.getElementsByClassName("MiniNetImg")[0]).y;
    var eX = getElemPos(document.getElementsByClassName("MiniNetImg")[0]).x + $(".MiniNetImg").width()/2;
    $(".StationToMiniLink").empty();
    line(sX,sY,eX,eY,document.getElementById('StationToMiniLink'));
    if (commandList[commandList.length-1].search(command) >= 0) {
        transport(sX,sY,eX,eY,command,document.getElementById('StationToMiniLink'));
    }
}

function StationToCluster(command) {
    var sY = getElemPos(document.getElementsByClassName("testStationImg")[0]).y + $(".testStationImg").height()/2;
    var sX = getElemPos(document.getElementsByClassName("testStationImg")[0]).x;
    var eY = getElemPos(document.getElementsByClassName("testCluster")[0]).y + $(".testCluster").height()/2;
    var eX = getElemPos(document.getElementById("testCluster")).x + $("#testCluster").width();
    $(".StationToCluster").empty()
    line(sX,sY,eX,eY,document.getElementById('StationToCluster'));
    if (commandList[commandList.length-1].search(command) >= 0) {
        transport(sX,sY,eX,eY,command,document.getElementById('StationToCluster'));
    }
}


function line(startX, startY, endX, endY, container) {  

    if (startX == endX) {  
        if (startY > endY) {  
            var tempY = startY;  
            startY = endY;  
            endY = tempY;  
        }  
        for (var k = startY; k < endY; k++) {  
            createPoint(container, startX, k);  
        }  
    }  
    // y = ax + b  
    var a = (startY - endY) / (startX - endX);  
    var b = startY - ((startY - endY) / (startX - endX)) * startX;  
    if (Math.abs(startX - endX) > Math.abs(startY - endY)) {  
        if (startX > endX) {  
            var tempX = endX;  
            endX = startX;  
            startX = tempX;  
        }  
        var left = container.style.left;  
        var top = container.style.top;  
        for (var i = startX; i <= endX; i++) {  
            createPoint(container, i, a * i + b);  
        }  
    } else {  
        if (startY > endY) {  
            var tempY = startY;  
            startY = endY;  
            endY = tempY;  
        }  
        for (var j = startY; j <= endY; j++) {  
            createPoint(container, (j - b) / a, j);  
        }  
    }  
      
}  
  
function createPoint(container, x, y) {  
    var node = document.createElement('div');  
    node.className = 'line';
    node.style.marginTop = y; 
    node.style.marginLeft = x;
    container.appendChild(node);
}  
function getElemPos(obj){
        var pos = {"top":0, "left":0};
         if (obj.offsetParent){
           while (obj.offsetParent){
             pos.top += obj.offsetTop;
             pos.left += obj.offsetLeft;
             obj = obj.offsetParent;
           }
         }else if(obj.x){
           pos.left += obj.x;
         }else if(obj.x){
           pos.top += obj.y;
         }
         return {x:pos.left, y:pos.top};
}

function initialization(){
    timmer = setInterval("loadXMLDoc('testLog')", 3000);
    $("#StationToMiniLink").empty();
    $("#StationToCluster").empty();
    $("#JenToGerrit").empty();
    $("#JenToWiki").empty();
    $(".MiniNetImg").attr("src","MiniNet-gray.png");
    $("node1imgs").attr("src","nons-logo-gray.png");
    $("node2imgs").attr("src","nons-logo-gray.png");
    $("node3imgs").attr("src","nons-logo-gray.png");
    $(".TopoImg").attr("src", "topo-gray.png")
    commandList = []
}
