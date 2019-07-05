<template>
 <ul class="catgory-head">
    <li class="sample-menu-style dropdown-menu"> 
        <a href="#" tabindex="0" onclick="return true"> 
            <span class="filter-img"> <FilterToggle/> </span> Filter &nbsp;<ArrowDown/></a>
        <div tabindex="0" onclick="return true"></div>
        <ul>
            <li v-for="tag in tags" :key="tag.code"><a @click="filterBy(tag)">{{tag.label}}</a></li>
            <li><a @click="filterBy({id: -1})">All</a></li>
        </ul>
    </li>
    <li class="sample-menu-style dropdown-menu"><a href="#"  tabindex="0" onclick="return true"> <span class="filter-img"> <Arrows/> </span> Sort by &nbsp; <ArrowDown/></a>
        <div tabindex="0" onclick="return true"></div>
        <ul>
            <li><a href="#" onclick="sampleMenu(this)">Item one</a></li>
            <li><a href="#" onclick="sampleMenu(this)">Item Two</a></li>
        </ul>
    </li>
    <li class="sample-menu-style dropdown-menu"><a href="#" tabindex="0" onclick="return true"> <span class="filter-img"> <Menu/> </span> </a>
        <div tabindex="0" onclick="return true"></div>
        <ul>
            <li><a href="#" onclick="sampleMenu(this)">Item one</a></li>
            <li><a href="#" onclick="sampleMenu(this)">Item Two</a></li>
        </ul>
    </li>
</ul> 
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import FilterToggle from '@/components/Icons/FilterToggle.vue'
import Arrows from '@/components/Icons/Arrows.vue'
import Menu from '@/components/Icons/Menu.vue'
import ArrowDown from '@/components/Icons/ArrowDown.vue'

import { globalEventBus } from '@/helpers/EventBus';
import { Tag, TagState } from '@/types'

@Component({
 components: {
     FilterToggle,
     Arrows,
     Menu,
     ArrowDown
 }
})
export default class FilterBar extends Vue {
    @Prop() tags: Tag[]

    filterBy(tag: Tag) {
        //emit
        console.log(tag, '1st FILTER WALL')
        globalEventBus.$emit('filterWall', tag)
    }
}
</script>

<style scoped lang="scss">

.sample-menu-style > ul > li > a {
    text-transform: capitalize;
}

</style>
