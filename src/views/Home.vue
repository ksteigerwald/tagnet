<template>
    <div class="wrap">
        <div class="section pad">
            <div class="container">
                <div class="columns is-mobile is-centered handler-wrap set-height">
                    <IntakeHandler 
                    @interface="onInterfaceChange"
                    :propList="syncData" />
                </div>
            </div>
        </div>

    <div v-if="loading" class="loading">
        <div class="container">
            <div class="columns is-centered is-3 is-desktop is-multiline">
               <div style="text-align:center" class="column is-quarter"> 
                    <h1>Loading...</h1>
                </div>
            </div>
         </div>
    </div>

    <div v-if="error" class="error">
        <div class="container">
            <div class="columns is-centered is-3 is-desktop is-multiline">
               <div class="column is-quarter"> {{ error }} </div>
            </div>
         </div>
    </div>

    <div v-if="memos.length > 0 && !loading" class="section">
        <Wall :key="componentKey" />
    </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'
import { mixins } from 'vue-class-component';

import Wall from '@/components/Wall.vue'
import IntakeHandler from '@/components/Intake/Handler.vue'
import CRUDMixIn from '@/helpers/crudMixin'
import DropzoneMixIn from '@/helpers/dropzone'

@Component({
    components: {
        IntakeHandler,
        Wall
    }
})
export default class Home extends mixins(CRUDMixIn, DropzoneMixIn) {

    loading: boolean = true
    error:boolean = false
    componentKey: number = 0

    @Action('memos/loadWall') loadWall: any

    async beforeMount() {
        this.componentKey += 1; 
        this.loading = true
        this.loadWall() 
            .then((e: any) => {
                this.loading = false
            })
    }

}
</script>
<style scoped lang="scss">
    .handler-wrap {
        z-index:1;
        position: relative;
    }

    div.pad {
        min-height:10rem;
    }

    div#drop-target {
        height:10rem;
        width:100%;
        background:#ccc;
        
    }
</style>