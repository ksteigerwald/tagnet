declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module "aws-amplify-vue";
declare module 'aws-amplify-vue/src/components/storage';
declare module "tiptap";
declare module "tiptap-extensions";