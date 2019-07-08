var pageNum = 0;
var totalNum = 5;
var localStorage = window.localStorage;
var assets = "assets/"; // Folder name
var interfaceFld = "interface/";
var comicImg;
var btnPrev;
var btnNext;
var btnFirst;
var btnLast;

var digit1; // first digit e.g. one two
var digit2;
var digit3;

var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
    // ... more custom settings?
});

function OnStart() {
    // DOM Capture
    comicImg = document.getElementById('comicImg');
    btnPrev = document.getElementById('prev');
    btnPrev.style.visibility = "hidden";
    btnNext = document.getElementById('next');
    btnFirst = document.getElementById('first');
    btnFirst.style.visibility = "hidden";
    btnLast = document.getElementById('newest');

    digit1 = document.getElementById('digit1');
    digit2 = document.getElementById('digit2');
    digit3 = document.getElementById('digit3');
}

function ChangeComic(mode) {
    // Change Page
    if (mode == -1) { // Next 
        if (pageNum < totalNum) {
            pageNum++;
        } 
    } else if (mode == -2) { // Previous
        if (pageNum > 0) {
            pageNum--;
        } 
    } else if (mode == 0) { // First
        pageNum = 0;

    } else if (mode == -3) { // Latest
        pageNum = totalNum -1;

    } else if (mode > 0 && mode < totalNum) { // Specific
        pageNum = mode;
    }

    // Change Button Visibility
    if (pageNum == 0) {
        btnPrev.style.visibility = "hidden";
        btnFirst.style.visibility = "hidden";
    }
    if (pageNum == totalNum -1) {
        btnNext.style.visibility = "hidden";
        btnLast.style.visibility = "hidden";
    }
    if (pageNum != totalNum -1) {
        btnNext.style.visibility = "visible";
        btnLast.style.visibility = "visible";
    }
    if (pageNum != 0) {
        btnPrev.style.visibility = "visible";
        btnFirst.style.visibility = "visible";
    }

    // Change comic
    var newPage = assets + pageNum + ".jpg"
    comicImg.setAttribute('src',newPage);

    // Determine digit display
    var pgString = pageNum.toString();
    digit1.setAttribute('src',interfaceFld + "num" + pgString.charAt(pgString.length-1) + ".png");
    if (pgString.length > 1) { // Digit 2
        digit2.setAttribute('src',interfaceFld + "num" + pgString.charAt(pgString.length-2) + ".png");
    } else {digit2.setAttribute('src',interfaceFld + "num0.png");}
    if (pgString.length > 2) { // Digit 3
        digit3.setAttribute('src',interfaceFld + "num" + pgString.charAt(pgString.length-3) + ".png");
    } else {digit3.setAttribute('src',interfaceFld + "num0.png");}
}

function LoadPage() {
    pageNum = localStorage.getItem("pageNum");
    ChangeComic(pageNum);
}

function SavePage() {
    localStorage.setItem("pageNum", pageNum);
}

document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        
    }
    else if (e.keyCode == '40') {
        // down arrow
        
    }
    else if (e.keyCode == '37') {
       // left arrow
       ChangeComic(-2);
    }
    else if (e.keyCode == '39') {
       // right arrow
       ChangeComic(-1);
    }

}