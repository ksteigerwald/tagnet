<template>
    <div class="cards columns is-centered is-3 is-desktop is-multiline">
        <div class="card column is-one-quarter" v-for="(memo, key, index) in memoLines">
            <h2>
                <strong> 
                    <b-icon :icon="icon(memo.TagMemo.label)" size="is-small"/>
                        {{memo.label}}
                </strong>
            </h2>
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
import { TagType } from '@/store/tags'

@Component
export default class Card extends Vue {

    @Prop() memoLines:Memo[]

    mounted() {
        console.log(this.memoLines)
        console.log("CMK", this)
    }

    icon(val: any) {
        return TagType[val]
    }

}
</script>

<style scoped lang="scss">
.card {
    border-radius: 5px;
    padding:1rem;
    margin:0.75rem;
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
