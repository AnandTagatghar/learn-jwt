## Overview
  Learning how to implement jsonwebtoken with the refresh token and authorization token
  In this first we hit login token and get the login access token and refresh token will be set on the server end.
  And after the expiration of the auth token we use the refresh token cookie and respond with the new token for the user to use.
  Refresh and auth access token both has a expiration time.
  Endpoint Hit limit set to limit the rate usage.

# Required Packages
  ~ express
  ~ express-rate-limit
  ~ cors
  ~ jsonwebtoken
  ~ cookie-parser
  ~ dotenv (optional)