<template>
	<div class="selectedRiders">
		<h3>Je selectie voor etappe %NR%</h3>
		<h4>Geselecteerd: {{ countSelectie }}/8</h4>
		<ul>
			<li v-for="renSelect in selectie" :key="renSelect.index">
				{{ renSelect.first_name.charAt(0) }}. {{ renSelect.last_name }}
				<!-- <span @click="removeSelectie(renSelect.indexOf(renSelect))">x</span> -->
			</li>
		</ul>
		<div class="deleteSelected">
			<button @click.prevent="delSelectie()">Wis selectie</button>
		</div>
		<div class="submit">
			<button @click.prevent="submitSelectie()">Verstuur</button>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

// const URL = 'http://localhost:1992/api/v1/auth/signup';

export default {
	computed: {
		...mapGetters(["countSelectie"]),
		...mapState(["selectie"])
	},
	methods: {
		...mapMutations(["deleteSelectie"]),
		...mapActions(["removeAll"]),
		...mapActions(["removeSelectie"]),

		delSelectie() {
			this.removeAll();
		}
		// sumbitSelectie() {
		//   fetch(URL, {
		//     method: 'POST',
		//     body: JSON.stringify(body),
		//     headers: {
		//       'content-type': 'application/json',
		//     },
		//   }).then();
		// },
	}
};
</script>

<style lang="scss">
.selectedRiders {
	position: fixed;
	background: black;
	top: 0;
	color: white;
	right: 0;
	z-index: 100;
}
</style>
