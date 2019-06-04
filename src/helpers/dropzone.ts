import Vue from 'vue'
import Component from 'vue-class-component'
import Dropzone from 'dropzone'

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

  printIt(e: any) {
    e.stopPropagation();
    console.log(e)
  }

  mounted() {
    this.dropZone = new Dropzone('div#drop-target', {
      url: 'https://httpbin.org/post',
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      headers: { "My-Awesome-Header": "header value" }
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
      console.log(e, self.lastTarget)
      e.preventDefault();
    if (e.dataTransfer.files.length == 1) {
      console.log("<b>File selected:</b><br>" + e.dataTransfer.files[0].name)
    }
  });
  }
}