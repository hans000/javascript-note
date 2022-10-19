import { useCallback, useEffect, useRef } from "react"

export default function useEvent(callback) {
  const callbackRef = useRef(null);

  useEffect(() => {
	callbackRef.current = callback;
  })

  const event = useCallback((...args) => {
    if (callbackRef.current) {
      callbackRef.current.apply(null, args);
    }
  }, []);

  return event;
}
