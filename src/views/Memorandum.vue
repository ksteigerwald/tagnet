<template>
    <div>
        <div class="section">
            <div class="container">
                <div class="columns is-mobile is-centered handler-wrap set-height">
                    <IntakeHandler 
                    @interface="onInterfaceChange"
                    :propList="syncData" />
                </div>
            </div>
        </div>
        <div class="section">
            <MemoDetail />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import MemoDetail from '@/components/Memorandum/Detail.vue'
import IntakeHandler from '@/components/Intake/Handler.vue'
import CRUDMixIn from '@/helpers/crudMixin'

@Component({
    components:{
        IntakeHandler,
        MemoDetail,
    }
})
export default class Memorandum extends mixins(CRUDMixIn) {

}
</script>
