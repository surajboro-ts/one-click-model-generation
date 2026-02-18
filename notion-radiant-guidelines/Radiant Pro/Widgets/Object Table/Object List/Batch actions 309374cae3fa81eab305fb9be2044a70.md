# Batch actions

Number: 11
Content Rules: N/A
Default State: N/A
Description: Batch actions are functions that are performed on multiple items within a table.

Actions include but not limited to: Favourite, Share, Edit, Export, Duplicate, Delete etc.
Dynamic Behavior: Once the user selects at least one row from the table, the batch action bar appears at the top of the table, presenting the user with actions they can take. 

Actions that are not selectable should not be displayed. (Do not show disabled state actions)

The search bar, filter chips, and global actions are replaced by the bulk action options.

To exit or escape “batch action mode”, the user can deselect all the items.

When entering into "batch action mode", forbid all inline actions.
When enter into "batch action mode", hide pagination to let users focus on the current selection task.

Support hotkey “command” to do multi-select.
Error State: N/A
Object: OL.1 Object List Batch actions
Type: Widget