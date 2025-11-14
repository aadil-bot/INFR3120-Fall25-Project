Guidelines




Project focus:                                 Event Planner.




 



Part 1 details:





LogBook is a website event planning application designed to display the entire process of organizing events, from small personal gatherings to larger professional functions. Unlike simple calendar applications, LogBook focuses on events by providing a dedicated digital "log" for every detail. The application's core functionality is focused on the event object, allowing users to create, read, update, and delete all associated information with ease. When a user is on the site, users are presented with a clear dashboard that lists their active events, acting as their central command center. The "Create New Event" feature (which satisfies the hero button requirement) immediately guides users into the planning workflow, ensuring a smooth start to any project.
The application is built around the fundamental CRUD operations to manage event data. CRUD stands for create, read, update, delete. For instance, users can create a new event record that includes the event name, date, time, and location details. Once created, they can read a detailed breakdown of the event, including an order of logs of all planning activities, vendor contacts, and task lists, all presented in a clean table format. The application supports Updating any of these fields as the planning progresses, from adjusting the venue to modifying the guest list. Finally, the Delete function provides the necessary administrative control to remove canceled or completed events from the main log. This structure ensures that every piece of information related to an event remains organized and accessible throughout the planning lifecycle, effectively turning a complex process into a manageable set of steps.


 
VIDEO: 
👥 Individual Contribution Tables: Event Planner Project 
These tables serve as a contract of responsibilities and a checklist for the video demonstration, ensuring that each member can showcase and explain their unique code contributions.
1. Member 1: Front-End & Read Functionality (Aadil)
Category
	Specific Tasks for Part 1
	Deliverables & Code Focus
	Project Setup
	Initial repository setup and pushing the Readme/Documentation file.
	Public GitHub Repo INFR3120 Fall25 Project established.
	
	Landing Page
	Design and implement the core HTML/CSS structure of the landing page.
	A visually appropriate Landing Page (Home Page)3.
	
	Logo
	Create and implement the original Team's Logo4.
	Logo integrated into the landing page design.
	
	Read Logic (R)
	Implement the code to fetch and display the list of Events.
	The Event Board dashboard showing all Events in a table format5.
	
	Video Focus
	Explain the HTML/CSS structure, the team logo design, and the front-end script for rendering the list of events.
	Show commits for landing page and list display code6.

	Repository Management
	Add all other members as collaborators to the public GitHub repository. 
	Confirmation that all group members are collaborators.
	
	2. Member 2: Create (C) & Delete (D) Functionality (Sofiyan)
	Category
	Specific Tasks for Part 1
	Deliverables & Code Focus
	Create Logic (C)
	Implement the client-side form and the backend/server-side endpoint to receive and store a new Event record.
	Functional form accessed via the "hero button". Server logic for the Create operation.
	
	Delete Logic (D)
	Implement the functionality to remove an event, typically a button next to each item in the table, and the corresponding server-side logic.
	Server logic for the Delete operation. Confirmation of record removal from the database.
	
	Integration
	Ensure the Create operation successfully updates the database and the Read table reflects the change.
	Integration of form submission with the data storage method.
	
	Video Focus
	Explain the data handling code for accepting form data and the specific function/endpoint used to permanently delete an event record.
	Show commits for Create form HTML/script and the Delete endpoint code.
	
	
	3. Member 3: Update (U) & Infrastructure/Deployment (Samir)

	Category
	Specific Tasks for Part 1
	Deliverables & Code Focus
	
	Update Logic (U)
	Implement the functionality to edit an existing Event record. This requires a form pre-filled with existing data and server logic to overwrite the record based on its unique ID.
	Functional "Edit Event" form. Server logic for the Update operation.
	
	Deployment
	Deploy the functional web application to a chosen cloud service provider12.
	A live, functional URL/link to the deployed application.
	
	
	Video Focus
	Explain the Update function's logic (how it finds and rewrites a specific record) and demonstrate the entire deployment process and configuration13.
	Show commits for the Update form/script and deployment configuration files14.