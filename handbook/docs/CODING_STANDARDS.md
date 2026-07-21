# Coding Standards

## JavaScript

- Use ES6+ syntax.
- Prefer async/await over promise chains.
- Use const whenever possible.
- Keep functions small and focused.
- Write descriptive variable names.

---

## File Structure

- Routes only define endpoints.
- Controllers process requests.
- Services contain business logic.
- Models define database schemas.
- Frontend never performs backend calculations.

---

## Formatting

- Four-space indentation.
- Semicolons enabled.
- Single responsibility per module.

---

## Comments

Comment intent, not obvious syntax.

Good

// Generate a JWT after successful authentication.

Bad

// Increment i
i++;