# MO.3 Wizard dialog

**User Action:** Users want to finish a complex task that can be divided into several consumable and focused steps.
**System Response:** For longer tasks, use a progress modal to give the user a sense of completion and orientation within the focused flow.

[Untitled](MO%203%20Wizard%20dialog/Untitled%20309374cae3fa818d8640c0ea179c414f.csv)

### Examples

Ex.1 SpotIQ wizard flow

Ex.1.1 SpotIQ wizard flow

**User:** As a user I want to use AI to analyse some columns of my answer therefore I go to the SpotIQ option and launch it. The modal opens asking me to select either a comparative analysis or  do the entire chart. I click on comparative data point option.
**System Response:**
Click the radio button to select either of the options.
Analyse entire chart has three sub options which can be single or multi-selected.
Cancel CTA will close the flow and not run the analysis.
Continue CTA will take to next step of the wizard.

**User:** As a user I want to use AI to analyse some columns of my answer therefore I go to the SpotIQ option and launch it. The modal opens asking me to select few desired columns for spotIQ to run the analysis.
**System Response:**
Click the checkbox to select an object.
Show the total selected number on the top. 
Clicking “select all” will select all columns.
Clicking “clear” will unselect all columns.

Toggle ‘show selected’ to show selected values.
Click “Cancel” to close the dialog box and won’t add columns.
Click “Previous” to go back to SpotIQ wizard.
Click “Analyse” to start the SpotIQ analysis of the columns.

---

Ex.3 GIT integration

**User:** As and admin I want to enter the GIT credentials so that I can establish connection between my TS profile & GIThub

**System Response:** The screen transitions to a stepper modal which lets user put information about GIThub like repository,username & token

If user clicks ‘cancel’ they are taken back to ‘GC 1.1 : Zero state’

Clinking on ‘Next’ validates the Github credentials