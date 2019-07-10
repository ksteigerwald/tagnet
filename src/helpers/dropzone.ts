import Vue from 'vue'
import axios from "axios";
import Component from 'vue-class-component'
import S3Upload from '@/helpers/upload'
import { globalEventBus } from '@/helpers/EventBus'
import * as config from '@/helpers/config'
import short from 'short-uuid';

import { Subject, Observable, fromEvent, of, pipe, interval, ConnectableObservable } from 'rxjs';
import { pluck, map, mapTo, debounceTime, tap, bufferTime,
    distinctUntilChanged, switchMap, filter, mergeMap, switchAll } from 'rxjs/operators';

import { printIntrospectionSchema } from 'graphql';
import { Event, Context, Stream } from '@/types';

// You can declare a mixin as the same style as components.
@Component
export default class DropzoneMixIn extends Vue {
  
  signedURLEndpoint:string = 'https://tagnet-api.herokuapp.com/signed'
  drops:any[]
  mouseOver: any
  lastTarget: any = null
  uploader: S3Upload = null

  IMAGE_MIME_REGEX: RegExp = /^image\/(p?jpeg|gif|png)$/i;

  mounted() {

    // globalEventBus.$on('WindowDrop', (data: Stream) => {
    //   this.dropped(data)
    // })

    // globalEventBus.$on('WindowPaste', (data: Stream) => {
    //   console.log('WINDOWPASTE', data)
    //   this.pasted(data)
    // })

  }

  beforeDestroy() {
    globalEventBus.$off()
}

  preventEvn(e: any){
    e.preventDefault();
  }

  pasted(e: any) {
    var items = e.clipboardData.items;

    const dom: any = (<any>e)

    for (var i = 0; i < items.length; i++) {

        //console.log(items[i].type, '<<<', e.clipboardData.getData('text/plain'))
        //console.log(e.target.type)

        if (this.IMAGE_MIME_REGEX.test(items[i].type)) {
            //loadImage(items[i].getAsFile());
            let file = items[i].getAsFile()
        
            // console.log('file pasted:', items[i], file)
            this.uploadHandler(file, dom)
            return;
        }
        if (e.target.type === 'text' && items[i].type === 'text/plain') {
            e.target.value = e.clipboardData.getData('text/plain') 
            return;
        }
    }
    
    e.preventDefault();
  }

  dropped(e: any) {
    'use strict';

    e.preventDefault();
    const files = e.dataTransfer.files
    const dom: any = (<any>e)

    if (files.length === 1) {
      console.log("File selected:" + e.dataTransfer.files[0].type)
      this.uploadHandler(e.dataTransfer.files[0], dom)
    }

    false
  }

  getKeyPath(fileName:string, code: string): string {
    let user:string = localStorage.getItem(config.localKey('user'));
    let key:string = short.generate()
    return `${code}/${key}/${fileName}`
  }

  //handle using RXJS
  //default code
  async uploadHandler(file: File, code: string) {
    if(file.type.indexOf("image") !== 0) return
    let url = await this.getURL(this.getKeyPath(file.name, code))
    let img: string = url.split('?').shift()

    let upload = await this.postToS3(file, url)

    if(upload.status === 200) {

      let stream: Stream = {
        context: Context.memo,
        event: Event.drop,
        value: { filename: img, code: code }
      }

      globalEventBus.$emit('emitInterface', stream) 

      return 200
    }
  }

  
  async getURL(file: string = '') {
    
    const resp = await axios.post(this.signedURLEndpoint, {
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
}