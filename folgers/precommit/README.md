In order to run npm scripts on the git [pre-commit](https://git-scm.com/book/gr/v2/Customizing-Git-Git-Hooks) hook, create a file `scripts-to-run.js` inside of this directory (`./precommit`) that exports a simple array of npm script names. These names should match the scripts defined in the `"scripts"` object of the root `package.json`.

Note: the array can be empty if you wish.

For an example file, check out `./scripts-to-run.example.js` as some boilerplate to get started.