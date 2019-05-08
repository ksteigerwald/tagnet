<template>
    <div class="autocomplete">
        <b-field :label="output">
            <b-autocomplete rounded
                v-on:input="keymapper"
				v-model="label"
                :data="filterData"
                clear-on-select
                icon="search"
                @keyup.native.enter="keyEvent(label)"
				@select="option => selected = option"
                placeholder="e.g. Anne">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </b-field>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import short from 'short-uuid';
import { State, Mutation, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'
import { TagType } from '@/store/tags'

