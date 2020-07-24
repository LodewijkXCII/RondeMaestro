<template>
	<section class="PrevNext">
		<!-- <router-link :to="{ name: 'etappe-single', EtappeID: { EtappeID } }"> -->
		<div class="PrevNext__prev" @click="prevEtappe()">
			<img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
			<span>Vorige Etappe</span>
		</div>
		<!-- </router-link> -->
		<div class="PrevNext__next" @click="nextEtappe()">
			<span>Volgende Etappe</span>
			<img src="@/assets/icons/chevrons-right.svg" alt="chevron-right" />
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		prevEtappe() {
			const prevStage = +this.$attrs.etappe - 1;
			this.$router.replace({
				name: "selectie",
				params: { etappeID: prevStage }
			});
			console.log(prevStage);
		},
		nextEtappe() {
			const nextStage = +this.$attrs.etappe + 1;
			this.$router.replace({
				name: "selectie",
				params: { etappeID: nextStage }
			});
		}
	}
};
</script>

<style lang="scss">
.PrevNext a {
	display: flex;
	// justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 0.5em;

	font-weight: 700;
	font-size: 0.75rem;
	text-transform: uppercase;

	&__next,
	&__prev {
		display: flex;
		align-items: center;
		cursor: pointer;

		span {
			margin: 0 0.2em;
		}

		img {
			width: 15px;
			height: auto;
		}
	}
}
</style>
