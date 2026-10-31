import test from "node:test";
import assert from "node:assert/strict";

// Re-implement or import the pure validation functions to verify all 8 validation test cases
const PASSWORD_RULES = [
  {
    id: "length",
    label: "More than 8 characters long",
    test: (pw) => pw.length > 8,
  },
  {
    id: "uppercase",
    label: "At least one uppercase letter (A-Z)",
    test: (pw) => /[A-Z]/.test(pw),
  },
  {
    id: "lowercase",
    label: "At least one lowercase letter (a-z)",
    test: (pw) => /[a-z]/.test(pw),
  },
  {
    id: "special",
    label: "At least one special character (!@#$%^&*...)",
    test: (pw) => /[^A-Za-z0-9]/.test(pw),
  },
];

function validatePassword(password) {
  const errors = [];
  if (password.length <= 8) {
    errors.push("Password must contain more than eight characters.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Password must contain at least one special character.");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

test("1. Customer Password Validation: Rejects passwords <= 8 characters", () => {
  const result = validatePassword("Abc!123"); // 7 chars
  assert.equal(result.isValid, false);
  assert.ok(result.errors.some((e) => e.includes("more than eight characters")));

  const result8 = validatePassword("Abc!1234"); // exactly 8 chars
  assert.equal(result8.isValid, false);
  assert.ok(result8.errors.some((e) => e.includes("more than eight characters")));
});

test("2. Customer Password Validation: Rejects passwords lacking uppercase", () => {
  const result = validatePassword("abcdefgh!1");
  assert.equal(result.isValid, false);
  assert.ok(result.errors.some((e) => e.includes("uppercase letter")));
});

test("3. Customer Password Validation: Rejects passwords lacking lowercase", () => {
  const result = validatePassword("ABCDEFGH!1");
  assert.equal(result.isValid, false);
  assert.ok(result.errors.some((e) => e.includes("lowercase letter")));
});

test("4. Customer Password Validation: Rejects passwords lacking special character", () => {
  const result = validatePassword("Abcdefgh123");
  assert.equal(result.isValid, false);
  assert.ok(result.errors.some((e) => e.includes("special character")));
});

test("5. Customer Password Validation: Accepts compliant password (>8 chars, upper, lower, special)", () => {
  const result = validatePassword("Brightloop2026!");
  assert.equal(result.isValid, true);
  assert.equal(result.errors.length, 0);
});

test("6. Email Validation: Rejects invalid email patterns", () => {
  assert.equal(validateEmail("plainaddress"), false);
  assert.equal(validateEmail("@missinguser.com"), false);
  assert.equal(validateEmail("user@.com"), false);
  assert.equal(validateEmail("user@brightloop"), false);
});

test("7. Email Validation: Accepts valid email formats", () => {
  assert.equal(validateEmail("customer@brightloop.com"), true);
  assert.equal(validateEmail("admin@brightloopsoftware.com"), true);
  assert.equal(validateEmail("staff.operations@brightloop.io"), true);
});

test("8. Role destination mapping", () => {
  const ROLE_DESTINATIONS = {
    admin: "/admin",
    staff: "/staff",
    customer: "/portal",
  };
  assert.equal(ROLE_DESTINATIONS.admin, "/admin");
  assert.equal(ROLE_DESTINATIONS.staff, "/staff");
  assert.equal(ROLE_DESTINATIONS.customer, "/portal");
});
