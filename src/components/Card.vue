<template>
        <div :id="memo.code" :class="cardCSS(memo.TagMemo.label)" >
                <div class="head-item">
                    <CardTitle :memo="memo" />
                                    <div class="sample-menu-style dropdown-menu"> 
                                        <a href="#" tabindex="0" onclick="return true">
                                        <MenuList />
                                        </a>
                                        <div tabindex="0" onclick="return true"></div>
                                        <ul>
                                            <li><a @click="togglePublic"><img src="@/assets/images/padlock-unlock.svg" alt="">Make Public</a></li>
                                            <li><a href="#" @click="remove(memo)"><img src="@/assets/images/delete.svg" alt="">Delete</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <router-link :to="{ name: 'memorandums', params: { memoId: memo.id }}">
                                <p> {{memo.label}} </p>
                                </router-link>
                                <ul class="number-main">
                                <li><span><Writting/></span>{{memo.MemoLines.length}}</li>
                <li><span>
                    <Tag/>
                    </span>12</li>
            </ul>
        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import {  Memo, MemoState } from '@/types'
import { TagType } from '@/store/tags'
import { deleteMemo } from '../constants/memos.ql';
import Goal from '@/components/Icons/Goal.vue'
import CardTitle from '@/components/CardTitle.vue'
import Tag from '@/components/Icons/Tag.vue'
import Writting from '@/components/Icons/Writting.vue'
import MenuList from '@/components/Icons/MenuList.vue'

@Component({
    components:{
        Goal,
        Tag,
        Writting,
        CardTitle,
        MenuList,
    }
})
export default class Card extends Vue {


    @Prop() memo:Memo
    @Action('memos/deleteMemo') deleteMemo: any
    @Action('memos/updatePublic') updatePublic: any

    remove(memo: Memo) {
        let check: boolean = confirm(`Are you sure you want to delete:${memo.label}`)
        if(check) {
            this.deleteMemo(memo)
        }
    }

    togglePublic() {
        let isPublic: boolean = this.memo.is_public
        this.memo.is_public  =  isPublic ? false : true
        this.updatePublic(this.memo)
    }
    icon(val: string) {
        return (<any>TagType)[val]
    }

    cardCSS(key: string) {
        let cardType = (<any>TagType)[key]
        return `catagory-itme ${cardType}`
    }

}
</script>

<style scoped lang="scss">
</style>
