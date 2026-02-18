# Multi-object list picker

## **ML.0 Multi-object list picker**

**Overview** 
The multi-object list picker allows the user to select multi items in a list format. 

[Figma Prototype](https://www.figma.com/proto/TsVdwaYDhjH8tHYdfY3zOl/Workspace-Definition?page-id=2901%3A299711&node-id=4125%3A266788&viewport=445%2C-5740%2C0.23&scaling=scale-down&starting-point-node-id=4125%3A266788&show-proto-sidebar=1)

[https://www.loom.com/share/ea29b879747e4365a3330790a3e78bcd](https://www.loom.com/share/ea29b879747e4365a3330790a3e78bcd)

## **Screen list index**

[**ML.0 Use case**](https://www.notion.so/b34d06414bec4cb6b9bf83a9b3225b6b?pvs=21)

[ML.1 Add filter](https://www.notion.so/b34d06414bec4cb6b9bf83a9b3225b6b?pvs=21)

[ML.1.1 Add a value](https://www.notion.so/b34d06414bec4cb6b9bf83a9b3225b6b?pvs=21)

[ML.1.2 Error state](https://www.notion.so/b34d06414bec4cb6b9bf83a9b3225b6b?pvs=21)

[ML.2 Add filter (Bulk)](https://www.notion.so/b34d06414bec4cb6b9bf83a9b3225b6b?pvs=21)

[ML.2.1 Add values in bulk](https://www.notion.so/b34d06414bec4cb6b9bf83a9b3225b6b?pvs=21)

[ML.2.2 Error state](https://www.notion.so/b34d06414bec4cb6b9bf83a9b3225b6b?pvs=21)

[ML.3 Add filter (stripped version)](https://www.notion.so/b34d06414bec4cb6b9bf83a9b3225b6b?pvs=21)

[ML.4 States](https://www.notion.so/b34d06414bec4cb6b9bf83a9b3225b6b?pvs=21)

[ML.4.1 Nested States](https://www.notion.so/b34d06414bec4cb6b9bf83a9b3225b6b?pvs=21)

[**ML.5 Visual specs**](https://www.notion.so/b34d06414bec4cb6b9bf83a9b3225b6b?pvs=21)

---

**ML.0 Use case**

---

**ML.1 Add filter**

**ML.1.1 Add a value**

**User Action**: As a users, I want to add a filter to my answer based on data:country, so I can get filtered data for a specific country. Therefore I go to the data:country on the left rail and click on it. 

**System Response**: On clicking, ‘country’, system opens a modal. The modal contains multi object list picker. The widget is in default add-state with no value selected. The widget contains a search bar, followed by column header and next to it is select all and clear button. This is followed by the list which is in the box. Each value has a checkbox next to it. Below the list there is an option to add a value and show selected toggle. At last we have the helper text.

Type on search to find the values you are looking for.
Click on select all to select all the values and clear to clear all the values.
Header will show the number of values selected inside parenthesis.
Users can single or multi-select values by clicking on check boxes.
Clicking on Add value will open an inline text input to enter a new value.
Show selected will show the selected values on top followed by unselected values.

Add will add the selected values to filter and close the modal.
Cancel will not add the selected value and close the modal.

---

**ML.1.2 Error state**

**User Action**: As a users, I want to add a filter to my answer based on data:country, so I can get filtered data for a specific country. Therefore I go to the data:country on the left rail and click on it. However the specific value is not in the system so I click on Add value link to add the new value.

Instead of adding new value, I press the blue checkmark.

**System Response**: On clicking, ‘blue checkmark’, without adding the value, the system shows an error state with the label of inline text input showing the error message. 

Adding a value will remove the error state.

**User Action**: As a users, I want to add a filter to my answer based on data:country, so I can get filtered data for a specific country. Therefore I go to the data:country on the left rail and click on it. However the specific value is not in the system so I click on Add value link to add the new value.

**System Response**: On clicking, ‘add value’, system opens an inline text input menu so the user enter the value. The inline input contains cross and check mark to close or save the value respectively. The inline input is in default state , in this state, it is highlighted and the cursor is already present in it. A placeholder text (Enter a new value here) asks user to input the value. 

Clicking on check mark will add the value in the system and show it in selected state in the multi object list picker. 

---

**ML.2 Add filter (Bulk)**

**ML.2.1 Add values in bulk**

**User Action**: As a users, I want to add few filter to my answer based on data:country, so I can get filtered data for a specific country. Therefore I go to the data:country on the left rail and click on it. 

**System Response**: On clicking, ‘country’, system opens a modal. The modal contains multi object list picker. The widget is in default add-state with no value selected. The widget contains a search bar, followed by column header and next to it is select all and clear button. This is followed by the list which is in the box. Each value has a checkbox next to it. Below the list there is show selected toggle followed by helper text and an option to add values in bulk. 

Type on search to find the values you are looking for.
Click on select all to select all the values and clear to clear all the values.
Header will show the number of values selected inside parenthesis.
Users can single or multi-select values by clicking on check boxes.
Clicking on Add values in bulk will open a subtask modal to add bulk values in the table with text input.
Show selected will show the selected values on top followed by unselected values.

Add will add the selected values to filter and close the modal.
Cancel will not add the selected value and close the modal.

---

**ML.2.2 Error state**

**User Action**: As a users, I want to add few filter to my answer based on data:country, so I can get filtered data for a specific country. Therefore I go to the data:country on the left rail and click on it. However the specific values are not in the system so I click on Add values in bulk link to add the new value.
Instead of adding new values, I press the blue add value button.

**System Response**: On clicking, ‘add values in ’, without adding the value, the system shows an error state with the label of text input showing the error message. 
Adding a value will remove the error state.

---

**ML.3 Add filter (stripped version)**

**User**: As a user I want to unselect few visualisation in liveboard and so I can see updated results in the liveboard screen. Therefore I go to edit in liveboard and select add filter and then select a measure.

**System Response:** On clicking add filter, this opens a modal with multiple headers, the first one being visualisation. The header is followed by a explainer text. Below that we have the multi object list picker, without the add link.
Few of the options in the list is already selected since we are in edit mode.

List header show the total selected values on the top. 
Clicking select all will select all the single object checkboxes.
Clicking clear will deselect all the single object checkboxes.
Toggle ‘show selected’ to show selected values.
Click “Add” to close the dialog box and add columns.
Click “Cancel” to close the dialog box and won’t add columns.

**User Action**: As a users, I want to add few filter to my answer based on data:country, so I can get filtered data for a specific country. Therefore I go to the data:country on the left rail and click on it. However the specific values are not in the system so I click on Add values in bulk link to add the new value.

**System Response**: On clicking, ‘add values in bulk’, system opens subtask modal to add bulk values in the table with text input. The modal contains text input with a header and helper text. Helper text asks the user to add values separated by comma. 

Clicking on Add values will add the value in the system and show it in selected state in the multi object list picker.
Clicking ‘back’ will take the user back to the add filter modal.
Clicking “Cancel” will close the dialog box and won’t add the values.

---

[Untitled](Multi-object%20list%20picker/Untitled%20309374cae3fa81819eabd4a2e07b282f.csv)

---

**ML.4 States**

**ML.4.1 Nested States**

 **ML.5 Visual specs**

###