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
            <Wall />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import Wall from '@/components/Wall.vue'
import IntakeHandler from '@/components/Intake/Handler.vue'
import CRUDMixIn from '@/helpers/crudMixin'

@Component({
    components: {
        IntakeHandler,
        Wall
    }
})
export default class Home extends mixins(CRUDMixIn) {

    created() {
        this.loadTags() 
        this.loadMemos() 
    }

}
</script>
<style scoped lang="scss">
    .handler-wrap {
        z-index:1;
        position: relative;
    }
</style>