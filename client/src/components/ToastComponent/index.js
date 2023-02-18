import React, { useState, useEffect } from 'react'
import { ToastContainer, Toast } from 'react-bootstrap'

const ToastComponent = (props) => {
  const { errors } = props
  const [showToast, setToast] = useState(false)

  useEffect(() => {
    setToast(true)
  }, [errors]);

  return (
    <ToastContainer position="bottom-end" className="p-3 position-fixed">
      {Object.entries(errors).map(([key, err]) => (
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
      ))}
    </ToastContainer>
  )
}

export default ToastComponent;