# MO.1 Simple dialog

[Untitled](MO%201%20Simple%20dialog/Untitled%20309374cae3fa81939992d3dfbed6164b.csv)

### Examples

Ex.1 Schedule analysis

**User action:** As a user I want to schedule the spotIQ analysis, so that I may get regular timely updates. Therefore I select the frequency, range and time and month specific settings. Here frequency is set as 1 and range to month time to 10AM PST, and month specific setting as ‘on the second Wednesday’.

**System response:** On clicking Schedule, the data entered is applied to frequency picker and schedule is created, closing the dialog box.
On clicking the cancel button the data is not applied in the frequency picker and the modal closes. 

---

Ex.2 Create new liveboard

**User action:** As a user I want to pin my answers but I do not have any liveboard to pin it to. Therefore when I go to pin answer, a dialog box opens asking to create a liveboard. Asking for a name and description.

**System response:** On adding text to the name single-line text input, it takes the input as name.
On adding text to the description multi-line text input, it takes the input for description.
On clicking the cancel button the data is not applied and the modal closes. 
Clicking create the data entered is applied, creating a liveboard and closes the modal.

---

Ex.3 Export answer

**User action:** As a user I want to export a selected answer to my system so that I can import it to another instance of TS. Therefore I go to the overview menu and click on the export button.

**System response:** Opens an export modal asking if I wish to just export the answer of the worksheet as well. The option is given via a radio button. I can only select one.
Cancel will not export and close the modal.
Export will export the answer, close the modal and show a toast alert.
****

---

Ex.4  Create schedule

**User action:** As a user I want to create schedule , so that I may get regular timely updates. Therefore I User can select the frequency, range and time. Here frequency is set as 1 and range to week and time to 10AM PST, and day is selected as Monday.

**System response:** On clicking the cancel button the data is not applied in the frequency picker and the modal closes. On clicking Create, the data entered is applied to frequency picker and schedule is created, closing the dialog box.

---

Ex.5  Edit filter

**User:** As a user I want to edit a column to filter my answer, so that I can get filtered chart. Therefore I go to the left rail and click on a column to edit it.

**System Response:**
Click the checkbox to select an object.
Show the total selected number on the top. 
Clicking “select all” will select all columns.
Clicking “clear” will unselect all columns.

Toggle ‘show selected’ to show selected values.
Click “Add” to add more object/values in the list.
Click “Cancel” to close the dialog box and won’t add columns.

****

---

Ex.6  Send to slack

**User action:** As a user I want to send the answer in the form of csv to slack channel, so I can share that with my team. Therefore I click on send to slack in the overflow menu and the modal opens.

**System response:** Clicking on channel dropdown lets me select the slack channel I want to send my answer to.
Multi-line text input lets me add message along with the csv file.
Include image, cvs checkboxes let me send one or both media to slack
On clicking the cancel button the data is not applied and the modal closes. 
On clicking send, the data entered is applied and sent to slack channel.
On clicking Schedule a subtask menu opens to set schedule using a frequency picker widget.
 ****

---

Ex.7  Pin to liveboard

**User action:** As a user I want to pin my answer to a liveboard which contains similar content, so I can have all my answers at one place to analyse. Therefore I click on pin to liveboard.

**System response:** A modal opens to pin to liveboard.

Click on the “+ create tab” to create a tab
Click on a liveboard to select
Click on pin CTA to select the liveboard.
Click “Back” button to go back to previous screen

---