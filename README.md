# micro-base
Microservices base template

## Installation
It's meant to be used and managed together by the orchestration [script](https://github.com/haog1/micro-local-deploy) instead.

### Local development
To install it,  simply run
```bash
yarn
```
To start the app, run
```bash
yarn start
```

## Tests
By default, this microservice base is using `mongodb-memory-server` to mock mongo database and utilises `supertest` for faking http requests.

### Test case
Writing test cases for microservices can be very handy. Whenever you are workinig on some features, functions or refactors and etc, just add a default Jest test folder and name it `__test__`. Create any integration or unit test files under this fold and name it `**.test.ts`. There is a global sign in function defined in `/test/setup.ts` which you can use to be authenticated.

### Commands
- Run `yarn test` for bulk testing all cases
- Run `yarn test-local` for testing and watching any file changes to be re-compiled

## Commit Message Types - "{type}: {subject}"
Commit types must be one of the following:
- mix: Multiple actions performed
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests

## CI/CD

### Github Action
This base repo has stup Github Action to run test pipeline automatically. Check `.github/workflows/dev.deploy.yml` and add required secrets to github secrets in order to make the automation working as expected.

*Test pipeline is set to run only when make PR to the default branch.*

### Setup husky

`.husky` should be already installed and set up. If not, refer to https://typicode.github.io/husky/#/ to setup git commands for automation tests and lints
