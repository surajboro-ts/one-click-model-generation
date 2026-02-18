# Pagination

Number: 10
Content Rules: N/A
Default State: 20 rows per page displayed.
Description: Pagination lets a user navigate data as pages when the amount of data it too large to be shown at once.
Dynamic Behavior: Wrap the pagination number after 9,999, using the current number-wrapping logic. (Example: 8.15M.)
Show the total result number, if it makes sense in context. This step is optional.

If it's less than 20 rows, don't need to display pagination.
Error State: N/A
Object: OL.0 Object List
Type: Widget