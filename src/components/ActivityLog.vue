<template>
<div class="col-two">
    <h3>Recent Activity</h3>
    <ActivityLogItem v-for="log in facts" :key="log.id" :log="log" />
    <div class="all-activity">
        <a @click.prevent href="#">See All Activity</a>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { State, Getter, Action, namespace } from 'vuex-class';
import { Fact, FactState } from '@/types'
import ActivityLogItem from '@/components/ActivityLogItem.vue'

@Component({
    components:{
        ActivityLogItem
    }
})
export default class ActivityLog extends Vue {
    
    @Getter('facts/facts') !facts: Fact[]

    mounted() {
        console.log('FACT', this.facts)
    }
}
</script>

<style scoped lang="scss">
</style>
