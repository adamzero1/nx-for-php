# nx-for-php
A wrapper for implementing/utilizing NX functionality for PHP project.
The repo is based on [magento2-nx-graph](https://github.com/damienwebdev/magento2-nx-graph), with a few differences:
- Still primarily focused on Magento projects, but should work for any PHP projects.
- Can be used without adding to any NX specific files to your current project. (A good way to test the functionality)

The intention of this repo is to provide examples on how Nx can be incorperated into any Composer based PHP project.

## Usage

### Prerequisites 
1. [Nx](https://nx.dev/) installed globally
  Something like
  ```bash
  npm install -g nx@15.4.1
  ```
2. The target project checked out, with all depenencies installed. (i.e `git clone XXX && composer install`)


### Setup
```
WORKDIR=/workspaces/magento2; \
BASE_REPO=https://github.com/mage-os/mageos-magento2.git; \
rm -rf ${WORKDIR} || true \
&& git clone ${BASE_REPO} --depth=1 --single-branch  ${WORKDIR} \
&& cd ${WORKDIR} \
&& composer install --ignore-platform-reqs
```
Then add nx files to project
```
NXDIR=/workspaces/nx-for-php; \
cp -r ${NXDIR}/nx ./ \
&& cp ${NXDIR}/nx.json ./ \
&& cp ${NXDIR}/package.json ./ \
&& cp ${NXDIR}/package-lock.json ./ \
&& cp ${NXDIR}/phpunit.mage-os.nx.xml ./phpunit.nx.xml
&& npm ci
```

#### 1. Generating Workspace JSON
This file tells Nx about all our `projects` and what tests to run in each.

This file is required for Nx, if the file `workspace.json` exists it **won't** be updated.
If you have made changes that require an upate, `rm` the file before running the generation command.

```bash
npm run generate-workspace
```

#### 2. Generating a dependency graph
```bash
nx dep-graph
```
(the plugin currently uses a cache file `nx/var/references.json`, if there are changes to the codebase, this file should be removed before running any Nx commands.)

#### 3. Generating an affected graph

```bash
nx affected:graph --files=app/code/Magento/AdminAnalytics/Model/ResourceModel/Viewer/Logger.php
```

```bash
nx affected:graph --files=app/code/Magento/AdminNotification/Model/Feed.php
```

#### 4. Running tests for affected

1 file, 1 module, no dependents
```bash
nx affected --target=test --files=app/code/Magento/AdminAnalytics/Model/ResourceModel/Viewer/Logger.php
```

1 file, 1 module, 
```bash
nx affected --target=test --files=app/code/Magento/AdminNotification/Model/Feed.php
```

## Dev / Debug
```
export NX_VERBOSE_LOGGING=true
export NX_CACHE_PROJECT_GRAPH=false
export NX_DAEMON=false

nx affected:graph --verbose --skip-nx-cache --files=lib/internal/Magento/Framework/App/ProductMetadata.php

nx dep-graph --verbose --skip-nx-cache
```

```
# nx run-many --target=test
# nx affected --target=test
```
243   nx affected --target=test --files=lib/internal/Magento/Framework/App/ProductMetadata.php
249   nx run-many --target=test



Seems to be an issue in calculating effected, need to manually work through



## TO-DOs
- Update `workspace.json` if it already exists, after user prompt.
- Automatically update/refresh the cache file `nx/var/references.json`, might be able to use the Nx cahce??
- Get this working without specifying `--files`
- Circlurar deps
- `npm run why ModuleA ModuleB` - show why ModuleA depends on Module B



./vendor/bin/phpunit --bootstrap dev/tests/unit/framework/bootstrap.php



nx affected:graph --base=2.4-develop --head=pr_22_new 
nx affected --target=test --base=2.4-develop --head=HEAD



## Next steps
- integration tests
  ```
  "test:unit": {
    "command": "./vendor/bin/phpunit -c phpunit.nx.xml app/code/Magento/AdminAnalytics/Test/Unit"
  }
  ```