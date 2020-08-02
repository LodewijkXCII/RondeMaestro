<template>
	<section>
		<section class="PrevNext">
			<router-link to="/etappe-uitslag">
				<img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
				<span>Terug naar het etappe overzicht</span>
			</router-link>
		</section>
		<h1>Uitslag Etappe {{stage}}</h1>

		<div v-for="input in uitslag" :key="input.index" class="etappeUitslag">
			<label :for="input.position">{{input.position }}:</label>

			<select v-model="input.id">
				<option
					v-for="renner in renners"
					:key="renner.index"
					:value="renner.id"
				>#{{ renner.race_number }} - {{renner.first_name}} {{renner.last_name}}</option>
			</select>
		</div>

		<button class="btn btn-alert" v-on:click="etappeSubmit()">Verstuur</button>
	</section>
</template>

<script>
import axios from "axios";

const URL_CYCLIST = "http://localhost:1992/api/v1/cyclists?startlist=true";
const URL_RESULT = "http://localhost:1992/api/v1/results";

export default {
	data() {
		return {
			renners: [],
			stage: parseInt(this.$route.params.etappeID, 10 || 0),
			uitslag: [
				{ id: null, points: 100, position: 1 },
				{ id: null, points: 80, position: 2 },
				{ id: null, points: 63, position: 3 },
				{ id: null, points: 50, position: 4 },
				{ id: null, points: 41, position: 5 },
				{ id: null, points: 34, position: 6 },
				{ id: null, points: 29, position: 7 },
				{ id: null, points: 24, position: 8 },
				{ id: null, points: 19, position: 9 },
				{ id: null, points: 15, position: 10 },
				{ id: null, points: 12, position: 11 },
				{ id: null, points: 9, position: 12 },
				{ id: null, points: 7, position: 13 },
				{ id: null, points: 6, position: 14 },
				{ id: null, points: 5, position: 15 },
			],
		};
	},
	created() {
		axios.get(URL_CYCLIST).then((renners) => {
			this.renners = renners.data.sort((a, b) =>
				a.race_number > b.race_number ? 1 : -1
			);
		});
	},
	methods: {
		etappeSubmit() {
			this.uitslag.forEach((renner) => {
				axios
					.post(URL_RESULT, {
						position: renner.position,
						points: renner.points,
						stage_id: this.stage,
						cyclist_id: renner.id,
					})
					.then(function (response) {
						console.log(response);
					})
					.catch(function (error) {
						console.log(error);
					});
			});
		},
	},
};
</script>

<style lang="scss">
.etappeUitslag {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0.5rem 0;

	label {
		width: 15%;
		text-align: center;
		font-size: 1rem;
	}
}
</style>