import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_ME } from '../../utils/queries'
import Auth from '../../utils/auth'
import { Col, Image, Card } from 'react-bootstrap'
import ImageImport from '../../utils/imageimport'
import * as motion from "motion/react-client"
import { useInView } from 'react-intersection-observer'
import Loading from '../Loading'

const Sidebar = () => {
  // const control = useAnimation()
	const [ref, inView] = useInView()

  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || {};
	const images = ImageImport.importAll(require.context('../../assets/images/bots', true, /\.(png|jpe?g|svg)$/));
  console.log("user info: " + JSON.stringify(user))

  const sidebar = {
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

  // useEffect(() => {
  //   if (inView) {
  //     control.start("onscreen");
  //   } 
  // }, [control, inView]);

  return (
    <Col 
      ref={ref}
      lg={3} 
      xxl={2} 
      className="d-none d-lg-flex sidebar" 
      id="sidebarMenu"
      >
        {Auth.loggedIn() ? (
          <>
          {loading ? (
            <>
            </>
            ) : (
            <>
              {(!user?.activeBot) 
                ? 
                <></>
                : 
                <motion.div
                  initial={sidebar.offscreen}
                  animate={sidebar.onscreen}
                  className="w-100"
                  >
                  <div className="hanger-wrapper">
                    <div className="hanger"></div>
                  </div>

                  <div className="sidebar-screen">
                    <div className="sidebar-screen__inner">
                      <div className="position-relative h-100">
                        <Image 
                          fluid
                          className="" 
                          src={images[`MODEL-${user.activeBot.model}/${user.activeBot.chassis}/head-${user.activeBot.colour}.png`]}
                          alt="Bot Head"
                        />
                        <Image 
                          fluid
                          className="" 
                          src={images[`MODEL-${user.activeBot.model}/arms.png`]}
                          alt="Bot Arms"
                        />
                        <Image 
                          fluid
                          className="" 
                          src={images[`MODEL-${user.activeBot.model}/body.png`]}
                          alt="Bot Body"
                        />
                        <Image 
                          fluid
                          className="" 
                          src={images[`MODEL-${user.activeBot.model}/legs.png`]}
                          alt="Bot Legs"
                        />
                      </div>
                      <p className="font-supersonic text-center fw-bold my-2">{user.activeBot.botName}</p>
                    </div>
                  </div>
                </motion.div>
              }
            </>
            )}
          </>
        ) : (
        <motion.div
          variants={sidebar}
          initial={sidebar.offscreen}
          animate={sidebar.onscreen}
          className="w-100"
          >
          <div className="hanger-wrapper">
            <div className="hanger"></div>
          </div>

          <div className="sidebar-screen">
            <div className="sidebar-screen__inner">
              <Link className="sidebar-screen-btn" to="/login" title="LOGIN">LOGIN</Link>
                or
              <Link className="sidebar-screen-btn" to="/signup" title="SIGNUP">SIGNUP</Link>
            </div>
          </div>
        </motion.div>
        )}

        {/* <motion.div
          variants={sidebar}
          initial="offscreen"
          animate={control}
          >
          <div className="hanger-wrapper">
            <div className="hanger"></div>
          </div>

          <div className="sidebar-screen">
              <div className="sidebar-screen__inner">

              </div>
          </div>
        </motion.div> */}
    </Col>
  );
};

export default Sidebar;
