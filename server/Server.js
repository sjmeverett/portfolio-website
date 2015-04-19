
import commander from 'commander';
import version from '../package.json';
import _ from 'lodash';
import fs from 'fs';
import express from 'express';


export default Server {
  start() {
    let config = this.getConfig();
    let app = express();
  }
  
  getConfig() {
    commander
      .version(version)
      .option('--listen [port]', 'The port to listen on', parseInt, 3000)
      .option('--config [file]', 'The JSON file to load options from')
      .parse(process.argv);
    
    if (commander.config) {
      let configFile = JSON.parse(fs.readFileSync(file));
      return _.merge(commander, configFile);
    } else {
      return commander;
    }
  }
};