import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import ALLPETS from '../../assets/images';
import { Col, Image, Card } from 'react-bootstrap';
import ImageImport from '../../utils/imageimport';

const Sidebar = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || {};
	const images = ImageImport.importAll(require.context('../../assets/images/pets', false, /\.(png|jpe?g|svg)$/));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <Col lg={3} xl={2} className="d-none d-lg-flex sidebar" id="sidebarMenu">
        <div className="hanger-wrapper">
          <div className="hanger"></div>
        </div>
        <Card className="janky-card-wrapper">
          <Card.Body className="janky-card-body">
            <Card.Text className="janky-card-inner-body d-flex flex-column align-items-center">
                <Link className="background-button" to="/login" title="LOG IN" />
              or
                <Link className="background-button" to="/signup" title="SIGN UP" />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  if (!user?.activePet) {
    return <></>
  }

  return (
    <Col lg={3} xl={2} className="d-none d-lg-flex sidebar" id="sidebarMenu">
        <div className="hanger-wrapper">
          <div className="hanger"></div>
        </div>

        <Card className="janky-card-wrapper position-sticky">
          <Card.Body className="janky-card-body">
            <Card.Text className="janky-card-inner-body d-flex flex-column align-items-center">
              <Image src={images[`${user.activePet.petSpecies}.png`]} alt="Pet image" fluid/>
              {user.activePet.petName} the {user.activePet.petSpecies}
            </Card.Text>
          </Card.Body>
        </Card>
    </Col>
  );
};

export default Sidebar;
