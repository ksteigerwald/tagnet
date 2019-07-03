<template>
    <section class="hero-sec m-box">
        <div class="container">
             <IntakeHandler 
                    @interface="onInterfaceChange"
                    :propList="syncData" />
         
            <div class="main-area">
                <div class="col-one">
                    <!--- MAKE COMPONENT -->
                    <Wall :key="componentKey" />
                    <Loading v-if="loading" />
                    <div v-if="error" class="error"> <h1>Error...</h1> </div>
                </div>
                <ActivityLog />   
        </div>
     </div>

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
            <div slot="footer" align="center">
                <button class="upload-button">Upload</button>
            </div>
        </modal>
    </div>

    </section>
   
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState, Fact, FactState } from '@/types'
import { mixins } from 'vue-class-component';

import Wall from '@/components/Wall.vue'
import Loading from '@/components/Loading.vue'
import Modal from '@/components/Modal.vue'
import ActivityLog from '@/components/ActivityLog.vue'
import IntakeHandler from '@/components/Intake/Handler.vue'
import CRUDMixIn from '@/helpers/crudMixin'
import DropzoneMixIn from '@/helpers/dropzone'
import { globalEventBus } from '@/helpers/EventBus'

@Component({
    components: {
        IntakeHandler,
        Wall,
        ActivityLog,
        Modal,
        Loading,
    }
})
export default class Home extends mixins(CRUDMixIn, DropzoneMixIn) {

    loading: boolean = true
    error:boolean = false
    componentKey: number = 0
    showModal: boolean = false
    files: any []= []

    @Action('memos/loadWall') loadWall: any
    @Action('tags/loadTags') loadTags: any
    @Action('facts/loadFacts') loadFacts: any

    async beforeMount() {
        this.componentKey += 1; 
        this.loading = true

        await this.loadTags()
        await this.loadFacts()

        globalEventBus.$on('uploadModalOpen', () => {
            this.showModal = true
        })
        
        this.loadWall() 
            .then((e: any) => {
                this.loading = false
            })
    }

    mounted() {
        let self: any = this;
        this.$refs.fileZone.addEventListener("drop", function (e) {
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
    
    onFileInput(e, files) {
        if(e)
            this.files.push(...(e.target.files));
        else
            this.files.push(...files);
    }   

    removeFile(i) {
        this.files.splice(i, 1);
    }
}
</script>
<style scoped lang="scss">
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
</style>