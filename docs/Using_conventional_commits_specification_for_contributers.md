# Using conventional commits specification

## Introduction

We use commitlint to enforce the conventional commits specification a consistent commit message format and simplify the process of creating versioned releases.


## What is Commitlint?

Commitlint is a tool that helps ensure that your commit messages meet a consistent standard. It prompts developers to provide the necessary information when committing changes to the repository, such as the type of change, a brief description, and any additional details.


## Commit Guidelines

We follow the conventional commit format. Each commit message should consist of a **header**, an optional **body**, and a **footer**. The header has the following structure:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

### Type

The type indicates the kind of change introduced by the commit. Common types include:

- `feat`: A new feature or functionality.
- `fix`: A bug fix.
- `docs`: Documentation changes.
- `style`: Code style changes (e.g., formatting).
- `refactor`: Code refactorings.
- `test`: Adding or modifying tests.
- `chore`: Miscellaneous changes (e.g., build scripts, dependencies).

### Scope

The scope refers to the part of the project affected by the change. It is optional but helps provide additional context.

### Description

The description should be a brief summary of the change, written in the imperative mood (e.g., "Add feature" instead of "Added feature").

### Body

The body provides more details about the change. It is optional but recommended for complex commits.

### Footer

The footer is used for referencing issue tracker IDs, breaking changes, or other metadata related to the commit. It is optional.

## Examples

Here are some example commit messages using the conventional commit format:

```
feat: Add user authentication

- Implemented user login and registration functionality.
- Added JWT-based authentication.
```

```
fix(login): Handle invalid credentials error

- Improved error handling when users provide incorrect login credentials.
- Display a user-friendly error message.
```

```
docs: Update API documentation

- Added more examples and clarified existing API descriptions.
```

## Conclusion

By following these guidelines we ensure a consistent commit message format throughout our project. This consistency makes it easier to track changes, generate changelogs, and manage version releases.

## Additional Resources

- [Commitlint](https://commitlint.js.org/#/)
- [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/)