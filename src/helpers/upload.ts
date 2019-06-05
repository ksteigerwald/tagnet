

import Vue from 'vue'
import axios from "axios";


export default class S3Upload {

  sign:string = 'http://localhost:3000/signed'
  signed:string = ''
  file:string = ''

  constructor(file: string) {
    this.file = file
  }

  async getURL(file: string = '') {
    const resp = await axios.post('http://localhost:3000/signed', {
      method: 'POST',
      fileName: file,
      responseType: 'json'
    })

    return resp.data
  }

  async postToS3(path: string = '') {}

//import { S3Upload } from 'src/helpers/upload'
}