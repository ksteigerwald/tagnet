<template>
    <div class="login-page">
      <div class="login-page__container">
        <div class="login-page__block">
          <div class="login-page__title">
            <p>Digital </br> de-cluttering, within your reach!</p>
          </div>
          <div class="login-page__form">
             <amplify-sign-in v-if="toggle === 1" :signInConfig="signInConfig" :usernameAttributes="usernameAttributes"></amplify-sign-in>
             <amplify-forgot-password v-if="toggle === 2" :usernameAttributes="usernameAttributes"></amplify-forgot-password>
             <amplify-sign-up v-if="toggle === 3" v-bind:signUpConfig="signUpConfig"></amplify-sign-up>   
             <p v-if="toggle === 4"> <h3>Please check your email and conirm your registration.</h3></p>
          <!--
            <div class="input">
              <label for="email">Email</label>
              <input type="email" id="email">
            </div>
            <div class="input">
              <label for="password">Password</label>
              <input type="password" id="password">
            </div><a class="button button--login" href="#"><span>Login</span></a>
          -->
          </div>
          <div class="login-page__social">
            <div class="login-page__social-title">
              <p>or login by</p>
            </div>
            <ul class="login-page__social-list">
              <li class="login-page__social-item login-page__social-item--fb"><a href="#"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 486.392 486.392" style="enable-background:new 0 0 486.392 486.392;" xml:space="preserve">
<g>
	<g>
		<g>
			<path  d="M243.196,0C108.891,0,0,108.891,0,243.196s108.891,243.196,243.196,243.196
				s243.196-108.891,243.196-243.196C486.392,108.861,377.501,0,243.196,0z M306.062,243.165l-39.854,0.03l-0.03,145.917h-54.689
				V243.196H175.01v-50.281l36.479-0.03l-0.061-29.609c0-41.039,11.126-65.997,59.431-65.997h40.249v50.311h-25.171
				c-18.817,0-19.729,7.022-19.729,20.124l-0.061,25.171h45.234L306.062,243.165z"/>
		</g>
	</g>
</g>
</svg>
</a>
</li>
              <li class="login-page__social-item login-page__social-item--google"><a ><svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="24px" height="24px" viewBox="0 0 24 24">
    <path fill-rule="evenodd"  fill="rgb(251, 187, 0)"
          d="M5.318,14.503 L4.483,17.622 L1.430,17.687 C0.517,15.994 -0.001,14.058 -0.001,12.000 C-0.001,10.010 0.484,8.134 1.341,6.481 L1.342,6.481 L4.060,6.979 L5.251,9.681 C5.002,10.408 4.866,11.188 4.866,12.000 C4.866,12.881 5.026,13.725 5.318,14.503 Z"/>
    <path fill-rule="evenodd"  fill="rgb(81, 142, 248)"
          d="M23.790,9.758 C23.928,10.484 24.000,11.234 24.000,12.000 C24.000,12.859 23.910,13.697 23.738,14.505 C23.153,17.256 21.627,19.658 19.512,21.358 L19.512,21.357 L16.087,21.182 L15.603,18.157 C17.006,17.334 18.103,16.047 18.680,14.505 L12.263,14.505 L12.263,9.758 L18.774,9.758 L23.790,9.758 L23.790,9.758 Z"/>
    <path fill-rule="evenodd"  fill="rgb(40, 180, 70)"
          d="M19.512,21.357 L19.512,21.358 C17.456,23.011 14.843,24.000 12.000,24.000 C7.430,24.000 3.457,21.446 1.430,17.687 L5.318,14.503 C6.332,17.208 8.941,19.133 12.000,19.133 C13.315,19.133 14.546,18.778 15.603,18.157 L19.512,21.357 Z"/>
    <path fill-rule="evenodd"  fill="rgb(241, 67, 54)"
          d="M19.659,2.762 L15.772,5.945 C14.678,5.261 13.385,4.866 12.000,4.866 C8.872,4.866 6.214,6.880 5.251,9.681 L1.342,6.481 L1.341,6.481 C3.339,2.631 7.362,-0.000 12.000,-0.000 C14.911,-0.000 17.581,1.037 19.659,2.762 Z"/>
</svg></a></li>
            </ul>
          </div>
          <div class="login-page__register"><a href="#">Don't have an account? Register</a></div>
        </div>
        <div class="login-page__background"></div>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { User, UserState } from '@/types'
import { AmplifyEventBus } from "aws-amplify-vue"

@Component({
	components: { }
})
export default class Login extends Vue {

  toggle: number = 1

	username: string = '';
	password: string = '';
	submitted: boolean = false;
	usernameAttributes: string = "email"
  signInConfig: any = {
    header: 'Sign In',
  }
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
  confirmSignUpConfig: {}
  confirmSignInConfig: {}
  forgotPasswordConfig: {}

  @Getter('user/status') logginInStatus: any;
	
	get loggingIn() {
		return this.logginInStatus
	}

  mounted() {
    AmplifyEventBus.$on("authState", (info:string) => { 
        switch(info) {
          case "signIn":
            this.toggle = 1;
            break;
          case "forgotPassword":
            this.toggle = 2
            break;
          case "signUp": 
            this.toggle = 3
            break;
          case "confirmSignUp":
            this.toggle = 4
            break;
          case "signedIn":
            this.$router.push('/home')
            break
          default:
            console.log('hits default')
            this.toggle = 1
            break;
        }
       console.log("AMP Event:", info)
     })
  }

};
</script>
