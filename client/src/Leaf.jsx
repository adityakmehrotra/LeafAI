import {React} from "react"
import { useState, useEffect, useContext} from "react"
import { Card, Button } from "react-bootstrap";

import Acca_Sellowiana from "./leaf_images/Acca_Sellowiana_Img.jpeg";

function Leaf(props) {

    const [leafDetails, setLeafDetails] = useState([]);
    const [leafSpecies, setLeafSpecies] = useState("");
    const [accuracy, setAccuracy] = useState("");
    const [buttonStyle, setButtonStyle] = useState("");
    const [imgSrc, setImgSrc] = useState();
    const [origin, setOrigin] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        console.log("HIIIIII")
        if (props.leafDetails && props.val !== "Upload image to predict") {
            console.log(props.leafDetails[0])
            console.log(props.leafDetails[0]["index"])
            console.log(props.leafDetails[0]["name"])
            console.log(props.val)
            setLeafSpecies(props.leafDetails[props.val]["name"])
            console.log(props.accuracy);
            console.log(leafSpecies)
            setImgSrc(props.leafDetails[props.val]["source"])
            setOrigin(props.leafDetails[props.val]["origin"])
            setDescription(props.leafDetails[props.val]["description"])
            
            if (props.accuracyValue > 0.8) {
                setAccuracy("High Accuracy");
                setButtonStyle("success");
            } else if (props.accuracyValue > 0.5) {
                setAccuracy("Medium Accuracy");
                setButtonStyle("warning");
            } else {
                setAccuracy("Low Accuracy");
                setButtonStyle("danger");
            }

            console.log(accuracy);
        }

    }, [props]);


return (
    <div>
        <Card style={{backgroundColor: "#e0ffe8", margin: "25px 300px"}}>
            <div style={{display: (!props.fileUploaded) ? "none" : "flex", paddingTop: "2.5%", paddingBottom: "2.5%", width: "100%"}}>
                <div style={{width: "40%", height: "40%", paddingLeft: "10%"}}>
                    <img src={imgSrc} style={{width: "100%", height: "auto"}} />
                </div>
            
                <div style={{display: "flex", flexDirection: "column", paddingLeft: "5%", paddingRight: "10%", width: "70%"}}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px", width: "100%"}}>
                        <p style={{fontSize: "32px", flexGrow: 1}}>{leafSpecies}</p>
                        <button type="button" className={`btn btn-outline-${buttonStyle}`} style={{fontSize: "24px"}}>{accuracy}</button>
                    </div>
                    <div style={{textAlign: "left", width: "100%"}}>
                        <p style={{fontSize: "24px"}}>Area of Origin: {origin}</p>
                    </div>
                    <div style={{textAlign: "left", width: "100%"}}>
                        <p style={{fontSize: "20px"}}>{description}</p>
                    </div>
                </div>
            </div>
        </Card>
    </div>
    
    );
}

export default Leaf;