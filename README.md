## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Then, apply prisma migrations:

```bash
npm run prisma genereate
npm run prisma migrate dev 
# or
yarn prisma genereate
yarn prisma migrate dev
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

# Frontend Recruitment Task - README

## Overview
This README outlines the tasks for a frontend recruitment challenge focused on building and integrating components for a transaction management application. The application is split into several steps, each requiring the completion of specific tasks.

---

## Task Instructions

### Task 1: Display Transactions
1. **URL to Open**: `http://localhost:3000/transactions-1`
    - **Objective**: Display a list of transactions.
    - **Steps**:
        1. **Hardcoded Transactions**: The page contains a hardcoded `get transactions` API response named `testTransactions`.
        2. **Create TransactionRow Component**: Write a component named `TransactionRow` that displays one transaction.
        3. **Display All Transactions**: Use the `TransactionRow` component to display all transactions from `testTransactions`.

### Task 2: Add New Transactions
1. **URL to Open**: `http://localhost:3000/transactions-2`
    - **Objective**: Add functionality to create new transactions.
    - **Details**:
        - **TransactionRow Component**: The `TransactionRow` component is already in place.
        - **Add Transaction Form**: Utilize the simple form provided on the page to add new transactions to the list.

### Task 3: API Routes for Transactions
1. **URL to Open**: `http://localhost:3000/transactions-3`
    - **Objective**: Implement API routes for transaction management.
    - **Tasks**:
        - **Get Transactions API**: Write an API route to fetch transactions from the database.
        - **Create Transaction API**: Write an API route to create new transactions in the database.

### Task 4: Integrate API with Frontend
1. **URL to Open**: `http://localhost:3000/transactions-4`
    - **Objective**: Utilize API routes in the frontend.
    - **Steps**:
        - **Existing API Routes**: API routes for getting and creating transactions are already implemented.
        - **Fetch Transactions**: Use these API routes in the `TransactionHistory` component to fetch and display transactions.
        - **Create Transactions**: Implement functionality to create new transactions through the API.

### Task 5: Code Review
1. **URL to Open**: `http://localhost:3000/transactions-5`
    - **Objective**: Review the final code.
    - **Details**: Examine the complete code for the transaction management application and ensure it meets the requirements.

---

## Additional Information
- Ensure that each component is properly documented.
- Pay attention to code quality and readability.
- Test the application thoroughly at each stage.

Good luck with your task!
