import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "../../components/PanelHeader/PanelHeader.jsx";

class DoctorTableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      patientList: [{ }]
    }
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('http://localhost:4000/api/user/patients')
      .then(res => {
        this.setState({ patientList: res.data });
      });
  }

  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Patient List</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Blood Group</th>
                        <th>Records</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.patientList.map(patient =>
                        <tr>
                          <td>{patient.first_name}</td>
                          <td>{patient.last_name}</td>
                          <td>{patient.age}</td>
                          <td>{patient.blood_group}</td>
                          <td><Link to={'/patient/view/'+patient._id} style={{ color: '#007bff' }} className="nav-link">View</Link></td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            {/* <Col xs={12}>
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Table on Plain Background</CardTitle>
                  <p className="category"> Here is a subtitle for this table</p>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        {thead.map((prop, key) => {
                          if (key === thead.length - 1)
                            return (
                              <th key={key} className="text-right">
                                {prop}
                              </th>
                            );
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tbody.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.data.map((prop, key) => {
                              if (key === thead.length - 1)
                                return (
                                  <td key={key} className="text-right">
                                    {prop}
                                  </td>
                                );
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
        </div>
      </>
    );
  }
}

export default DoctorTableList;
