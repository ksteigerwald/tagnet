<template>
  <div class="wall">
          <div class="card" v-for="(memo, key, index) in memoLines">
              <h2><strong> 
			         <b-icon :icon="icon(memo.TagMemo.label)" size="is-small"/>
                      {{memo.label}}
                  </strong></h2>
              <ul>
                  <li v-for="line in memo.MemoLines">
                      {{line.label}}
                  </li>
              </ul>
          </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'
import { TagType } from '@/store/tags'

@Component
export default class Wall extends Vue {

    @Getter('tags/tags') !tags: Tag[]
    @Getter('memos/memos') memos!: Memo[]
    @Getter('memos/memoLines') memoLines!: Memo[]
    @Getter('lines/sortedLines') sortedLines!: Line[]
    @Action('memos/loadWall') loadWall: any
	
	icon(val: any) {
		return TagType[val]
	}

	created() {
        this.loadWall() 
	}
}
</script>

<style scoped lang="scss">
    .card {
        margin-bottom: 1rem;
        padding:1rem;
        h2 {
            text-align:left;
        }
        ul {
            li {
                text-align:left;
            }
        }
    }
</style>

