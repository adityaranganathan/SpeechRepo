A<template>
    <div class="card shadow" @click="$router.push('/editor/new')">
        <div class="preview"></div>
        <div class="text">
            <i class="material-icons">add</i>
            <br> Add new Speech
        </div>
    </div>

</template>


<script>
export default {
	name: 'NewCard'
};
</script>






<style scoped>
.card {
	position: relative;
	width: 100%;
	background: white;
	border-radius: 10px;
	cursor: pointer;
	overflow: hidden;
	user-select: none;
}

.shadow {
	-webkit-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.18);
	-moz-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.18);
	box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.18);
}

.preview {
	width: 100%;
	padding-top: 100%;
	background: white;
}
.text {
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 1.3rem;
}
.text i {
	font-size: 3rem;
}

@media screen and (max-width: 600px) {
	.text {
		font-size: 1.1rem;
	}
	.text i {
		font-size: 2rem;
	}
}
</style>