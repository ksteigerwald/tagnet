

import Vue from 'vue'
import axios from "axios";


export default class S3Upload {

  sign:string = 'https://tagnet-api.herokuapp.com/signed'
  constructor(file: File) {
    this.upload(file)
  }

  async upload(file: File) {
    let signed:string = await this.getURL(file.name)
    this.postToS3(file, signed)
  }

  async getURL(file: string = '') {
    const resp = await axios.post(this.sign, {
      method: 'POST',
      fileName: file,
      responseType: 'json'
    })

    return resp.data
  }

  async postToS3(file: File, url: string) {
    const resp = await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      }
    })
    return resp
  }

//import { S3Upload } from 'src/helpers/upload'
}