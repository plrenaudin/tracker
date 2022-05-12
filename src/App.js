import { useRef } from "react";
import "./App.css";
import { useEvents } from "./store";

function App() {
  const { events, track, clear } = useEvents();
  const eventsEl = useRef();

  const trackEvent = (event) => {
    track(event);
    setTimeout(
      () => (eventsEl.current.scrollTop = eventsEl.current.scrollHeight)
    );
  };

  return (
    <div className="App">
      <button className="trash" onClick={() => clear()}>
        🗑️
      </button>
      <ul className="events" ref={eventsEl}>
        {events.length === 0 && <li>No Events...</li>}
        {events.map((event, index) => (
          <li key={index}>
            <b>{event.t}</b> - {event.e}
          </li>
        ))}
      </ul>
      <div className="actions">
        <button className="button" onClick={() => trackEvent("cough")}>
          Cough
        </button>
        <button className="button" onClick={() => trackEvent("remedies")}>
          Remedies
        </button>
      </div>
    </div>
  );
}

export default App;
