# Pet-Lost  

*This is a web application to find lost pets*

## Main data  
***No auth required***  
Make a GET petition to  

```/api/main```  

to get all the lost pets in our databases  

## Main with a limited amount of results  
***No auth required***  
Make a GET petition to  

```/api/main/:limit```  

to get a limited amount of lost pets data. Limit parameter must be an integer greater than 0.  

## Create an user to register lost pets  
***No auth required***  
Make a POST petition to   

```/api/users```  

to sign up in the API, the parameters that you must provide are:  

| Field Name | Data Type | Description |
| ---------- | --------- | ----------- | 
| name       | String    | This is your name |  
| password   | String    | This password will be used with authentication purposes |  
| email      | String    | This email will be used with authentication purposes |  

All fields are required.  

## Sign in  
***No auth required***  
Make a POST petition to 

```/api/login```  

To sign in in the API you must provide two parameters in JSON format:  

| param 1 | param 2 |  
| ------- | ------- |
| email   | password (at least 6 characters in length) | 


## Get a lost pet info (verify if it exists)
***No auth required***  
Make a GET petition to  

```/api/inform/:code```  

This endpoint will give you the pet owner data in case you found it, all you need to provide as url parameter is the code of the registered animal.  
Code must be an positive integer.  

## Inform your pet as found
***Auth required***  

Make a PUT petition to  

```/api/inform/:code```  

Only available to authenticated users, only them can change the "lost status" of their pets.  
You must provide the pet code in the url parameters, then the "isLost" status is switched to false.  

## Register a lost pet  
***Auth required***  

Make a POST petition to  

```/api/pets```  

Here you can register a new lost pet passing two parameters:  

| param1 | param 2 |
| -------| ------- |
| image  | lost_at |

**image** must be a valid image file, the API only suppports ``` jpeg / jpg / png ``` files.  
**lost_at** must be a valid Date string, following UTC format:  
<div align="center"><span> ```YYYY-MM-DDThh:mm:ss.sTZD``` </span></div>  

**YYYY** : *four-digit year*  
**MM** : *two-digit month (01=January, etc.)*  
**DD** : *two-digit day of month (01 through 31)*  
**hh** : *two digits of hour (00 through 23) (am/pm NOT allowed)*  
**mm** : *two digits of minute (00 through 59)*  
**ss** : *two digits of second (00 through 59)*  
**s** : *one or more digits representing a decimal fraction of a second*  
**TZD** : *time zone designator (Z or +hh:mm or -hh:mm)*   

