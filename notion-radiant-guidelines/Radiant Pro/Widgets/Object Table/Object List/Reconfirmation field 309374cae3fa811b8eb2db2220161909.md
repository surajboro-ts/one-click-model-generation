# Reconfirmation field

Number: 5
Default State: The field will be empty
Description: In some cases the object or configuration that is being deleted will have dependencies. This may require a reconfirmation field. The user will have to reenter their account password to delete an object or configuration. 
Dynamic Behavior: This is required field when used and the user will not be able to delete the object or configuration without entering their password. 
Error State: If the users enters an incorrect password for their account an error message will be displayed in the header of the field. 
Object: DL.0 Delete core pattern