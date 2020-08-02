<template>
	<section>
		<SelectedRiders />
		<section class="PrevNext">
			<router-link to="/etappe-overzicht">
				<img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
				<span>Terug naar het etappe overzicht</span>
			</router-link>
			<!-- <div class="PrevNext__prev">
				<router-link :to="{name: 'selectie', params: { etappeID: '2' }}">
					<img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
					<span>Vorige Etappe</span>
				</router-link>
			</div>
			<div class="PrevNext__next" @click="nextEtappe()">
				<span>Volgende Etappe</span>
				<img src="@/assets/icons/chevrons-right.svg" alt="chevron-right" />
			</div>-->
		</section>
		<h1>Kies je renners voor etappe {{ etappe.stage_nr }}</h1>
		<div class="etappeInfo">
			<div class="etappeInfo__left">
				<div>{{ etappe.start_city }} - {{ etappe.finish_city }}</div>
				<div>{{ etappe.name }}</div>
				<div>Type: {{ etappe.stage_type }}</div>
				<div>Afstand: {{ etappe.distance }} km</div>
			</div>
			<div class="etappeInfo__right">
				<router-link :to="`/etappe-overzicht/${this.$route.params.etappeID}`">
					<div>Etappe info</div>
				</router-link>
			</div>
		</div>
		<FilterOptions />
		<div class="renners">
			<div
				class="renner"
				v-for="(renner, index) in renners"
				:key="renner.index"
				@click="toSelectie(renner, index)"
				:class="{
          withdraw: renner.withdraw,
          selected: renner.selected,
        }"
			>
				<div class="renner__img">
					<img v-if="renner.image_url !== '/'" :src="renner.image_url" alt />
					<img v-else src="https://via.placeholder.com/50x50.png?" alt />
				</div>
				<div class="renner__info">
					<div class="renner__info-top">
						<div class="renner__info-top--number">
							<h3>#{{ renner.race_number }}</h3>
						</div>
						<div class="renner__info-top--flag">
							<flag :iso="renner.country_name" :squared="false" />
						</div>
					</div>
					<div class="renner__info--name">
						{{ renner.first_name }}
						<span class="lastName">{{ renner.last_name }}</span>
					</div>
					<div class="renner__info--team">{{ renner.team_name }}</div>
				</div>
				<div class="renner__extra">
					<div class="renner__extra--speciality">
						<span v-if="renner.speciality_name">{{ renner.speciality_name }}</span>
						<span v-if="renner.speciality_id_2">/ {{ renner.speciality_id_2 }}</span>
					</div>
					<div class="renner__extra--points">
						<h2>100pt</h2>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import FilterOptions from "@/components/FilterOptions.vue";
import SelectedRiders from "@/components/SelectedRiders.vue";

import axios from "axios";
import lodash from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
	name: "RennerOverview",
	components: {
		SelectedRiders,
		FilterOptions,
	},
	data() {
		return {
			renners: [],
			etappe: "",

			error: false,
			isSelected: false,
		};
	},
	computed: {
		...mapState(["selectie"]),
		...mapGetters(["countSelectie"]),

		currentSelectie(state) {
			this.selectie = state.selectie;
		},
	},
	methods: {
		...mapMutations(["addToSelectie", "setEtappes"]),
		...mapActions(["removeSelectie"]),
		...mapActions(["removeAll"]),

		toEtappe(etappe) {
			this.setEtappes(etappe);
		},
		toSelectie(renner, index) {
			//TODO verwijder renner doet het niet goed
			if (this.selectie.includes(renner)) {
				this.removeSelectie(this.selectie.indexOf(renner));
			} else if (this.countSelectie >= 10) {
				console.error("teveel!");
			} else {
				this.addToSelectie(renner);
			}
		},
	},

	created() {
		this.removeAll();

		axios
			.all([
				axios.get("http://localhost:1992/api/v1/cyclists?startlist=true"),
				axios.get(
					`http://localhost:1992/api/v1/stages/${this.$route.params.etappeID}`
				),
				axios.get(
					`http://localhost:1992/api/v1/entries?users_id=2&stage_id=${this.$route.params.etappeID}`
				),
			])
			.then(
				axios.spread((renners, etappeinfo, selectie) => {
					this.renners = renners.data.sort((a, b) =>
						a.race_number > b.race_number ? 1 : -1
					);
					this.etappe = etappeinfo.data;
					this.toEtappe(etappeinfo.data.id);
					selectie.data.forEach((cyclist) => {
						this.addToSelectie(cyclist);
					});
				})
			);
	},
};
</script>

<style lang="scss">
@import "@/assets/styles.scss";

.etappeInfo {
	display: grid;
	grid-template-columns: 2fr 1fr;
	padding: 1em;
	background: #fff;
	border-radius: 15px;

	&__left {
		border-right: 1px solid $primary-color;
	}

	&__right {
		margin: auto;

		a {
			color: $alert-color;
		}
	}
}

.renners {
	display: grid;
	gap: 0.5em;

	.renner {
		display: grid;
		grid-template-columns: 75px 3fr 1fr;
		align-items: center;
		background: white;
		padding: 0.5em 0.2em;

		&:nth-child(8n) {
			margin-bottom: 1rem;
		}
		&__img {
			margin: 0.5em auto;

			img {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				border: 1px solid $secondary-color;
				margin: 0 auto;
			}
		}

		&__info {
			&-top {
				display: flex;
				&--number {
					margin-right: 0.5em;
				}
			}
			&--name {
				margin: 0.2em 0;
				.lastName {
					text-transform: uppercase;
					font-weight: 700;
				}
			}
			&--team {
				font-size: 0.7rem;
			}
		}

		&:hover {
			cursor: pointer;
		}

		&.withdraw {
			cursor: default;
			background: #f7f7f7;
			color: lightgray;

			img,
			span {
				filter: gray; /* IE6-9 */
				-webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
				filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
			}

			img {
				border: lightgray;
			}

			h2 {
				color: lightgray;
			}
		}
	}
}
</style>
