/* Copyright (C)  2015 by Educational Testing Service. All rights reserved.
 *
 * To the maximum extent permitted by applicable law, this work is
 * provided as is, without any express or implied warranty of any kind.
 *This work is contributed to IMS Global Learning Consortium Inc.
 * pursuant to the terms of the IMS Intellectual Property Rights Policy. */

if (!radioButtons)
    throw new Error("Radio buttons not found - radiobuttons.js must be loaded first");
var inlineChoice = {};

// Fill the lacuna in the passage with the label of the selected button.
inlineChoice.fill = function (button) {
    /* An HTML custom data attribute contains an id reference to the lacuna
     * in the passage. One lacuna is associated with each group of radio 
     * buttons. */
    var lacunaId = button.parentNode.dataset.inlineChoice;
    if (!lacunaId)
	throw new Error('Id of lacuna not found');
    var lacuna = document.getElementById(lacunaId);
    if (!lacuna)
	throw new Error('Element with id ' + lacunaId + ' not found');

    // Retrieve the label of the selected choice.
    var label = button.querySelector(':nth-child(2)') ||
	    button.firstElementChild;
    if (!label)
	throw new Error('Choice label not found');

    // Insert the chosen text into the passage, including any enclosing elements.
    lacuna.innerHTML = label.innerHTML;
};

// Action registration
window.addEventListener('load', function () {
    // Obtain a list of relevant radio buttons.
    var buttons = document.querySelectorAll(
	'ul[role="radiogroup"][data-inline-choice]>li[role="radio"]');
    if (!buttons.length)
	throw new Error("No inline choice radio buttons found");

    // Associate a "fill" action with each button.
    for (var i = 0; i < buttons.length; i++) {
	var buttonId = buttons[i].id;
	if (!buttonId)
	    throw new Error('Each radio button in an inline choice must have a unique id');
	radioButtons.addAction(buttonId, inlineChoice.fill);
    }
}, false);
