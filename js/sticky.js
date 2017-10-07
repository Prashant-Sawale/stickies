var addButton = document.getElementById('add-anchor'),
    addStickyListener = function (evt) {
        var newStickyRequest = new XMLHttpRequest();
        newStickyRequest.open('GET', 'sticky.html', true);
        newStickyRequest.responseType = 'text';
        newStickyRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
        newStickyRequest.onload = function (e) {
            if (this.status == 200) {
                createSticky(this.responseText);
            }
        };
        newStickyRequest.send();
    };
addButton.addEventListener('click', addStickyListener);

var createSticky = function (stickyDom) {
    var stickyArea = document.querySelector('.sticky-area'),
        div = document.createElement('div'),
        position = getStickyPosition();
    div.classList.add('sticky');
    div.style.top = position.top;
    div.style.left = position.left;
    div.innerHTML = stickyDom;
    stickyArea.appendChild(div);
}

var getStickyPosition = function () {
    var stickySize = 250,
        topPadding = 20,
        leftPadding = 20,
        navBarHeight = 50,
        minTop = navBarHeight + topPadding,
        maxScreenWidth = window.innerWidth - (stickySize + leftPadding),
        maxScreenHeight = window.innerHeight - (stickySize + minTop),
        randomLeft = Math.ceil(Math.random() * maxScreenWidth),
        randomTop = Math.ceil(Math.random() * maxScreenHeight);
    randomTop = randomTop < minTop ? minTop : randomTop;
    randomLeft = randomLeft < (leftPadding / 2) ? (leftPadding / 2) : randomLeft;
    return {
        top: randomTop,
        left: randomLeft
    };
}