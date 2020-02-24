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

import { State, Getter, Action, namespace } from 'vuex-class';
import { User, UserState } from '@/types'

import awsconfig from './aws-export'
import { Storage } from 'aws-amplify';

const AWS_BUCKET = (process.env.NODE_ENV === 'development') ? 'tagnet-io-user-uploads-dev' : 'tagnet-io-user-uploads-prod'
Storage.configure({
  AWSS3: {
      bucket: AWS_BUCKET,
      region: 'us-east-1'
  }
});


// You can declare a mixin as the same style as components.

@Component
export default class DropzoneMixIn extends Vue {
  
  @Getter('user/user') user: any

  drops:any[]
  mouseOver: any
  lastTarget: any = null
  uploader: S3Upload = null

  IMAGE_MIME_REGEX: RegExp = /^image\/(p?jpeg|gif|png)$/i;

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

  getKeyPath(fileName:string): string {
    return `${this.user.username}/${fileName}`
  }

  //handle using RXJS
  //default code
  async uploadHandler(file: File, code: string) {
    if(file.type.indexOf("image") !== 0) return
    console.log('uploadHandler')
    let path = this.getKeyPath(file.name)
    Storage.put(path, file)
      .then (result => {
        let stream: Stream = {
          context: Context.memo,
          event: Event.drop,
          value: { filename: file.name, code: code }
        }
        globalEventBus.$emit('emitInterface', stream) 
      })
      .catch(err => console.log(err));

  }
}