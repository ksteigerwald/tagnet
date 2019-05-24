<template>
    <ul class="intake column is-half">
        <li v-for="item in list"> i
            - 1
        </li> 
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';

@Component({
 components: {
  }
})
export default class Flyout extends Vue {

    @Prop() list: any[]

    onInterfaceChange(item:any) {
    }
}
</script>

<style scoped lang="scss">
    .intake {
        border-bottom: 1px solid #EDEDED; 
    }
</style>
