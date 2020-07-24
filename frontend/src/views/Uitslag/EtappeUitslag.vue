<template>
	<section>
		<h1>Etappe uitslag invullen</h1>

		<div class="table">
			<div class="table-row header-row">
				<div class="t-header">#</div>
				<div class="t-header">Datum</div>
				<div class="t-header">Start en Finish</div>

				<div class="t-header"></div>
			</div>

			<div v-for="etappe in etappes" :key="etappe.id" class="table-row">
				<div class="t-cell">{{ etappe.stage_nr }}.</div>
				<div class="t-cell">{{ etappe.date | formatDate }}</div>
				<div class="t-cell regular">{{ etappe.start_city }} - {{ etappe.finish_city }}</div>

				<div class="t-cell">
					<router-link :to="{ name: 'uitslag-single', params: { etappeID: etappe.id } }" :id="etappe.id">
						<img src="@/assets/icons/edit.svg" alt="edit" />
					</router-link>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	//TODO bekijk of entry al in ingevuld.

	data() {
		return {
			etappes: {},
		};
	},
	created() {
		fetch("http://localhost:1992/api/v1/stages?race=1")
			.then((response) => response.json())
			.then((result) => {
				this.etappes = result;
			});
	},
};
</script>

<style lang="scss"></style>
