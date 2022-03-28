import React, { useEffect, useState } from "react";
import {
    Button,
    Container,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Media,
    Badge,
    Table,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from "reactstrap";
import ImageUploader from 'react-images-upload';
import UserHeader from "components/Headers/UserHeader.js";
import EditHeader from "../../components/Headers/EditHeader";
import { CreatExam } from "../../network/ApiAxios";


const Exam = () => {
    const creatExam = () => {

    }


    const [questions,setQuestions] = React.useState()



    const UserList = (users) => {
        return (
            users.map((user) => {
                return (
                    <tr style={{ cursor: 'pointer' }} onClick={() => {
                    }}>
                        <th scope="row">
                            <Media className="align-items-center">
                                
                                <Media>
                                    <span className="mb-0 text-sm">
                                        {user.email}
                                    </span>
                                </Media>
                            </Media>
                        </th>
                        <td>{user.name}</td>
                        <td>
                            <Badge color="" className="badge-dot mr-4">
                                <Button>
                                    Edit
                                </Button>
                            </Badge>
                        </td>
                    </tr>
                )
            })

        )
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
                                        <h3 className="mb-0">Create A New Question.</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={creatExam}
                                            size="sm"
                                        >
                                            Save
                                    </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input placeholder="Questions" type="text" autoComplete="new-email" />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <Input placeholder="Career Options" type="text" autoComplete="new-password" />
                                        </InputGroup>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Row>

            <>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Users Table</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Question</th>
                                        <th scope="col">Catogary</th>
                                        <th scope="col">Oprations</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    <UserList users={questions} />
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </>
            </Container>
        </>


    );
}

export default Exam;
