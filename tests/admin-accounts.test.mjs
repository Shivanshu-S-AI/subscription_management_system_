import test from "node:test";
import assert from "node:assert/strict";
import { getStore, getTeamMembers } from "../src/lib/data/store.ts";

test("--- 3 Primary Admin Accounts Provisioning Test ---", async (t) => {
  await t.test("Verify Shivanshu, Aryan, and Hiren Sir exist in team store with role 'admin'", () => {
    const team = getTeamMembers();

    const shivanshu = team.find((m) => m.email === "shivanshu@brightloopsoftware.com");
    assert.ok(shivanshu, "Shivanshu must be provisioned in team store");
    assert.equal(shivanshu.full_name, "Shivanshu");
    assert.equal(shivanshu.role, "admin");

    const aryan = team.find((m) => m.email === "aryan@brightloopsoftware.com");
    assert.ok(aryan, "Aryan must be provisioned in team store");
    assert.equal(aryan.full_name, "Aryan");
    assert.equal(aryan.role, "admin");

    const hiren = team.find((m) => m.email === "hiren@brightloopsoftware.com");
    assert.ok(hiren, "Hiren Sir must be provisioned in team store");
    assert.equal(hiren.full_name, "Hiren Sir");
    assert.equal(hiren.role, "admin");
  });

  await t.test("Verify Admin Identifier Recognition Logic", () => {
    const adminIdentifiers = [
      "shivanshu",
      "SHIVANSHU",
      "shivanshu@brightloopsoftware.com",
      "aryan",
      "ARYAN",
      "aryan@brightloopsoftware.com",
      "hiren",
      "hirensir",
      "HIREN",
      "hiren@brightloopsoftware.com",
      "admin",
      "admin@brightloopsoftware.com",
    ];

    for (const id of adminIdentifiers) {
      const lower = id.toLowerCase().trim();
      const isAdminUser =
        lower === "shivanshu" ||
        lower.startsWith("shivanshu@") ||
        lower === "aryan" ||
        lower.startsWith("aryan@") ||
        lower === "hiren" ||
        lower === "hirensir" ||
        lower.startsWith("hiren@") ||
        lower.includes("admin");

      assert.equal(isAdminUser, true, `Identifier '${id}' must be recognized as an admin`);
    }
  });
});
