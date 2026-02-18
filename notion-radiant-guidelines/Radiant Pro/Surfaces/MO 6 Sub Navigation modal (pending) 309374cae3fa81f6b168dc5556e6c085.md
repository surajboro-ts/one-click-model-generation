# MO.6 Sub Navigation modal (pending)

**Scenario**
We have 4 use cases so far and all four have modified the sub navigational modal in small ways. 

**Use cases:**
1. Granular permissions- Role edit/add screen.
2. Change analysis
3. Data literacy
4. Customise tool tip (Answer’s page)
5. Data governance
6. Worksheet

**Goal**
To build consistency across the system. Hence, come up with a single design that is flexible and can be used in all the above scenarios.

---

1. **Granular permissions**

**RL.2 Roles edit screen (Description)**

**User**: As a user, I want to edit the role named “Executive”, so I can change the privileges attached to that role. Therefore, I click on edit role from the overflow menu of the role ‘Executive’.
// When user clicks Add role CTA, the modal header will read “Add role” with default name as “Untitled”, placeholder text for role description and no privileges and permissions selected 

**System response:**  On clicking edit role, the system will open edit role modal. Modal has left rail with Role description, List of Privileges and permissions. By default Role Description is selected in left rail.
On the right side role name and description is visible along with the instruction text.
User can edit role name and description in the text box.
Review Selection will input the given data and take the user to another modal to review the edited role.
Cancel will not assign the role and close the modal.

---

**2. Change analysis**

**CA.1  Change analysis modal**

**User:** The user wants to understand the change in the KPI. User can trigger the change analysis by clicking on the KPI comparison line, and trigger the change analysis modal.

**System response:** The system presents the user with summary of the analysis, and details analysis of a few attributes. The attributes analysed are selected by UBR, followed by calculation of deviation across these attributes (part of the SpotIQ algorithm). The 5 attributes that undergo most deviation are displayed. 

**CA.6  Manage Attributes Dialog (WIP)**

**User:** The add attribute flow optimises for analysts, who want to verify their hypothesis by running change analysis on attributes of their choice. Once the analyst consumes the results based on UBR, the add attribute flow can be triggered from the change analysis modal itself.

**System response:** Presents the user with a list of attributes by worksheets for the KPI in the add attribute modal.

---

1. [**Data literacy (Source selection modal)**](https://www.figma.com/file/cDue4TbroOsrsDKoWWMhYu/Search-data---Data-literacy---Final-data-panel-and-source-selection-(Part-5)?node-id=3401%3A345543&t=ZKEf8NxJNj4QSuSH-1)

**C2 Multi source selection**

**User Action:** Users clicked on the ‘Enable multiple sources’ toggle on the source selection modal

**System Response:** Instance switches to multi source selection

---

1. **Answer’s page** 

**Customise Tool Tip**

**User:** Users clicks on the edit data snapshot CTA to customise the tool tip
**System response:** The system will invoke the edit data snapshot dialog box.

**User:** User can drag to change the order of the columns and alternative toggle them on/off to hide/show them on the tool tip.

---

1. **Data governance**

Preview screen

**User:** Is in data, under data governance. Click column CTA.
**System:** A edit/preview modal opens. List of all meta data being pulled from the data catalogue and previews how it will look for a measure attribute and dates.

---

1. **Worksheet**

**DM.0 Data model selection**

**User**: As user I want to select a connection to use in my data model
**System response:** A list of connections.

---

**Queries**:
1. Do we keep space for a search bar on left rail at top?
2. In case both add items and toggle is required, we will need to figure out placement for them at the bottom of left rail.
3. Do we keep the left rail open to adding lists that can be rearranged and other items in the future?
4. In some case a checkmark is used at the bottom of the right rail.
5. How would we define this modal’s specs. Do we include all the items it can carry or the most used ones and leave the rest as outlier cases?

**Idea:**

Multi-object widget treatment

![Screenshot 2023-02-27 at 7.11.08 PM.png](MO%206%20Sub%20Navigation%20modal%20(pending)/Screenshot_2023-02-27_at_7.11.08_PM.png)

**Issues:** 
Add will open a modal inside a modal?
Should Add button open an overlay on left rail to add content?
Should add button work like the sub-header and add open add content screen in right rail?