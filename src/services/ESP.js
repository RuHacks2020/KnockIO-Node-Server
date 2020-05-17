import evilScan from 'evilscan';
import request from 'request';
import MjpegConsumer from 'mjpeg-consumer';
import FileOnWrite from 'file-on-write';

import {server, error, warn} from '../library/logger';

import config from '../../configs.json';
import fs from 'fs';
import ip from 'ip';

let ESP = null;

class ESPService {
  constructor() {
    this.ip = ip.address().match(/^(\d+\.\d+\.\d+\.)/)[1];
    this.options = {
      target:`${this.ip}1-255`,
      port: config.server.esp_port,
      status:'O',
      banner: true
    }
    this.esp = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      new evilScan(this.options, (err, scan) => {
        if (err) {
          console.log(err);
          return;
        }

        scan.on('result', (data) => {
          if (data.status === 'open') {
            server(`ESP32 found at address http://${data.ip}:${data.port}`)
            this.esp = `http://${data.ip}:${data.port}`;
          }
        })

        scan.on('error', (err) => {
          throw new Error(err.toString());
        })

        scan.on('done', () => {
          if (this.esp) {
            resolve();
          } else {
            reject();
          }
        })

        scan.run();
      })
    });
  }

  getImage() {
    try {
      const fileWriter = new FileOnWrite({
        ext: '.jpg',
        filename: () => {
          return 'esp';
        },
      });
      const consumer = new MjpegConsumer();

      request(this.esp).pipe(consumer).pipe(fileWriter);
    } catch (e) { }
  }
}

export default () => {
  if (ESP == null) {
    return new Promise(resolve => {
      server('Establishing connection to ESP32.');

      ESP = new ESPService();

      ESP.init().then(() => {
        ESP.getImage();
        resolve();
      }).catch(() => {
        error('Unable to find ESP32 on local network! ' +
          'Ensure that the ESP32 is running the correct software and is running!');
        process.exit(1);
      })
    });
  } else {
    return ESP;
  }
}