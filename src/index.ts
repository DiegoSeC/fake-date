const RealDate: DateConstructor = globalThis.Date;
const realNow: () => number = RealDate.now.bind(RealDate);

/**
 * A class that allows you to fake the current date and time for testing purposes.
 * It overrides the global Date object when installed, allowing you to control the output of Date.now() and new Date().
 *
 * Usage:
 * - Call `FakeDate.install()` to override the global Date object.
 * - Use `FakeDate.setNow(date)` to set a specific fake current date and time.
 * - Call `FakeDate.clear()` to reset the fake date offset.
 * - Call `FakeDate.restore()` to restore the original Date object.
 * - Use `FakeDate.isInstalled()` to check if the FakeDate is currently installed.
 */
class FakeDate extends Date {
  private static installed = false;
  private static offset = 0; // fakeNow - realNow

  constructor(...args: ConstructorParameters<typeof Date>) {
    if (!args.length) {
      super(FakeDate.now());
    } else {
      super(...args);
    }
  }

  static clear(): void {
    this.offset = 0;
  }

  static install(): void {
    if (this.installed) return;
    this.installed = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).Date = FakeDate;
  }

  static isInstalled(): boolean {
    return this.installed;
  }

  static now(): number {
    return realNow() + this.offset;
  }

  static restore(): void {
    if (!this.installed) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).Date = RealDate;
    this.installed = false;
    this.offset = 0;
  }

  static setNow(fakeDate: Date | number | string): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t = new RealDate(fakeDate as any).getTime();
    this.offset = t - realNow();
  }
}

export default {
  clear: FakeDate.clear,
  install: FakeDate.install,
  isInstalled: FakeDate.isInstalled,
  now: FakeDate.now,
  restore: FakeDate.restore,
  setNow: FakeDate.setNow,
};
