import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function Typography() {
  return (
    <>
     <div className="section section-about-us">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title">About SmartMed</h2>
              <h5 className="description">
                SmartMed uses the existing blockchain technology to store Electronic Health Records for easier access to patient records and control of insurance related frauds
              </h5>
            </Col>
          </Row>
        </Container>
      </div>    
    <div className="section section-team text-center">
        <Container>
          <h2 className="title">Features</h2>
            <div className="team">
              <Row>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded img-fluid "
                      src={require("../assets/img/icon1.png")}
                    ></img>
                    <h4>Secure Records</h4>
                    <p className="description">
                    SmartMed uses Ethereum Blockchain and IPFS that makes data secure and immutable
                    </p>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded img-fluid "
                      src={require("../assets/img/icon2.png")}
                    ></img>
                    <h4>Quick Access</h4>
                    <p className="description">
                    SmartMed enables the patients to grant/revoke access to the health-care providers of their medical records
                    </p>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded img-fluid"
                      src={require("../assets/img/icon3.png")}
                    ></img>
                    <h4>Regular Updates</h4>
                    <p className="description">
                      SmartMed provides a complete record of all timely updates of medical records
                    </p>
                  </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
 <div className="section section-team text-center">
        <Container>
          <h2 className="title">Our Trusted Doctors</h2>
            <div className="team">
              <Row>
                <Col md="3">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("../assets/img/member2.png")}
                    ></img>
                    <h4 className="title">Dr. Romina Hadid</h4>
                    <p className="category text-info">Child Psychologist</p>
                    <p className="description">
                     I have done MBBS from California University.Specialization in Child Psychology
                    </p>
                  </div>
                </Col>
                <Col md="3">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("../assets/img/member1.png")}
                    ></img>
                    <h4 className="title">Dr. Ryan Tompson</h4>
                    <p className="category text-info">Dentist</p>
                    <p className="description">
                      I have done BDS from Stanford University
                    </p>
                  </div>
                </Col>
                <Col md="3">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("../assets/img/member4.png")}
                    ></img>
                    <h4 className="title">Dr. Eva Jenner</h4>
                    <p className="category text-info">General Physician</p>
                    <p className="description">
                      I have done MBBS from Amenda University,London
                    </p>
                  </div>
              </Col>
              <Col md="3">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("../assets/img/member3.png")}
                    ></img>
                    <h4 className="title">Dr. Louis Reddy</h4>
                    <p className="category text-info">Dermatologist</p>
                    <p className="description">
                      I have done MBBS from Amenda University,London
                    </p>
                  </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
 }
export default Typography;
