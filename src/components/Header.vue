<template>
    <header class="header">
        <div class="header__container">

            <router-link v-if="loggedIn" :to="{ name: 'home'}" class="logo">
                <LogoIcon></LogoIcon>
            </router-link>

            <router-link v-if="!loggedIn" to="/" class="logo">
                <LogoIcon></LogoIcon>
            </router-link>

            <router-link v-if="!loggedIn" :to="{ name: 'login'}" class="login">
                <div class="login__icon">
                    <LoginIcon></LoginIcon>
                </div>
                <div class="login__text">
                    <p>Login to try Tagnet</p>
                </div>
            </router-link>

            <router-link v-else to="profile" class="img-holder">
                <img :src="getAvatar()" alt="">
            </router-link>

        </div>
    </header>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import LogoIcon from '@/assets/svg/header/logo.svg';
    import LoginIcon from '@/assets/svg/header/login.svg';

    import { TagType } from '@/store/tags';

    @Component({
        components: {
            LogoIcon,
            LoginIcon
        }
    })
    export default class Header extends Vue {

        @Prop() user: any

        loggedIn: boolean = false
        cssStr: string = '';

        @Watch('user') 
        onUserUpdate() {
            this.setProfile()    
        }

        getAvatar(): string {
            return `https://api.adorable.io/avatars/50/${this.user.username}@adorable.io.png`
        }

        beforeMount() {
            console.log(this.user, this.loggedIn)
        }

        setProfile() {
            this.cssStr = `background-image:url(${this.getAvatar()});`;
            this.loggedIn = true
        }

        mounted() {
            if(this.user) {
                this.setProfile()
            }
        }
    }
</script>


