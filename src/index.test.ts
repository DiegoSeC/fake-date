import { describe, expect, it, afterEach } from "@jest/globals";

import { FakeDate } from "./index";

describe("FakeDate", () => {
  afterEach(() => {
    FakeDate.restore();
  });

  it("should override global Date when installed", () => {
    FakeDate.install();
    expect(global.Date).toBe(FakeDate);
    expect(FakeDate.isInstalled()).toBe(true);
  });

  it("should set and return a fake current time", () => {
    FakeDate.install();
    const fakeTime = new Date("2025-09-06T12:00:00Z").getTime();
    FakeDate.setNow(fakeTime);

    expect(Date.now()).toBeGreaterThanOrEqual(fakeTime);
    expect(new Date().getTime()).toBe(fakeTime);
  });

  it("should clear the fake date offset", () => {
    FakeDate.install();
    const fakeTime = new Date("2025-09-06T12:00:00Z").getTime();
    FakeDate.setNow(fakeTime);

    FakeDate.clear();
    expect(Date.now()).not.toBe(fakeTime);
  });

  it("should restore the original Date object", () => {
    const OriginalDate = global.Date;
    FakeDate.install();
    FakeDate.restore();

    expect(global.Date).toBe(OriginalDate);
    expect(FakeDate.isInstalled()).toBe(false);
  });

  it("should handle setNow with string, number, and Date", () => {
    FakeDate.install();
    const dateStr = "2025-09-06T12:00:00Z";
    const dateObj = new Date(dateStr);
    const timestamp = dateObj.getTime();

    FakeDate.setNow(dateStr);
    expect(Date.now()).toBe(timestamp);

    FakeDate.setNow(timestamp);
    expect(Date.now()).toBe(timestamp);

    FakeDate.setNow(dateObj);
    expect(Date.now()).toBe(timestamp);
  });
});
