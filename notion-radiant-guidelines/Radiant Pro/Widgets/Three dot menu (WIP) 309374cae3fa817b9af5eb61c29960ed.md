# Three dot menu (WIP)

# Problem

The current menu categories are **unscalable**, **inconsistent**, and **lack a clear model** for structuring menus.

# Goal

Create a **well-organized**, **consistent**, and **intuitive** action menu that makes it easy for users to find and use the actions they need.

# How

- **Categorize** the actions. Group them by function (e.g. edit, view, external).
- Create a **single**, **consistent order** based on the lifecycle of an object
- Use **clear**, **descriptive**, and **consistent names** for actions. Make it easy for users to understand what each one does.
- **Signal** to the user what menu actions do. (e.g. menu items that open dialog boxes should include an ellipse at the end of their name.)

# Categories

| Create | Actions that generate new objects |
| --- | --- |
| View | Actions that change how the user views objects but doesn’t change the objects themselves |
| Edit | Actions that change the objects themselves |
| Manage | Actions that control the information based on the objects |
| Share | Actions that invite others users to connect with an existing object |
| Export | Actions that serve to connect objects internally or externally like exporting, downloading, syncing |
| Delete | Destructive action that removes the object from the system permanently |

**Match actions to categories**

# Decision tree

**How to use decision tree examples**

**Examples**

> IF the user cannot do anything to enable the control THEN the control is hidden.ELSEIF the user can do something to enable the control THEN the control is disabled.
>