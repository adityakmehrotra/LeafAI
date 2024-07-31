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
              <Modal.Body>
                <p>The accuracy of this prediction is: <strong>{accuracy}</strong></p>
                <hr />
                {accuracy === "High Accuracy" && (
                  <p><strong>High Accuracy:</strong> High accuracy indicates that the predictive model's output is very close to the true data values, suggesting that the model understands and processes the input data effectively. This level of accuracy confirms that you can rely on the prediction results.</p>
                )}
                {accuracy === "Medium Accuracy" && (
                  <p><strong>Medium Accuracy:</strong> Medium accuracy suggests that while the model generally identifies trends correctly, there are some errors in its output. The predictions are generally usable, but it might be a good idea to review the results for any possible anomalies or inconsistencies.</p>
                )}
                {accuracy === "Low Accuracy" && (
                  <p><strong>Low Accuracy:</strong> Low accuracy implies significant issues with the model's output alignment with true values. If you encounter low accuracy, it's recommended that you upload a new image as the current one may not have been clear or detailed enough for accurate prediction.</p>
                )}
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
