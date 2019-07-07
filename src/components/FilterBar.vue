<template>
 <ul class="catgory-head">
    <li class="sample-menu-style dropdown-menu"> 
        <a href="#" tabindex="0" @click.prevent>
            <span class="filter-img"> <FilterToggle/> </span> Filter &nbsp;<ArrowDown/></a>
        <div tabindex="0" @click.prevent></div>
        <ul class="dropdown-menu__sub">
            <li v-for="tag in tags" :key="tag.code"><a @click.prevent="filterBy(tag)">{{tag.label}}</a></li>
            <li><a @click.prevent="filterBy({id: -1})">All</a></li>
        </ul>
    </li>
    <li class="sample-menu-style dropdown-menu"><a href="#"  tabindex="0" @click.prevent> <span class="filter-img"> <Arrows/> </span> Sort by &nbsp; <ArrowDown/></a>
        <div tabindex="0" @click.prevent></div>
        <ul class="dropdown-menu__sub">
            <li><a href="#" @click.prevent="sampleMenu(this)">Item one</a></li>
            <li><a href="#" @click.prevent="sampleMenu(this)">Item Two</a></li>
        </ul>
    </li>
    <li class="sample-menu-style dropdown-menu"><a href="#" tabindex="0" @click.prevent> <span class="filter-img"> <Menu/> </span> Options </a>
        <div tabindex="0" @click.prevent></div>
        <ul class="dropdown-menu__sub">
            <li><a href="#" @click.prevent="sampleMenu(0)">Item one</a></li>
            <li><a href="#" @click.prevent="sampleMenu(1)">Item Two</a></li>
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
    @Prop() tags: Tag[];

    filterBy(tag: Tag) {
        //emit
        console.log(tag, '1st FILTER WALL');
        globalEventBus.$emit('filterWall', tag)
    }

    sampleMenu(item: any) {
        console.log(item);
    }
}
</script>

<style scoped lang="scss">

.sample-menu-style > ul > li > a {
    text-transform: capitalize;
}

</style>
