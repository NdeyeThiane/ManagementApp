# ManagementApp


MVP: Cohort Management App
1. Elevator Pitch (One sentence)
"A cohort management app where Admins can manage cohorts, assign instructors and mentors, and oversee student progress, while instructors and mentors have role-specific access to resources and students."
2. MVP Features
Admin Role:
Cohort Management:
Create, edit, and delete cohorts.
Assign instructors and mentors to specific cohorts.
Manage cohort-specific access codes.
User Management:
Add and manage users (students, instructors, mentors).
Assign users to cohorts based on their role.
Dashboard:
Overview of all cohorts, users, and their status.
Instructor Role:
Access to Cohort Pages:
View cohort-specific tasks and student information.
Student Management:
View and track student progress.
Leave feedback on student tasks or activities.
Mentor Role:
Access to Resources:
View cohort resources and learning materials.
Student Information:
Access to student information for guidance but no editing privileges.
3. User Flow:
Admin:
Log in → Dashboard.
Manage cohorts (create, assign instructors/mentors).
Manage access codes for user registration.
Oversee user management (add/remove students, instructors, mentors).
Instructor:
Log in → View cohort page.
Access student progress and resources.
Provide feedback on student activities.
Mentor:
Log in → View cohort resources.
Access student information for guidance purposes.
4. Tech Stack for MVP
Frontend: React.js
For building the user interfaces (admin dashboard, instructor/mentor pages).
Backend: Node.js + Express
For handling requests, user authentication, cohort management, and access control.
Database: PostgreSQL
To store user information, cohort data, access codes, and relationships.
Authentication: JWT (JSON Web Tokens)
Role-based access control (admin, instructor, mentor).
5. Prioritized Features for MVP
Cohort Management (Admin):
Create cohorts and assign users.
Access Codes (Admin):
Manage access codes for user sign-up.
Basic User Roles:
Role-based access control for Admin, Instructor, and Mentor.
Instructor and Mentor Pages:
Instructors can view student progress and provide feedback.
Mentors can access resources and student information.
6. Nice-to-Have Features (For Future Versions)
Real-time collaboration (retrospectives, checklists).
Notification system for task deadlines.
Advanced student analytics and reporting.
File uploads for cohort-specific resources.
Technical Risks:
Real-time data syncing across users (e.g., potential WebSocket issues).
Secure file uploads and permissions management
7. MVP Diagram
Admin: Full access to manage cohorts, users, and access codes.
Instructor: Can view student progress and leave feedback.
Mentor: Can view resources and student info for guidance.


The Users Table stores all user information, including their role (admin, instructor, mentor, student).
The Cohorts Table manages different bootcamp cohorts and their dates.
AccessCodes Table manages unique access codes for user registration.
Tasks and UserTasks manage tasks assigned to each cohort and track completion by students.
Resources Table manages cohort-specific learning materials and resources.
Schedules holds information about cohort events.
Retrospectives store student reflections or progress summaries.

Components:
LoginForm: Handles authentication and redirects based on user role.
AdminDashboard: Displays cohorts and options to manage users.
StudentDashboard: Displays student tasks, schedule, and core skills.
Checklist: Real-time updates using Socket.IO.
RetrospectiveForm: Submit reflections.
Functions:
handleLogin(): Authenticates user and returns role-based access.
updateChecklist(): Sends real-time checklist updates.
submitRetro(): Submits retrospectives and broadcasts changes in real-time.


Frontend: React.js, Socket.IO (for real-time features)
Backend: Node.js, Express, PostgreSQL
Cloud Storage: Amazon S3 or Google Cloud Storage (for file uploads)
Authentication: JWT for secure access control


Development Plan (Day-to-Day)
Day 1-2: Finalize project structure, set up repo, plan schema.
Day 3-4: Implement authentication and user role-based access (admin, student, instructor).
Day 5-7: Build core features (Dashboard, Checklist, Retrospective, Core Skills Overview).
Day 8-9: Integrate Socket.IO for real-time collaboration.
Day 10-12: Set up database interactions (PostgreSQL), including tasks, retros, and checklist completion.
Day 13-14: Implement file upload system (if included in MVP).
Day 15: Testing and final adjustments.




![Untitled scene](https://github.com/user-attachments/assets/555d8bad-1650-4b85-8034-164e06998ccd)
