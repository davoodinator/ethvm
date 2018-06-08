import * as Downloader from 'filedownloader'
import * as path from 'path'
import * as os from 'os'

const fileList = require('./file_list.json')

fileList.forEach((_file, _idx) => {
  const Dl = new Downloader({
    url: _file.url,
    saveto: _file.path,
    saveas: _file.name,
    deleteIfExists: true
  }).on('progress', function(progress) {
    console.log(progress)
  })
})
