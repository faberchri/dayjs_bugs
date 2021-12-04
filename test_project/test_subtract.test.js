var dayjs = require('dayjs')

var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)


const { DateTime } = require("luxon");



test('DAYJS: full day subtraction with DST transition', () => {
	const zone = "Europe/Athens"
	const d = dayjs.tz("2021-04-12 00:00:00", zone)

	
	expect(d.toISOString()).toBe("2021-04-11T21:00:00.000Z"); // OK

	
	// at the 2021-03-29 => no DST transition between shift
	// OK
	let shiftedDate = d.subtract(14, "days")
  	expect(shiftedDate.toISOString()).toBe("2021-03-28T21:00:00.000Z");

	// at the 2021-03-28 => Same date as DST transition, DST transition between shift
	// FAILS! result is "2021-03-27T21:00:00.000Z", so 1 hour off
	shiftedDate = d.subtract(15, "days")
  	expect(shiftedDate.toISOString()).toBe("2021-03-27T22:00:00.000Z"); // 


	// at the 2021-03-27 => Day before DST transition, DST transition between shift
	// FAILS! result is "2021-03-26T21:00:00.000Z", so 1 hour off
  	shiftedDate = d.subtract(16, "days")
  	expect(shiftedDate.toISOString()).toBe("2021-03-26T22:00:00.000Z"); 

});


test('LUXON: full day subtraction with DST transition', () => {

	const d = DateTime.fromObject(
		{ year: 2021, month: 4, day: 12,  hour: 0, minute: 0, second: 0 },
		{ zone: "Europe/Athens" })


	expect(d.toJSDate().toISOString()).toBe("2021-04-11T21:00:00.000Z"); // OK


	let shiftedDate = d.minus({ days: 14 })
  	expect(shiftedDate.toJSDate().toISOString()).toBe("2021-03-28T21:00:00.000Z"); // OK

	shiftedDate = d.minus({ days: 15 })
  	expect(shiftedDate.toJSDate().toISOString()).toBe("2021-03-27T22:00:00.000Z"); // OK

  	shiftedDate = d.minus({ days: 16 })
  	expect(shiftedDate.toJSDate().toISOString()).toBe("2021-03-26T22:00:00.000Z"); // OK

});