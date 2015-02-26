/* Copyright (C)  2015 by Educational Testing Service. All rights reserved.
 *
 * To the maximum extent permitted by applicable law, this work is
 * provided as is, without any express or implied warranty of any kind.
 *This work is contributed to IMS Global Learning Consortium Inc.
 * pursuant to the terms of the IMS Intellectual Property Rights Policy. */

// Implement editor controls.
window.addEventListener('load', function() {
    document.getElementById('review').addEventListener('click', function () {
	var editorContent = document.querySelector('article[contenteditable]');
	var reviewButton = document.getElementById('review');

	if (editorContent.isContentEditable) {
	    editorContent.contentEditable = 'false';
	    reviewButton.textContent = "Edit";
	}
	else {
	    editorContent.contentEditable = 'true';
	    reviewButton.textContent = "Review";
	}
    }, false);
    var boldButton = document.getElementById('bold');
    if (!document.queryCommandSupported('bold')) {
	boldButton.disabled = true;
	return;
    }
    boldButton.addEventListener('click', function () {
	document.execCommand('bold', false, null);
	}, false);
}, false);
