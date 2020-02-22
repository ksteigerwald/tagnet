<template>
    <div class="register-page">
        <div class="register-page__container">
            <div class="register-page__left">
                <div class="register-page__title">
                    <p>Small steps for<br> something big</p>
                </div>
                <div class="register-page__background"></div>
            </div>
            <div class="register-page__right">
                <div class="register-page__form">
                    <amplify-confirm-sign-up :usernameAttributes="usernameAttributes" ></amplify-confirm-sign-up>
	
                </div>
                <div class="register-page__sing"><router-link to="/login">Already have an account? Login</router-link></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { AmplifyEventBus } from "aws-amplify-vue"

@Component({
	components: {}
})
export default class Confirm extends Vue {
	usernameAttributes: string = "email"
    mounted() {
        AmplifyEventBus.$on("authState", (info:any) => { 
       
        if(info === "signIn") {
         this.$router.push('/login')
       }
        if(info === "confirmSignUp") {
         this.$router.push('/confirm-signup')
       }
      
       console.log("AMP Event:", info)
     })
    }
};
</script>

