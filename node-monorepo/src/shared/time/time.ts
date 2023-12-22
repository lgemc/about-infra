import moment from "moment";
import { err, ok, Result } from "neverthrow";
import parse from "parse-duration";
import { Duration } from "./types";

export const Millisecond: Duration = 1;
export const Second = Millisecond * 1000;
export const Minute = Second * 60;
export const Hour = Minute * 60;

function newDate(payload: string | Duration): Result<Date, Error> {
  const date = new Date(payload);
  if (isNaN(date as any)) {
    return err(new Error(`invalid date value arrived: ${payload}`));
  }

  return ok(date);
}

function add(date: Date, duration: Duration): Date {
  return moment(date).add(duration, "ms").toDate();
}

function sub(date: Date, duration: Duration): Date {
  return moment(date).subtract(duration, "ms").toDate();
}

function between(date1: Date, date2: Date): Duration {
  return date1.getTime() - date2.getTime();
}

function since(date: Date): Duration {
  return moment().subtract(date.getTime(), "ms").valueOf();
}

function until(date: Date): Duration {
  return moment(date).subtract(moment().valueOf(), "ms").valueOf();
}

function inSeconds(d: Duration) {
  return (d / time.Second).toFixed(0);
}

function after(date: Date, test: Date): boolean {
  return date.getTime() > test.getTime();
}

function before(date: Date, test: Date): boolean {
  return date.getTime() < test.getTime();
}

function now(): Date {
  return moment().utc().toDate();
}

function parseDuration(duration: string): Result<Duration, Error> {
  const result = parse(duration);
  if (result === null) {
    return err(new Error("invalid duration"));
  }

  return ok(result);
}

const time = {
  newDate,
  add,
  sub,
  since,
  before,
  between,
  now,
  after,
  parseDuration,
  Millisecond,
  Second,
  until,
  Minute,
  Hour,
  inSeconds,
};

export default time;
