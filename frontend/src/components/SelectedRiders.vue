<template>
	<div class="selectedRiders">
		<h3>Je selectie voor etappe {{stage}}</h3>
		<h4>
			Geselecteerd:
			{{ countSelectie }}/8
		</h4>
		<ul>
			<li v-for="renSelect in selectie" :key="renSelect.index">
				<span @click="removeSelectie(renSelect)">X</span>
				{{ renSelect.first_name.charAt(0) }}. {{ renSelect.last_name }}
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
import axios from "axios";

const URL = "http://localhost:1992/api/v1/entries";

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters(["countSelectie"]),
		...mapState(["selectie", "stage"])
	},
	methods: {
		...mapMutations(["deleteSelectie"]),
		...mapActions(["removeAll", "removeSelectie"]),

		delSelectie() {
			this.removeAll();
		},
		// removeSelectie(renner) {
		// 	this.removeSelectie();
		// },

		async submitSelectie() {
			if (this.countSelectie !== 8) {
				window.alert("Er zijn er geen 8 ingevuld");
			} else {
				await axios
					.get(
						`http://localhost:1992/api/v1/entries?users_id=2&stage_id=${this.$route.params.etappeID}`
					)
					.then(response => {
						response.data.forEach(selected => {
							axios.put("http://localhost:1992/api/v1/entries", {
								users_id: 2,
								stage_id: this.stage,
								cyclist_id: selected.id
							});
							console.log(selected.id);
						});
					});
				// TODO USER_ID AS USER ID;

				await this.selectie.forEach(renner => {
					axios
						.post(URL, {
							users_id: 2,
							stage_id: this.stage,
							cyclist_id: renner.id
						})
						.then(function(response) {
							console.log(response);
						})
						.catch(function(error) {
							console.log(error);
						});
				});
				this.removeAll();
			}
		}
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
