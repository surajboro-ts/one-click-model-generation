# Chips & search tokens

## **A compact and contextual interactive element that represents an object, text string, action, user or a user group.**

[Chips](Chips%20&%20search%20tokens%20309374cae3fa81a59d8ff0e0db80a972.md) 

[](Chips%20&%20search%20tokens%20309374cae3fa81a59d8ff0e0db80a972.md) 

---

# Chips

## **Types & examples**

**Trigger chip**

Trigger chips invite users to select a contextual action. If multiple actions are available, they’re indicated by a small dropdown menu on the right. Content triggered by the chip will appear in a modal, dropdown, or panel.

![Untitled](Chips%20&%20search%20tokens/Untitled.png)

**Input chip**

Input chips take text that a user has just keyed in, and convert it into a chip. This unmistakable visual feedback helps to verify the input. Note that because input chips usually include the name of a person or object, they require a larger input size.

![Untitled](Chips%20&%20search%20tokens/Untitled%201.png)

**Select chip**

Select chips represent a single selection value. An attractive alternative to checkboxes, they use a compact area efficiently.

![Untitled](Chips%20&%20search%20tokens/Untitled%202.png)

---

## **Formatting**

![Untitled](Chips%20&%20search%20tokens/Untitled%203.png)

1. **Thumbnail (optional) –** Avatar - used to represent a user or a brand
2. **Container –** A rectangular shape with rounded corners holding all the elements
3. **Remove icon (optional) –** Appears offset on hover for the eligible chips.
4. **Icon (optional) –** Identifies an action (caret, chevron) or a state. (checkmark) can be placed on both sides.
5. **Text string –** Data column, filter, user or object name

---

## **Usage**

> Group chips horizontally into trays.
> 

> Wrap chips to a new row if necessary—but for scannability, avoid using more than two rows.
> 

> Set chips at a max width of 320px.
> 

> For select chip, by default color is gray.
> 

**Trigger chip**

![Untitled](Chips%20&%20search%20tokens/Untitled%204.png)

**Input chip**

![Untitled](Chips%20&%20search%20tokens/Untitled%205.png)

**Select chip**

![Untitled](Chips%20&%20search%20tokens/Untitled%206.png)

---

## **Behavior**

| **Type** | **Trigger & exit** | **Positioning** |
| --- | --- | --- |
| Trigger chip  | A click on a trigger chip will activate some action, such as opening a modal, dropdown, or panel, or adding content to a layout. | Flex. Chips can be left-aligned at a fixed width to occupy the entire allocated parent container’s width, then overflow to the next row. Dynamic. Chips can occupy their whole parent container at a dynamic width, placed one under the next.  (Note: Attributes and Measures chips are used only in the Customize panel.) |
| Input chip | An input chip is tokenized in an input field text string. A click on it will transform the chip back into editable text. A click anywhere outside of a text field input will tokenize the chip again, or—if an object does not exist—will produce an error.  | Flex. Chips are left-aligned to occupy an entire text input field. If they increase in size, they may overflow to the next row. |
| Select chip  | A click on a select chip will select or deselect a value. | Chips are left-aligned to occupy their entire allocated parent container’s width, then overflow to the next row. Their width increases when selected, so they can accommodate a check icon. |

### **States**

![Untitled](Chips%20&%20search%20tokens/Untitled%207.png)

Column chip and filter chip states

![Untitled](Chips%20&%20search%20tokens/Untitled%208.png)

Split chip states

![Untitled](Chips%20&%20search%20tokens/Untitled%209.png)

Input chip states

![Untitled](Chips%20&%20search%20tokens/Untitled%2010.png)

Select chip states

### **Specifications**

**Trigger chip**

![Untitled](Chips%20&%20search%20tokens/Untitled%2011.png)

**Input chip**

![Untitled](Chips%20&%20search%20tokens/Untitled%2012.png)

**Select chip**

![Untitled](Chips%20&%20search%20tokens/Untitled%2013.png)

### **Select chip color options**

![Untitled](Chips%20&%20search%20tokens/Untitled%2014.png)

---

# Selection Tokens

Appears when a user keys in a query, to represent specific types of data columns or conditions. Appears when a user keys in a query, to represent specific types of data columns or conditions.

## **Types & examples**

**Measure**

This green chip represents a data column for the value of a metric.

![Untitled](Chips%20&%20search%20tokens/Untitled%2015.png)

**Attribute**

This blue chip represents a data column for a qualitative characteristic.

![Untitled](Chips%20&%20search%20tokens/Untitled%2016.png)

**Condition**

This gray chip may represent either a filter or a keyword that affects the data shown.

![Untitled](Chips%20&%20search%20tokens/Untitled%2017.png)

**Error**

This red chip indicates that a search result does not exist.

![Untitled](Chips%20&%20search%20tokens/Untitled%2018.png)

**Warning**

Warning token is used to display tokens where the system made a choice on how to interpret the token, but the user is encouraged to look at the options and confirm which choice they intended.

A common example is with date buckets (as seen in above screenshot). In this case, monthly can be matched to any date column, so the system automatically picked a date column, but the user may want to change the selection depending on what they wanted.

![Untitled](Chips%20&%20search%20tokens/Untitled%2019.png)

---

## **Formatting**

![Untitled](Chips%20&%20search%20tokens/Untitled%2020.png)

1. **Container –** A rectangular shape with rounded corners. It holds the text string.
2. **Remove icon –** Appears offset on hover for all search tokens.
3. **Text string –** Indicates a data column, filter, or keyword.

---

## **Usage**

**Measure**

This green chip represents a data column for a quantitative characteristic.

![Untitled](Chips%20&%20search%20tokens/Untitled%2021.png)

**Attribute**

This blue chip represents a data column for a qualitative characteristic.

![Untitled](Chips%20&%20search%20tokens/Untitled%2022.png)

**Condition**

This gray chip may represent either a filter or a keyword that affects the data shown.

![Untitled](Chips%20&%20search%20tokens/Untitled%2023.png)

Search token for a condition (filter).

![Untitled](Chips%20&%20search%20tokens/Untitled%2024.png)

Search token for a condition (keyword).

**Error**

This red chip indicates that a search result does not exist.

![Untitled](Chips%20&%20search%20tokens/Untitled%2025.png)

Search token for an error.

**Warning**

Warning token is used to display tokens where the system made a choice on how to interpret the token, but the user is encouraged to look at the options and confirm which choice they intended.

A common example is with date buckets (as seen in above screenshot). In this case, monthly can be matched to any date column, so the system automatically picked a date column, but the user may want to change the selection depending on what they wanted.

![Untitled](Chips%20&%20search%20tokens/Untitled%2026.png)

---

## **Behavior**

**Trigger**

Clicking on a search token transforms it into an editable text string.

**Exit**

Clicking outside of that editable text string “retokenizes” it.

**Positioning**

Search tokens are always left-aligned inside a search input.

---

## **Property**

**States**

![Untitled](Chips%20&%20search%20tokens/Untitled%2027.png)

**Spec**

![Untitled](Chips%20&%20search%20tokens/Untitled%2028.png)