# Multi-line text input field

Number: 10
Content Rules: Form labels are typically nouns.

For form labels that require action, start with a verb e.g Select card type.

Form labels should always make it clear which field they should fill in.

Label input fields with short, 1-2 word nouns e.g name, date, area code etc.

Label text should not exceed the width of the input field.

Labels may be truncated but editing for length is preferred.

Avoid overly long labels.

Don’t wrap label text.

Labels don’t need punctuation like periods or colons.

The error message temporarily replaces the field label, so the message must provide instruction on how to fix the error AND include the name of the field to make it clear which field is affected.

State the issue clearly and in a way that does not assign blame.

Provide a remedy when possible.

Provide only the information the user needs to know at this moment.
Default State: The text box is in unselected state, with a form label and helper text on top of the box.
Description: Allows user to enter or edit multi-line string of text for longer, responses. For things like label descriptions, bulk values etc.
Dynamic Behavior: By default, all the text input fields are required. When a text input field is optional, show “(optional)” in placeholder.
Error State: On not adding any value and pressing the CTA results in error message. The label and helper text changes to error message and the text input box’s border changes to red color.
Object: ML.0 Multi-object list picker