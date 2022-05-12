import dayjs from "dayjs";
import { useState } from "react";

export const useEvents = () => {
    const [events, setEvents] = useState(JSON.parse(window.localStorage.getItem('events')) || []);

    const track = (event) => {
        setEvents((state) => {
            const newState = [...state, {t:dayjs().format('YYYY-MM-DD HH:mm:ss'), e:event}];
            window.localStorage.setItem('events', JSON.stringify(newState));
            return newState;
        });
    }
    return [events, track];
}