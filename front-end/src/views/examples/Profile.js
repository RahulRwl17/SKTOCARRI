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
import React, { useState, useEffect } from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Label,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import { getSingleUsers, userEdit, Confirm, Delete } from "../../network/ApiAxios";
import { useHistory } from "react-router-dom";
const Profile = (props) => {
    let history = useHistory();
    const [user, setUser] = useState({});
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState();
    const [tempAddress, setTempAddress] = useState("");
    const [perAddress, setPerAddress] = useState("");
    useEffect(() => {
        if (props.location.state) {
            const runAsync = async () => {
                const response = await getSingleUsers(props.location.state);
                const { user } = response.data;

                if (response.data.success) {
                    setUser(user);
                    // console.log(user);
                    setMobile(user.mobile)
                    setPerAddress(user.perAddress)
                    setTempAddress(user.tempAddress)
                    setChecked(user.accountConfirmation)
                }
            }
            runAsync();
        }
        else {

        }
    }, []);

    const ApproveUserTamplate = () => {
        return (
            <Row className="align-items-center">
                <Col className="text-right">
                    {
                        user.accountConfirmation ?
                            <></>

                            :
                            <Button color="primary" onClick={e => Approved(e)}>
                                {!loading ? "Approve User" : "Loading.."}
                            </Button>


                    }
                </Col>
            </Row>
        )
    }

    const Approved = async (e) => {
        setLoading(true)
        const response = await Confirm(user._id);
        const { data } = response;
        if (data.success) {
            setLoading(false)
            setUser(user);
            setError("");
        } else {
            setLoading(false)
            setError(data.msg);
        }
    }

    const DeleteUser = async (e) => {
        setLoading(true)
        const response = await Delete(user._id);
        const { data } = response;
        if (data.success) {
            setLoading(false)
            history.push('/admin/users')
            setError("");
        } else {
            setLoading(false)
            setError(data.msg);
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        const response = await userEdit(user._id, mobile, perAddress, tempAddress);
        const { data } = response;
        if (data.success) {
            setLoading(false)
            setError("");
        } else {
            setLoading(false)
            setError(data.msg);
        }
    }

    console.log(user);

    return (
        <>
            {props.location.state ?

                <>
                    <UserHeader userName={user.fname + ' ' + user.lname} />
                    {/* Page content */}
                    <Container className="mt--7" fluid>
                        <Row>
                            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                                <Card className="card-profile shadow">
                                    <Row className="justify-content-center">
                                        <Col className="order-lg-2" lg="3">
                                            <div className="card-profile-image">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        className="rounded-circle"
                                                        src={'http://172.105.61.90:5100' + user.photo}
                                                    />
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>

                                </Card>
                            </Col>
                            <Col className="order-xl-1" xl="8">
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <Row className="align-items-center">
                                            <Col xs="8">
                                                <h3 className="mb-0"> My account</h3>
                                                {error ?
                                                    <div className="text-muted font-italic">
                                                        <small>
                                                            error:{" "}
                                                            <span className="text-red font-weight-700">{error}</span>
                                                        </small>
                                                    </div> : null}
                                            </Col>
                                            <Col className="text-right" xs="4">
                                                <Button color="primary" onClick={e => handleSubmit(e)}>
                                                    {!loading ? "Save User" : "Loading.."}

                                                </Button>
                                                {/* <Button
                                            color="primary"
                                            onClick={(e) => handleSubmit(e)}
                                            size="sm"
                                        >
                                            Save
                                        </Button> */}
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <h6 className="heading-small text-muted mb-4">
                                                User information (from database)
                                    </h6>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Email address
                                                    </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={user.email}
                                                                id="input-username"
                                                                placeholder="Username"
                                                                type="text"
                                                                disabled
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-mobile"
                                                            >
                                                                Phone Number
                                                    </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-mobile"
                                                                onChange={e => setMobile(e.target.value)}
                                                                defaultValue={user.mobile}
                                                                type="number"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-first-name"
                                                            >
                                                                First name
                                                   </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue="Lucky"
                                                                id="input-first-name"
                                                                defaultValue={user.fname}
                                                                placeholder="First name"
                                                                type="text"
                                                                disabled
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-last-name">
                                                                Last name
                                                   </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue="Jesse"
                                                                defaultValue={user.lname}
                                                                id="input-last-name"
                                                                placeholder="Last name"
                                                                type="text"
                                                                disabled
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="12">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-regDate">
                                                                Date When Registered.
                                                                </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={user.date}
                                                                id="input-regDate"
                                                                placeholder="Last name"
                                                                type="text"
                                                                disabled
                                                            />
                                                        </FormGroup>
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-DOB"
                                                            >
                                                                Date Of Birth
                                                   </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-DOB"
                                                                defaultValue={user.dob}
                                                                placeholder="Date of Birth"
                                                                type="text"
                                                                disabled
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-Status">
                                                                User Status
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={user.accountConfirmation}
                                                                id="input-Status"
                                                                placeholder="User Status"
                                                                type="text"
                                                                disabled
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <hr className="my-4" />
                                            {/* Address */}
                                            <h6 className="heading-small text-muted mb-4">
                                                Contact information
                                    </h6>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col md="12">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-tempAddress"
                                                            >
                                                                Temporary Address
                                                    </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={user.tempAddress}
                                                                id="input-tempAddress"
                                                                onChange={e => setTempAddress(e.target.value)}
                                                                placeholder="Home Address"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="12">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-perAddress"
                                                            >
                                                                Permanent Address
                                                    </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={user.perAddress}
                                                                id="input-perAddress"
                                                                onChange={e => setPerAddress(e.target.value)}
                                                                placeholder="Home Address"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <hr className="my-4" />
                                            {/* Description */}
                                            <h6 className="heading-small text-muted mb-4">Documents</h6>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col md='6'>
                                                        <h1 className='my-4'>Aadhar-Card Copy</h1>
                                                        <img
                                                            src={"http://172.105.61.90:5100" + user.aadhar}
                                                            className="img-fluid  my-2"
                                                            alt="..."
                                                        />
                                                    </Col>
                                                    <Col md='6'>
                                                        <h1 className='my-4'>Signature Copy</h1>
                                                        <img
                                                            src={"http://172.105.61.90:5100" + user.signature}
                                                            className="img-fluid  my-2"
                                                            alt="..."
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col md='12'>
                                                        <h1 className='my-4'>Cast Certificate</h1>
                                                        <img
                                                            src={"http://172.105.61.90:5100" + user.castCert}
                                                            className="img-fluid my-2"
                                                            alt="..."
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col md='12'>
                                                        <Card className="bg-secondary shadow">
                                                            <CardHeader className="bg-white border-0">
                                                                <Row className="align-items-center">

                                                                    <ApproveUserTamplate />
                                                                    <Col className="text-right">
                                                                        <Button color="primary" onClick={e => DeleteUser(e)}>
                                                                            {!loading ? "Delete User" : "Loading.."}
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </CardHeader>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
                :
                <>
                    <UserHeader />
                    <Container>

                    </Container>
                </>
            }
        </>
    );
}

export default Profile;
