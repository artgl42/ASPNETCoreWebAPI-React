# WarehouseManagementApp

Example of a client-server application with ASP.NET Core web API as a server (backend) and React SPA as a client (frontend).

# About

Tried to implement a RESTful service sample using ASP.NET Core Web API with controllers as a server and React SPA (using functional components with hooks) as an independent client. This project was used as a training base to improve technical skills. So nothing serious, just a learning project with REST architectural style and basic functionality:
- CRUD methods;
- Pagination (backend);
- Sorting (frontend);
- Filtering (frontend).

## Backend:
- REST API;
- ASP.NET Core 6.0;
- Entity Framework Core 6.0.5;
- MS SQL Server 2014;
- Swagger UI 1.0.

## Frontend:
- React 18.1.0;
- React-Bootstrap 2.4.0;
- Bootstrap 5.1.3;
- Fetch API.

## Database schema:

![database_schema.jpg](database_schema.jpg "Database schema")

# How to run

1. `$ git clone https://github.com/artgl42/WarehouseManagementApp.git`
2. Visual Studio -> Open **WarehouseManagementApp.sln** -> Build and run 
   
   >don't forget to change *ConnectionStrings* in **appsettings.json** to your SQL Server location (database will be created automatically)

3. `$ cd WarehouseManagementApp/warehouse-management-client`
4. `$ npm install`
5. `$ npm start`

# API Endpoints

![api_list.jpg](api_list.jpg "APIs list")


# Screenshots

![WarehouseManagementApp.gif](WarehouseManagementApp.gif "ASP.NET core web API (backend) and React (frontend)")