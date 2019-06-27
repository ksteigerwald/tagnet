<template>
  <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
    <h1>Upload images</h1>
    <div class="dropbox">
      <input type="file" multiple 
          :name="uploadFieldName" 
          :disabled="isSaving" 
          @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          accept="image/*" class="input-file">

      <p v-if="isInitial">
        Drag your file(s) here to begin<br> or click to browse
      </p>
     <p v-if="isSaving">
        Uploading {{ fileCount }} files...
     </p>
   </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

enum UploadStatus {
  initial,
  saving,
  success,
  failed
}

@Component
export default class UploadForm extends Vue {

  uploadedFiles: []
  uploadError: null
  currentStatus: null
  uploadFieldName: 'photos'

  get isInitial() {
    return this.currentStatus === UploadStatus.initial;
  }

  get isSaving() {
    return this.currentStatus === UploadStatus.saving;
  }

  get isSuccess() {
    return this.currentStatus === UploadStatus.success;
  }

  get isFailed() {
    return this.currentStatus === UploadStatus.failed;
  }

  reset() {
    // reset form to initial state
    this.currentStatus = UploadStatus.initial;
    this.uploadedFiles = [];
    this.uploadError = null;
  }
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;

        upload(formData)
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      }
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();

        if (!fileList.length) return;

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

        // save it
        this.save(formData);
      }
    }

    mounted() {
      this.reset();
    }

}
</script>

<style scoped lang="scss">
</style>


      
           