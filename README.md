# FakeDate

A TypeScript utility for faking the current date and time in tests by overriding the global `Date` object.

## Overview

`FakeDate` is a class that allows you to control the output of `Date.now()` and `new Date()` globally. This is useful for testing time-dependent code without relying on real system time.

## Features

- Override the global `Date` object.
- Set a fake current date and time.
- Reset or restore the original `Date` object.
- Check if the fake date is currently installed.

## Usage

### Installation

```
npm install @fake-date/date 
```

Import the class in your test setup:

```typescript
import FakeDate from "@fake-date/date";
```

### API

- **`FakeDate.install()`**  
  Overrides the global `Date` object with `FakeDate`.

- **`FakeDate.setNow(date: Date | number | string)`**  
  Sets the fake current date and time. Accepts a `Date` object, timestamp, or date string.

- **`FakeDate.clear()`**  
  Resets the fake date offset to the real current time.

- **`FakeDate.restore()`**  
  Restores the original global `Date` object.

- **`FakeDate.isInstalled()`**  
  Returns `true` if `FakeDate` is currently installed.

### Example

```typescript
FakeDate.install();
FakeDate.setNow('2025-09-06T12:00:00Z');

console.log(Date.now()); // Outputs: 2025-09-06T12:00:00Z timestamp

FakeDate.clear();
console.log(Date.now()); // Outputs: real current timestamp

FakeDate.restore();
console.log(Date.now()); // Outputs: real current timestamp
```

## Notes

- Only override the global `Date` in controlled environments (e.g., tests).
- Always call `FakeDate.restore()` after tests to avoid side effects.

## License

MIT

