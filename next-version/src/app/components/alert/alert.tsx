import './alert.scss';
import React, { JSX, useEffect, useRef, useState } from 'react';

interface AlertProps {
  type: 'success' | 'danger' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export function AlertComponent({
  type,
  message,
  duration = 3000,
}: AlertProps): JSX.Element {
  const [visible, setVisible] = useState(false);
  const alertRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (message) {
      setVisible(true); // Show the alert

      // Initialize Bootstrap Alert JS behavior
      if (alertRef.current) {
        // Automatically close the alert after the specified duration
        const timeout = setTimeout(() => {
          setVisible(false); // Reset visibility after closing
        }, duration);

        return () => clearTimeout(timeout); // Cleanup timeout on unmount
      }
    }
  }, [message, duration]); // Re-run effect whenever message or duration changes

  return (
    <div
      ref={alertRef}
      className={`alert floating-alert alert-${type} alert-dismissible fade ${visible ? 'show' : 'd-none'}`}
      role="alert"
    >
      <strong>{message}</strong>
    </div>
  );
}
