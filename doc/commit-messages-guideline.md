# Commit Messages Guideline

back to [README][readme]

## Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```console
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: (even more [samples](https://github.com/angular/angular/commits/master))

```console
docs(changelog): update changelog to beta.5
```

```console
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

## Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

## Type

Must be one of the following:

* **chore**: Modification of the application (infra-)structure or core like updating grunt tasks, updating the Docker configuration, adding a new project etc. (no production code change, not for new feature modules)
* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to the CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature for the user (not for the build scripts etc.)
* **improve**: improve a current implementation without adding a new feature or fixing a bug
* **fix**: A bug fix for a user feature (not for build scripts etc.)
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

## Scope

The scope could be the name of an application module (e.g. send mail, print barcode, encryption), the name of an application project, library etc. (e.g. router, feedback) etc.

## Subject

The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

## Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

## Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

## Impact of the commit types on the versioning

By convention (see ref. to *Semantic Versioning 2.0.0*), the following types and tags should lead to according version changes:

* `fix` -> this correlates with **PATCH** in semantic versioning

* `feat` -> this correlates with **MINOR** in semantic versioning

* `BREAKING CHANGE` -> this correlates with **MAJOR** in semantic versioning

* `improve` -> this correlates with **PATCH** in semantic versioning

## Further reading

Similar guidlines and other references can be found in the following:

* [Git Commit Message Conventions][commit-message-format]
* [Contributing to Angular][angular-contributing-commit]
* [Karma - Git commit messages][karma-git-commit]
* [Semantic Versioning 2.0.0][semantic-versioning]
* [Conventional Commits Specification][conventional-commits]

[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
[angular-contributing-commit]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit
[karma-git-commit]: http://karma-runner.github.io/3.0/dev/git-commit-msg.html
[semantic-versioning]: https://semver.org/spec/v2.0.0.html
[conventional-commits]: https://www.conventionalcommits.org
[readme]: ../README.md
