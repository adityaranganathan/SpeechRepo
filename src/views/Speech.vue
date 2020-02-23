<template>
  <div class="home">
    <nav class="header-button-wrapper">
      <router-link to="/speech/all" class="header-button" :class="{ 'selected':$route.path == '/speech/all' }">All Speeches</router-link>
      <router-link to="/speech/my" class="header-button" :class="{ 'selected':$route.path == '/speech/my' }">My Speeches</router-link>
    </nav>
    <router-view/>
  </div>
</template>


<script>
export default {
	name: 'Speech'
};
</script>


<style scoped>
.header-button-wrapper {
	text-align: left;
	padding: 16px;
	display: block;
	white-space: nowrap;
}
.header-button {
	text-decoration: none;
	margin-right: 16px;
	cursor: pointer;
	color: #b6b6b6;
	font-size: 2rem;
	font-weight: 700;
}

.header-button.selected {
	color: #47525e;
}

@media screen and (max-width: 600px) {
  .header-button {
    font-size: 1.5rem;
  }
}
</style>