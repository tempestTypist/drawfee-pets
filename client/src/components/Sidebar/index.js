import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_ME } from '../../utils/queries'
import Auth from '../../utils/auth'
import { Col, Image, Card } from 'react-bootstrap'
import ImageImport from '../../utils/imageimport'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Loading from '../Loading'

const Sidebar = () => {
  const control = useAnimation()
	const [ref, inView] = useInView()

  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || {};
	const images = ImageImport.importAll(require.context('../../assets/images/pets', true, /\.(png|jpe?g|svg)$/));

  const sidebarVariant = {
    offscreen: {
      y: -400
    },
    onscreen: {
      y: -75,
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

  return (
    <Col 
      ref={ref}
      lg={3} 
      xxl={2} 
      className="d-none d-lg-flex sidebar" 
      id="sidebarMenu"
      >
        <motion.div
          variants={sidebarVariant}
          initial="offscreen"
          animate={control}
          >
          <div className="hanger-wrapper">
            <div className="hanger"></div>
          </div>

          <div className="sidebar-screen">
              <div className="sidebar-screen__inner">
                {Auth.loggedIn() ? (
                  <>
                  {loading ? (
                    <Loading />
                    ) : (
                    <>
                      {(!user?.activePet) 
                        ? 
                        <p>No favourite pet!</p>
                        : 
                        <>
                          <Image src={images[`${user.activePet.petSpecies}/${user.activePet.petSpecies}--${user.activePet.petColour}.png`]} alt="Pet image" fluid />
                          <p className="font-supersonic text-center fw-bold my-3">{user.activePet.petName}</p>
                        </>
                      }
                    </>
                    )}
                  </>
                ) : (
                  <>
                    <Link className="sidebar-screen-btn" to="/login" title="LOGIN">LOGIN</Link>
                      or
                    <Link className="sidebar-screen-btn" to="/signup" title="SIGNUP">SIGNUP</Link>
                  </>
                )}
              </div>
          </div>
        </motion.div>
    </Col>
  );
};

export default Sidebar;
