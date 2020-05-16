import fs from 'fs';

export default (src, extension, exception) => {
  let files = [];

  const getFiles = (src, extension, exception) => {
    fs.readdirSync(src).forEach(path => {
      const dir = `${src}\\${path}`;
      if (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory()) {
        getFiles(dir, extension, exception);
      }

      if (path.endsWith(extension)) {
        if (exception.includes(path)) return;

        files.push(dir);
      }
    })
  }

  getFiles(src, extension, exception);

  return files;
}