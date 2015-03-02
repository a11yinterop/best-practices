/* Copyright (C)  2015 by Educational Testing Service. All rights reserved.
 *
 * To the maximum extent permitted by applicable law, this work is
 * provided as is, without any express or implied warranty of any kind.
 *This work is contributed to IMS Global Learning Consortium Inc.
 * pursuant to the terms of the IMS Intellectual Property Rights Policy. */

// Define key codes.
radioButtons = {};
radioButtons.keys = {
    tab: 9,
    enter: 13,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40
};

// Handle keyboard input.

radioButtons.handleKeyDown = function (e) {
    switch (e.keyCode) {
    case this.keys.up:
	var prev = e.target.previousElementSibling;
	if (prev)
	    prev.focus();
	e.stopPropagation();
	break;

    case this.keys.down:
	var next = e.target.nextElementSibling;
	if (next)
	    next.focus();
	e.stopPropagation();
	break;

    case this.keys.enter:
    case this.keys.space:
	this.selectIt(e);
	e.stopPropagation();
    }
    // Suppress any default action that may be implemented..
    e.preventDefault();
};

// Select this radio button and reset all others in the group.
// Note: the state of the radio button is held in the aria-checked content attribute.
// The purpose of this attribute is to disclose the state to assistive technologies. However, as here, it can serve also to control the program logic.

radioButtons.selectIt = function (e) {
    var currentvalue = e.target.getAttribute('aria-checked');
    // Set the state of each radio button.
    for (var button = e.target.parentNode.firstElementChild; button; button = button.nextElementSibling)
	if (button == e.target && currentvalue == 'false')
	    button.setAttribute('aria-checked', 'true');
    // Otherwise, deselect it.
    else button.setAttribute('aria-checked', 'false');

    // Signal a state change.
    if (e.target.id)
	radioButtons.performActions(e.target.id);
};

// Create an emptyset of actions (call-back functions) to be executed upon state changes.
radioButtons.actions = {};

// Register an action.
radioButtons.addAction = function (buttonId, action) {
    if (!radioButtons.actions[buttonId]) {
	radioButtons.actions[buttonId] = [action];
	return;
    }
    radioButtons.actions[buttonId].push(action);
};

// Perform all actions associated with the specified element (designated by id).

radioButtons.performActions = function (buttonId) {
    var actions = radioButtons.actions[buttonId];
    if (!actions)
	return;
    var button = document.getElementById(buttonId);
    if (!button)
	throw new Error('Radio button with id ' + buttonId + ' not found');

    actions.forEach(function (action) {
	action(button);
    });
};

radioButtons.removeAction = function (buttonId, action) {
    var actions = radioButtons.actions[buttonId];
    if (!actions)
	return;
    var index = actions.indexOf(action);
    if (index >= 0)
	actions.splice(index, 1);
};
    
// Add event listeners to a group of radio buttons.

radioButtons.addListeners = function (radioGroup) {
    var buttons = radioGroup.querySelectorAll('[role="radio"]');
    for (var i = 0; i < buttons.length; i++) {
	var button = buttons[i];
	button.addEventListener('keydown', function (e) {
	    radioButtons.handleKeyDown(e);
	}, false);
	button.addEventListener('click', function (e) {
	    radioButtons.selectIt(e);
	}, false);
    }
};

// Once the document is loaded, add event listeners to all radio groups.

window.addEventListener('load', function () {
    var radioGroups = document.querySelectorAll('[role="radiogroup"]');
    for (var i = 0; i < radioGroups.length; i++)
	radioButtons.addListeners(radioGroups[i]);
}, false);
