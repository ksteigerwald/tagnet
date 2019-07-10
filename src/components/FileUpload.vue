<template>
  <div ref="fileZone">
    <modal :show="showModal" @close="showModal = false">
        <p style="font-size: 14px; font-weight: bold" align="center" slot="header">
            Upload your image or can simply drag and drop it :)
        </p>
        <div slot="body" class="upload-body">
            <div 
                style="
                    background-color: #f0f0f0; 
                    border-radius: 70px;
                    height: 70px; width: 70px;
                    margin-bottom: 30px;
                " 
            ></div>
            <div align="center">
                <div v-if="files.length > 0" class="file-box">
                    <span class="file" v-for="(item, i) in files" :key="i">
                        {{item.name}} &nbsp; <span style="cursor: pointer" @click="removeFile(i)">X</span>
                    </span>
                </div>
                <u 
                    style="font-size: 14px; color: orange; cursor: pointer" 
                    @click="openFileDialog()"
                >choose files</u>
                <input type="file" ref="file" @input="onFileInput" class="display-none" multiple>
            </div>
        </div>
        <div v-if="!loading" slot="footer" align="center">
            <button @click="onUpload" style="cursor: pointer" class="upload-button">
              <span>Upload</span>
            </button>
        </div>
        <div v-else slot="footer" align="center">
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import Modal from '@/components/Modal.vue'
import CRUDMixIn from '@/helpers/crudMixin'
import { globalEventBus } from '@/helpers/EventBus'
import DropzoneMixIn from '@/helpers/dropzone'

import { Memo } from '@/types'

@Component({
  components: {
    Modal
  }
})
export default class Home extends mixins(CRUDMixIn, DropzoneMixIn) {

    showModal: boolean = false
    loading: boolean = false
    files: any []= []

    async beforeMount() {
      globalEventBus.$on('uploadModalOpen', () => {
          this.showModal = true
      })
    }

    @Prop() memo: Memo

    $refs: {
      fileZone: any,
      file: any
    }

    mounted() {
        let self: any = this;
        this.$refs.fileZone.addEventListener("drop", function (e: any) {
            e.preventDefault();
            //   document.querySelector("#dropzone").style.visibility = "hidden";
            //   document.querySelector("#dropzone").style.opacity = 0;
            //   document.querySelector("#textnode").style.fontSize = "42px";
          
            var files = e.dataTransfer.files;

            console.log("Drop files:", files);

            self.onFileInput(null, files);
        });
    }

    openFileDialog() {
      this.$refs.file.click();
    }
    
    onFileInput(e: any, files: any) {
        if(e)
            this.files.push(...(e.target.files));
        else
            this.files.push(...files);
    }   

    removeFile(i: any) {
        this.files.splice(i, 1);
    }

    async onUpload(e: any) {
      'use strict';

      const files: any = this.files;
      const dom: any = (<any>e)

      if (files.length === 1) {
        this.loading = true;
        this.uploadHandler(files[0], this.memo.code)
          .then(res => {
            this.files = [];
            this.loading = false;
            this.showModal = false;
          })
          .catch(err => {
            this.files = [];
            this.loading = false;
            this.showModal = false;
          })
      }

    }
}
</script>

<style>
  .upload-body {
      display: flex;
      flex-direction: column;
      align-items: center;      
      margin-top: 10px;
      height: 100%;
  }
  .upload-button {
      font-size: 14px;
      padding: 8px;
      min-width: 75px;
      border: 0px;
      border-radius: 20px;
      color: white;
      background-color: #96a5ff;
  }
  .display-none {
      display: none;
  }
  .upload-body .file-box {
      margin-bottom: 15px;
      display: flex;
      flex-wrap: wrap;
  }
  .upload-body .file {
      padding: 5px 10px;
      margin: 2.5px;
      font-size: 14px;
      color: white;
      background-color: orange;
      border-radius: 14px;
  }

  /* CSS loader */
  .lds-ring {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 33px;
    height: 33px;
    margin: 6px;
    border: 2px solid orangered ;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: orangered  transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
