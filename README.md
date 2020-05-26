# Backend Coding Challenge

## HTTP API
This node project uses express framework to receive the HTTP API requests.

## Routes 
There are two route files defined one for auth & another for story related actions. These are the files where the mapping between the HTTP API URL and the Controller actions are configured.


## Middlewares
All authenticated requests are checked by a middleware ('authenticate') before processing. There is another middleware that is used to check if the authenticated user possesses enough role based privilege to perform the action.


