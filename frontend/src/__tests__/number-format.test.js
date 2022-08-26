const { NumberWithCommas } = require("../common/number-comma-formatter");

describe("Number Formatter", () => {
  it("should change 1000 to 1,000", () => {
    expect(NumberWithCommas("1000")).toBe("1,000");
  });
});
