<template>
    <div class="cards columns is-centered is-3 is-desktop is-multiline">
        <div :id="memo.code" :class="cardCSS(memo.TagMemo.label)" v-for="(memo, key, index) in memos">
            <router-link :to="{ name: 'memorandums', params: { memoId: memo.id }}">
                <div class="card-box">
                    <span class="row"> 
                        <mark class="tag-type">
                            <b-icon :icon="icon(memo.TagMemo.label)" size="is-small"/>
                        </mark>
                    </span>
                    <span class="row">
                        <h2>
                            {{memo.TagMemo.label}}
                        </h2>
                    </span>
                    <span class="row">
                        <h3>
                            {{memo.label}}
                        </h3>
                    </span>
                    <span class="row">
                        <ul>
                            <li>
                                <mark class="circle">
                                    {{memoLines(memo.id).length}}
                                </mark>
                            </li>
                        </ul>
                    </span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { ITagType, Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'
import { TagType } from '@/store/tags'

@Component
export default class Card extends Vue {

    @Prop() memos:Memo[]

    @Getter('lines/memoLines') memoLines: Line[]

    icon(val: string) {
        return (<any>TagType)[val]
    }

    cardCSS(key: string) {
        let cardType = (<any>TagType)[key]
        return `card column is-one-quarter ${cardType}`
    }

}
</script>

<style scoped lang="scss">
a { color:#000 }
.card {
    border-radius: 20px;
    padding:1rem;
    margin:0.75rem;
    min-height:205px;
    max-width:205px;
    .card-box {
        width:190px;
        height:190px;
        mark.tag-type { 
            font-size:1.5rem;
        }
        mark {
            display:inline-block;
            background:#fff;
            border-radius:10px; 
            padding:10px 18px;
        }
        span.row:first-child { 
            display:block;
            margin-bottom:20px; 
        }
        h2 {
            font-weight:700;
            text-transform: capitalize;
        }
        h3 {
            text-transform: capitalize;
        }
        span.row:nth-child(3) { 
            display:block;
            margin-bottom:20px; 
        }
        ul {
            li {
                text-align:left;
                mark {
                    border-radius:25rem;
                    font-weight:700;
                }
            }
        }
    }
}
.card.user-alt {
    mark {
        color:#FF4052;
    }
    background:#FF4052;
}
.card.trophy {
    mark {
        color:#32E083;
    }
    background:#32E083;
}
.card.lightbulb {
    mark {
        color:#FCCC07;
    }
    background:#FFE165;
}
.card.calendar-alt {
    mark {
        color:#40DFF5;
    }
    background:#C4EFF5;
}
.card.asterisk {
    mark {
        color:#FF5E40;
    }
    background:#FF5E40;
}
.card.newspaper {
    mark {
        color:#55C1FF;
    }
    background:#55C1FF;
}
</style>
