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
        const details = props.leafDetails[props.val];
        setLeafSpecies(details.name);
        setImgSrc(details.source);
        setOrigin(details.origin);
        setDescription(details.description);

        if (props.accuracyValue === 1) {
            alert("There was an issue with this image. Please use another one.");
            props.resetUpload();
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
            <Card style={{ backgroundColor: "#e0ffe8", margin: "20px 15%", padding: "20px" }}>
                {props.fileUploaded && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "30%", padding: "10px" }}>
                            <img src={imgSrc} alt="Leaf Species" style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
                        </div>
                        <div style={{ width: "70%", paddingLeft: "5%" }}>
                            <h4>{leafSpecies}</h4>
                            <Button variant={`outline-${buttonStyle}`} onClick={handleButtonClick} style={{ width: "max-content", marginBottom: "10px" }}>
                                {accuracy}
                            </Button>
                            <p>Area of Origin: {origin}</p>
                            <p>{description}</p>
                        </div>
                    </div>
                )}
            </Card>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Accuracy Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>The accuracy of this prediction is: <strong>{accuracy}</strong></Modal.Body>
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
