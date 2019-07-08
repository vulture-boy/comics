var pageNum = 0;
var totalNum = 5;
var localStorage = window.localStorage;
var assets = "assets/"; // Folder name
var comicImg;
var btnPrev;
var btnNext;
var btnFirst;
var btnLast;

var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
    // ... more custom settings?
});

function OnStart() {
    comicImg = document.getElementById('comicImg');
    btnPrev = document.getElementById('prev');
    btnPrev.style.visibility = "hidden";
    btnNext = document.getElementById('next');
    btnFirst = document.getElementById('first');
    btnFirst.style.visibility = "hidden";
    btnLast = document.getElementById('newest');
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
}

function LoadPage() {
    pageNum = localStorage.getItem("pageNum");
    ChangeComic(pageNum);
}

function SavePage() {
    localStorage.setItem("pageNum", pageNum);
}