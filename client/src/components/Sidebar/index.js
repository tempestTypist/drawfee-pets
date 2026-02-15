import { Col } from 'react-bootstrap'
import { SidebarScreen } from './sidebarScreen'

export const Sidebar = () => {

  return (
    <Col 
      lg={3} 
      xxl={2} 
      className="d-none d-lg-flex sidebar" 
      id="sidebarMenu"
      >
        <SidebarScreen />
    </Col>
  );
}