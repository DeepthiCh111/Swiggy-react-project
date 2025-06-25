import sum from "../sum";
test("Should give sum of a and b", () => {
  const result = sum(3, 4);
  expect(result).toBe(7);
});
