# Add value link

Number: 5
Default State: The text field is in the focus state, so that lets users enter text directly.
Description: The add link lets users add a new value to the list.
Dynamic Behavior: On clicking the ‘add’ link, system displays input box inline with a label and helper text. The cursor shows in the input box directly. Click check mark to complete the task. Click cross button to cancel the task. The add link button disappears from the top until the inline input box is present.

Add value:
User can add a value A and select and apply it, this value A will be in the list. 

Remove value:
When the user visits the next time and they deselect this value A, then this custom value A won't be there.
Error State: If no object is added and the user press check mark, the system shows an error state in the inline edit label.

”Enter values to continue”
Object: ML.0 Multi-object list picker
Type: Widget