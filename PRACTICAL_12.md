# Practical 12: CI/CD Pipeline with GitHub Actions

## 1. Objective

To create a basic continuous integration pipeline that installs project dependencies, runs automated backend tests, and verifies that the React frontend builds successfully.

## 2. Software and Tools Used

- Node.js 22
- npm
- Jest
- Supertest
- Git and GitHub
- GitHub Actions
- React with Vite
- Express and MongoDB backend

## 3. Theory

Continuous Integration (CI) automatically checks code whenever changes are pushed to a repository. GitHub Actions runs the workflow on a fresh Ubuntu machine. The workflow installs dependencies, runs tests, and builds the application. This helps detect broken code before it is merged or deployed.

## 4. Implementation

The backend is located in `task-manager-api`. Jest and Supertest were installed as backend development dependencies. The existing `/health` endpoint is tested without connecting to MongoDB.

The Express application was exported from `server.js` for testing. MongoDB connection and server startup still run when `server.js` is executed directly with `npm start`.

The workflow is stored at `.github/workflows/ci.yml`. It runs for pushes and pull requests targeting `main`, uses Node.js 22, installs both backend and frontend dependencies with `npm ci`, runs backend tests, and builds the frontend.

## 5. Important Files

- `task-manager-api/server.js`: Express application, health endpoint, routes, and MongoDB startup.
- `task-manager-api/package.json`: Backend scripts and test dependencies.
- `task-manager-api/tests/health.test.js`: Supertest test for `GET /health`.
- `.github/workflows/ci.yml`: GitHub Actions CI workflow.
- `package.json`: Frontend scripts, including the Vite production build.
- `README.md`: Project documentation and CI status badge.

## 6. Commands

Install backend test dependencies:

```powershell
cd task-manager-api
npm install --save-dev jest supertest
```

Run backend tests:

```powershell
npm test
```

Run the frontend build from the project root:

```powershell
cd ..
npm run build
```

Check the workflow locally by running the same package commands:

```powershell
npm ci --prefix task-manager-api
npm test --prefix task-manager-api
npm ci
npm run build
```

Commit and push the implementation:

```powershell
git add .
git commit -m "Add GitHub Actions CI pipeline"
git push origin main
```

The workflow must be pushed to the `main` branch before its GitHub Actions result can be viewed.

## 7. Expected Output

The backend test should report a result similar to:

```text
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

The frontend build should report that Vite completed successfully and created the `dist` directory. GitHub Actions should show a green check when all workflow steps pass.

## 8. Failed Pipeline Demonstration

This demonstration must be performed temporarily on GitHub:

1. Change the expected health status in `task-manager-api/tests/health.test.js` from `200` to an incorrect value such as `201`.
2. Commit and push the intentionally broken test to `main`.
3. Open the repository Actions tab and capture the failed workflow and assertion log.
4. Restore the expected value to `200`.
5. Commit and push the corrected test.
6. Capture the successful green workflow run.

The actual application source must not be changed for this demonstration. The failed test change is temporary and should not remain in the final version.

## 9. Screenshots

1. `.github/workflows/ci.yml` and the backend test file shown in VS Code.
2. A GitHub Actions run showing the failed test assertion.
3. A GitHub Actions run showing the corrected test passing with a green checkmark.

## 10. Observation

The CI pipeline automatically installs dependencies, tests the backend health endpoint, and builds the frontend. The health test does not require a real MongoDB database, so it can run reliably on the GitHub Actions runner.

## 11. Conclusion

A basic GitHub Actions CI pipeline was added to the existing Task Management website. It checks backend functionality with Jest and Supertest and verifies the frontend production build. This makes it easier to identify errors whenever code is pushed to GitHub.

## 12. Viva Questions and Answers

### What is CI?

CI means Continuous Integration. It automatically checks new code by installing dependencies, running tests, and building the project.

### Why are Jest and Supertest used?

Jest runs JavaScript tests, while Supertest sends HTTP requests to the Express application and checks its responses.

### Why is MongoDB not required for the health test?

The `/health` endpoint only returns the application status. The test imports the Express app without starting the MongoDB connection, so no database credentials or external database are needed.

## Verification Note

The backend test and frontend build were verified locally. GitHub Actions failed and successful runs require pushing the workflow and temporary test changes to the GitHub repository; those remote runs were not executed from this environment.
