<template>
    <ul class="intake column is-half">
          <li 
                v-for="(match, i) in list"
                :key="i"
                :class="{ 'is-active': i === arrowCounter }"
                @click="onClick(i)">
                    <a href="#">{{match.label}}</a>
                </li>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';

@Component({
 components: {}
})
export default class Flyout extends Vue {

    @Prop() list: any[]
    arrowCounter: number = 0
    onInterfaceChange(item:any) {
    }

    onClick(i:number) {
        console.log(this.list[i])
    }
}
</script>

<style scoped lang="scss">
    .intake {
        border-bottom: 1px solid #EDEDED; 
    }
</style>
