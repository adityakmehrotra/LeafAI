<a id="readme-top"></a>
# LeafAI

## About The Project

### Overview
LeafAI is a cutting-edge web application designed to identify leaf species from images using machine learning. This full-stack application combines a React frontend with a Flask backend, harnessing the power of TensorFlow's Sequential model to analyze and predict leaf species. LeafAI not only simplifies botanical research but also enhances educational experiences for users interested in botany. Visit the application [here](https://leafai.adityakmehrotra.com).

### Features
- **Image Upload**: Users can upload images of leaves for species identification.
- **Species Prediction**: The application predicts the species of the leaf and provides details about it.
- **Accuracy and Loss Visualization**: Displays training accuracy and loss graphs to demonstrate the model's performance.
- **Sample Image Download**: Users without their own images can download a random leaf image from the application to test the functionality.
- **User Authentication**: Users can create accounts and log in to access personalized features.
- **History Tracking**: Logged-in users can view their previously uploaded leaf images and the corresponding species predictions, allowing them to track their history and review past results.

### Accuracy Graph

![image](https://github.com/user-attachments/assets/1fab547a-2b4c-45d2-8c20-1618ebfa9373)

### Loss Graph

![image](https://github.com/user-attachments/assets/b36ed1ab-5e96-4eb0-a5e0-210e80e83a26)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

### Frontend
* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

### Backend
* [![Flask][Flask.palletsprojects.com]][Flask-url]

### Machine Learning
* [![TensorFlow][TensorFlow.org]][TensorFlow-url]

### Database
* [![MongoDB][MongoDB.com]][MongoDB-url]

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com/
[Flask.palletsprojects.com]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/
[TensorFlow.org]: https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white
[TensorFlow-url]: https://www.tensorflow.org/
[MongoDB.com]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

### Prerequisites
* npm
* Click>=8.0
* Flask>=2.0.0
* itsdangerous>=2.0.0
* Jinja2>=3.1.2
* MarkupSafe>=2.0.0
* Werkzeug>=2.0.0
* Pillow>=8.0.0
* gunicorn>=20.0.4
* Flask-Cors>=3.0.10
* Flask-Limiter==1.4
* numpy
* joblib
* tensorflow==2.16.2
* pymongo
* dnspython

### Setup Instructions

#### Clone the Repository

```sh
git clone https://github.com/adityakmehrotra/LeafAI.git
cd LeafAI
```

#### Install Backend Dependencies
```sh
cd backend
pip install -r requirements.txt
```

#### Install Frontend Dependencies
```sh
cd ../client
npm install
```

### Running the Application

#### Start the Flask Backend

```sh
# Navigate to the backend directory
flask run
```

#### Start the React Frontend

Open another terminal window and navigate to the client directory:
```sh
npm start
```

##### The application should now be running on http://localhost:8000.

### Usage
1. **Upload an Image:** Navigate to the main page and upload a leaf image through the interface.
2. **View Predictions:** Submit the image to view the prediction results.
3. **Download Sample Image:** Click the "Download Sample Image" button if you do not have a leaf image ready for testing.

## Contributing
Contributions to this project are welcome! Please fork the repository, make your changes, and submit a pull request for review.

## Acknowledgments
Thanks to all the contributors who have invested their time and effort in improving this project.
Special thanks to AWS for hosting services.

## Contact
For any queries, you can reach out at `adi1.mehrotra@gmail.com`.

### Last Updated
08/01/2024
