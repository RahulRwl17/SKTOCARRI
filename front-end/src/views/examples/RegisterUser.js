
import React, { useEffect, useState } from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
import ImageUploader from 'react-images-upload';
// core components
import UserHeader from "components/Headers/UserHeader.js";
import EditHeader from "../../components/Headers/EditHeader";
import { edit, registerUser } from "../../network/ApiAxios";

const RegisterUser = props => {



    // const [isDisabled,setIsDisabled] = useState(false)
    const [isTempAddIsPerAdd, setIsTempAddIsPerAdd] = useState(false)
    const [error, setError] = useState("");
    const [user, setUser] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //temp Add
    const [tempAddLine1, setTempAddLine1] = useState("");
    const [tempAddLine2, setTempAddLine2] = useState("");
    const [tempAddArea, setTempAddArea] = useState("");
    const [tempAddCity, setTempAddCity] = useState("");
    const [tempAddState, setTempAddState] = useState("");
    const [tempAddPin, setTempAddPin] = useState("");
    ///per Add
    const [perAddLine1, setPerAddLine1] = useState("");
    const [perAddLine2, setPerAddLine2] = useState("");
    const [perAddArea, setPerAddArea] = useState("");
    const [perAddCity, setPerAddCity] = useState("");
    const [perAddState, setPerAddState] = useState("");
    const [perAddPin, setPerAddPin] = useState("");


    const [photo, setPhoto] = useState();
    const [signature, setSignature] = useState();
    const [aadhar, setAadhar] = useState();
    const [castCert, setCastCert] = useState();

    const [dob, setDOB] = useState(new Date);
    const [mobile, setMobile] = useState();
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");


    const sameAddress = async (val) => {
        await setIsTempAddIsPerAdd(val);
        await setPerAddLine1(tempAddLine1)
        await setPerAddLine2(tempAddLine2)
        await setPerAddArea(tempAddArea)
        await setPerAddCity(tempAddCity)
        await setPerAddState(tempAddState)
        await setPerAddPin(tempAddPin)
    }

    const onDrop = async (e, val) => {
        switch (val) {
            case 'photo':
                setPhoto(e[0])
                break;
            case 'signature':
                setSignature(e[0])
                break;
            case 'aadhar':
                setAadhar(e[0])
                break;
            case 'castCert':
                setCastCert(e[0])
                break;

            default:
                break;
        }
    }
    const clearForm = () => {
        setEmail("")
        setPassword("")
        setTempAddLine1("")
        setTempAddLine2("")
        setTempAddArea("")
        setTempAddCity("")
        setTempAddState("")
        setTempAddPin("")
        setPerAddLine1("")
        setPerAddLine2("")
        setPerAddArea("")
        setPerAddCity("")
        setPerAddState("")
        setPerAddPin("")
        setDOB("")
        setMobile("")
        setFName("")
        setLName("")
    }
    const RegUser = async (e) => {
        e.preventDefault()
        var tempAddress = tempAddLine1 + " " + tempAddLine2 + " " + tempAddArea + " " + tempAddCity + " " + tempAddState + " " + tempAddPin;
        var perAddress = perAddLine1 + " " + perAddLine2 + " " + perAddArea + " " + perAddCity + " " + perAddState + " " + perAddPin;

        const response = await registerUser(fname, lname, email, password, mobile, tempAddress, perAddress, dob);
        const { data } = response;
        if (data.success) {
            setError("");
            clearForm();
        } else {
            setError(data.msg);
            clearForm()
        }

    }


    return (
        <>
            <EditHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Register New User.</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={RegUser}
                                            size="sm"
                                        >
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        User information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-username"
                                                    >
                                                        First Name
                                                    </label>
                                                    <Input

                                                        className="form-control-alternative"
                                                        value={fname}
                                                        id="input-fname"
                                                        placeholder="First Name"
                                                        onChange={e => setFName(e.target.value)}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col><Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-username"
                                                    >
                                                        Last Name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        value={lname}
                                                        id="input-lname"
                                                        placeholder="Last Name"
                                                        onChange={e => setLName(e.target.value)}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Email address
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-email"
                                                        value={email}
                                                        placeholder="Email Address"
                                                        onChange={e => setEmail(e.target.value)}
                                                        type="email"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Password
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={e => setPassword(e.target.value)}
                                                        type="Text"
                                                    />
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-dob"
                                                    >
                                                        Date Of Birth
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-dob"
                                                        value={dob}
                                                        placeholder="Date Of Birth"
                                                        onChange={e => setDOB(e.target.value)}
                                                        type="date"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-mobile"
                                                    >
                                                        mobile
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-mobile"
                                                        placeholder="Mobile Number"
                                                        value={mobile}
                                                        onChange={e => setMobile(e.target.value)}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {/* Address */}
                                        <div>
                                            <Row>
                                                <h6 className="heading-small text-muted mb-4">
                                                    Temporary Address
                                            </h6>
                                                <Col lg="12" >
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Temporary Address Line 1
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-email"
                                                            placeholder="Temporary Address"
                                                            value={tempAddLine1}
                                                            onChange={e => setTempAddLine1(e.target.value)}
                                                            type="Text"
                                                        />
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col lg="12" >
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Temporary Address Line 2
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-email"
                                                            placeholder="Temporary Address Line 2"
                                                            value={tempAddLine2}
                                                            onChange={e => setTempAddLine2(e.target.value)}
                                                            type="Text"
                                                        />
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col lg="6" >
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Area
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-email"
                                                            placeholder="Area"
                                                            value={tempAddArea}
                                                            onChange={e => setTempAddArea(e.target.value)}
                                                            type="Text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6" >
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            City
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-email"
                                                            placeholder="City"
                                                            value={tempAddCity}
                                                            onChange={e => setTempAddCity(e.target.value)}
                                                            type="Text"
                                                        />
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col lg="6" >
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            State
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-email"
                                                            placeholder="State"
                                                            value={tempAddState}
                                                            onChange={e => setTempAddState(e.target.value)}
                                                            type="Text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6" >
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Pin
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-email"
                                                            placeholder="Pin Code"
                                                            value={tempAddPin}
                                                            onChange={e => setTempAddPin(e.target.value)}
                                                            type="Text"
                                                        />
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                        </div>
                                        <div>
                                            <Row>

                                                <h6 className="heading-small text-muted mb-4">
                                                    Same As Temporary Address ?
                                                </h6>
                                                <Col>

                                                    <FormGroup>
                                                        <input
                                                            className="checkBox"
                                                            onChange={e => sameAddress(e.target.checked)}
                                                            type="CheckBox"
                                                        />
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                        </div>
                                        <div>
                                            <Row>
                                                <h6 className="heading-small text-muted mb-4">
                                                    Permanent Address
                                            </h6>
                                                <Col lg="12" >
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-pal1"
                                                        >
                                                            Permanent Address Line 1
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            disabled={isTempAddIsPerAdd}
                                                            id="input-pal1"
                                                            placeholder="Permanent Address"
                                                            value={perAddLine1}
                                                            onChange={e => setPerAddLine1(e.target.value)}
                                                            type="Text"
                                                        />
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col lg="12" >
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-pal2"
                                                        >
                                                            Permanent Address Line 2
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-pal2"
                                                            disabled={isTempAddIsPerAdd}
                                                            placeholder="Permanent Address Line 2"
                                                            value={perAddLine2}
                                                            onChange={e => setPerAddLine2(e.target.value)}
                                                            type="Text"
                                                        />
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col lg="6" >
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-pArea"
                                                        >
                                                            Area
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-pArea"
                                                            placeholder="Area"
                                                            value={perAddArea}
                                                            onChange={e => setPerAddArea(e.target.value)}
                                                            disabled={isTempAddIsPerAdd}
                                                            type="Text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6" >
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-pCity"
                                                        >
                                                            City
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-pCity"
                                                            disabled={isTempAddIsPerAdd}
                                                            placeholder="City"
                                                            value={perAddCity}
                                                            onChange={e => setPerAddCity(e.target.value)}
                                                            type="Text"
                                                        />
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col lg="6" >
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-pState"
                                                        >
                                                            State
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-pState"
                                                            disabled={isTempAddIsPerAdd}
                                                            placeholder="State"
                                                            value={perAddState}
                                                            onChange={e => setPerAddState(e.target.value)}
                                                            type="Text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6" >
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-pPin"
                                                        >
                                                            Pin
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-pPin"
                                                            disabled={isTempAddIsPerAdd}
                                                            placeholder="Pin Code"
                                                            value={perAddPin}
                                                            onChange={e => setPerAddPin(e.target.value)}
                                                            type="Text"
                                                        />
                                                    </FormGroup>
                                                </Col>

                                            </Row>

                                        </div>

                                        <div className="">
                                            <Row>
                                                <h6 className="heading-small text-muted mb-4">
                                                    Upload Documents
                                                </h6>
                                            </Row>
                                            <Row>

                                                <Col lg="3">
                                                    <h6>Uplaod Photo</h6>

                                                    <ImageUploader
                                                        withIcon={true}
                                                        buttonText='Choose images'
                                                        onChange={(e) => { onDrop(e, 'photo') }}

                                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                        maxFileSize={412000}
                                                        withPreview={true}
                                                    />
                                                </Col>
                                                <Col lg="3">
                                                    <h6>Uplaod Signature</h6>
                                                    <ImageUploader
                                                        withIcon={true}
                                                        buttonText='Choose images'
                                                        onChange={() => { onDrop('signature') }}
                                                        singleImage={true}
                                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                        maxFileSize={412000}
                                                        withPreview={true}
                                                    />
                                                </Col>
                                                <Col lg="3">
                                                    <h6>Uplaod Aadhar</h6>
                                                    <ImageUploader
                                                        withIcon={true}
                                                        buttonText='Choose images'
                                                        onChange={() => { onDrop('aadhar') }}
                                                        singleImage={true}
                                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                        maxFileSize={412000}
                                                        withPreview={true}
                                                    />
                                                </Col>
                                                <Col lg="3">
                                                    <h6>Uplaod Cast Certificate</h6>
                                                    <ImageUploader
                                                        withIcon={true}
                                                        buttonText='Choose images'
                                                        onChange={() => { onDrop('castCert') }}
                                                        singleImage={true}
                                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                                        maxFileSize={412000}
                                                        withPreview={true}
                                                    />
                                                </Col>
                                            </Row>

                                        </div>
                                        <Row>
                                            <Col lg='12'>
                                                <div className="text-center">
                                                    <Button className="my-4" color="primary" type="submit" onClick={(e) => RegUser(e)}>
                                                        Register And Approve
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>

                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    )
}


export default RegisterUser