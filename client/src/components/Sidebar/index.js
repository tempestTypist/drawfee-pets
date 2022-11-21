import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_ME } from '../../utils/queries'
import Auth from '../../utils/auth'
import { Col, Image, Card } from 'react-bootstrap'
import ImageImport from '../../utils/imageimport'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const Sidebar = () => {
  const control = useAnimation()
	const [ref, inView] = useInView()

  const sidebarVariant = {
    offscreen: {
      y: -400
    },
    onscreen: {
      y: -50,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1
      }
    }
  }

  useEffect(() => {
    if (inView) {
      control.start("onscreen");
    } 
  }, [control, inView]);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || {};
	const images = ImageImport.importAll(require.context('../../assets/images/pets', true, /\.(png|jpe?g|svg)$/));

  return (
    <Col 
      lg={3} 
      xxl={2} 
      className="d-none d-lg-flex sidebar" 
      id="sidebarMenu">
      <motion.div
        ref={ref}
        variants={sidebarVariant}
        initial="offscreen"
        animate={control}>
        <div className="hanger-wrapper">
          <div className="hanger"></div>
        </div>

        <Card className="janky-card-wrapper">
          <Card.Body className="janky-card-body">
            <div className="janky-card-inner-body d-flex flex-column align-items-center">
              {Auth.loggedIn() ? (
                [(!user?.activePet) 
                  ? <p>No favourite pet!</p>
                  : 
                  <>
                    <Image src={images[`${user.activePet.petSpecies}/${user.activePet.petSpecies}--${user.activePet.petColour}.png`]} alt="Pet image" fluid />
                    <p className="font-supersonic text-center fw-bold my-3">{user.activePet.petName}</p>
                  </>
                ]
              ) : (
                <>
                  <Link className="background-button" to="/login" title="LOG IN" />
                    or
                  <Link className="background-button" to="/signup" title="SIGN UP" />
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </Col>
  );
};

export default Sidebar;
