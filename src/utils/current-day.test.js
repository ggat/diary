import { tsToDays } from "./current-day";

describe("tsToDays()", function () {
    it("should return 0 when timestamp is less than milliseconds in a day", function () {
        const millisInDay = 24 * 60 * 60 * 1000;
        expect(tsToDays(millisInDay - 1)).toEqual(0);
    });

    it("should return 1 when timestamp amounts to exactly 1 day in milliseconds", function () {
        const millisInDay = 24 * 60 * 60 * 1000;
        expect(tsToDays(millisInDay)).toEqual(1);
    });

    it("should return 1 when timestamp is past first (0) day and behind third day (2)", function () {
        const millisInDay = 24 * 60 * 60 * 1000;
        const halfDay = millisInDay / 2;
        const dayAndHalf = millisInDay + halfDay;
        expect(tsToDays(dayAndHalf)).toEqual(1);
    });
});
