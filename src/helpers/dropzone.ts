import Vue from 'vue'
import Component from 'vue-class-component'
import S3Upload from '@/helpers/upload'

import { Subject, Observable, fromEvent, of, pipe, interval, ConnectableObservable } from 'rxjs';
import { pluck, map, mapTo, debounceTime, tap, bufferTime,
    distinctUntilChanged, switchMap, filter, mergeMap, switchAll } from 'rxjs/operators';

import { printIntrospectionSchema } from 'graphql';

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
      console.log(e)

    if (files.length == 1) {
      console.log("File selected:" + e.dataTransfer.files[0].type)
      self.uploadHandler(e.dataTransfer.files[0])
    }
  });
  }

  //handle using RXJS
  uploadHandler(file: File) {
    if(file.type.indexOf("image") !== 0) return
     let upload = new S3Upload(file)
  }
}