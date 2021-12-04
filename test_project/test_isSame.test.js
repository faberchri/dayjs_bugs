var dayjs = require('dayjs')

var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)



test('test isSame with DST', () => {
	const zone = "Europe/Athens"

	const normalDate = dayjs.tz("2021-11-01 00:00:00", zone)
	expect(normalDate.isSame(normalDate)).toBe(true); // OK


	const dstDate = dayjs.tz("2021-10-01 00:00:00", zone)
	expect(dstDate.isSame(dstDate)).toBe(true); // FAILS!

});
