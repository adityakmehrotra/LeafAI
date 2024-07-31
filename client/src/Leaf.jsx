import React, { useState, useEffect } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Leaf(props) {
    const [leafSpecies, setLeafSpecies] = useState("");
    const [accuracy, setAccuracy] = useState("");
    const [buttonStyle, setButtonStyle] = useState("");
    const [imgSrc, setImgSrc] = useState();
    const [origin, setOrigin] = useState("");
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (props.leafDetails && props.val !== "Upload image to predict") {
            setLeafSpecies(props.leafDetails[props.val]["name"]);
            setImgSrc(props.leafDetails[props.val]["source"]);
            setOrigin(props.leafDetails[props.val]["origin"]);
            setDescription(props.leafDetails[props.val]["description"]);

            if (props.accuracyValue == 1) {
                setAccuracy("Low Accuracy");
                setButtonStyle("danger");
            } else if (props.accuracyValue > 0.8) {
                setAccuracy("High Accuracy");
                setButtonStyle("success");
            } else if (props.accuracyValue > 0.5) {
                setAccuracy("Medium Accuracy");
                setButtonStyle("warning");
            } else {
                setAccuracy("Low Accuracy");
                setButtonStyle("danger");
            }
        }
    }, [props]);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Card style={{ backgroundColor: "#e0ffe8", margin: "25px 300px" }}>
                <div style={{ display: (!props.fileUploaded) ? "none" : "flex", paddingTop: "2.5%", paddingBottom: "2.5%", width: "100%" }}>
                    <div style={{ width: "40%", height: "40%", paddingLeft: "10%" }}>
                        <img src={imgSrc} alt="Leaf Species" style={{ width: "100%", height: "auto" }} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", paddingLeft: "5%", paddingRight: "10%", width: "70%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px", width: "100%" }}>
                            <p style={{ fontSize: "32px", flexGrow: 1 }}>{leafSpecies}</p>
                            <button
                                type="button"
                                className={`btn btn-outline-${buttonStyle}`}
                                style={{ fontSize: "24px" }}
                                onClick={handleButtonClick}
                            >
                                {accuracy}
                            </button>
                        </div>
                        <div style={{ textAlign: "left", width: "100%" }}>
                            <p style={{ fontSize: "24px" }}>Area of Origin: {origin}</p>
                        </div>
                        <div style={{ textAlign: "left", width: "100%" }}>
                            <p style={{ fontSize: "20px" }}>{description}</p>
                        </div>
                    </div>
                </div>
            </Card>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Accuracy Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The accuracy of this prediction is: <strong>{accuracy}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Leaf;
