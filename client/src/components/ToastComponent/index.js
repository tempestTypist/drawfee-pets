import React, { useState, useEffect } from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useError } from '../ErrorContext';

const ToastComponent = () => {
  const { error, setError } = useError(); // Get the error from the context
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (error) {
      setShowToast(true); // Show the toast when an error is set
    }
  }, [error]);

  const handleClose = () => {
    setShowToast(false);
    setError(null); // Clear the error once the toast is dismissed
  };

  return (
    <ToastContainer position="bottom-end" className="p-3 position-fixed">
      <AnimatePresence>
        {error && (
          <motion.div
            key={error.message}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50, transition: { duration: 0.2 } }}
          >
            <Toast
              bg="danger"
              className="p-2 mt-2"
              show={showToast}
              onClose={handleClose}
              delay={4000} 
              autohide
            >
              <Toast.Body>{error.message}</Toast.Body>
            </Toast>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContainer>
  );
};

export default ToastComponent;





          {/* <motion.div
            positionTransition
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
            <Toast 
              bg="danger"
              key={`${key}: ${err}`}
              onClose={() => setToast(false)} 
              show={showToast} 
              delay={4000} 
              autohide 
              className="p-2"
              >
              <Toast.Body>{err}</Toast.Body>
            </Toast>
          </motion.div> */}