<template>
	<section class="filter">
		<label for="name">Zoek op naam:</label>
		<input type="text" name="name" id="name" v-model="name" />
		<div class="half">
			<div class="half--block">
				<label for="team">Zoek op team:</label>
				<select name="team" id="team" v-model="team">
					<option value></option>
				</select>
			</div>

			<div class="half--block">
				<label for="spec">Zoek op specialisme:</label>
				<select name="spec" id="spec" v-model="spec">
					<option value></option>
				</select>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			name: "",
			team: "",
			spec: ""
		};
	}
};
</script>

<style lang="scss">
.filter {
	margin-top: 0.75em;
	.half {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1em;
	}
}
label {
	display: block;
}
</style>
