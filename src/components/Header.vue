<template>
    <header class="header">
        <div class="header__container">

            <router-link v-if="loginToken" :to="{ name: 'home'}" class="logo">
                <LogoIcon></LogoIcon>
            </router-link>

            <router-link v-if="!loginToken" to="/" class="logo">
                <LogoIcon></LogoIcon>
            </router-link>

            <router-link v-if="!loginToken" :to="{ name: 'login'}" class="login">
                <div class="login__icon">
                    <LoginIcon></LoginIcon>
                </div>
                <div class="login__text">
                    <p>Login to try Tagnet</p>
                </div>
            </router-link>

            <router-link v-else to="profile" class="img-holder">
                <img :src="profile" alt="">
            </router-link>

        </div>
    </header>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import { TagType } from '@/store/tags';
    import LogoIcon from '@/assets/svg/header/logo.svg';
    import LoginIcon from '@/assets/svg/header/login.svg';

    @Component({
        components: {
            LogoIcon,
            LoginIcon
        }
    })
    export default class Header extends Vue {
        profile: string = localStorage.getItem('TAGNET-picture');
        cssStr: string = '';
        loggedIn: boolean = true;
        loginToken: boolean = !!window.localStorage.getItem('TAGNET-user');

        beforeMount() {
            this.cssStr = `background-image:url(${this.profile});`;
        }
    }
</script>


