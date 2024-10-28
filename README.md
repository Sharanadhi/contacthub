# Project Title
Contact Hub

## Overview

Contact Hub is a comprehensive CRM (Customer Relationship Management) web app designed to streamline and 
manage customer relationships efficiently. Whether it's managing contacts or tracking deals, 
Contact Hub provides all the essential tools for business growth.

### Problem

Managing customer relationships can be challenging without the right tools. Businesses often struggle with keeping track of contacts, 
managing deals, and maintaining customer satisfaction. Contact Hub addresses these challenges by offering a centralized platform for all CRM needs.

### User Profile

Business Owners: Looking to manage customer relationships effectively and increase sales.
Sales Teams: Needing tools to track deals, manage leads, and close sales efficiently.

### Features

--Sign Up/Sign In Pages:
    -Users can create an account to manage their contacts and deals.
    -Existing users can log in to access their account and manage their information.

--Contacts Page:
    -Create: Add new contacts with detailed information.
    -List: View a list of all contacts with options to sort and filter.
    -Details: View detailed information about individual contacts.

--Deals Page:
    -Create: Add new deals with relevant details.
    -List: View a list of all deals, track their progress, and manage them efficiently.
    -Edit: Update deal information as they progress through different stages.

--User Management:
    -As a user, I want to be able to create an account to manage my contacts and deals.
    -As a user, I want to be able to log in to my account to manage my contacts and deals.
    -As a logged-in user, I want to be able to see my contacts and deals.
    -As a logged-in user, I want to be able to filter my contacts by various criteria.
    -As a logged-in user, I want to be able to update and edit my contacts.
    -As a logged-in user, I want to be able to update and edit my deals.

## Implementation

### Tech Stack

--Front-end:
    -React
    -TypeScript
    -Material-UI for design components
--Back-end:
    -Node.js
    -Express
    -MySQL
    -Knex for database query building

### APIs

- No external APIs will be used for the first sprint

### Sitemap

- Sign up Page
- Sign in Page
- Create contact Page
- Contact list Page
- Contact details Page
- Create Deal Page
- Deal details Page

### Mockups

#### Sign up Page
![](sign_up.png)

#### Sign in Page
![](sign_in.png)

#### Create contact Page
![](contact-create.png)

#### Contact list Page
![](contact-list.png)

#### Contact details Page
![](contact-detail.png)

#### Create Deal Page
![](deal-create.png)

#### Deal details Page
![](deal-details.png)


### Data

![](sql-diagram.png)

**GET /contacts**
Get all contacts.
Parameters:
user_id:current user's id
Response:
Json


[
  {
    "id": 1,
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "business_phone": "+1 (646) 123-1234",
    "company": "Example Corp",
    "visited": true
    ...
  },
  ...
]
**GET /contacts/:id**
Get contact by id
Parameters:
id: Contact id as number,
user_id:current users id

Response:
Json

Copy
{
  "id": 1,
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "business_phone": "+1 (646) 123-1234",
  "company": "Example Corp",
  ....
}

**POST /contacts**
Add a new contact.
Parameters:
user_id:current users id
first name: first name of the contact.
last name: last name of the contact.
email: Email address of the contact.
business_phone: Business phone number of the contact.
company: Company name
....

Response:
Json


{
    message:'contact created'
}

**PUT /contacts/:id**
Update an existing contact.
Parameters:
id: Contact id as number.
user_id:current users id
first name (optional): first name of the contact.
last name (optional): last name of the contact.
email (optional): Email address of the contact.
business_phone (optional): Business phone number of the contact.
company (optional): Company name.
...

Response:
Json

{
    message:'contact updated'
}



**POST /users/register**
Add a user account.
Parameters:
full_name:User's full name
email: User's email.
phone: User's phone number.
password: User's provided password.
Response:
Json

response{
    message:'user created'
}

POST /users/login
Login a user.
Parameters:
email: User's email.
password: User's provided password.
Response:
Json

{
    message:'sign in succefull',
    data:{
        userid:current users id
    }
}



## Roadmap


--Create Client
    -Set up React project with routes and boilerplate pages.
--Create Server
    -Set up Express project with routing, with placeholder 200 responses.
--Create Migrations
    -Define database schemas and create migration scripts.
--Deploy Client and Server Projects
    -Deploy both client and server projects so all commits are reflected in production.
--Feature: 
    --Contacts
        -Create Contacts Page: Implement the page with a form to add new contacts.
        -List Contacts Page: Implement the page to list all contacts.
        -Contact Details Page: Implement the page to view details of a contact.
    --API Endpoints:
        -Create GET /contacts endpoint.
        -Create POST /contacts endpoint.
        -Create GET /contacts/:id endpoint.
    --Feature: Deals
        -Create Deals Page: Implement the page with a form to add new deals.
        -List Deals Page: Implement the page to list all deals.
        -Edit Deals Page: Implement the page to edit existing deals.
    --API Endpoints:
        -Create GET /deals endpoint.
        -Create POST /deals endpoint.
        -Create GET /deals/:id endpoint.
        -Create PUT /deals/:id endpoint.
    --Feature: Authentication
        -Create Account: Implement register page with a form to create an account.
        -Login: Implement login page with a form to access the account.
        
-Bug Fixes

-DEMO DAY

    ## Nice-to-haves

    --Add a dashboard
        -visualize contacts and deals details in numbers and graphs
    --Forgot Password Functionality
        -Implement a flow to handle password resets.
    --Expanded User Information
        -Collect  other personalized information.
    --Unit and Integration Tests
        -Implement comprehensive testing to ensure the application's functionality and reliability.
    --Implement JWT Tokens:
        -Server: Update expected requests/responses on protected endpoints.
        -Client: Store JWT in local storage and include JWT in axios calls.