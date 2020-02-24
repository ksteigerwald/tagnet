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
                    <amplify-sign-up v-bind:signUpConfig="signUpConfig"></amplify-sign-up>   
                    <!--
                    <div class="input">
                        <label for="fullname">Full Name</label>
                        <input type="text" id="fullname">
                    </div>
                    <div class="input">
                        <label for="email">Email</label>
                        <input type="email" id="email">
                    </div>
                    <div class="input">
                        <label for="password">Password</label>
                        <input type="password" id="password">
                    </div>
                    <div class="input">
                        <label for="cpassword">Confirm Password</label>
                        <input type="password" id="cpassword">
                    </div>
                    <div class="check">
                        <input type="checkbox" id="rules">
                        <label for="rules">Agree with term and conditions</label>
                    </div><a @click.prevent class="button button--register" href="#"><span>Register</span></a>
                    -->
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
export default class Register extends Vue {
    signUpConfig: any = {
        hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'username',
      required: true,
      placeholder: 'Email',
      type: 'email',
      displayOrder: 1,
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Password',
      type: 'password',
      displayOrder: 2,
    },
  ],
	}
    mounted() {
        AmplifyEventBus.$on("authState", (info:any) => { 
       
        if(info === "confirmSignUp") {
         this.$router.push('/confirm')
       }
        if(info === "signin") {
         this.$router.push('/login')
       }
      
       console.log("AMP Event:", info)
     })
    }
};
</script>

