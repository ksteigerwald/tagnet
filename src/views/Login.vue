<template>
<section class="section">
	<div class="container">
		<div class="columns is-centered">

	<div class="card column is-half is-centered">
		<h1>Login</h1>
		<form @submit="handleSubmit">
			<div class="form-group">
				<label class="label" for="username">Username</label>
				<input type="text" v-model="username" name="username" class="input form-control" :class="{ 'is-invalid': submitted && !username }" />
				<div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
			</div>
			<div class="form-group">
				<label class="label" htmlFor="password">Password</label>
				<input type="password" v-model="password" name="password" class="input form-control" :class="{ 'is-invalid': submitted && !password }" />
				<div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
			</div>
			<div class="form-group">
				<a :href="authLink()" class="loginBtn loginBtn--google">
  				Login with Google
				</a>
				<button class="btn btn-primary" :disabled="loggingIn">Login</button>
				<img v-show="loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
			</div>
		</form>
	</div>

		</div>
	</div>
</section>
	
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { User, UserState } from '@/types'
@Component({
	components: {
	}
})
export default class Login extends Vue {

	username: string = ''
	password: string = ''
	submitted: boolean = false

    @Getter('user/status') logginInStatus: any
	
	get loggingIn() {
		return this.logginInStatus
	}
    
    authLink() {
        let redirect:string = (process.env.NODE_ENV === 'production') ? 'tagnet.herokuapp.com' : 'localhost:8080';
        let proc:string = (process.env.NODE_ENV === 'production') ? 'https' : 'http';
        return `https://tagnet.auth0.com/login?client=2rUl0BvJ91rrfBI7t0tXcFC6yxx0HF3K&protocol=oauth2&response_type=token id_token&redirect_uri=${proc}://${redirect}/callback&scope=openid profile`
    }
	created() {
		//console.log(this)
	}

	handleSubmit (e: any) {
		e.preventDefault();

		this.submitted = true;
		const { username, password } = this;
		const { dispatch } = this.$store;

		if (username && password) {
			dispatch('user/login', { username, password });
		}
	}
};
</script>

<style lang="scss">

/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 5px 15px 5px 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}


/* Facebook */
.loginBtn--facebook {
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}


/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}	
</style>