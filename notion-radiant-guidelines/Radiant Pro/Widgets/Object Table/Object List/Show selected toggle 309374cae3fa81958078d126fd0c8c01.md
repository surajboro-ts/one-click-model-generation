# Show selected toggle

Number: 4
Content Rules: N/A
Default State: Turn off toggle. Show all items.
Description: Switch state between:
(1) Displaying all items and 
(2) Displaying selected items at top with unselected items below separated by divider.
Dynamic Behavior: Toggle off: Show all items
Toggle on: Show selected items at top followed by divider then unselected items.

In add value mode when the inline input appears, the show toggle is hidden by the inline input.

Reference: https://www.notion.so/b34d06414bec4cb6b9bf83a9b3225b6b?pvs=21
Error State: If no objects are selected then the toggle should be disabled

If user unselects all the object, while the toggle is on. Then since there are no objects selected, the toggle will change automatically  to off.
Object: ML.0 Multi-object list picker
Type: Widget