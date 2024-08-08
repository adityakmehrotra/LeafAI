import React, { useEffect, useState } from 'react';
import { Modal, Button, Card, Collapse } from 'react-bootstrap';
import { getUserUploads, deleteUserImage } from '../services/userService';
import {
  Acca_Sellowiana, Acer_Negundo, Acer_Palmaturu, Alnus_Sp, Arisarum_Vulgare, Castanea_Sativa, Celtis_Sp,
  Chelidonium_Majus, Corylus_Avellana, Crataegus_Monogyna, Erodium_Sp, Euonymus_Japonicus, Fragaria_Vesca,
  Fraxinus_Sp, Geranium_Sp, Hydrangea_Sp, Ilex_Aquifolium, Ilex_Perado_Ssp_Azorica, Magnolia_Grandiflora,
  Magnolia_Soulangeana, Nerium_Oleander, Pinus_Sp, Polypodium_Vulgare, Populus_Alba, Populus_Nigra, Primula_Vulgaris,
  Pseudosasa_Japonica, Quercus_Robur, Quercus_Suber, Salix_Atrocinerea, Schinus_Terebinthifolius, Taxus_Bacatta,
  Tilia_Tomentosa, Urtica_Dioica
} from '../leaf_images';

const leafDetails = [
  { index: 0, name: 'Acca Sellowiana', image: Acca_Sellowiana },
  { index: 1, name: 'Acer Negundo', image: Acer_Negundo },
  { index: 2, name: 'Acer Palmaturu', image: Acer_Palmaturu },
  { index: 3, name: 'Alnus Sp', image: Alnus_Sp },
  { index: 4, name: 'Arisarum Vulgare', image: Arisarum_Vulgare },
  { index: 5, name: 'Castanea Sativa', image: Castanea_Sativa },
  { index: 6, name: 'Celtis Sp', image: Celtis_Sp },
  { index: 7, name: 'Chelidonium Majus', image: Chelidonium_Majus },
  { index: 8, name: 'Corylus Avellana', image: Corylus_Avellana },
  { index: 9, name: 'Crataegus Monogyna', image: Crataegus_Monogyna },
  { index: 10, name: 'Erodium Sp', image: Erodium_Sp },
  { index: 11, name: 'Euonymus Japonicus', image: Euonymus_Japonicus },
  { index: 12, name: 'Fragaria Vesca', image: Fragaria_Vesca },
  { index: 13, name: 'Fraxinus Sp', image: Fraxinus_Sp },
  { index: 14, name: 'Geranium Sp', image: Geranium_Sp },
  { index: 15, name: 'Hydrangea Sp', image: Hydrangea_Sp },
  { index: 16, name: 'Ilex Aquifolium', image: Ilex_Aquifolium },
  { index: 17, name: 'Ilex Perado Ssp Azorica', image: Ilex_Perado_Ssp_Azorica },
  { index: 18, name: 'Magnolia Grandiflora', image: Magnolia_Grandiflora },
  { index: 19, name: 'Magnolia Soulangeana', image: Magnolia_Soulangeana },
  { index: 20, name: 'Nerium Oleander', image: Nerium_Oleander },
  { index: 21, name: 'Pinus Sp', image: Pinus_Sp },
  { index: 22, name: 'Polypodium Vulgare', image: Polypodium_Vulgare },
  { index: 23, name: 'Populus Alba', image: Populus_Alba },
  { index: 24, name: 'Populus Nigra', image: Populus_Nigra },
  { index: 25, name: 'Primula Vulgaris', image: Primula_Vulgaris },
  { index: 26, name: 'Pseudosasa Japonica', image: Pseudosasa_Japonica },
  { index: 27, name: 'Quercus Robur', image: Quercus_Robur },
  { index: 28, name: 'Quercus Suber', image: Quercus_Suber },
  { index: 29, name: 'Salix Atrocinerea', image: Salix_Atrocinerea },
  { index: 30, name: 'Schinus Terebinthifolius', image: Schinus_Terebinthifolius },
  { index: 31, name: 'Taxus Bacatta', image: Taxus_Bacatta },
  { index: 32, name: 'Tilia Tomentosa', image: Tilia_Tomentosa },
  { index: 33, name: 'Urtica Dioica', image: Urtica_Dioica },
  { index: 34, name: 'AUrtica DioicaA', image: Urtica_Dioica }
];

const Profile = ({ show, handleClose, username }) => {
  const [userUploads, setUserUploads] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUpload, setSelectedUpload] = useState(null);

  useEffect(() => {
    if (show && username !== 'UNDEFINED') {
      fetchUploads();
    }
  }, [show, username]);

  const fetchUploads = async () => {
    try {
      const uploads = await getUserUploads(username);
      setUserUploads(uploads.uploads);
    } catch (error) {
      console.error('Error fetching uploads:', error);
    }
  };

  const getAccuracyLabel = (accuracy) => {
    if (accuracy === 1 || accuracy < 0.6) {
      return { label: 'Low Accuracy', style: { color: 'red' } };
    } else if (accuracy > 0.8) {
      return { label: 'High Accuracy', style: { color: 'green' } };
    } else {
      return { label: 'Medium Accuracy', style: { color: 'orange' } };
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserImage(username, selectedUpload.file_path);
      fetchUploads(); // Refresh the uploads after deletion
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const getSpeciesName = (index) => {
    const species = leafDetails.find((leaf) => leaf.index === index);
    return species ? species.name : 'Unknown Species';
  };

  const getLeafImage = (index) => {
    const leafImage = leafDetails.find((leaf) => leaf.index === index);
    return leafImage.image;
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Uploaded Images</h5>
          {userUploads.length > 0 ? (
            userUploads.map((upload, index) => {
              const { label, style } = getAccuracyLabel(upload.Accuracy);
              const uploadDate = new Date(upload.upload_date).toLocaleDateString();
              const speciesName = getSpeciesName(upload.Pred_Class);
              const leafImage = getLeafImage(upload.Pred_Class);

              return (
                <Card key={index} style={{ marginBottom: '1rem', cursor: 'pointer' }}>
                  <Card.Header onClick={() => setExpandedCard(expandedCard === index ? null : index)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{speciesName}</div>
                        <div>Date: {uploadDate}</div>
                      </div>
                      <Card.Img
                        src={leafImage}
                        style={{ width: '20%', border: '2px solid #6A9955', borderRadius: '8px' }}
                      />
                    </div>
                  </Card.Header>
                  <Collapse in={expandedCard === index}>
                    <Card.Body>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                        <Card.Img
                          src={`https://leafai-api.adityakmehrotra.com/uploads/${username}/${upload.file_path.split('/').pop()}`}
                          style={{ width: '40%', border: '2px solid #6A9955', borderRadius: '8px', marginRight: '1rem' }}
                        />
                        <div style={{ width: '55%' }}>
                          <div style={{ fontWeight: 'bold' }}>{speciesName}</div>
                          <div>Date: {uploadDate}</div>
                          <div style={{ ...style, fontWeight: 'bold', margin: '1rem 0' }}>{label}</div>
                          <Button variant="danger" onClick={() => { setSelectedUpload(upload); setShowDeleteModal(true); }}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Collapse>
                </Card>
              );
            })
          ) : (
            <p>No uploads found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this image? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
