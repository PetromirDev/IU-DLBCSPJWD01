# **Book Wishlist App**  

![Book Wishlist App](https://github.com/PetromirDev/IU-DLBCSPJWD01/blob/957926d5ff103342442057498b11b0b13e1a2339/screenshots/dashboard-desktop.png)

This project is built for **IU's** `Project: Java and Web Development (DLBCSPJWD01)` course. It is a simple web application that allows users to keep track of books they want to read.

## **Features**  
✅ User authentication (Sign up & Login)  
✅ Add books with title, author, category, and reading status  
✅ Custom categories for better organization  
✅ Search and filter books  
✅ Mobile-friendly, responsive UI  

## **Tech Stack**  
- **Front-end**: Next.js
- **Back-end**: Next.js Server Actions
- **Database**: SQLite
- **Styling**: Shadcn + Tailwind CSS  

## **Installation & Setup**  

### **Prerequisites**  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) v22.12.0
- [Yarn](https://yarnpkg.com/) v1.22.22
- [Git](https://git-scm.com/) 

### **1. Clone the repository**  
```sh
git clone https://github.com/PetromirDev/IU-DLBCSPJWD01
cd IU-DLBCSPJWD01
```

### **2. Install dependencies**  
```sh
yarn install
```

### **3. Initialize the database**
```sh
yarn init-db
```
Running this command will create a new SQLite database file with a test user and some sample books. To log in, use the following credentials:
- **Email**: test@iu.org
- **Password**: iutestacc

### **4. Start the application**  
```sh
yarn dev
```
It will be available at **http://localhost:3000**  

## **Production build**  
To build and start the production version:  
```sh
yarn build
yarn start
```

## **Test cases**
### **1. User authentication**
- **Test case 1**: User can sign up with valid credentials
1. Navigate to the sign-up page
2. Enter a valid email and password
3. Click the "Create account" button
4. Expected: User is authenticated and redirected to the dashboard
- **Test case 2**: User cannot sign up with an existing email
1. Navigate to the sign-up page
2. Enter an existing email and a password
3. Click the "Create account" button
4. Expected: User is shown an error message
- **Test case 3**: User can log in with valid credentials
1. Navigate to the login page
2. Enter an email address and password of an existing user
3. Click the "Log In" button
4. Expected: User is authenticated and redirected to the dashboard
- **Test case 4**: User cannot log in with invalid credentials
1. Navigate to the login page
2. Enter an email address and password of a non-existing user
3. Click the "Log In" button
4. Expected: User is shown an error message
- **Test case 5**: User can log in with the test account (test@iu.org)
1. Navigate to the login page
2. Enter the test account credentials
3. Click the "Log In" button
4. Expected: User is authenticated and redirected to the dashboard
- **Test case 6**: User cannot access the dashboard without logging in
1. Logout if you are logged in
2. Navigate to the dashboard by manually entering the URL `/dashboard`
3. Expected: User is redirected to the login page
- **Test case 7**: User can log out
1. Make sure you are logged in
2. Click the "Logout" button on the dashboard
3. Expected: User is logged out and redirected to the login page
## **2. Book management** (Authenticated user)
- **Test case 1**: User can add a new book
1. Click on the "Add Book" button
2. Fill in the book details
3. Click the "Add Book" button
4. Expected: The book is added to the list
- **Test case 2**: User can edit a book
1. Click on the three dots on a book card
2. Click the "Edit" button
3. Change the book details
4. Click the "Save Changes" button
5. Expected: The book details are updated
- **Test case 3**: User can delete a book
1. Click on the three dots on a book card
2. Click the "Delete" button
3. Click the "Delete" button in the confirmation dialog
4. Expected: The book is removed from the list
- **Test case 4**: User can search for a book
1. Enter a search query in the search bar
2. Expected: Only books that match the query are shown