<template>
 <section class="hero-sec m-box">
    <div class="hero-sec__container">
    <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          class="menubar__button"
          @click="showImagePrompt(commands.image)">
          <icon name="image" />
          
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <icon name="bold" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <icon name="italic" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <icon name="code" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.todo_list() }"
          @click="commands.todo_list"
        >
          <icon name="checklist" />
        </button>
      </div>
    </editor-menu-bar>
    <editor-content class="editor__content" :editor="editor" />
  </div>
     </div>
 </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import { State, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'

import Icon from '@/components/Icon.vue'
import {
  CodeBlockHighlight,
  HardBreak,
  Heading,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
} from 'tiptap-extensions'


import { Editor, EditorContent, EditorMenuBar } from 'tiptap'


@Component({
    components:{
    EditorContent,
    EditorMenuBar,
    Icon,
    Editor
    }
})
export default class Console extends Vue {

    loading: boolean = true
    error:boolean = false
    memo: Memo = null
    editor:any = new Editor({
        extensions: [
          new CodeBlockHighlight(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new TodoItem({
            nested: true,
          }),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
        ],
         content: `
          <h2>
            Todo List
          </h2>
        `,
      })
    @Action('tags/loadTags') loadTags: any
    @Action('memos/loadMemos') loadMemos: any
    @Action('lines/linesByMemo') linesByMemo: any

    @Getter('memos/memos') memos!: Memo[]
    
    async beforeMount() {
        this.loading = true
        let memoId = Number(this.$route.params.memoId)
        await this.loadTags() 
        await this.loadMemos() 

        this.linesByMemo(memoId) 
            .then((e: any) => {
                this.memo = this.memos.filter(memo => memo.id === memoId)[0]
                this.loading = false
            })

    }
}
</script>
<style lang="scss">
ul[data-type="todo_list"] {
  padding-left: 0;
}
li[data-type="todo_item"] {
  display: flex;
  flex-direction: row;
}
.todo-checkbox {
  border: 2px solid #000;
  height: 0.9em;
  width: 0.9em;
  box-sizing: border-box;
  margin-right: 10px;
  margin-top: 0.3rem;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  border-radius: 0.2em;
  background-color: transparent;
  transition: 0.4s background;
}
.todo-content {
  flex: 1;
  > p:last-of-type {
    margin-bottom: 0;
  }
  > ul[data-type="todo_list"] {
    margin: .5rem 0;
  }
}
li[data-done="true"] {
  > .todo-content {
    > p {
      text-decoration: line-through;
    }
  }
  > .todo-checkbox {
    background-color: #000;
  }
}
li[data-done="false"] {
  text-decoration: none;
}
</style>