<template>
	<div id="app">
		<NavBar />
		<router-view class="container" />
		<section v-if="!isHome">
			<BottomNav />
		</section>
	</div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import BottomNav from "@/components/BottomNav.vue";

export default {
	components: {
		NavBar,
		BottomNav,
	},

	data() {
		return {};
	},

	computed: {
		isHome() {
			return this.$route.name === "Home";
		},
	},
};
</script>

<style lang="scss">
@import "@/assets/styles.scss";

* {
	box-sizing: border-box;
	margin: 0;
}

body {
	font-family: "Roboto", sans-serif;
	font-size: 0.8125rem;
	margin: 0;
	padding: 1.2em;
	background: #f5f5f5;
}

//CONFIG//
.container {
	padding: 2em 0.5em;
	max-width: 350px;
	margin-bottom: 4em;
}
</style>
