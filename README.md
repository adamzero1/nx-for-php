# nx-for-php
A wrapper for implementing/utilizing NX functionality for PHP project.
The repo is based on [magento2-nx-graph](https://github.com/damienwebdev/magento2-nx-graph), with a few differences:
- Still focused on Magento projects, but should work for any PHP projects.
- Can be used without adding to any NX specific files to your current project. (A good way to test the functionality)

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
WORKDIR=magento; \
BASE_REPO=https://github.com/mage-os/mageos-magento2.git; \
rm -rf ${WORKDIR} || true \
&& git clone ${BASE_REPO} --depth=1 --single-branch  ${WORKDIR} \
&& cd ${WORKDIR} \
&& composer install --no-dev --ignore-platform-reqs
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