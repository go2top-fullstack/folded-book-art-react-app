import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Button, Modal, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';
import ImageViewer from 'components/ImgViewer';

import imgDownload from 'static/img/download.svg';

const { ipcRenderer } = window.require('electron');
const base64Img = window.require('base64-img');

class PatternCutFold extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      many: 0,
      silhouetteList: [],
      modal: false,
    };
    this.onProceed = this.onProceed.bind(this);
    this.onCreatePattnern = this.onCreatePattnern.bind(this);
  }

  componentDidMount() {
    const res = ipcRenderer.sendSync('fba-get-silhouettes');
    this.setState({
      silhouetteList: res,
    });
  }

  onProceed(count) {
    this.setState({ many: count });
    // history.push('/select-silhouette');
  }

  toggle = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  };

  onCreatePattnern() {}

  render() {
    const { many, modal, silhouetteList } = this.state;
    let sections = <div />;
    switch (many) {
      case 1:
        sections = (
          <Row style={{ marginTop: '20px' }}>
            <Col sm="4" />
            <Col sm="4">
              <Card className="pattern-card" onClick={this.toggle}>
                <img src={imgDownload} style={{ margin: 'auto', width: '57px' }} alt="download" />
              </Card>
            </Col>
            <Col sm="4" />
          </Row>
        );
        break;
      case 2:
        sections = (
          <Row style={{ marginTop: '20px' }}>
            <Col sm="2" />
            <Col sm="4">
              <Card className="pattern-card">
                <img src={imgDownload} style={{ margin: 'auto', width: '57px' }} alt="download" />
              </Card>
            </Col>
            <Col sm="4">
              <Card className="pattern-card">
                <img src={imgDownload} style={{ margin: 'auto', width: '57px' }} alt="download" />
              </Card>
            </Col>
            <Col sm="2" />
          </Row>
        );
        break;
      case 3:
        sections = (
          <Row style={{ marginTop: '20px' }}>
            <Col sm="4">
              <Card className="pattern-card">
                <img src={imgDownload} style={{ margin: 'auto', width: '57px' }} alt="download" />
              </Card>
            </Col>
            <Col sm="4">
              <Card className="pattern-card">
                <img src={imgDownload} style={{ margin: 'auto', width: '57px' }} alt="download" />
              </Card>
            </Col>
            <Col sm="4">
              <Card className="pattern-card">
                <img src={imgDownload} style={{ margin: 'auto', width: '57px' }} alt="download" />
              </Card>
            </Col>
          </Row>
        );
        break;
      default:
        break;
    }
    const silhouetteListData = silhouetteList.map((silhouette, idx) => (
      <ListGroupItem align="left" key={idx}>
        <div style={{ float: 'left' }}>
          <ImageViewer path={silhouette.path} width={silhouette.width} height={silhouette.height} size={65} alt="item" />
        </div>
        <div className="silhouette-list-name">{silhouette.name}</div>
      </ListGroupItem>
    ));

    return (
      <div style={{ marginTop: '20px' }}>
        <Container>
          <Row>
            <Col sm="4">
              <Card className={many === 1 ? 'pattern-card-selected' : 'pattern-card'} onClick={n => this.onProceed(1)}>
                <CardBody>
                  <CardTitle>1 section</CardTitle>
                  <div className="section-group">
                    <div className="one-section" />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm="4">
              <div algin="center">
                <Card className={many === 2 ? 'pattern-card-selected' : 'pattern-card'} onClick={n => this.onProceed(2)}>
                  <CardBody>
                    <CardTitle>2 section</CardTitle>
                    <div className="section-group">
                      <div className="one-section" />
                      <div className="one-section" />
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col sm="4">
              <Card className={many === 3 ? 'pattern-card-selected' : 'pattern-card'} onClick={n => this.onProceed(3)}>
                <CardBody>
                  <CardTitle>3 section</CardTitle>
                  <div className="section-group">
                    <div className="one-section" />
                    <div className="one-section" />
                    <div className="one-section" />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {sections}
          {many > 0 ? (
            <Row style={{ marginTop: '20px', marginBottom: '5px' }}>
              <Col sm="4" />
              <Col sm="4">
                <Button color="success" size="md" onClick={this.onCreatePattnern()}>
                  Proceed
                </Button>
              </Col>
              <Col sm="4" />
            </Row>
          ) : (
            ''
          )}
        </Container>

        <Modal isOpen={modal} centered>
          <ModalBody>
            <ListGroup style={{ height: '400px' }} className="overflow-auto ">
              {silhouetteListData}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-secondary btn-sm" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PatternCutFold;
