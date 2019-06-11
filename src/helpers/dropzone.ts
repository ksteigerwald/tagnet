import Vue from 'vue'
import axios from "axios";
import Component from 'vue-class-component'
import S3Upload from '@/helpers/upload'
import { globalEventBus } from '@/helpers/EventBus'

import { Subject, Observable, fromEvent, of, pipe, interval, ConnectableObservable } from 'rxjs';
import { pluck, map, mapTo, debounceTime, tap, bufferTime,
    distinctUntilChanged, switchMap, filter, mergeMap, switchAll } from 'rxjs/operators';

import { printIntrospectionSchema } from 'graphql';
import { Event, Context, Stream } from '@/types';

function isFile(evt:any) {
  var dt = evt.dataTransfer;

  for (var i = 0; i < dt.types.length; i++) {
      if (dt.types[i] === "Files") {
          return true;
      }
  }
  return false;
}

// You can declare a mixin as the same style as components.
@Component
export default class DropzoneMixIn extends Vue {
  
  signedURLEndpoing:string = 'https://tagnet-api.herokuapp.com/signed'

  drops:any[]
  mouseOver: any
  lastTarget: any = null
  uploader: S3Upload = null

  created() {
    var self = this

    window.addEventListener("dragenter", function (e) {
      if (isFile(e)) {
          self.lastTarget = e.target;
      }
  });
  
  window.addEventListener("dragleave", function (e) {
      e.preventDefault();
  });
  
  window.addEventListener("dragover", function (e) {
      e.preventDefault();
  });

  window.addEventListener("drop", function (e) {
      e.preventDefault();
      const files = e.dataTransfer.files
      const dom:any = (<any> e)
      console.log('drop', dom.target.offsetParent)
    if (files.length === 1) {
      console.log("File selected:" + e.dataTransfer.files[0].type)
      self.uploadHandler(e.dataTransfer.files[0], dom)
    }
  });
  }

  //handle using RXJS
  async uploadHandler(file: File, dom: any) {
    if(file.type.indexOf("image") !== 0) return
    let url = await this.getURL(file.name)
    let upload = await this.postToS3(file, url)
    let $el = dom.target.offsetParent
    if(upload.status === 200) {

      let stream: Stream = {
        context: Context.memo,
        event: Event.drop,
        value: { filename: file.name, code: $el.id || null }
      }

      console.log('upload sream', stream)

      globalEventBus.$emit('emitInterface', stream) 
      return 200
    }
     console.log({url, upload })
  }

  
  async getURL(file: string = '') {
    
    const resp = await axios.post(this.signedURLEndpoing, {
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