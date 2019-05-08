<template>
	<div>
		<div class="alert alert-info">
			Username: test<br />
			Password: test
		</div>
		<h2>Login</h2>
		<form @submit="handleSubmit">
			<div class="form-group">
				<label for="username">Username</label>
				<input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
				<div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
			</div>
			<div class="form-group">
				<label htmlFor="password">Password</label>
				<input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
				<div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
			</div>
			<div class="form-group">
                <a :href="authLink()"> login here</a>
				<button class="btn btn-primary" :disabled="loggingIn">Login</button>
				<img v-show="loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
			</div>
		</form>
	</div>
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
