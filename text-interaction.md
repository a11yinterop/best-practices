% Recommended Practices for Implementing Text Entry and Extended Text Interactions
% Jason White

#Text Entry Interaction

## Introduction
A text entry interaction is an inline interaction: it corresponds to "phrasing content" as defined by the HTML 5 specification. Text entered by the candidate can be reviewed in the context of the surrounding paragraph-level content. This interaction type can most easily be implemented as an HTML `input` element of `type="text"`. However, this concrete realization of the interaction type is not mandatory, as is made clear in the following specification.

## Markup
The text entry interaction must have an ARIA role of `textbox`, and an `aria-multiline` property set to `false`. This can be achieved in two ways:

1. by using an HTML `input` element of `type="text"`; or
2. using a custom control for which the above-mentioned ARIA role and property are set.

## Presentation
The text entry interaction must resemble a text entry field as customarily presented by the user agent. It must be visually distinct from adjacent text.

## Interaction
A text entry interaction must accept the keyboard focus; it must also appear in the tab navigation sequence of the HTML document in which it occurs. The keyboard operations supplied by the user agent to enable the user to type, delete, cut, copy and paste text must be given full effect when a text entry interaction has the keyboard focus. Furthermore, if a text entry interaction has keyboard focus, the user must be able to invoke the tab and shift-tab keyboard operations to shift the focus away from the text entry interaction, respectively to the next or previous element in the navigation sequence of the HTML document.[^1]

[^1]: An HTML `input` element in the `text` state (i.e., with `type="text" set) satisfies all of these requirements.

## Example
[Sample code and a visual example should appear here.]

# Extended Text Interaction

## Introduction
An extended text interaction is a block-level interaction. It is not intended to occur within the context of paragraph-level content. The candidate can enter multiple lines of text. Document editing features may be supported (see the discussion below). Where multiple strings are requested from the candidate, more than one text input control may be required. Alternatively, the implementation may parse text supplied by the candidate in a single interactive control, dividing it into multiple strings according to a prescribed data format or at line boundaries.

## Markup
The text entry interaction must be implemented as one or more elements,[^2] each  with an ARIA role of `textbox` and with its `aria-multiline` property set to `true`. This can be achieved in each case either by creating a custom control, or by using an HTML `textarea` element. If a custom control is created to serve as a text editing component, the `contenteditable` HTML attribute and its associated API must be used.

[^2]: There would typically be only a single such element, but additional elements may be required if multiple strings (each having its own text input control) are to be obtained from the candidate and bound to a response variable of *multiple* cardinality.

If a custom control with a tool bar or menu of editing commands is supplied, then the tool bar or menu and its components must be assigned the roles defined in the ARIA specification for these respective purposes. States and properties must be assigned as required, and updated as the user interacts with these components.

If the specific context of use does not allow the use of spelling or grammar checking facilities, the `spellcheck` attribute with a value of `false` should be used in conjunction with the `contenteditable`.

## Presentation
A variety of presentations is possible depending upon the features chosen for inclusion in the extended text interaction. It may be as simple as a text entry field or as complex as a document editing tool.

## Interaction
Each text entry field in an extended text interaction must accept the keyboard focus; it must also appear in the tab navigation sequence of the HTML document in which it occurs. The keyboard operations supplied by the user agent to enable the user to type, delete, cut, copy and paste text must be given full effect when an extended text interaction has the keyboard focus. Furthermore, if an extended text interaction has keyboard focus, the user must be able to invoke the tab and shift-tab keyboard operations to shift the focus away from the extended text interaction, respectively to the next or previous element in the navigation sequence of the HTML document. If the text entry interaction comprises multiple, independent text entry controls, then the tab and shift-tab keys must permit the user to move the focus among these controls in accordance with the navigation order as already described. If the user is permitted to enter a tab character (e.g., to indent text), then an alternative, keyboard-operable mechanism to the use of the tab key for this purpose must be supplied.

If the extended text interaction includes a tool bar, menu bar or similar user interface that makes document editing commands available to the candidate, these interactive components must accept the keyboard focus and must also occur in the tab navigation sequence of the HTML document. Moreover, when any such control has the keyboard focus, it must be fully operable via the keyboard in accordance with widely supported conventions applicable to its control type. For example, the buttons in a tool bar would be made keyboard operable by ensuring that they are activated when in possession of the keyboard focus and the enter key is pressed. Access keys should be bound to these controls to enable the user to invoke them conveniently from a keyboard without having to shift the focus away from the text editing component. Access keys should be assigned mnemonically, taking into account any applicable conventions implemented generally in text editing applications available under a variety of operating systems.
