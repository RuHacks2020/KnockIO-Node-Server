import databaseService from '../database';
import { database } from '../../library/logger';

let Settings = null;

class SettingsCollection {
  constructor() {
    this.collection = databaseService().db.collection('clowns');
  }
}

export default () => {
  if (Settings == null) {
    return new Promise(() => {
      database('Connecting to Settings collection!');

      Settings = new SettingsCollection();

      return Settings;
    });
  } else {
    return Settings;
  }
}