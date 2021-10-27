# express-ts-starter
A microservices based express.js template that utilises Clean Architecture design.

## Installation
To install it,  simply run
```shell
yarn
```
To start the app, run
```shell
yarn start
```

#### Tests
Follow with the jest default recommendation, add any tests files under the same level with the source code and put them in the `__test__` folder.

#### Commands
- Run `yarn test` for bulk testing all cases
- Run `yarn test-local` for testing and watching any file changes to be re-compiled

#### Commit Message Types - "{type}: {subject}"
Check `commitlint.yaml` for allowed message type and also you may update the pre-set message types.

#### CI/CD

#### Github Action
This base repo has stup Github Action to run test pipeline automatically.
Check `.github/workflows/dev.deploy.yml` and add required secrets to github secrets in order to make the automation working as expected.

*Default pipeline is set to run only when make PR to the dev branch.*

#### Setup husky

`.husky` should be already installed and set up.
If not, refer to https://typicode.github.io/husky/#/ to setup git commands for automation tests and lints
