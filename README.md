
# Demo Application how to use MSAL library with Angular front-end and NET Core Web API

This is a very simple demo application to present how to use MSAL 2.0 library for Angular SPA web application with .NET Core Web API.

Angular application dynamicaly loads the MSAL (tenantId, clientId) configuration from the Web API endpoint.

When you execute it, you need only configure MSAL settings in the NET Core We API (either environment variable or command-line argument).

Note: Other way is to change your "appsettings.json" file, and specify your MSAL settings in the "AzureAd" section.


# When you run this application you have to specify the "AzureAd" parameters with one of the following ways:

1. Execute by using environment variables

```
set AzureAd__TenantId="<YOUR_TENANT_ID>"
set AzureAd__ClientId="<YOUR_CLIENT_ID>"
set AzureAd__Domain="<YOUR_DOMAIN>"

dotnet run
```

2. Execute by using command-line paramerers

```
dotnet run --AzureAd:TenantId="<YOUR_TENANT_ID>" --AzureAd:ClientId="<YOUR_CLIENT_ID>" --AzureAd:Domain="<YOUR_DOMAIN>"
```
