import { useState, useEffect, useRef } from "react";
import { Card, Button, Spinner, Modal, Form } from "react-bootstrap";
import Upload from './pages/Upload';
import { getUserInfo, registerUser } from './services/userService';

function App() {
  const [val, setVal] = useState("Upload image to predict");
  const [predClass, setPredClass] = useState("");
  const [accuracyValue, setAccuracyValue] = useState(0);
  const fileInputRef = useRef(null);
  const [predClick, setPredClick] = useState(false);
  
  const [filename, setFilename] = useState("No file chosen");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [leafDetails, setLeafDetails] = useState([]);
  const [downloadButtonDisabled, setDownloadButtonDisabled] = useState(false);
  const [mlLoading, setMLLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [badFile, setBadFile] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('UNDEFINED');
  const [loginError, setLoginError] = useState("");

  const pageEndRef = useRef(null);

  useEffect(() => {
  }, [filename]);

  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMLLoading(true);  // Start loading before the fetch operation

    if (!file) {
        alert("Please select a file before submitting.");
        setMLLoading(false);
        return;
    }

    // Validate file type explicitly for JPEG and PNG
    const validImageTypes = ['image/jpeg', 'image/png'];
    if (!validImageTypes.includes(file.type)) {
        alert("Only JPEG and PNG image files are allowed. Please upload a valid image file.");
        handleFileReset();
        setMLLoading(false);
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", loggedIn ? username : "UNDEFINED");

    try {
        const response = await fetch("https://leafai-api.adityakmehrotra.com/upload_image", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            if (response.status === 429) { // Check if the rate limit has been exceeded
                alert("You have exceeded the rate limit. Please wait a while before trying again.");
            } else {
                throw new Error('Server responded with status ' + response.status);
            }
            handleFileReset();
            return;
        }

        const data = await response.json();
        if (data.error && data.error === "File is not an image") {
            alert("The file you uploaded is not an image. Please upload a valid image file.");
            handleFileReset();
        } else if (data.Accuracy === 1) {
            setBadFile(true);
            alert("There was an issue with this image. Please use another one.");
            handleFileReset();
        } else {
            setBadFile(false);
            setVal(data.Pred_Class);
            setPredClass(data.Pred_Class);
            setAccuracyValue(data.Accuracy);
            setPredClick(true); // Display results only on valid conditions
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong :(');
        handleFileReset();
    } finally {
        setMLLoading(false);  // End loading regardless of the result
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setFilename(file.name);
    setFileUploaded(true);
  };

  const handleFileReset = () => {
    setFilename("No file chosen");
    setFile(null);
    setFileUploaded(false);
    setPredClick(false);
    fileInputRef.current.value = "";
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const response = await fetch("https://leafai-api.adityakmehrotra.com/get_user_info?username=" + username);
      const data = await response.json();
      if (data.user_info && data.user_info.password === password) {
        setLoggedIn(true);
        setUsername(username);
        setShowModal(false);
        setLoginError("");
      } else {
        setLoginError("Incorrect username and/or password");
      }
    } catch (error) {
      setLoginError("Error logging in");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setLoginError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://leafai-api.adityakmehrotra.com/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email, username: username, password: password })
      });

      const data = await response.json();
      if (response.status === 201) {
        setIsSignUp(false);
        setLoginError("");
      } else {
        setLoginError(data.error || "Sign up failed");
      }
    } catch (error) {
      setLoginError("Error signing up");
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        {loggedIn ? (
          <Button variant="primary">Profile</Button>
        ) : (
          <Button variant="primary" onClick={() => setShowModal(true)}>Account</Button>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isSignUp ? "Sign Up" : "Login"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSignUp ? (
            <Form onSubmit={handleSignUp}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" name="firstName" required />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" name="lastName" required />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" required />
              </Form.Group>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" name="username" required />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" name="password" required />
                <Button variant="secondary" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </Form.Group>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" name="username" required />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" name="password" required />
                <Button variant="secondary" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          )}
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </Button>
        </Modal.Body>
      </Modal>

      <Upload loggedIn={loggedIn} username={username} />
    </>
  );
}

export default App;
