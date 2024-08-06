<a id="readme-top"></a>

<div align="center">
  
  [![Contributors][contributors-shield]][contributors-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]
  [![LinkedIn][linkedin-shield]][linkedin-url]
</div>

<br />
<div align="center">
  <a href="https://leafai.adityakmehrotra.com">
    <img src="client/public/leaf_icon.png" alt="LeafAI Logo" width="80" height="80">
  </a>
  
  <h2 align="center">LeafAI</h2>

  <p align="center">
    A web application that uses machine learning to identify leaf species from user uploaded images.
    <br />
    <br />
    <a href="https://github.com/adityakmehrotra/LeafAI">View Demo</a>
    ·
    <a href="https://github.com/adityakmehrotra/LeafAI/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/adityakmehrotra/LeafAI/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

![image](https://github.com/user-attachments/assets/7a7b8f96-a10a-4481-8f17-1a232e109aa4)

![image](https://github.com/user-attachments/assets/cea4736b-739c-45d9-a032-66390bdd18ee)

### Overview
LeafAI is a cutting-edge web application designed to identify leaf species from images using machine learning. This full-stack application combines a React frontend with a Flask backend, harnessing the power of TensorFlow's Sequential model to analyze and predict leaf species. The application uses MongoDB to manage and store user data and prediction history efficiently. LeafAI not only simplifies botanical research but also enhances educational experiences for users interested in botany. Visit the application [here](https://leafai.adityakmehrotra.com).

### Features
- **Image Upload**: Users can upload images of leaves for species identification.
- **Species Prediction**: The application predicts the species of the leaf and provides details about it.
- **Accuracy and Loss Visualization**: Displays training accuracy and loss graphs to demonstrate the model's performance.
- **Sample Image Download**: Users without their own images can download a random leaf image from the application to test the functionality.
- **User Authentication**: Users can create accounts and log in to access personalized features.
- **History Tracking**: Logged-in users can view their previously uploaded leaf images and the corresponding species predictions, allowing them to track their history and review past results.

### Deployment
LeafAI is deployed using various AWS services, including:
- **AWS Elastic Beanstalk (EC2 Instance):** For deploying the Flask backend.
- **AWS Amplify:** For continuous deployment and hosting of the React frontend.
- **AWS Route 53 and Certificate Manager:** For domain name management.
- **AWS S3:** For storing static assets and user-uploaded images.

### Accuracy Graph

![image](https://github.com/user-attachments/assets/1fab547a-2b4c-45d2-8c20-1618ebfa9373)

### Loss Graph

![image](https://github.com/user-attachments/assets/b36ed1ab-5e96-4eb0-a5e0-210e80e83a26)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

### Frontend
[![React][React.js]][React-url]
[![Bootstrap][Bootstrap.com]][Bootstrap-url]

### Backend
[![Flask][Flask.palletsprojects.com]][Flask-url]
[![TensorFlow][TensorFlow.org]][TensorFlow-url]
[![MongoDB][MongoDB.com]][MongoDB-url]

### Deployment and Authentication
[![AWS][AWS.com]][AWS-url]
[![OAuth][OAuth.com]][OAuth-url]

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
[AWS.com]: https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white
[AWS-url]: https://aws.amazon.com/
[OAuth.com]: https://img.shields.io/badge/OAuth-4285F4?style=for-the-badge&logo=oauth&logoColor=white
[OAuth-url]: https://oauth.net/


[contributors-shield]: https://img.shields.io/github/contributors/adityakmehrotra/LeafAI.svg?style=for-the-badge
[contributors-url]: https://github.com/adityakmehrotra/LeafAI/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/adityakmehrotra/LeafAI.svg?style=for-the-badge
[forks-url]: https://github.com/adityakmehrotra/LeafAI/network/members
[stars-shield]: https://img.shields.io/github/stars/adityakmehrotra/LeafAI.svg?style=for-the-badge
[stars-url]: https://github.com/adityakmehrotra/LeafAI/stargazers
[issues-shield]: https://img.shields.io/github/issues/adityakmehrotra/LeafAI.svg?style=for-the-badge
[issues-url]: https://github.com/adityakmehrotra/LeafAI/issues
[license-shield]: https://img.shields.io/github/license/adityakmehrotra/LeafAI.svg?style=for-the-badge
[license-url]: https://github.com/adityakmehrotra/LeafAI/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
* Flask
* Flask-Cors
* Flask-Limiter
  ```sh
  pip install Flask Flask-Cors Flask-Limiter
  ```
* Pillow
* Click
* gunicorn
* pymongo
* Werkzeug
  ```sh
  pip install Pillow Click gunicorn pymongo Werkzeug
  ```
* tensorflow
  ```sh
  pip install tensorflow
  ```
* numpy
* joblib
  ```sh
  pip install numpy joblib
  ```
* dnspython
* itsdangerous
* Jinja2
* MarkupSafe
  ```sh
  pip install dnspython itsdangerous Jinja2 MarkupSafe
  ```

### Installation

#### Clone the Repository

```sh
git clone https://github.com/adityakmehrotra/LeafAI.git
cd LeafAI
```

#### Install Backend Dependencies
```sh
# Navigate to the backend directory
cd backend
pip install -r requirements.txt
```

#### Install Frontend Dependencies
```sh
# Navigate to the frontend directory
cd ../client
npm install
```

### Running the Application

#### Start the Flask Backend

```sh
# Navigate to the backend directory
cd ../backend
flask run
```

#### Start the React Frontend

Open another terminal window and navigate to the client directory:
```sh
npm start
```

##### The application should now be running on http://localhost:8000.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Usage
1. **Upload an Image:** Navigate to the main page and upload a leaf image through the interface.
2. **View Predictions:** Submit the image to view the prediction results.
3. **Download Sample Image:** Click the "Download Sample Image" button if you do not have a leaf image ready for testing.
4. **Create an Account:** Sign up to create a personal account, allowing access to additional features.
5. **Log In:** Log in to your account to access personalized features.
6. **View Prediction History:** After logging in, navigate to your dashboard to view previously uploaded leaf images and their prediction results, allowing you to track your identification history.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing
Contributions to this project are welcome! Please fork the repository, make your changes, and submit a pull request for review.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

For any queries, you can reach out at `adi1.mehrotra@gmail.com`.

Project Website: https://leafai.adityakmehrotra.com

Project Repo: https://github.com/adityakmehrotra/LeafAI

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments
Thanks to all the contributors who have invested their time and effort in improving this project.
Special thanks to AWS for hosting services.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
