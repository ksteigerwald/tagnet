<template>
  <div class="home">
    
    <section>
        <b-field label="Rounded">
            <b-input placeholder="No label" rounded></b-input>
        </b-field>
    </section>

            
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>
