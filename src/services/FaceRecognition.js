import faced from 'faced';

import {server} from '../library/logger';

const modelSrc = 'models';

let FaceRecognition = null;

class FaceRecognitionService {
  constructor() {
    this.faced = new Faced();
  }

  init() {

  }

  async recognizeFace(input) {

  }
}

export default () => {
  if (FaceRecognition == null) {
    return new Promise(resolve => {
      server('Setting up Face Recognition Service.');

      FaceRecognition = new FaceRecognitionService();

      FaceRecognition.init().then(() => {
        resolve();
      })
    });
  } else {
    return FaceRecognition;
  }
}