% Recommended Practices for Implementing Choice Interactions (Single and Multiple Selection)
% Jason White

# Choice Interaction

## Introduction
In a *choice interaction*, the candidate is presented with a set of choices. This interaction type can be divided into two cases, which are treated separately in this document.

1. *Single selection*: the candidate can select exactly one of the choices presented. The choices are therefore mutually exclusive.
2. *Multiple selection*: the candidate can select one or more of the choices presented. The choices are therefore not mutually exclusive.

Both cases are similar. However, reflecting their essential difference in functionality, the single selection case is implemented by radio button controls, whereas the multiple selection case is implemented by check boxes. Also, the keyboard operation of the radio buttons as specified here differs from widely observed conventions in order to protect candidates from accidentally modifying their selections while reviewing the available options.

## Choice Interaction: Single Selection

### Markup
The set of choices should be enclosed by an HTML container element, e.g., `ul`
or `div`. Any such container element must be assigned the WAI-ARIA role
`radiogroup`. Each choice has two components: an interactive control and a label.

The interactive control must have a WAI-ARIA role of `radio`. It must be associated with its corresponding label by the `aria-labelledby` property. The `aria-checked` state should be initialized to `false` for all interactive controls in the choice interaction.

### Presentation
Each choice must be styled visually as a radio button according to widely established presentational conventions. A visible border (i.e., focus ring) must surround any choice that has the keyboard focus, encompassing both the label and the interactive control. This focus ring must follow the keyboard focus as the candidate moves it between the choices.

### Interaction
An interactive control can be in either of two states: checked or unchecked. The mixed state is not supported by this interaction type. A `click` event directed at a choice (i.e., at either its label or its interactive control) must toggle the state of the interactive control. If an interactive control has keyboard focus, typing space bar must toggle the state of the control. An implementation may also assign this functionality to the enter key. All interactive controls must appear in the tab sequence of the HTML document. Within each choice interaction, the interactive controls must appear in the tab sequence in document tree order and should be presented visually in the same order. This can be achieved by assigning all interactive controls in the choice interaction (except optionally the first) a `tabindex` of `0`.

If any interactive control except the last has the keyboard focus, then typing down arrow or right arrow must move the keyboard focus to the next control in the set of choices. Similarly, if any interactive control except the first has the keyboard focus, then typing left arrow or up arrow must move the keyboard focus to the previous control in the set of choices. If the first or the last control in the set of choices has the keyboard focus, then typing left arrow or up arrow in the former case, or right arrow or down arrow in the second case, must move focus in the respective direction away from the choice interaction. In all cases, the state of the interactive control that receives keyboard focus must remain unchanged.[^1]

-^1]: The  behavior specified above differs from that customarily implemented by radio button controls in operating systems and user agents. Customarily, moving focus between radio buttons using the arrow keys also determines which button is selected and thus updates the value of the control. This custom is not followed here, thereby enabling candidates using arrow key navigation to review the available choices non-destructively (i.e., without changing the value of the control).

If the state of an interactive control is changed from unchecked to checked or from checked to unchecked, a visible check mark must be respectively added to or removed from the control, and the `aria-checked` state must be toggled. If the state of a control is changed from unchecked to checked, then the implementation should ensure that every other control is reset to the unchecked state: only one control can be in the checked state at any time, unless the application or assessment developer determines that erroneous selection of multiple choices by the candidate in single selection items is to be permitted.

### Example
[insert visual example and code sample here]

## Choice Interaction: Multiple Selection

### Markup
The set of choices should be enclosed by an HTML container element, e.g., `ul` or `div`. Any such container element must be assigned the WAI-ARIA role `group`. Each choice has two components: an interactive control and a label.

The interactive control must have a WAI-ARIA role of `checkbox`. It must be associated with its corresponding label by the `aria-labelledby` property. The `aria-checked` state should be initialized to `false` for all interactive controls in the choice interaction.

### Presentation
Each choice must be styled visually as a check box according to widely established presentational conventions. A visible border (i.e., focus ring) must surround any choice that has the keyboard focus, encompassing both the label and the interactive control. This focus ring must follow the keyboard focus as the candidate moves it between the choices.

### Interaction
An interactive control can be in either of two states: checked or unchecked. The mixed state is not supported by this interaction type. A `click` event directed at a choice (i.e., at either its label or its interactive control) must toggle the state of the interactive control. If an interactive control has keyboard focus, typing space bar must toggle the state of the control. Implementations may also assign this functionality to the enter key. All interactive controls must appear in the tab sequence of the HTML document. Within each choice interaction, the interactive controls must appear in the tab sequence in document tree order and should be presented visually in the same order. This can be achieved by assigning all interactive controls in the choice interaction (except optionally the first) a `tabindex` of `0`.

If the state of an interactive control is changed from unchecked to checked or from checked to unchecked, a visible check mark must be respectively added to or removed from the control, and the `aria-checked` state must be toggled. More than one control may be simultaneously in the checked state.

### Example
[Insert visual example and code sample here.]
