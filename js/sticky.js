var addButton = document.getElementById('add-anchor'),
    addStickyListener = function (evt) {
        //Send AJAX call to get the stciky dom.
        var newStickyRequest = new XMLHttpRequest();
        newStickyRequest.open('GET', 'sticky.html', true);
        newStickyRequest.responseType = 'text';
        newStickyRequest.onload = function (e) {
            if (this.status == 200) {
                createSticky(this.responseText);
            }
        };
        newStickyRequest.send();
    };

//Add click event handler/listener
addButton.addEventListener('click', addStickyListener);

/**
 * Creates new sticky with the sticky dom string.
 *
 * @function createSticky
 * @param  {string} stickyDom {Sticky dom string}
 * @public
 */
var createSticky = function (stickyDom) {
    var stickyArea = document.querySelector('.sticky-area'),
        div = document.createElement('div'),
        position = getStickyPosition();
    div.classList.add('sticky');
    //Set sticky position
    div.style.top = position.top;
    div.style.left = position.left;
    //Set dom
    div.innerHTML = stickyDom;
    //Add new sticky to sticky area
    stickyArea.appendChild(div);
}

/**
 * Returns random top and left position with max allowed screen width.
 *
 * @function getStickyPosition
 * @return {Object} {Object with random top & left}
 * @public
 */
var getStickyPosition = function () {
    var stickySize = 250, //Width & Height of the sticky
        topPadding = 20, //Padding around nav bar
        vPadding = 10, //Padding on both left and right end of the screen
        navBarHeight = 50, //Height of the nav bar
        minTop = navBarHeight + topPadding, //Min top position should be nar bar height plus top padding
        maxScreenWidth = window.innerWidth - (stickySize + 2 * vPadding), //max width should exclude sticky width and padding
        maxScreenHeight = window.innerHeight - (stickySize + minTop), //max height should exclude sticky height and padding
        randomLeft = Math.ceil(Math.random() * maxScreenWidth), //Random left with max screen width
        randomTop = Math.ceil(Math.random() * maxScreenHeight); //Random top with max screen height
    randomTop = randomTop < minTop ? minTop : randomTop; //If random top is less than min top then use min top
    randomLeft = randomLeft < vPadding ? vPadding : randomLeft; //If random left is less than vPadding then use vPadding
    return {
        top: randomTop,
        left: randomLeft
    };
}