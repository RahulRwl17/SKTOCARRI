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
import React, { useState } from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from "reactstrap";
import { login } from "../../network/ApiAxios";

const Login = props => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const tryLogin = async (e) => {
        e.preventDefault();
        const response = await login(email, password);
        const { data } = response;
        if (data.success) {
            setError("");
            localStorage.setItem("token", data.token);
            localStorage.setItem("admin", JSON.stringify(data.admin));
            props.history.push("/");
        } else {
            setPassword("");
            setError(data.msg);
        }
    }

    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">

                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Sign in with credentials</small>
                        </div>
                        <Form role="form" >
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Email" type="email" autoComplete="email" value={email}
                                        onChange={e => setEmail(e.target.value)} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Password" type="password" autoComplete="password" value={password}
                                        onChange={e => setPassword(e.target.value)} />
                                </InputGroup>
                            </FormGroup>

                            {error ?
                                <div className="text-muted font-italic">
                                    <small>
                                        error:{" "}
                                        <span className="text-red font-weight-700">{error}</span>
                                    </small>
                                </div> : null}
                            <div className="text-center">
                                <Button className="my-4" color="primary" type="submit" onClick={(e) => tryLogin(e)}>
                                    Sign in
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <Col className="text-right" xs="12">
                        <a
                            className="text-light"
                            onClick={() => props.history.push('/auth/register')}
                        >
                            <small>Create new account</small>
                        </a>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default Login;
