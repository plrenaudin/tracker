import { useRef } from "react";

export default function Modal({ closeFn, actions, addAction, trackEvent }) {
  const input = useRef();
  const onAddAction = (e) => {
    e.preventDefault();
    const newAction = input.current.value.trim();
    if (newAction) {
      addAction(input.current.value);
    }
    input.current.value = "";
    closeFn();
  };

  const onAction = (action) => {
    trackEvent(action);
    closeFn();
  };
  return (
    <>
      {actions.map((action) => (
        <button
          className="button"
          key={action}
          onClick={() => onAction(action)}
        >
          {action}
        </button>
      ))}
      <form>
        <input ref={input} placeholder="Event" />
        <button className="button" type="submit" onClick={onAddAction}>
          + Add
        </button>
      </form>
      <button className="button" onClick={closeFn}>
        Close
      </button>
    </>
  );
}
