<template>
	<div class="holder">
		<NewCard/>
		<SpeechCard :item="item" v-for="(item,index) in list" :key="index" />
	</div>
</template>

<script>
import PouchDB from 'pouchdb-browser';
import SpeechCard from '@/components/Speech/SpeechCard';
import NewCard from '@/components/Speech/NewCard';
export default {
	name: 'AllSpeech',
	components: {
		SpeechCard,
		NewCard
	},
	data() {
		return {
			list: []
		};
	},
	mounted() {
		var db = new PouchDB('speechdb');
		var vm = this;
		db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
			vm.list = doc.rows.map(x => x.doc).map(x => {
				x.date = vm.formatDate(new Date(x.date));
				return x;
			});
		});
	},
	methods: {
		formatDate(date) {
			var monthNames = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			];

			var day = date.getDate();
			var monthIndex = date.getMonth();
			var year = date.getFullYear();

			return day + ' ' + monthNames[monthIndex] + ' ' + year;
		}
	}
};
</script>

<style scoped>
.holder {
	padding: 16px;
	display: grid;
	grid-gap: 16px;
	grid-template-columns: repeat(auto-fit, 250px);
}

@media screen and (max-width: 600px) {
	.holder {
		grid-template-columns: 1fr 1fr;
	}
}
</style>