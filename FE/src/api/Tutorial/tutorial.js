import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createTutorialService,
  deleteTutorialService,
  editTutorialService,
  getAllTutorialService,
  updateTutorialService,
} from "../../services/tutorial/tutorial.service";
import moment from "moment";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

TutorialsList.propTypes = {};
function TutorialsList(props) {
  // tạo 1 mảng để lưu danh sách các tutorial
  const [allTutorials, setAllTutorials] = useState([]);

  // gọi api get all tutorials khi vừa vào trang
  useEffect(() => {
    const fetchTutorial = async () => {
      const response = await getAllTutorialService();
      setAllTutorials(response.data.data.allTutorials);
      // axios.get("http://localhost:3000/api/tutorials").then((response) => {
      //   setAllTutorials(response.data.data.allTutorials);
      // });
    };

    fetchTutorial();
  }, []);

  const handleDeleteTutorial = async (tutorialId) => {
    try {
      const response = await deleteTutorialService(tutorialId);
      const message = response.data.message;
      toast.success(message);
      setTimeout(() => {
        window.location.reload();
      }, [2000]);
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  const handleEditTutorial = async (tutorialId) => {
    console.log("edit button is active");

    try {
      const response = await editTutorialService(tutorialId);
      const result = response.data.data.currTutorial;
      setCurrentTutorial(result);

      setModalTutorial({
        ...modalTutorial,
        ...result,
      });
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  const handleClose = () => setCurrentTutorial(null);
  const [currentTutorial, setCurrentTutorial] = useState(null);

  const handleChangeModalValue = (event) => {
    setModalTutorial({
      ...modalTutorial,
      [event.target.name]: event.target.value,
    });
  };

  const [modalTutorial, setModalTutorial] = useState({
    title: currentTutorial ? currentTutorial.title : "",
    description: currentTutorial ? currentTutorial.description : "",
    publishedStatus: currentTutorial ? currentTutorial.publishedStatus : "",
  });

  const handleUpdateTutorial = async (event) => {
    try {
      const response = await updateTutorialService(
        currentTutorial,
        modalTutorial
      );
      const message = response.data.message;
      toast.success(message);
      setCurrentTutorial(null);
      setTimeout(() => {
        window.location.reload();
      }, [2000]);
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleClickOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseOpenCreateModal = () => {
    setOpenCreateModal(false);
    setCreatedTutorial({
      title: "",
      description: "",
      publishedStatus: "",
    });
  };

  const [createdTutorial, setCreatedTutorial] = useState({
    title: "",
    description: "",
    publishedStatus: "",
  });

  const handleChangeCreatedTutorialValue = (event) => {
    setCreatedTutorial({
      ...createdTutorial,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateTutorial = async () => {
    try {
      const response = await createTutorialService(createdTutorial);
      const message = response.data.message;
      toast.success(message);
      handleCloseOpenCreateModal();
      setTimeout(() => {
        window.location.reload();
      }, [2000]);
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };
  return (
    <section id="blog" className="block blog-block">
      <Container fluid>
        <div className="title-holder">
          <h2>Latest from blog</h2>
          <div className="subtitle">get our latest news from blog</div>
          <Button
            onClick={handleClickOpenCreateModal}
            className="btn btn-primary"
          >
            Create
          </Button>
        </div>

        <Row>
          {allTutorials.map((tutorial) => {
            return (
              <Col style={{ height: "560px" }} sm={4} key={tutorial.id}>
                <div className="holder">
                  <Card>
                    <Card.Img variant="top" src={tutorial.image} />
                    <Card.Body>
                      <time>
                        {moment(tutorial.createdAt).format(
                          "DD/MM/YYYY, h:mm:ss a"
                        )}
                      </time>
                      <Card.Title>{tutorial.title}</Card.Title>
                      <Card.Text>{tutorial.description}</Card.Text>
                      <Button
                        className="btn btn-primary"
                        onClick={() => handleEditTutorial(tutorial.id)}
                      >
                        Edit <i className="fas fa-chevron-right"></i>
                      </Button>
                      <Button
                        className="btn btn-primary"
                        onClick={() => handleDeleteTutorial(tutorial.id)}
                      >
                        Delete <i className="fas fa-chevron-right"></i>
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Modal edit tutorial */}
      <>
        {currentTutorial && (
          <Modal
            style={{ padding: 50 }}
            show={Boolean(currentTutorial)}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>{currentTutorial.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* {currentTutorial.description} */}
              <InputGroup className="mb-3">
                <InputGroup.Text>Title</InputGroup.Text>
                <Form.Control
                  aria-label="Amount (to the nearest dollar)"
                  value={modalTutorial.title}
                  name="title"
                  onChange={handleChangeModalValue}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>Published status</InputGroup.Text>
                <Form.Control
                  aria-label="Amount (to the nearest dollar)"
                  value={modalTutorial.publishedStatus}
                  name="publishedStatus"
                  onChange={handleChangeModalValue}
                />
              </InputGroup>

              <InputGroup>
                <InputGroup.Text>Description</InputGroup.Text>
                <Form.Control
                  as="textarea"
                  aria-label="With textarea0"
                  value={modalTutorial.description}
                  name="description"
                  onChange={handleChangeModalValue}
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdateTutorial}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
      {/* Modal create tutorial */}
      <>
        <Modal
          style={{ padding: 50 }}
          show={openCreateModal}
          onHide={handleCloseOpenCreateModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create new tutorial</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* {currentTutorial.description} */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Title</InputGroup.Text>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                value={createdTutorial.title}
                name="title"
                onChange={handleChangeCreatedTutorialValue}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Published status</InputGroup.Text>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                value={createdTutorial.publishedStatus}
                name="publishedStatus"
                onChange={handleChangeCreatedTutorialValue}
              />
            </InputGroup>

            <InputGroup>
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="With textarea0"
                value={createdTutorial.description}
                name="description"
                onChange={handleChangeCreatedTutorialValue}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseOpenCreateModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreateTutorial}>
              Create new tutorial
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </section>
  );
}

export default TutorialsList;
