import { useRef } from "react";
import "./App.css";
import Modal from "./Modal";
import { useEvents } from "./store";
import { DEFAULT_EVENT } from "./constants";
import StatsModal from "./StatsModal";

function App() {
  const { events, track, clear, actions, addAction } = useEvents();
  const eventsEl = useRef();
  const dialog = useRef();
  const stats = useRef();
  const { e: lastAction } = events
    .filter((i) => i.e !== DEFAULT_EVENT)
    .slice(-1)
    .pop() || { e: null };

  const trackEvent = (event = DEFAULT_EVENT) => {
    track(event);
    setTimeout(
      () => (eventsEl.current.scrollTop = eventsEl.current.scrollHeight)
    );
  };

  const closeDialog = () => dialog.current.close();
  const closeStatsDialog = () => stats.current.close();

  return (
    <div className="App">
      <button className="trash" onClick={() => clear()}>
        🗑️
      </button>
      <button className="stats" onClick={() => stats.current.showModal()}>
        📊
      </button>
      <dialog ref={dialog}>
        <Modal closeFn={closeDialog} {...{ actions, addAction, trackEvent }} />
      </dialog>
      <dialog ref={stats}>
        <StatsModal closeFn={closeStatsDialog} {...{ events }} />
      </dialog>
      <ul className="events" ref={eventsEl}>
        {events.length === 0 && <li>No Events...</li>}
        {events.map((event, index) => (
          <li
            key={index}
            className={/cough/.test(event.e.toLowerCase()) ? "cough" : "other"}
          >
            <b>{event.t.slice(10)}</b> - {event.e}
          </li>
        ))}
      </ul>
      <div className="actions">
        <button className="button" onClick={() => trackEvent()}>
          Cough
        </button>
        {lastAction && (
          <button className="button" onClick={() => trackEvent(lastAction)}>
            {lastAction}
          </button>
        )}
        <button className="button" onClick={() => dialog.current.showModal()}>
          ...
        </button>
      </div>
    </div>
  );
}

export default App;
