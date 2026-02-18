# Shortcut keywords

Number: 4
Default State: Last Quarter (selected) in blue
Description: Selectable chips that are predefined time period configurations.
Dynamic Behavior: Can have any of the below values
1.Last quarter
2.Last year
3.Week to Date
4.Month to Date
5.Quarter to date
6.Year to date
As the user changes the selection of these chips the fields above them get changed. For last year and last quarter, it will have 3 fields as show. For W/M/Q/Y to Date the fields above will have the start date and end date set as per the shortcut selected that the user can change. If the user chooses a different date then the chip selection goes away.
Example:
Error State: If user chooses a different date that does not correspond to the shortcut time period selected then it gets unselected
The dates themselves need to be validated and field level error is shown as below
Object: RDF.0 Date and time picker