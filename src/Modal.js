import { useRef } from "react";

export default function Modal({ closeFn, actions, addAction, track }) {
  const input = useRef();
  const onAddAction = (e) => {
    e.preventDefault();
    addAction(input.current.value);
    input.current.value = "";
    closeFn();
  };

  const onAction = (action) => {
    track(action);
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
    </>
  );
}
