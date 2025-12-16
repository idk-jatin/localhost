import { useEffect } from "react";

export function useFormLogs({ errors, pushLog }) {
  useEffect(() => {
    if (!errors || !Object.keys(errors).length) return;

    Object.values(errors).forEach((err) => {
      if (err?.message) {
        pushLog(err.message, "warn");
      }
    });
  }, [errors]);
}
