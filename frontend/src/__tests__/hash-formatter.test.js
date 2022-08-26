const { HashConverter } = require("../common/hash-converter");

describe("Hash Converter", () => {
  it("should change hash to terahash", () => {
    expect(HashConverter("43543545354534", "h", "th")).toBe(44);
  });
});
