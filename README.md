# prosiebensat1-exercise

This project demonstrates automation for REST APIs and triggering AWS Lambda functions for a specific application, using Cypress for testing.

## Setup

To set up the project locally:

3. **Install dependencies**:
   ```bash
   npm install
   ```

## Running Tests

Run the tests using:

```bash
npx cypress open
```

## Overview

The project is divided into two main parts:

REST API Automation:

Contains tests for the app's REST APIs, including access control validation using API Gateway with Lambda Token Authorizer.
Key scenarios include unauthorized access, forbidden actions, and successful invocation with correct tokens.
Lambda Function Triggering & File Content Verification:

Involves triggering a Lambda function and verifying the content of the file it generates.

## CI/CD Integration with GitHub Actions

This project is integrated with GitHub Actions to automate testing and validation every time changes are pushed to the main branch. The CI/CD pipeline includes steps to trigger the Lambda function and verify the content of the file generated in the S3 bucket.

Workflow Overview
Trigger: The workflow is triggered on every push to the main branch.
Lambda Function Triggering: Executes a step to trigger the AWS Lambda function.
File Content Verification: Checks the generated file in the S3 bucket for expected content, ensuring the Lambda function executed correctly.
