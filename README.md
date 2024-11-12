User Management App
This is a simple user management application that allows you to add, edit, delete, and view users, with fields like name, email, and department. The app uses React, Redux Toolkit, and React Router to manage state and routing. It also includes validation for form inputs and notifications.

Features
Add User: You can add users by filling in their first name, last name, email, and department.
Edit User: Users can be updated with new details.
Delete User: Users can be removed from the system.
List Users: Users are displayed in a table with options to edit or delete.
Department Management: If the department is not provided, it defaults to "N/A".
Technologies Used
React: JavaScript library for building user interfaces.
Redux Toolkit: A set of tools to simplify state management with Redux.
React Router: Used for navigating between pages.
React Toastify: For showing notifications (success, error, etc.).
CSS (Tailwind CSS can be used if desired): For styling the application.

1. Clone the repository
bash
Copy code
git clone https://github.com/onkvyawhare/tacniqueassignment.git
cd user-management-app
2. Install dependencies
Run the following command to install the required dependencies:

bash
Copy code
npm install
# or if using yarn
yarn install
3. Setup the backend API
This app assumes you have an API backend running at API_URL where user data is stored. You will need a RESTful API to handle CRUD operations for users. If you don’t have one, you can use tools like JSON Server to mock a backend for development purposes.

You can set up a mock backend using JSON Server like this:

bash
Copy code
npm install -g json-server
json-server --watch db.json --port 5000
Here, db.json is a file that contains an initial dataset (you can create a sample db.json file for testing).

4. Run the app
Now, you can start the development server with:

bash
Copy code
npm start
# or if using yarn
yarn start

