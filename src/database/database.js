import mongoDB from 'mongodb';
import config from '../../configs.json';
import { database, error } from '../library/logger';

let Database = null;

class DatabaseService {
  constructor() {
    this.url = config.database.url;
    this.name = config.database.db_name;
    this.client = null;
    this.db = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.client = new mongoDB.MongoClient(this.url, {useNewUrlParser: true, useUnifiedTopology: true});

      this.client.connect(async err => {
        if (err) {
          error(`[DATABASE] Unable to connect to database ${this.name}!`);
          reject();
        }

        database(`Connecting to database ${this.name}!`);

        this.db = await this.client.db(this.name);

        resolve();
      })
    });
  }
}

export default () => {
  if (Database == null) {
    return new Promise(resolve => {
      database('Establishing connection to database...');

      Database = new DatabaseService();

      Database.init().then(() => {
        database('Successfully establish connection to database!');
        resolve();
      });
    });
  } else {
    return Database;
  }
}