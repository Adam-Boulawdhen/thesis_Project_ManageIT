import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  Button,
  Card,
  CardHeader,
  // CardTitle,
  CustomInput,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  // FormText,
  Form,
  Input,
  Label,
  Row,
  Col,
} from 'reactstrap';

class ProjectInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: '',
      profileInformations: ''
    };
  }

  componentDidMount() {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    axios
      .get(`http://localhost:5000/users/${user._id}`)
      .then((response) => {
        // console.log(response.data);
        this.setState(
          {
            profileInformations: response.data[0],
          },
          () => console.log(this.state.profileInformations)
        );
      })
      .catch((err) => console.log('Error', err));
    //-------------------------------

    axios
      .post('http://localhost:5000/project/index', {})
      .then((response) => {
        var info = response.data[0]
        this.setState({ info })
      })

      .catch((err) => console.log('Error', err));
  }

  render() {
    const { profileInformations } = this.state;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Project Info</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Department</label>
                          <Input
                            Value={this.state.info.department}
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            type="text"
                            value={this.state.info.title}
                            disabled
                            id="title"
                            name="title"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="11">
                        <FormGroup>
                          <label>Project Description</label>
                          <Input
                            cols="100"
                            rows="10"
                            type="textarea"
                            value={this.state.info.description}
                            disabled
                            id="description"
                            name="description"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={5} md={10} className="px-md-1">
                        <Card>
                          <CardBody>
                            <FormGroup>
                              <Label className="label-control">Deadline :</Label>
                              <Input
                                value={this.state.info.deadline}
                                className="form-control datetimepicker"
                                disabled
                                type="date"
                                id="deadline"
                                name="deadline"
                              />
                            </FormGroup>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <Label for="exampleFile">Upload your files :</Label>
                          <CustomInput type="file" id="exampleFile" name="customFile" />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="4">
                        <Button className="btn-fill" color="primary" type="submit" onClick={(e) => e.preventDefault()}>
                          Upload
                  </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src="https://i.postimg.cc/2ysnx7H8/photo-1511367461989-f85a21fda167.jpg"
                      />
                      <h5 className="title">{profileInformations.fullname}</h5>
                    </a>
                    <p className="description">
                      {profileInformations.department} Department Employee
                    </p>
                  </div>
                  <div className="card-description">ME .......</div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ProjectInfo;