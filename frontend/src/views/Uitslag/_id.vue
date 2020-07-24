<template>
	<section>
		<section class="PrevNext">
			<router-link to="/etappe-uitslag">
				<img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
				<span>Terug naar het etappe overzicht</span>
			</router-link>
		</section>
		<h1>Uitslag Etappe {{stage}}</h1>

		<div :key="index" v-for="(field, name, index) in uitslag" class="etappeUitslag">
			<label :for="field">{{name + 1 }}:</label>
			<select v-for="key in Object.keys(field)" :key="key.index" v-model="field[key]">
				<option
					v-for="renner in renners"
					:key="renner.index"
					:value="renner.id"
				>{{ renner.race_number }} - {{renner.first_name}} {{renner.last_name}}</option>
			</select>
		</div>

		<button class="btn btn-alert" v-on:click="etappeSubmit()">Verstuur</button>
	</section>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			renners: [],
			stage: parseInt(this.$route.params.etappeID, 10 || 0),
			uitslag: [
				{ one: null },
				{ two: null },
				{ three: null },
				{ four: null },
				{ five: null },
				{ six: null },
				{ seven: null },
				{ eight: null },
				{ nine: null },
				{ ten: null },
				{ eleven: null },
				{ twelve: null },
				{ thirtheen: null },
				{ fourtheen: null },
				{ fiftheen: null },
			],
		};
	},
	created() {
		axios.get("http://localhost:1992/api/v1/cyclists").then((renners) => {
			this.renners = renners.data.sort((a, b) =>
				a.race_number > b.race_number ? 1 : -1
			);
		});
	},
	methods: {
		etappeSubmit() {
			console.log("Jeej");
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