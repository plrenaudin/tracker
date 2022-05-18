import dayjs from "dayjs";
import { DATE_FORMAT } from "./store";

export default function StatsModal({ closeFn, events }) {
  const yesterday = dayjs()
    .subtract(1, "day")
    .add(1, "hour")
    .startOf("hour")
    .format(DATE_FORMAT);
  const coughEvents = events.filter(
    (i) => i.t > yesterday && /cough/.test(i.e.toLowerCase())
  );
  const tcm = coughEvents.reduce((acc, cur) => {
    const hour = cur.t.slice(11, 13);
    if (!acc[hour]) {
      acc[hour] = 1;
    } else {
      acc[hour]++;
    }
    return acc;
  }, {});
  const total = coughEvents.length;
  const lastMinutes = (minutes) => {
    const timestampThreshold = dayjs()
      .subtract(minutes, "minute")
      .format(DATE_FORMAT);
    return coughEvents.filter((i) => i.t > timestampThreshold);
  };
  return (
    <section>
      <h3>Stats for last 24h</h3>
      <ul>
        <li>Last 10 minutes: {lastMinutes(10).length}</li>
        <li>Last 20 minutes: {lastMinutes(20).length}</li>
        <li>Last 30 minutes: {lastMinutes(30).length}</li>
        <li>Last hour: {lastMinutes(60).length}</li>
        <li>Total coughs: {total}</li>
        <li>Groupped by hour:</li>
        {Object.entries(tcm).map(([time, count]) => {
          return (
            <li key={time}>
              <b>{time}h</b> : {count}
            </li>
          );
        })}
      </ul>
      <button className="button" onClick={closeFn}>
        Close
      </button>
    </section>
  );
}
