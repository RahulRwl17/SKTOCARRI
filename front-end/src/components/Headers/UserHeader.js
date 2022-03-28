/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";

const UserHeader = (props) => {
    const username = props.userName ? props.userName : null

    const history = useHistory();
    return (
        <>
            <div
                className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                style={{
                    minHeight: "600px",
                    backgroundImage:
                        "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center top"
                }}
            >
                {/* Mask */}
                <span className="mask bg-gradient-default opacity-8" />
                {/* Header container */}
                <Container className="d-flex align-items-center" fluid>
                    <Row>
                        {username ?
                            <>
                                <Col lg="7" md="10">
                                    <h1 className="display-2 text-white">Hello Admin </h1>
                                    <p className="text-white mt-0 mb-5">
                                        This is your profile page. Here you can edit your details and save it by pressing save button.
                                    </p>
                                </Col>
                            </>
                            :
                            <>
                                <Col lg="7" md="10">
                                    <h1 className="display-2 text-white">Hello</h1>
                                    <p className="text-white mt-0 mb-5">
                                        User not found !! user may have deleted or not registered.
                                    </p>
                                </Col>
                            </>
                        }
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default UserHeader;
