# LeafAI

## About The Project

### Overview
LeafAI is a cutting-edge web application designed to identify leaf species from images using machine learning. This full-stack application combines a React frontend with a Flask backend, harnessing the power of TensorFlow's Sequential model to analyze and predict leaf species. LeafAI not only simplifies botanical research but also enhances educational experiences for users interested in botany. Visit the application [here](https://leafai.adityakmehrotra.com).

### Features
- **Image Upload**: Users can upload images of leaves for species identification.
- **Species Prediction**: The application predicts the species of the leaf and provides details about it.
- **Accuracy and Loss Visualization**: Displays training accuracy and loss graphs to demonstrate the model's performance.
- **Sample Image Download**: Users without their own images can download a random leaf image from the application to test the functionality.

### Accuracy Graph

![image](https://github.com/user-attachments/assets/1fab547a-2b4c-45d2-8c20-1618ebfa9373)

#### Accuracy Graph Analysis
- **Rapid Improvement:** Between epochs 0 and 6, there is a sharp increase in both training and validation accuracies. This rapid improvement indicates that the model quickly learns patterns from the training data, which are also valid for the unseen validation data. This suggests a good initial feature extraction and learning rate configuration.
- **Convergence Trend:** Post epoch 6, the rate of increase in accuracy diminishes, showing signs of convergence. The training and validation lines remain close, with the validation accuracy slightly trailing the training accuracy but mostly following a similar upward trend. This close tracking suggests that the model is not overfitting significantly to the training data, which is a positive sign of its generalization ability.
- **Stability Towards the End:** From around epoch 10 onwards, both accuracies exhibit a plateau, oscillating slightly but remaining stable. This stabilization near a high accuracy level (approximately 80-85%) indicates that further training might yield minimal gains and that the model has potentially reached its performance capacity given the current architecture and dataset.

#### Accuracy Graph Implications
- **Effective Learning:** The graph showcases an effective learning process, with the model responding well to the training data and generalizing effectively to validation data. This performance suggests that the current neural network architecture and hyperparameters are well-suited for this classification task.
- **High Generalization:** The slight gap between training and validation accuracy could be explored further. Techniques such as dropout, more data augmentation, or additional regularization might be employed to reduce any minor overfitting still occurring.
- **Potential for Further Tuning:** Since the accuracies plateau, exploring other architectures or more complex models could potentially lead to improvements if higher accuracy is required. Alternatively, increasing the dataset size or diversity could help the model learn more generalized features.

### Loss Graph

![image](https://github.com/user-attachments/assets/b36ed1ab-5e96-4eb0-a5e0-210e80e83a26)

#### Loss Graph Analysis
- **Sharp Decrease in Early Epochs:** Both the training loss (loss) and validation loss (val_loss) decrease sharply between epochs 0 and 6. This indicates that the model quickly learns to minimize the error between the predicted and actual outputs, which suggests that the initial model parameters and learning configuration are well-tuned for the task.
- **Close Convergence:** The training and validation loss values remain close throughout the training process, which is a strong indicator of the model's ability to generalize. There isn't a significant divergence between the two lines, implying that the model is not merely memorizing the training data but is learning underlying patterns applicable to both seen and unseen data.
- **Steady Decline to Plateau:** As the epochs increase, both lines continue to decline steadily, reaching a plateau towards the later epochs (around epoch 10). The plateau suggests that continuing training beyond this point yields diminishing returns in terms of loss reduction, indicating that the model may have reached its optimal performance given the current architecture and dataset.

#### Loss Graph Implications
- **Model Efficiency:** The rapid decrease in loss and the maintenance of low loss values demonstrate the efficiency of the model in understanding and classifying leaf species from images. The model’s performance in reducing loss steadily shows the effectiveness of the learning rate and the backpropagation optimization process.
- **Generalization Capability:** The close tracking of the validation loss with the training loss supports the model's capability to generalize well to new data. This is crucial for practical applications, ensuring that the model performs reliably when deployed in real-world scenarios.
- **Potential for Further Optimization:** Although the model shows excellent performance, the leveling off of the loss curve suggests that either the model is starting to exhaust its learning capacity or it might need further tuning of hyperparameters or more complex model architectures to break the plateau and achieve lower loss values.

### Data Source
The training data for the machine learning model was primarily sourced from the UC Irvine Public Dataset, among other online resources. This rich dataset provides a diverse array of leaf images, which has been instrumental in training our model with high precision.

## Built With
* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Flask][Flask.palletsprojects.com]][Flask-url]
* [![TensorFlow][TensorFlow.org]][TensorFlow-url]
* [![MongoDB][MongoDB.com]][MongoDB-url]

[Next.js]: https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-purple?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com/
[Flask.palletsprojects.com]: https://img.shields.io/badge/Flask-black?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/
[TensorFlow.org]: https://img.shields.io/badge/TensorFlow-orange?style=for-the-badge&logo=tensorflow&logoColor=white
[TensorFlow-url]: https://www.tensorflow.org/
[MongoDB.com]: https://img.shields.io/badge/MongoDB-green?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/

- **Frontend**: React.js
- **Backend**: Flask
- **Machine Learning**: TensorFlow Sequential ML Model
- 

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


## Installation

### Prerequisites
- Node.js
- Python 3.x
- pip

### Setup Instructions

#### Clone the Repository

```bash
git clone https://github.com/adityakmehrotra/LeafAI.git
cd LeafAI
```

#### Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Install Frontend Dependencies
```bash
cd ../client
npm install
```

### Running the Application

#### Start the Flask Backend

```bash
# Navigate to the backend directory
flask run
```

#### Start the React Frontend

Open another terminal window and navigate to the client directory:
```bash
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
