import { describe, it, expect } from "vitest";
import { formatPrice, categoryLabel } from "@/lib/format";

describe("formatPrice", () => {
  it("formats a price as USD with two decimals", () => {
    expect(formatPrice(149.99)).toMatch(/149[.,]99/);
    expect(formatPrice(10)).toMatch(/10[.,]00/);
  });

  it("includes a currency symbol", () => {
    expect(formatPrice(50)).toMatch(/\$|US/);
  });
});

describe("categoryLabel", () => {
  it("maps known categories to English labels", () => {
    expect(categoryLabel("leyendas")).toBe("Legends");
    expect(categoryLabel("finales")).toBe("Finals");
    expect(categoryLabel("drops-iconicos")).toBe("Iconic Drops");
  });

  it("falls back to the raw value for unknown categories", () => {
    expect(categoryLabel("whatever")).toBe("whatever");
  });
});
