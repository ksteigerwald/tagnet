<template>
 <ul class="catgory-head">
    <li class="sample-menu-style dropdown-menu"> <a href="#" tabindex="0" onclick="return true"> <span class="filter-img"> <img src="images/filter.svg" alt=""></span> Filter <img src="images/arrow-down.svg" alt="" class="arrow-down"> </a>
        <div tabindex="0" onclick="return true"></div>
        <ul>
            <li><a href="#" onclick="sampleMenu(this)">Item one</a></li>
            <li><a href="#" onclick="sampleMenu(this)">Item Two</a></li>
        </ul>
    </li>
    <li class="sample-menu-style dropdown-menu"><a href="#"  tabindex="0" onclick="return true"> <span class="filter-img"> <img src="images/Arrows-2.svg" alt=""></span> Sort by <img src="images/arrow-down.svg" alt="" class="arrow-down"> </a>
        <div tabindex="0" onclick="return true"></div>
        <ul>
            <li><a href="#" onclick="sampleMenu(this)">Item one</a></li>
            <li><a href="#" onclick="sampleMenu(this)">Item Two</a></li>
        </ul>
    </li>
    <li class="sample-menu-style dropdown-menu"><a href="#" tabindex="0" onclick="return true"> <span class="filter-img"> <img src="images/menu.svg" alt=""></span> </a>
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

@Component({
 components: {}
})
export default class FilterBar extends Vue {}
</script>

<style scoped lang="scss">
</style>
