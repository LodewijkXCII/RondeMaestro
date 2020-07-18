<template>
	<section>
		<section class="PrevNext">
			<div class="PrevNext__prev">
				<router-link :to="{name: 'selectie', params: { etappeID: '2' }}">
					<img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
					<span>Vorige Etappe</span>
				</router-link>
			</div>
			<div class="PrevNext__next" @click="nextEtappe()">
				<span>Volgende Etappe</span>
				<img src="@/assets/icons/chevrons-right.svg" alt="chevron-right" />
			</div>
		</section>
		<h1>Kies je renners voor etappe {{ etappe.stage_nr }}</h1>
		<div class="etappeInfo">
			<div class="etappeInfo__left">
				<div>{{ etappe.start_city }} - {{ etappe.finish_city }}</div>
				<div>Type: {{ etappe.stage_type_id }}</div>
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
					<img v-if="renner.cyclist_image !== '/'" :src="renner.cyclist_image" alt />
					<img v-else src="https://via.placeholder.com/50x50.png?" alt />
				</div>
				<div class="renner__info">
					<div class="renner__info-top">
						<div class="renner__info-top--number">
							<h3>#{{ renner.race_number }}</h3>
						</div>
						<div class="renner__info-top--flag">
							<flag iso="fr" :squared="false" />
						</div>
					</div>
					<div class="renner__info--name">
						{{ renner.first_name }}
						<span class="lastName">{{ renner.last_name }}</span>
					</div>
					<div class="renner__info--team">{{ renner.team }}</div>
				</div>
				<div class="renner__extra">
					<div class="renner__extra--speciality">
						<span v-if="renner.speciality_id">{{ renner.speciality_id }}</span>
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
import PrevNext from "@/components/PrevNext.vue";
import FilterOptions from "@/components/FilterOptions.vue";
import lodash from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
	name: "RennerOverview",
	components: {
		PrevNext,
		FilterOptions
	},
	data() {
		return {
			renners: [],
			etappe: "",
			error: false,
			isSelected: false
		};
	},
	computed: {
		...mapState(["selectie"]),
		...mapGetters(["countSelectie"])
	},
	methods: {
		...mapMutations(["addToSelectie"]),
		...mapActions(["removeSelectie"]),

		toSelectie(renner, index) {
			if (this.selectie.includes(renner)) {
				this.removeSelectie(this.selectie.indexOf(renner));
			} else if (this.countSelectie >= 10) {
				console.error("teveel!");
			} else {
				this.addToSelectie(renner);
				// console.log(renner);
			}
		},
		prevEtappe() {
			const prevStage = +this.etappe.id - 1;
			this.$router.push({ name: "selectie", params: { etappeID: "2" } });
		},
		nextEtappe() {
			const nextStage = +this.etappe.id + 1;
			$router.resolve({
				name: "selectie",
				params: { etappeID: nextStage }
			}).href;
			console.log(nextStage);
		}
	},
	created() {
		fetch("http://localhost:1992/api/v1/startlist")
			.then(response => response.json())
			.then(result => {
				this.renners = result.sort((a, b) =>
					a.race_number > b.race_number ? 1 : -1
				);
			});
		fetch(`http://localhost:1992/api/v1/stages/${this.$route.params.etappeID}`)
			.then(response => response.json())
			.then(result => {
				this.etappe = result;
			});
	}
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
	}
}
</style>
