/* Copyright (C)  2015 by Educational Testing Service. All rights reserved.
 *
 * To the maximum extent permitted by applicable law, this work is
 * provided as is, without any express or implied warranty of any kind.
 *This work is contributed to IMS Global Learning Consortium Inc.
 * pursuant to the terms of the IMS Intellectual Property Rights Policy. */

// Define key codes.
checkBoxes = {};
checkBoxes.keys = {
    tab: 9,
    enter: 13,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40
};

// Toggle the state of a check box.

checkBoxes.toggleState = function (checkbox) {
    if (checkbox.getAttribute('aria-checked') == 'true')
	checkbox.setAttribute('aria-checked', 'false');
    else checkbox.setAttribute('aria-checked', 'true');
};

// Handle keyboard input.

checkBoxes.handleKeyDown = function (e) {
    switch (e.keyCode) {
    case checkBoxes.keys.up:
    case checkBoxes.keys.left:
	var prev = e.target.previousElementSibling;
	if (prev)
	    prev.focus();
	e.stopPropagation();
	break;

    case checkBoxes.keys.down:
    case checkBoxes.keys.right:
	var next = e.target.nextElementSibling;
	if (next)
	    next.focus();
	e.stopPropagation();
	break;

    case checkBoxes.keys.enter:
    case checkBoxes.keys.space:
	checkBoxes.toggleState(e.target);
	e.stopPropagation();
    }
    // Prevent Suppress any default action that may be defined.
    e.preventDefault();
};

window.addEventListener('load', function (e) {
    var boxes = document.querySelectorAll('li[role="checkbox"]');
    for (var i = 0; i < boxes.length; i++) {
	boxes[i].addEventListener('keydown', checkBoxes.handleKeyDown, false);
	boxes[i].addEventListener('click', function (e) {
	checkBoxes.toggleState(e.target);
	e.stopPropagation();
}, false);
	}
}, false);
			  
