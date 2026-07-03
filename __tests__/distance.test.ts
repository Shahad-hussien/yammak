import { haversineDistance } from "@/utils/distance";

describe("haversineDistance", () => {
  it("Should return 0 for identical points", () => {
    const result = haversineDistance(33.3, 44.3, 33.3, 44.3);
    expect(result).toBe(0);
  });
  it("should return roughly 450km for Baghdad to Basra", () => {
    const result = haversineDistance(33.3153, 44.3661, 30.5085, 47.7835);
    expect(result).toBeCloseTo(450, -1);
  });
  it("should return roughly 4.4 Km for Karada to Zayouna", () => {
    const result = haversineDistance(33.3033, 44.425, 33.33, 44.46);
    expect(result).toBeCloseTo(4.4, 1);
  });
});
