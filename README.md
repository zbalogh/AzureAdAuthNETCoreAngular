
# Demo Application how to use MSAL library with Angular front-end and NET Core Web API

This is a very simple demo application that presents how to use MSAL 2.0 library for Angular SPA application with .NET Core Web API.

Angular application dynamically loads the MSAL (tenantId, clientId) configuration from the Web API endpoint.

When you execute it, you need only configure MSAL settings in the NET Core Web API (either environment variable or command-line argument).

Note: Other way is to change your "appsettings.json" file, and specify your MSAL settings in the "AzureAd" section.


# Important Notes

In order to authenticate against Azure AD, you need an Azure subscription and Azure Active Directory with your own users. In your Azure AD you have to register this Angular application as SPA app with redirectUri (e.g. http://localhost:5000). Additionally, you have to expose API and then configure API Permissions in your registered App.

In this demo, the "Exposed API" is the following URI:  api://<YOUR_CLIENT_ID>/api-access

The "api-access" is the name that you have to specify in your settings at "Expose API" menu. (If you specify different name, then you have to make changes in the example code in the "app.module.ts" file.)

For further details, please read articles on the web.


# Useful websites

https://thecodeblogger.com/2020/05/05/angular-app-and-azure-ad-protected-web-api-using-msal/

https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-angular-auth-code

https://dev.to/theaswanson/adding-authentication-with-azure-ad-to-a-net-angular-web-app-with-msal-11a5


# When you run this application you have to specify the "AzureAd" parameters with one of the following ways:

1. Execute by using environment variables

```
set AzureAd__TenantId="<YOUR_TENANT_ID>"
set AzureAd__ClientId="<YOUR_CLIENT_ID>"
set AzureAd__Domain="<YOUR_DOMAIN>"

dotnet restore
dotnet build
dotnet run
```

2. Execute by using command-line paramerers

```
dotnet restore
dotnet build
dotnet run --AzureAd:TenantId="<YOUR_TENANT_ID>" --AzureAd:ClientId="<YOUR_CLIENT_ID>" --AzureAd:Domain="<YOUR_DOMAIN>"
```


# Docker image on the docker hub

```
zbalogh/msal-webapi-angular
```

https://hub.docker.com/r/zbalogh/msal-webapi-angular
