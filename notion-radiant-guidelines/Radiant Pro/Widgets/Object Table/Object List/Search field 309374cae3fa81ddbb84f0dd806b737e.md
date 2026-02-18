# Search field

Number: 1
Content Rules: N/A
Default State: The search field would be empty.
Description: The search field allows the user to search for specific objects in the currently viewed object list.
Dynamic Behavior: Entering a search query will refresh the object list with objects that match the search query term.
 
The objects list will refresh dynamically as the user enters their search query. 

Highlight the search term in the results with respect to search query.

In nested state, the items in the child list will be highlighted in search.

User can select or deselect objects while they are in search mode. 

Select all and clear will select all/clear all the objects visible in the list at the given instance.

Clicking the cross button will close the search.
Error State: If there are no object results for a search query, the list should show an empty state graphic.
Object: ML.0 Multi-object list picker
Type: Widget