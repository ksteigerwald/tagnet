<template>
  <div class="wall">
      <ul>
          <li v-for="(value, key, index) in sortedLines">
              <h2>
			  <b-icon :icon="icon(value[0].type)" size="is-small"/>

			  <strong> {{key}}</strong></h2>
              <ol>
                  <li v-for="line in value">
                      {{line.label}}
                  </li>
              </ol>
          </li>
      </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'
import { TagType } from '@/store/tags'

@Component({
  components: {
  }
})
export default class Wall extends Vue {

    @Getter('tags/tags') !tags: Tag[]
    @Getter('memos/memos') memos!: Memo[]
    @Getter('lines/sortedLines') sortedLines!: Line[]

    @Action('lines/loadLines') loadLines: any
	
	icon(val: any) {
		return TagType[val]
	}

	created() {
        this.loadLines() 
	}
}
</script>
