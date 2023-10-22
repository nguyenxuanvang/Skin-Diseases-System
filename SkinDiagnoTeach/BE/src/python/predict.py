import tensorflow as tf
from tensorflow import keras
from PIL import Image
import numpy as np
import os
keras.utils.disable_interactive_logging()
model_path = 'best_model.h5'
model = keras.models.load_model(model_path)
image_path = './src/predictImage/' + os.listdir('.src/predictImage')[0]
img = Image.open(image_path)
img = img.convert('RGB')
img = img.resize((180, 180)) 
img = np.array(img)
new_data = img.reshape(1, 180, 180, 3)
class_names = ['Acne','Eczema','Nevus','Normal','Psoriasis','Pyoderma','Ringworm','Scabies','Urticaria','Warts']
predictions = model.predict(new_data)
predicted_class = class_names[np.argmax(predictions)]
print(predicted_class)