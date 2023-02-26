import React, { useState, useEffect } from 'react'
import { ToastContainer, Toast } from 'react-bootstrap'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'

const ToastComponent = (props) => {
  const { toasts } = props
  const [showToast, setToast] = useState(false)

  const [notifications, setNotifications] = useState(toasts);

  useEffect(() => {
    setToast(true)
    setNotifications(toasts)
  }, [toasts]);

  return (
    <ToastContainer 
      position="bottom-end"
      className="p-3 position-fixed"
      >
      <AnimatePresence initial={false}>
        {Object.entries(notifications).map(([key, err]) => (
          <motion.div
            positionTransition
            key={`${key}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50, transition: { duration: 0.2 } }}
            >
            <Toast 
              key={`${key}: ${err}`}
              bg="danger"
              className="p-2 mt-2"
              show={showToast}
              onClose={() => setNotifications({})}  
              delay={4000} 
              autohide 
              >
              <Toast.Body>{err}</Toast.Body>
            </Toast>
          </motion.div>
        ))}
      </AnimatePresence>
    </ToastContainer>
  )
}

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