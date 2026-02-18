# Form components

## **Examples and usage guidelines for form control styles, and custom components for creating a wide variety of forms.**

[Checkbox](Form%20components%20309374cae3fa81e3b0bdc070a5ab64fd.md) 

[Radio button](Form%20components%20309374cae3fa81e3b0bdc070a5ab64fd.md) 

[Toggle](Form%20components%20309374cae3fa81e3b0bdc070a5ab64fd.md) 

[Number input](Form%20components%20309374cae3fa81e3b0bdc070a5ab64fd.md) 

[File uploader](Form%20components%20309374cae3fa81e3b0bdc070a5ab64fd.md) 

[Segmented Control](Form%20components%20309374cae3fa81e3b0bdc070a5ab64fd.md) 

---

# Checkbox

## **Definition**

checkboxes allow users to select one or more items from a set. Checkboxes can turn an option on or off.

![Untitled](Form%20components/Untitled.png)

---

## **Usage**

![Untitled](Form%20components/Untitled%201.png)

Checkbox for selecting one or more items from a set.

![Untitled](Form%20components/Untitled%202.png)

Checkboxes use for turning an option on or off.

![Untitled](Form%20components/Untitled%203.png)

Checkbox error

---

## **Behavior**

**States**

Checkboxes may be selected, unselected, or indeterminate. Their states may be enabled, hover, focused, or active.

![Untitled](Form%20components/Untitled%204.png)

---

# Radio button

## **Definition**

Radio buttons are displayed when a user must select a single option from a list. Note that if a second option is selected, the first is automatically deselected.

![Untitled](Form%20components/Untitled%205.png)

---

## **Usage**

Use radio buttons to:

- Select a single option from a list
- Expose all available options

If available options can be collapsed, consider using a dropdown menu instead, as it uses less space.

![Untitled](Form%20components/Untitled%206.png)

Radio button

![Untitled](Form%20components/Untitled%207.png)

Radio button error

---

## **Behavior**

**States**

Radio buttons can be selected or unselected. Their states include: enabled, hover, focused, and active.

![Untitled](Form%20components/Untitled%208.png)

**Error**

![Untitled](Form%20components/Untitled%209.png)

![Untitled](Form%20components/Untitled%2010.png)

**Specifications**

![Untitled](Form%20components/Untitled%2011.png)

---

# Toggle

## **Definition**

A toggle lets users switch quickly between two states. It’s used to turn an option on and off, or to activate and deactivate it.

---

## **Usage**

Toggles are the preferred way to adjust settings.

Use toggles to:

- Toggle a single item on or off
- Immediately activate or deactivate something

![Untitled](Form%20components/Untitled%2012.png)

---

## **Behavior**

**Positioning**

1. The toggle along with its text label, always occupies the entire width of a parent container. The text label is left-aligned; the switcher is right-aligned.
2. To trigger the action, a user clicks on an entire container, including both the switcher and its text label.
3. On hover, a disabled toggle displays a short tooltip explaining its state.

**States**

![Untitled](Form%20components/Untitled%2013.png)

**Error**

![Untitled](Form%20components/Untitled%2014.png)

**Specifications**

![Untitled](Form%20components/Untitled%2015.png)

---

# Number input

## **Definition**

Number input allows the user to choose a numerical value. They may enter a number directly into the field or make incremental adjustments by using the up and down arrows on the spin button or on their own keyboard.

![Untitled](Form%20components/Untitled%2016.png)

---

## **Usage**

![Untitled](Form%20components/Untitled%2017.png)

Use a number input where the value range is narrow and where the goal is to give users precise control.

Allow users to change the default value via the spin button. Values may be listed in ascending or descending order.

Skip numbers on the spin button list when it’s context-appropriate.  (Example: 5, 10, 15, etc.)

Avoid creating inputs where the value range is broad.

Avoid values that are not supported by the input range.

---

## **Behavior**

**States**

![Untitled](Form%20components/Untitled%2018.png)

**Specifications**

Minimum recommended form size **80px**

![Untitled](Form%20components/Untitled%2019.png)

---

# File uploader

## **Definition**

File uploader allows the user to choose a file from their computer upload to our product.

![Untitled](Form%20components/Untitled%2020.png)

---

## **Behavior**

**States**

![Untitled](Form%20components/Untitled%2021.png)

---

## Segmented Control

## **Definition**

A segmented control is a horizontal set of two or more segments that acts as a filtering mechanism for a page. In the Pinboards page, for example, the segmented control lets you filter between All, Yours and Favorites.

![Untitled](Form%20components/Untitled%2022.png)

---

## **Types & examples**

**Text**

Segmented controls may comprise only text.

![Untitled](Form%20components/Untitled%2023.png)

**Icon**

Alternatively, segmented controls may comprise only icons.

![Untitled](Form%20components/Untitled%2024.png)

---

## **Formatting**

![Untitled](Form%20components/Untitled%2025.png)

1. **Container –** This primary rounded-corner container holds text, plus a selection container.
2. **Selection container –** This secondary rounded-corner container appears behind the selected text to highlight it.
3. **Text String –** Text within the string may be selected.

---

## **Usage**

Users can deploy segmented controls to organize and “bucket” the content of a selected page or data set, or as a selection tool.

**Do**

1. Ensure that each segment is clear and brief. Use nouns or noun phrases.
2. Segments can contain text or icons, but not both.
3. Keep the segmented control near the content it controls.
4. When using icons, make them simple and clear.

**Don’t**

1. Don’t combine icons and text in the same segmented control.
2. Don’t use long text strings, as they might unbalance the segment width.
3. Don’t stack text strings or increase the height of the control.
4. Don’t combine large and small text strings.
5. Don’t allow multiple selections.

**Text**

![Untitled](Form%20components/Untitled%2026.png)

All, Answers, Pinboards selection in the Pinboards page.

**Icon**

![Untitled](Form%20components/Untitled%2027.png)

Segmented control icons in a visualization

---

## **Behavior**

**Trigger**

Clicking on a segment selects it.

**Positioning**

Segmented controls should appear near the content they control, ideally just above it.

**States**

![Untitled](Form%20components/Untitled%2028.png)

**Specifications**

![Untitled](Form%20components/Untitled%2029.png)