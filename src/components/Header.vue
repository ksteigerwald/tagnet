<template>
    <div>
        <header class="header">
            <div class="header__container">
                <a class="logo" href="#">
                    <LogoIcon></LogoIcon>
                </a>
                <router-link v-if="!loggedIn" :to="{ name: 'login'}" class="login">
                    <div class="login__icon">
                        <LoginIcon></LoginIcon>
                    </div>
                    <div class="login__text">
                        <p>Login to try Tagnet</p>
                    </div>
                </router-link>

                <div v-else class="img-holder"><img :src="profile" alt=""></div>

            </div>
        </header>

        <!--<header v-if="loggedIn" id="header">-->
            <!--<div class="main-head">-->
                <!--<div class="main-head__container">-->
                    <!--&lt;!&ndash;<router-link :to="{ name: 'home'}">&ndash;&gt;-->
                        <!--<img src="assets/images/logo.png" alt="logo">-->
                    <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
                    <!--<form autocomplete="off" class="my-head-form">-->
                        <!--<div class="main-search-box" id="main-search-box-two">-->
                            <!--<div class="form-group position-relative autocomplete">-->
                                <!--<input type="search" class="form-control"-->
                                       <!--placeholder="&#34;&#47;&#34;for Create,&#34;@&#34;for Append, or Search"-->
                                       <!--id="myInput2" name="myCountry">-->
                                <!--&lt;!&ndash;<img src="@/assets/images/feild-icon.svg" alt="" class="gol-img">&ndash;&gt;-->
                                <!--&lt;!&ndash;<button type="submit" class="creat-btn">Create <img src="@/assets/images/creat-btn.svg"&ndash;&gt;-->
                                                                                    <!--&lt;!&ndash;alt=""></button>&ndash;&gt;-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</form>-->
                    <!--<div class="head-brand ml-auto">-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</header>-->

    </div>
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

        beforeMount() {
            this.cssStr = `background-image:url(${this.profile});`
        }
    }
</script>


