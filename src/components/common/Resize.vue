<template>
    <div :style="{fontSize:fSize+'px'}">
        <slot></slot>
    </div>
</template>

<script>

    let defaultWidth = 1368,
        defaultFont = 16,
        minWidth = 768,
        minHeight = 600,
        defaultHeight = 773;

    export default {
        name: 'Resize',
        mounted () {
            window.addEventListener('resize',this.onResize.bind(this));

            this.$root.$emit('onResize',{vW:this.vW,vH:this.vH});
            if (this.isMobile()) {
                document.documentElement.classList.add('mobile')
            } else {
                document.documentElement.classList.remove('mobile')
            }
        },
        data () {
            return {
                vW:  window.innerWidth,
                vH:  window.innerHeight
            }
        },

        computed: {
            fSize () {
                let vW = this.vW;
                let vH = this.vH;
                return this.isMobile() ? 12 : 16*Math.min(Math.max(minWidth,vW)/defaultWidth,Math.max(minHeight,vH)/defaultHeight);
            }
        },
        methods: {
            onResize () {
                this.vW = window.innerWidth;
                this.vH = window.innerHeight;

                this.$root.$emit('onResize',{vW:this.vW,vH:this.vH});

                if (this.isMobile()) {
                    document.documentElement.classList.add('mobile')
                } else {
                    document.documentElement.classList.remove('mobile')
                }
            },
            isMobile() {
                return this.$root.Helpers.isMobile();
            }
        }

    }
</script>

