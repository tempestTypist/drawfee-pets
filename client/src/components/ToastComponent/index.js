import React, { useState } from 'react'
import { ToastContainer, Toast } from 'react-bootstrap'

const ToastComponent = (props) => {
  const { errors } = props
  const [showToast, setToast] = useState(false)

  return (
    // <div
    //   aria-live="polite"
    //   aria-atomic="true"
    //   className="position-relative"
    // >
      <ToastContainer position="bottom-end" className="p-3 position-fixed">
        {Object.entries(errors).map(([key, err]) => (
          <Toast 
            bg="danger"
            key={`${key}: ${err}`}
            onClose={() => setToast(false)} 
            show={showToast} 
            delay={3000} 
            autohide 
            className="p-2"
            >
            <Toast.Body>{err}</Toast.Body>
          </Toast>
        ))}

        </ToastContainer>
    // </div> 
  )
}

export default ToastComponent;



{/* <div aria-live="polite" aria-atomic="true" class="bg-dark position-relative bd-example-toasts">
  <div class="toast-container position-absolute p-3" id="toastPlacement">
    <div class="toast">
      <div class="toast-header">
        <img src="..." class="rounded me-2" alt="...">
        <strong class="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </div>
      <div class="toast-body">
        Hello, world! This is a toast message.
      </div>
    </div>
  </div>
</div> */}






// const exampleToast = (
//   <CToast title="Bootstrap React">
//     <CToastHeader close>
//       <svg
//         className="rounded me-2"
//         width="20"
//         height="20"
//         xmlns="http://www.w3.org/2000/svg"
//         preserveAspectRatio="xMidYMid slice"
//         focusable="false"
//         role="img"
//       >
//         <rect width="100%" height="100%" fill="#007aff"></rect>
//       </svg>
//       <strong className="me-auto">Bootstrap React</strong>
//       <small>7 min ago</small>
//     </CToastHeader>
//     <CToastBody>Hello, world! This is a toast message.</CToastBody>
//   </CToast>
// )
// return (
//   <>
//     <CButton onClick={() => addToast(exampleToast)}>Send a toast</CButton>
//     <CToaster ref={toaster} push={toast} placement="top-end" />
//   </>
// )

