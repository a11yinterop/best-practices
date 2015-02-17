% Recommended Practices for Implementing Inline Choice Interactions
% Jason White

# Inline Choice Interaction

## Introduction
An inline choice interaction is a type of single selection task in which the candidate is presented with a set of choices, each comprising a "simple piece of text" (see QTI 2.1). The selected option can be reviewed in the context of the surrounding content. This context  may be a paragraph of text or a more complex document structure; it is referred to for brevity as the *passage*.

This document describes two alternative implementations of the inline choice interaction type: the first uses a list box as its interactive control, and the second uses a group of radio buttons as its interactive control. In both cases, the required keyboard interaction departs from widely implemented conventions by requiring the candidate to perform an explicit action to make a selection. This behavior is consistent with that specified in the best practice for single selection choice interaction.

If the interactive control is implmented as a list box, it appears in-line as an integral component of the passage. Thus, after making a selection, the candidate can easily read the chosen text as part of the passage itself, returning focus to the list box control if a further change of selection is necessary.

If the interactive control is implemented as a group of radio buttons, these follow, and are separate from the passage. An appropriate context within the passage is chosen, then combined with the text of each choice to comprise the labels of the respective radio buttons. The details of label construction are elaborated in the specification.

There may be more than one inline choice interaction in a single passage, in which case multiple list boxes, or multiple groups of radio buttons are used.

The text of this best practice should be read in conjunction with the non-normative code example [to be supplied].

## Inline Choice Interaction Implemented by List Boxes

### Markup
A passage of text, typically composed of one or more paragraphs, contains at least one list box with which the candidate interacts to choose words or phrases that complete the passage. The entire passage may be enclosed in an appropriate container element, e.g., `div` or `p`. Each list box must consist of an element of ARIA role `listbox`.[^1] Its child elements must be of role `option`. A label must be associated with each element of role `option`. This association can be accomplished by using an `aria-label` or `aria-labelledby` property. The text of each label other than the default label (see below) must specify the text that is deemed to be inserted into the content if the corresponding option is chosen.

[^1]: The customized keyboard behavior specified in this document precludes the use of an HTML `select` element for this purpose.

The inline choice interaction should have a default label which clearly communicates to the candidate that missing text needs to be inserted at this point. For example, a label of "blank" (or an equivalent term given in the natural language of the content) would fulfill this requirement. If multiple inline choice interactions occur in a single passage, the default label of each may include a sequential number ("1" for the first inline choice interaction, "2" for the second, and so forth) that helps to orient the candidate to the task as a whole. The default label presented in the visual interface may differ from that delivered to assistive technologies via the `aria-label` property. For example, a sequence of underscores may be presented in the visual interface, whereas the label supplied to assistive technologies may be the word "blank" instead.

### Presentation
Conventions for the presentation of list boxes in user agents should be followed. It must be evident to a candidate familiar with list boxes that one is present and that options are available for selection. The default label must be presented unless the user has selected one of the options in the inline choice interaction.

### Interaction
An inline choice interaction is by default in a *collapsed* state in which only the label of the currently chosen option, or the default label if there is none, is shown. A `click` event directed at the label of an inline choice interaction in the collapsed state expands the inline choice interaction by revealing a list box in which the available options are presented. When this occurs, the inline choice interaction enters the *expanded* state. If an inline choice interaction is in the expanded state, a `click` event directed at one of the labels selects the corresponding option and collapses the list box, whereupon the label of only the selected option is displayed. The candidate may review it in the context of the passage.

Every inline choice interaction must accept the keyboard focus and must occur in the tab navigation sequence of the HTML document. If multiple inline choice interactions are presented simultaneously, the tab navigation order in which they occur must correspond to the logical order in which they appear in the passage.  This can be achieved by assigning each inline choice interaction except optionally the first a `tabindex` of `0` and by ensuring that the document tree order matches the logical reading order of the text.

When an inline choice interaction in the collapsed state has the keyboard focus, typing the down arrow key must cause it to be expanded and to enter the expanded state. When the control is in the expanded state, typing up arrow or down arrow must move the keyboard focus respectively to the previous or next option in the set of choices. If the first option has the keyboard focus and up arrow is typed, then focus must be moved to the last option in the set of choices. Correspondingly, if the last option has the keyboard focus and down arrow is typed, the focus must move to the first option in the set of choices. Typing space bar while the list box is in the expanded state must select the option that currently has the keyboard focus and cause the list box to be collapsed, whereupon the inline choice interaction enters the collapsed state. Typing tab or shift-tab if the control is in the expanded state must move the keyboard focus respectively to the next or previous focusable element in the document and must collapse the inline choice interaction, which thereby enters the collapsed state while leaving the selected choice unchanged.[^2] The inline choice interaction must also be collapsed, without changing the selected option, if it loses the keyboard focus for any other reason.

[^2]: There may be no selected choice if the candidate has not made an explicit selection. In this case, the default label is shown.

### Example
[Insert code sample and visual example here.]

## Inline Choice Interaction Implemented by Radio Buttons

### Markup
Each inline choice interaction has a surrounding context comprising part or all of the passage. For purposes of this document, the surrounding context typically comprises the sentence in which the inline choice interaction occurs. An appropriate fragment of text should be chosen as the surrounding context, balancing the need to orient the candidate when selecting a choice  against the risk of including unduly lengthy material as the label text of radio button controls. Any part of the surrounding context, so chosen, that precedes the interactive control is referred to as the *left context*. Any part of the surrounding context that follows the interactive control is referred to as the *right context*. The left or right context is empty if the inline choice occurs respectively at the beginning or end of the text presented to the candidate. If the left context is non-empty, it must be enclosed by a suitable HTML element, e.g., a `span` element; such an element must have a unique `id`. Correspondingly, if the right context is non-empty, it must be enclosed by a suitable HTML element, for example a `span` element, which must likewise have a unique `id`.[^3] The text occurring between the left context and the right context, referred to in what follows as the default label, must clearly indicate to the candidate that content is omitted at this point. For example, the word "blank" (or its equivalent in the natural language of the content) would suffice for this purpose. If multiple inline choice interactions occur in a single passage, these default labels may include a sequential number (1, 2 and so forth). Each default label must also be enclosed by a suitable HTML element, for example a `span` element, which must have a unique `id`. This element, which surrounds the default label, is referred to hereafter as the *substitution site*.

[^3]: A different HTML element is required in certain cases. For example, if the left or right context is emphasized, then an `em` or `strong` element could be used.

The passage must be followed by one or more groups of radio buttons, each enclosed in a container element (e.g., `div`) of role `radiogroup`. There must be as many groups of radio buttons as there are inline choice interactions in the passage. The document tree order in which the groups of radio buttons occur must match the order in which the corresponding inline choice interactions occur in the passage of text. Each radio button must occur in the tab navigation order of the HTML document; its position in the navigation order must correspond to that in the document tree order. Each group of radio buttons must contain at least two elements of role `radio` The `aria-checked` state of each radio button must be initialized to `false`. Each element of role `radio` must have an associated element that contains the text to be substituted into the passage if the radio button is selected by the candidate. This text is referred to as the *substituted text* associated with the radio button. The element containing the substituted text must have a unique `id`.

Each element of role `radio` must have its `aria-labelledby` property set to an *id reference list* that specifies, in the prescribed order:

1. the `id` of the left context of the inline choice interaction, if present;
2. the `id` of the substituted text; and
3. The `id` of the right context of the inline choice interaction, if present.

### Presentation
Each default label or substituted text in the passage must be visually distinct from adjacent text. The groups of radio buttons must be clearly separated from the passage and must be visually separated from each other, e.g., by vertical space. Widely recognized conventions for the presentation of radio buttons must be followed.

### Interaction
Each radio button has two components, an interactive control and a substituted text, where the latter serves as a visual label and as part of the label disclosed to assistive technologies. An interactive control can be in either of two states: checked or unchecked. The mixed state is not supported by this interaction type. A `click` event directed at a radio button (i.e., at either its label or its interactive control) must toggle the state of the interactive control. If an interactive control has keyboard focus, typing space bar must toggle the state of the control. An implementation may also assign this functionality to the enter key.

If any interactive control except the last in a group of radio buttons has the keyboard focus, then typing down arrow or right arrow must move the keyboard focus to the next control in the set of choices. Similarly, if any interactive control except the first in a group of radio buttons has the keyboard focus, then typing left arrow or up arrow must move the keyboard focus to the previous control in the set of choices. If the first or the last control in a group of radio buttons has the keyboard focus, then typing left arrow or up arrow in the former case, or right arrow or down arrow in the latter case, must move focus in the respective direction away from the group of radio buttons. In all cases, the state of the interactive control that receives keyboard focus must remain unchanged.[^4]

[^4]: The behavior specified above differs from that customarily implemented by radio button controls in operating systems and user agents. Customarily, moving focus between radio buttons using the arrow keys also determines which button is selected and thus updates the value of the control. This custom is not followed here, thereby enabling candidates using arrow key navigation to review the available choices non-destructively (i.e., without changing the value of the control).

If the state of an interactive control is changed from unchecked to checked or from checked to unchecked, a visible check mark must be respectively added to or removed from the control, and the `aria-checked` state must be toggled. If the state of a control is changed from unchecked to checked, then the implementation must ensure that every other control is reset to the unchecked state: only one control can be in the checked state at any time.[^5]

[^5]: This design parallels the implementation of inline choice interaction as a list box by enforcing the condition that only a single choice can be selected at a time.

If the state of an interactive control is changed from unchecked to checked, then the content of the corresponding substitution site in the passage must be removed from the document, and the substitution text associated with the selected radio button must be inserted in its place (i.e., as text child nodes of the enclosing HTML element).[^6]

[^6]: Note that the initial textual content of the substitution site is the default label.

### Example
[Insert visual example and sample code here.]
