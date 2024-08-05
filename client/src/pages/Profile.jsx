import React, { useEffect, useState } from 'react';
import { Modal, Button, Card, Collapse } from 'react-bootstrap';
import { getUserUploads, deleteUserImage } from '../services/userService';

const leafDetails = [
  { index: 0, name: 'Acca Sellowiana' },
  { index: 1, name: 'Acer Negundo' },
  { index: 2, name: 'Acer Palmaturu' },
  { index: 3, name: 'Alnus Sp' },
  { index: 4, name: 'Arisarum Vulgare' },
  { index: 5, name: 'Castanea Sativa' },
  { index: 6, name: 'Celtis Sp' },
  { index: 7, name: 'Chelidonium Majus' },
  { index: 8, name: 'Corylus Avellana' },
  { index: 9, name: 'Crataegus Monogyna' },
  { index: 10, name: 'Erodium Sp' },
  { index: 11, name: 'Euonymus Japonicus' },
  { index: 12, name: 'Fragaria Vesca' },
  { index: 13, name: 'Fraxinus Sp' },
  { index: 14, name: 'Geranium Sp' },
  { index: 15, name: 'Hydrangea Sp' },
  { index: 16, name: 'Ilex Aquifolium' },
  { index: 17, name: 'Ilex Perado Ssp Azorica' },
  { index: 18, name: 'Magnolia Grandiflora' },
  { index: 19, name: 'Magnolia Soulangeana' },
  { index: 20, name: 'Nerium Oleander' },
  { index: 21, name: 'Pinus Sp' },
  { index: 22, name: 'Polypodium Vulgare' },
  { index: 23, name: 'Populus Alba' },
  { index: 24, name: 'Populus Nigra' },
  { index: 25, name: 'Primula Vulgaris' },
  { index: 26, name: 'Pseudosasa Japonica' },
  { index: 27, name: 'Quercus Robur' },
  { index: 28, name: 'Quercus Suber' },
  { index: 29, name: 'Salix Atrocinerea' },
  { index: 30, name: 'Schinus Terebinthifolius' },
  { index: 31, name: 'Taxus Bacatta' },
  { index: 32, name: 'Tilia Tomentosa' },
  { index: 33, name: 'Urtica Dioica' }
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

              return (
                <Card key={index} style={{ marginBottom: '1rem', cursor: 'pointer' }}>
                  <Card.Header onClick={() => setExpandedCard(expandedCard === index ? null : index)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>Predicted Species: {speciesName}</div>
                        <div>Date: {uploadDate}</div>
                      </div>
                      <Card.Img
                        src={`https://leafai-api.adityakmehrotra.com/uploads/${username}/${upload.file_path.split('/').pop()}`}
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
                          <div style={{ fontWeight: 'bold' }}>Predicted Species: {speciesName}</div>
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
