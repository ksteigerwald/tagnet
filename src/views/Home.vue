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
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="memos" class="section">
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
        console.log('HOME IS MOUNTED')
        this.loading = true
        this.loadWall() 
            .then((e: any) => {
                console.log('HOME IS MOUNTED', e, this.componentKey)
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