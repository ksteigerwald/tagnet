import Vue from 'vue'
import Component from 'vue-class-component'
import Dropzone from 'dropzone'
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

  mouseOver: any
  lastTarget: any = null
  dropZone: Dropzone = null
  uploader: S3Upload = null

  printIt(e: any) {
    e.stopPropagation();
    console.log(e)
  }

  mounted() {
    this.uploader = new S3Upload([])
    this.uploader.getURL('Tagnet-test.png').then(e => {
      console.log(e)
    })
  }

  created() {
    var self = this
    window.addEventListener("drop", function (e) {
      console.log(e)
      e.preventDefault();
    });

    window.addEventListener("dragenter", function (e) {
      if (isFile(e)) {
          self.lastTarget = e.target;
      }
      console.log(e)
  });
  
  window.addEventListener("dragleave", function (e) {
      console.log(e, self.lastTarget)
      e.preventDefault();
  });
  
  window.addEventListener("dragover", function (e) {
      console.log(e)
      e.preventDefault();
  });
  
  window.addEventListener("drop", function (e) {
      e.preventDefault();
      const files = e.dataTransfer.files

    if (files.length == 1) {
      for(var i = 0; i++; i <= files.length) {
        console.log('?', files[i].type)
      }
      console.log("<b>File selected:</b><br>" + e.dataTransfer.files[0].type)
      //console.log(e.dataTransfer.getData(e.dataTransfer.files[0].name))
      self.uploadHandler(e.dataTransfer.files[0])
    }
  });
  }

  uploadHandler(file: File) {
    if(file.type.indexOf("image") !== 0) return
      var reader = new FileReader();
      reader.onload = function(e) {
        console.log('loaded', e)
      }
      reader.readAsDataURL(file)
      //let upload = new S3Upload(file.name)
      //upload.getURL(file.name)
  }
}