import { useState, useEffect, useRef } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import Leaf from './Leaf'
import Acca_Sellowiana from "./leaf_images/Acca_Sellowiana_Img.jpeg";
import Acer_Negundo from "./leaf_images/Acca_Sellowiana_Img.jpeg";
import Acer_Palmaturu from "./leaf_images/Acer_Palmaturu_Img.jpeg";
import Alnus_Sp from "./leaf_images/Alnus_Sp_Img.jpeg";
import Arisarum_Vulgare from "./leaf_images/Arisarum_Vulgare_Img.jpeg";
import Castanea_Sativa from "./leaf_images/Castanea_Sativa_Img.jpeg";
import Celtis_Sp from "./leaf_images/Celtis_Sp_Img.jpeg";
import Chelidonium_Majus from "./leaf_images/Chelidonium_Majus_Img.jpeg";
import Corylus_Avellana from "./leaf_images/Corylus_Avellana_Img.jpeg";
import Crataegus_Monogyna from "./leaf_images/Crataegus_Monogyna_Img.jpeg";
import Erodium_Sp from "./leaf_images/Erodium_Sp_Img.jpeg";
import Euonymus_Japonicus from "./leaf_images/Euonymus_Japonicus_Img.jpeg";
import Fragaria_Vesca from "./leaf_images/Fragaria_Vesca_Img.jpeg";
import Fraxinus_Sp from "./leaf_images/Fraxinus_Sp_Img.jpeg";
import Geranium_Sp from "./leaf_images/Geranium_Sp_Img.jpeg";
import Hydrangea_Sp from "./leaf_images/Hydrangea_Sp_Img.jpeg";
import Ilex_Aquifolium from "./leaf_images/Ilex_Aquifolium_Img.jpeg";
import Ilex_Perado_Ssp_Azorica from "./leaf_images/Ilex_Perado_Ssp_Azorica_Img.jpeg";
import Magnolia_Grandiflora from "./leaf_images/Magnolia_Grandiflora_Img.jpeg";
import Magnolia_Soulangeana from "./leaf_images/Magnolia_Soulangeana_Img.png";
import Nerium_Oleander from "./leaf_images/Nerium_Oleander_Img.jpeg";
import Pinus_Sp from "./leaf_images/Pinus_Sp_Img.jpeg";
import Polypodium_Vulgare from "./leaf_images/Polypodium_Vulgare_Img.jpeg";
import Populus_Alba from "./leaf_images/Populus_Alba_Img.jpeg";
import Populus_Nigra from "./leaf_images/Populus_Nigra_Img.jpeg";
import Primula_Vulgaris from "./leaf_images/Primula_Vulgaris_Img.jpeg";
import Pseudosasa_Japonica from "./leaf_images/Pseudosasa_Japonica_Img.jpeg";
import Quercus_Robur from "./leaf_images/Quercus_Robur_Img.png";
import Quercus_Suber from "./leaf_images/Quercus_Suber_Img.jpeg";
import Salix_Atrocinerea from "./leaf_images/Salix_Atrocinerea_Img.jpeg";
import Schinus_Terebinthifolius from "./leaf_images/Schinus_Terebinthifolius_Img.jpeg";
import Taxus_Bacatta from "./leaf_images/Taxus_Bacatta_Img.jpeg";
import Tilia_Tomentosa from "./leaf_images/Tilia_Tomentosa_Img.jpeg";
import Urtica_Dioica from "./leaf_images/Urtica_Dioica_Img.jpeg";

import Rand_Image_0 from "./download_images/Acca_Sellowiana_Random_Image.JPG";
import Rand_Image_1 from "./download_images/Acer_Negundo_Random_Image.JPG";
import Rand_Image_2 from "./download_images/Castanea_Sativa_Random_Image.JPG";
import Rand_Image_3 from "./download_images/Chelidonium_Majus_Random_Image.JPG";
import Rand_Image_4 from "./download_images/Fraxinus_Sp_Random_Image.JPG";
import Rand_Image_5 from "./download_images/Geranium_Sp_Random_Image.JPG";
import Rand_Image_6 from "./download_images/Magnolia_Soulangeana_Random_Image.JPG";
import Rand_Image_7 from "./download_images/Primula_Vulgaris_Random_Image.JPG";
import Rand_Image_8 from "./download_images/Quercus_Robur_Random_Image.JPG";
import Rand_Image_9 from "./download_images/Urtica_Dioica_Random_Image.JPG";


function App() {
  const [val, setVal] = useState("Upload image to predict");
  const [predClass, setPredClass] = useState("");
  const [accuracyValue, setAccuracyValue] = useState(0);
  const fileInputRef = useRef(null);
  const [predClick, setPredClick] = useState(false);
  
  const [filename, setFilename] = useState("No file Uploaded")
  const [fileUploaded, setFileUploaded] = useState(false);
  const [leafDetails, setLeafDetails] = useState([]);

  const [downloadButtonDisabled, setDownloadButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [badFile, setBadFile] = useState(false);

  const pageEndRef = useRef(null)

  useEffect(() => {
    setLeafDetails(prevList => [
      {
          index: 0,
          name: 'Acca Sellowiana',
          source: Acca_Sellowiana,
          origin: "Southern Brazil, Eastern Paraguay, Uruguay, and Northern Argentina",
          description: "Known for its ornamental value and edible fruit, Acca sellowiana features striking grey-green leaves and beautiful red flowers that are highly attractive to birds and pollinators."
      },
      {
          index: 1,
          name: 'Acer Negundo',
          source: Acer_Negundo,
          origin: "Large parts of North America, from Southern Canada through to Guatemala, including large parts of the USA and some parts of Mexico",
          description: "This fast-growing maple species is characterized by its compound green leaves and tolerance to a variety of soil conditions, often used in urban landscaping for its hardiness."
      },
      {
          index: 2,
          name: 'Acer Palmaturu',
          source: Acer_Palmaturu,
          origin: "Japan, Korea, and China",
          description: "Renowned for its stunning fall coloration and delicate leaf shapes, Acer palmatum is a favorite in ornamental gardens, offering a spectacular display of vibrant leaves."
      },
      {
          index: 3,
          name: 'Alnus Sp',
          source: Alnus_Sp,
          origin: "Western North America, from British Columbia and Washington east to western Montana",
          description: "Typically found near water sources, these species are important for stabilizing streambanks and are distinguished by their glossy green leaves and catkin-like flowers."
      },
      {
          index: 4,
          name: 'Arisarum Vulgare',
          source: Arisarum_Vulgare,
          origin: "Italy and Spain",
          description: "This unique plant, often found in shaded, moist soils, is noted for its arrow-shaped leaves and curious hooded flowers that appear in spring."
      },
      {
          index: 5,
          name: 'Castanea Sativa',
          source: Castanea_Sativa,
          origin: "High forest areas of Western Asia from Iran to the Balkans",
          description: "Known as the sweet chestnut, this tree is valued for both its durable wood and edible nuts, featuring long, toothed leaves that turn to a golden hue in autumn."
      },
      {
          index: 6,
          name: 'Celtis Sp',
          source: Celtis_Sp,
          origin: "Southern Europe, North Africa, and Asia Minor",
          description: "Often seen in city environments due to its pollution tolerance, these trees have asymmetrical, serrated leaves and produce small fruits enjoyed by various bird species."
      },
      {
          index: 7,
          name: 'Chelidonium Majus',
          source: Chelidonium_Majus,
          origin: "Most regions of Europe",
          description: "Commonly known as greater celandine, this herbaceous perennial has deeply lobed leaves and produces yellow flowers known for their medicinal properties."
      },
      {
          index: 8,
          name: 'Corylus Avellana',
          source: Corylus_Avellana,
          origin: "Western Asia, the British Isles, and the Iberian Peninsula",
          description: "This shrub is best known for producing edible hazelnuts and has rounded, soft green leaves that turn yellow in the fall, providing seasonal interest."
      },
      {
          index: 9,
          name: 'Crataegus Monogyna',
          source: Crataegus_Monogyna,
          origin: "Europe, Northwestern Africa, and Western Asia",
          description: "Distinguished by its deeply lobed leaves, this species is appreciated for its durable wood, edible fruits, and thorny branches that make it an excellent hedge plant."
      },
      {
          index: 10,
          name: 'Erodium Sp',
          source: Erodium_Sp,
          origin: "North Africa, Indomalaya, the Middle East, and Australia",
          description: "These plants feature finely dissected leaves and distinctive, long-beaked fruits, making them interesting additions to rock gardens and borders."
      },
      {
          index: 11,
          name: 'Euonymus Japonicus',
          source: Euonymus_Japonicus,
          origin: "Korea, Japan, and China",
          description: "A popular evergreen shrub, it boasts glossy leaves and is commonly used in hedges and topiary for its dense foliage and resistance to clipping."
      },
      {
          index: 12,
          name: 'Fragaria Vesca',
          source: Fragaria_Vesca,
          origin: "Europe and Asia",
          description: "Known as the wild or woodland strawberry, it produces small, trifoliate leaves and is cherished for its delicious red berries and ground-covering capabilities."
      },
      {
          index: 13,
          name: 'Fraxinus Sp',
          source: Fraxinus_Sp,
          origin: "Europe from Northern Spain to Russia, and from Southern Fennoscandia to Northern Greece",
          description: "These trees are known for their opposite leaf arrangement and compound leaf structure, making them valuable for their shade and ornamental wood."
      },
      {
          index: 14,
          name: 'Geranium Sp',
          source: Geranium_Sp,
          origin: "Subtropical Southern Africa",
          description: "Highly favored in gardens for their rounded, often palmately lobed leaves and a wide variety of flower colors, these plants are excellent for ground covers and borders."
      },
      {
          index: 15,
          name: 'Hydrangea Sp',
          source: Hydrangea_Sp,
          origin: "Japan and China",
          description: "With large, broad leaves and famous for their large clusters of flowers, hydrangeas are a staple in ornamental gardens, offering a lush backdrop and dramatic blooms."
      },
      {
          index: 16,
          name: 'Ilex Aquifolium',
          source: Ilex_Aquifolium,
          origin: "Western Europe, Northwestern Africa and to countries North of the Mediterranean Basin",
          description: "Often associated with Christmas, this species is known for its spiny leaves and bright red berries, popular in both landscaping and holiday decorations."
      },
      {
          index: 17,
          name: 'Ilex Perado Ssp Azorica',
          source: Ilex_Perado_Ssp_Azorica,
          origin: "Native of the Azores",
          description: "This variety of holly features large, glossy leaves and is often used for its decorative appeal and as a privacy screen due to its dense growth."
      },
      {
          index: 18,
          name: 'Magnolia Grandiflora',
          source: Magnolia_Grandiflora,
          origin: "Southeastern United States, from Virginia to Central Florida, and wWst to East Texas",
          description: "Celebrated for its large, fragrant white flowers and shiny evergreen leaves, this magnolia is a southern staple in landscapes, providing year-round interest."
      },
      {
          index: 19,
          name: 'Magnolia Soulangeana',
          source: Magnolia_Soulangeana,
          origin: "Japan and China",
          description: "This small tree is admired for its spectacular spring display of tulip-shaped flowers and broad green leaves that provide a lush, tropical feel."
      },
      {
          index: 20,
          name: 'Nerium Oleander',
          source: Nerium_Oleander,
          origin: "Northwest Africa to southern China",
          description: "Known for its vibrant, showy flowers and leathery leaves, oleander is popular in warm climates but is toxic if ingested, requiring cautious placement."
      },
      {
          index: 21,
          name: 'Pinus Sp',
          source: Pinus_Sp,
          origin: "Canada and the USA in the wWst to North Korea and China in the East, including Northern India, and Southern France",
          description: "Pines are essential for their needle-like leaves and are widely used both commercially for their timber and sap, as well as ornamentally in landscapes."
      },
      {
          index: 22,
          name: 'Polypodium Vulgare',
          source: Polypodium_Vulgare,
          origin: "Much of Europe, Western Asia, and Algeria",
          description: "A hardy fern with deeply lobed, leathery fronds that thrives in damp, shady locations, often used in woodland gardens for ground cover."
      },
      {
          index: 23,
          name: 'Populus Alba',
          source: Populus_Alba,
          origin: "Central and Southern Europe, Morocco and the Iberian Peninsula",
          description: "Recognized by its white bark and lobed leaves, this poplar is fast-growing and often used as a windbreak or for quick shade in large spaces."
      },
      {
          index: 24,
          name: 'Populus Nigra',
          source: Populus_Nigra,
          origin: "Europe, Southwest and Central Asia, and Northwest Africa",
          description: "Known commonly as the black poplar, this tall and vigorous tree is distinguished by its deeply fissured bark and triangular to diamond-shaped leaves. It is particularly noted for its robust growth and striking, balsamic-scented buds."
      },
      {
          index: 25,
          name: 'Primula Vulgaris',
          source: Primula_Vulgaris,
          origin: "Ethiopia, Indonesia, and New Guinea, and in temperate southern South America",
          description: "Often referred to as the common primrose, this plant is celebrated for its rosettes of lush, green leaves and bright yellow flowers that bloom early in spring. It is a perennial favorite in woodland and shaded garden settings due to its charming and vibrant appearance."
      },
      {
          index: 26,
          name: 'Pseudosasa Japonica',
          source: Pseudosasa_Japonica,
          origin: "Korea and Japan",
          description: "This species of bamboo is recognized for its upright, dense growth habit and shiny green leaves that can grow quite large. It is a popular choice for creating natural screens or hedges due to its fast growth and lush foliage."
      },
      {
          index: 27,
          name: 'Quercus Robur',
          source: Quercus_Robur,
          origin: "Most of Europe and Western Asia",
          description: "Commonly known as the English oak, this majestic tree is renowned for its strong wood and broad, lobed leaves. It supports a wide range of wildlife, providing acorns for birds and mammals, and is a symbol of strength and endurance."
      },
      {
          index: 28,
          name: 'Quercus Suber',
          source: Quercus_Suber,
          origin: "Southwest Europe and Northwest Africa",
          description: "Better known as the cork oak, this tree is esteemed not only for its thick, insulating bark from which cork is harvested but also for its crinkly-edged leaves. It is an ecologically important species used widely in sustainable forestry."
      },
      {
          index: 29,
          name: 'Salix Atrocinerea',
          source: Salix_Atrocinerea,
          origin: "Western Europe and North Africa to some Mediterranean Islands",
          description: "Also known as the grey willow, this species is characterized by its stout, sprawling growth and narrow, silvery-green leaves. It thrives in moist environments and is often used in riparian plantings to stabilize stream banks."
      },
      {
          index: 30,
          name: 'Schinus Terebinthifolius',
          source: Schinus_Terebinthifolius,
          origin: "Argentina, Paraguay and Brazil",
          description: "Commonly referred to as the Brazilian peppertree, this species is known for its compound leaves that are aromatic when crushed and clusters of vibrant red berries which are often used as peppercorn substitutes."
      },
      {
          index: 31,
          name: 'Taxus Bacatta',
          source: Taxus_Bacatta,
          origin: "Western Europe, Central Europe and Southern Europe, as well as Northwest Africa, northern Iran, and Southwest Asia",
          description: "Known as the English yew, this evergreen tree is famous for its dense, needle-like leaves and bright red arils. It has a long history of use in landscaping, topiary, and even in medicine."
      },
      {
          index: 32,
          name: 'Tilia Tomentosa',
          source: Tilia_Tomentosa,
          origin: "Southeastern Europe and Southwestern Asia, from Romania and the Balkans East to Western Turkey",
          description: "Commonly called the silver linden, this tree is appreciated for its heart-shaped leaves that are dark green on top with a striking silver underside. It produces fragrant flowers that are highly attractive to bees."
      },
      {
          index: 33,
          name: 'Urtica Dioica',
          source: Urtica_Dioica,
          origin: "Europe, much of Temperate Asia and Western North Africa",
          description: "Better known as the stinging nettle, this plant is notable for its serrated leaves and tiny, stinging hairs that can cause irritation upon contact. Despite this, it is valued for its nutritional and medicinal properties and is often used in herbal remedies and cooking."
      },
    ]);
  }, [filename]);
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);  // Start loading before the fetch operation
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("https://leafai-api.adityakmehrotra.com/upload", {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Server responded with status ' + response.status);
      }
  
      const data = await response.json();
      if (data.Accuracy === 1) {
        setBadFile(true);
        handleFileReset();
        alert("There was an issue with this image. Please use another one.");
      } else {
        setBadFile(false);
        setVal(data.Pred_Class);
        setPredClass(data.Pred_Class);
        setAccuracyValue(data.Accuracy);
        setPredClick(true); // Display results only on valid conditions
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to predict the leaf species.');
      handleFileReset(); // Reset automatically on error
    } finally {
      setLoading(false);  // End loading regardless of the result
    }
  };

// Add this loading indicator somewhere in your JSX, where it makes sense in your UI
{loading && <div>Loading...</div>}


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFilename(file.name);
    setFileUploaded(true);
  };

  const handleFileReset = () => {
    setFilename("No file uploaded");
    setFile(null);
    setFileUploaded(false);
    setPredClick(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const getRandImage = () => {
    const images = [Rand_Image_0, Rand_Image_1, Rand_Image_2, Rand_Image_3, Rand_Image_4, Rand_Image_5, Rand_Image_6, Rand_Image_7, Rand_Image_8, Rand_Image_9];
    return images[Math.floor(Math.random() * images.length)];
  };

 const handleGenerateImage = () => {
    setLoading(true);
    setTimeout(() => {
      const newImage = getRandImage();
      setSelectedImage(newImage);
      setLoading(false);
    }, 1000); // Simulate loading for 1 second
  };

 const handleDownload = () => {
    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = 'DownloadedImage.jpg'; // Force download as JPG
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadButtonDisabled(true);
  };

  return (
    <>
      <div>
        <h1>
          <div style={{textAlign: "center", paddingTop: "1.5%"}}>
            LeafAI
          </div>
        </h1>
        
        <p style={{textAlign: "center", fontSize: "24px"}}>
          Upload a leaf image file to detect its species
        </p>
        <form onSubmit={handleSubmit}>
          {
            console.log(file)
          }
      
        <div style={{display: "flex", textAlign: "center", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
          
          <Card style={{width: "400px", height: "200px", backgroundColor: "#ebfff0", borderRadius: "10px", display: "flex", border: "none"}} />
          <div style={{marginLeft: "5%"}}>
            <label>
              <div style={{witdh: "10px", justifyContent: "center"}}>
                <svg
                  className="w-8 h-8"
                  fill="green"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
              </div>
                <input 
                type="file" 
                name="file" 
                className="hidden" 
                onChange={(e) => {setFile(e.target.files[0]); handleFileUpload(e)}}
                ref = {fileInputRef}
                style={{textAlign: "center"}}
                disabled={fileUploaded}
                />
            </label>
          </div>
          <div style={{marginRight: "5%"}}>
	      <Card style={{width: "400px", height: "200px", backgroundColor: "#c7ffd5", borderColor: "#808080", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", fontSize: "18px"}}>
	        <div>Download Random Leaf Image</div>
	        {loading && (
	          <Spinner animation="border" role="status">
	            <span className="visually-hidden">Loading...</span>
	          </Spinner>
	        )}
	        <Button onClick={handleGenerateImage} variant="info" style={{marginBottom: "10px"}}>
	          Generate New Image
	        </Button>
	        <Button onClick={(e) => {setFile(e.target.files[0]); handleFileUpload(e); handleDownload();}} disabled={!selectedImage || downloadButtonDisabled} variant="success">
	          Click to Download
	        </Button>
	        <input type="file" ref={fileInputRef} style={{ display: "none" }} />
	      </Card>
	    </div>
        </div>
        <div style={{textAlign: "center", justifyContent: "center", paddingTop: "2%", paddingBottom: "1%"}}>
          <button class="btn btn-outline-success" type="submit" disabled={!fileUploaded} onClick={() => setPredClick(true)} style={{fontSize: "20px"}}>
            {(!fileUploaded) ? 'Please Upload File Above' : 'Predict'}
          </button>
        </div>
        <div style={{textAlign: "center", justifyContent: "center"}}>
          <button type="button" class="btn btn-outline-danger" disabled={!fileUploaded} onClick={() => handleFileReset()} style={{fontSize: "20px"}}>
            Reset
          </button>
        </div>
        </form>
        <div>
          {
            pageEndRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          {!badFile && (
			<div ref={pageEndRef} style={{ backgroundColor: "#ebfff0", display: predClick ? "block" : "none" }}>
			  <Leaf leafDetails={leafDetails} val={val} predClass={predClass} accuracyValue={accuracyValue} fileUploaded={predClick} resetUpload={handleFileReset} />
			</div>
		  )}
        </div>
      </div>
    </>
  );
}

export default App;
