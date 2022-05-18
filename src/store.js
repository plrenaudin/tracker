import dayjs from "dayjs";
import { useState } from "react";

const MAX_CUSTOM_ACTIONS = 6;
export const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const useEvents = () => {
  const [events, setEvents] = useState(
    JSON.parse(window.localStorage.getItem("events")) || []
  );
  const [actions, setActions] = useState(
    JSON.parse(window.localStorage.getItem("actions")) || []
  );

  const track = (event) => {
    setEvents((state) => {
      const newState = [...state, { t: dayjs().format(DATE_FORMAT), e: event }];
      window.localStorage.setItem("events", JSON.stringify(newState));
      return newState;
    });
  };

  const addAction = (action) => {
    setActions((state) => {
      const newState = [...state, action].slice(-MAX_CUSTOM_ACTIONS);
      window.localStorage.setItem("actions", JSON.stringify(newState));
      return newState;
    });
    track(action);
  };

  const clear = () => {
    if (window.confirm("Delete all events?")) {
      setEvents(() => {
        window.localStorage.removeItem("events");
        return [];
      });
    }
  };

  return { events, track, clear, actions, addAction };
};
