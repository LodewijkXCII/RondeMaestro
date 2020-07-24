<template>
	<div>
		<h1>Login</h1>
		<form>
			<label for="email">Email:</label>
			<input v-model="user.email" type="email" name="email" id="email" required />
			<label for="password">Wachtwoord:</label>
			<input v-model="user.password" type="password" name="password" id="password" required />
			<button class="btn btn-primary" type="submit">Login</button>
		</form>
		<small>
			Nog geen account?
			<router-link to="Signup">Meld je aan!</router-link>
		</small>
	</div>
</template>

<script>
import * as yup from "yup";

const URL = "http://localhost:1992/api/v1";

const schema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.email()
		.required(),
	password: yup
		.string()
		.min(8)
		.max(200)
		.matches(/[^A-Za-z0-9]/, "password must contain a special character")
		.matches(/[A-Z]/, "password must contain an uppercase letter")
		.matches(/[a-z]/, "password must contain a lowercase letter")
		.matches(/[0-9]/, "password must contain a number")
		.required()
});

export default {
	data() {
		return {
			errorMessage: "",
			logginIn: false,
			user: {
				email: "",
				password: ""
			}
		};
	},
	methods: {
		login() {
			this.errorMessage = "";
			if (this.validUser()) {
				this.logginIn = true;
				const body = {
					email: this.user.email,
					password: this.user.password
				};

				fetch(URL, {
					method: "POST",
					headers: {
						"content-type": "application/json"
					},
					body: JSON.stringify(body)
				})
					.then(response => {
						if (response.ok) {
							return response.json();
						}
						return response.json().then(error => {
							throw new Error(error.message);
						});
					})
					.then(result => {
						localStorage.token = result.token;
						setTimeout(() => {
							this.logginIn = false;
							this.$router.push("/dashboard");
						}, 1000);
					})
					.catch(error => {
						setTimeout(() => {
							this.logginIn = false;
							this.errorMessage = error.message;
						}, 1000);
					});
			}
		},
		validUser() {
			const result = schema.validate(this.user, schema);
			if (result.error === null) {
				return true;
			}
			if (result.error.message.includes("email")) {
				this.errorMessage = "Email adres verkeerd";
			} else {
				this.errorMessage = "Verkeerd wachtwoord";
			}

			return false;
		}
	}
};
</script>

<style></style>
