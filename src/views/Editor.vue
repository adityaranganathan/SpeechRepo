<template>
	<div class="root-div">

		<nav class="navi">
			<div class="left-holder">
				<div class="back-button">
					<i class="material-icons" @click="goBack()">arrow_back</i>
				</div>
				<input class="title" placeholder="Untitled Speech" v-model="title" />
			</div>
			<div class="date">
				<DatePicker v-model="date" :popover="{ placement: 'left-start', visibility: 'click' }">

					<div class="date-holder">
						<i class="material-icons">date_range</i>
						<div class="date-text">{{formatDate(date)}}</div>
					</div>
				</DatePicker>
			</div>
		</nav>

		<div class="top-holder">
			<input class="author" placeholder="Author Name" v-model="author" />
			<vue-tags-input placeholder="Add Tags (Enter or Tab)" class="tags" v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />
			<div class="delete-holder" @click="deleteSpeech()" v-if="$route.params.id != 'new'">
				<i class="material-icons">delete</i>Delete
			</div>
		</div>
		<div id="scrolling-container">
			<div id="editor">
				<h2>We Shall Fight on the Beaches</h2>
				<p><br></p>
				<p>We shall go on to the end, we shall fight in France,<br/>we shall fight on the seas and oceans,<br/>we shall fight with growing confidence and growing strength in the air,<br/>we shall defend our Island, whatever the cost may be,<br/>we shall fight on the beaches,<br/>we shall fight on the landing grounds,<br/>we shall fight in the fields and in the streets,<br/>we shall fight in the hills;
				</p><br/>
<p>we shall never surrender, and even if, which I do not for a moment believe, this Island or a large part of it were subjugated and starving, then our Empire beyond the seas, armed and guarded by the British Fleet, would carry on the struggle, until, in God’s good time, the New World, with all its power and might, steps forth to the rescue and the liberation of the old.</p>
				<br>
				<h3>- W Churchill</h3>
			</div>
		</div>

		<div class="save-button shadow" @click="save()"
			:class="{'active':isSpeechValidForSave()}"
		>
			<i class="material-icons">save</i>
		</div>
	</div>
</template>


<script>
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { VueTagsInput, createTags } from '@johmun/vue-tags-input';
import PouchDB from 'pouchdb-browser';
export default {
	name: 'Editor',
	components: {
		DatePicker,
		VueTagsInput
	},
	data() {
		return {
			quill: null,
			title: '',
			author: '',
			tag: '',
			tags: [],
			date: new Date()
		};
	},
	mounted() {
		// eslint-disable-next-line
		this.quill = new Quill('#editor', {
			modules: {
				toolbar: [
					[{ header: [1, 2, false] }],
					['bold', 'italic', 'underline'],
					['image', 'code-block']
				]
			},
			scrollingContainer: '#scrolling-container',
			placeholder: 'Compose an epic...',
			theme: 'bubble'
		});

		if (this.$route.params.id != 'new') {
			var vm = this;
			var db = new PouchDB('speechdb');
			db.get(this.$route.params.id).then(function(doc) {
				vm.title = doc.title;
				vm.author = doc.author;
				vm.date = new Date(doc.date);
				vm.tags = createTags(doc.tags);
				vm.quill.setContents(doc.content);
			});
		}
	},
	methods: {
		isSpeechValidForSave(){
			if (this.title == '') return false
			else if (this.author == '') return false
			else if (this.tags.length == 0) return false
			return true
		},
		goBack() {
			this.$router.go(-1);
		},
		deleteSpeech(){
			var db = new PouchDB('speechdb');
			var vm = this;
			db.get(this.$route.params.id).then((doc) => {
				return db.remove(doc);
			}).then(()=>{
				vm.$toasted.show('Deleted', {
					duration: 2000,
					className: 'robo-toast'
				});
				vm.goBack();
			})
		},
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
		},
		save() {
			if (this.title == '') {
				this.$toasted.show('Please enter a title', {
					duration: 2000,
					className: 'robo-toast'
				});
			} else if (this.author == '') {
				this.$toasted.show('Please enter author name', {
					duration: 2000,
					className: 'robo-toast'
				});
			} else if (this.tags.length == 0) {
				this.$toasted.show('Please enter a tag!', {
					duration: 2000,
					className: 'robo-toast'
				});
			} else {
				var db = new PouchDB('speechdb');
				var vm = this;

				if (this.$route.params.id == 'new') {
					var id = new Date().getTime() + '';
					var data = {
						_id: id,
						title: this.title,
						author: this.author,
						tags: this.tags.map(x => x.text),
						date: this.date.getTime(),
						content: this.quill.getContents(),
						html: this.quill.container.firstChild.innerHTML
					};

					// eslint-disable-next-line
					db.put(data, function callback(err, result) {
						if (!err) {
							vm.$toasted.show('Saved!', {
								duration: 2000,
								className: 'robo-toast'
							});
							vm.$router.replace('/editor/' + id);
						} else {
							// eslint-disable-next-line
							console.log(err);
							vm.$toasted.show('Some Error!', {
								duration: 2000,
								className: 'robo-toast'
							});
						}
					});
				} else {
					db
						.get(this.$route.params.id)
						.then(function(doc) {
							doc.title = vm.title;
							doc.author = vm.author;
							doc.tags = vm.tags.map(x => x.text);
							doc.date = vm.date.getTime();
							doc.content = vm.quill.getContents();
							doc.html = vm.quill.container.firstChild.innerHTML;
							return db.put(doc);
						})
						.then(() => {
							vm.$toasted.show('Saved!', {
								duration: 2000,
								className: 'robo-toast'
							});
						})
						.catch(err => {
							// eslint-disable-next-line
							console.log(err);
							vm.$toasted.show('Some Error!', {
								duration: 2000,
								className: 'robo-toast'
							});
						});
				}
			}
		}
	}
};
</script>

<style>
.vue-tags-input .ti-input {
	border: 1px solid #fff;
}
</style>

<style scoped>

.root-div{
    background-color: #fff;
	overflow-x: hidden;
}

.delete-holder {
	color: red;
	text-align: right;
	padding: 16px;
	cursor: pointer;
}
.top-holder{
box-shadow: 0px 14px 14px 0px rgba(0, 0, 0, 0.05);
}
.shadow {
	-webkit-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.18);
	-moz-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.18);
	box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.18);
}
.tags {
	text-decoration: none;
	border: none;
	margin-left: 40px;
}
.save-button {
	cursor: pointer;
	user-select: none;
	height: 64px;
	width: 64px;
	background: rgba(0,0,0,0.4);
	border-radius: 50%;
	color: white;
	text-align: center;
	position: fixed;
	right: 16px;
	bottom: 16px;
	transition: transform 300ms linear;
}
.save-button.active{
	background: #3498db;
	animation: pop 0.3s;
}

@keyframes pop {
  0% { transform: scale(1);; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.save-button i {
	line-height: 64px;
	font-size: 2rem;
}
#editor {
	height: auto;
	min-height: 100%;
	padding: 50px;
}
#editor .ql-editor {
	font-size: 18px;
	overflow-y: visible;
}

/* Specify our own scrolling container */
#scrolling-container {
	height: 100%;
	min-height: 100%;
	overflow-y: auto;
}

.navi {
	height: 42px;
}

.left-holder {
	display: flex;
justify-content: center;
align-items: center;
	position: absolute;
	left: 0;
	top: 0;
	padding: 8px;
}
.back-button {
	display: inline-block;
	margin-right: 8px;
	cursor: pointer;
}

.back-button i {
	font-size: 2rem;
}

.title {
	display: inline-block;
	line-height: 1;
	font-size: 2rem;
	text-decoration: none;
	border: none;
}
.author {
	font-size: 1.3rem;
	text-decoration: none;
	border: none;
	margin-left: 47px;
	margin-bottom: 16px;
	margin-top:10px;
}
.date {
	position: absolute;
	right: 16px;
	top: 16px;
	font-size: 1.2rem;
}

.date-text{
	display: inline;
	margin-left: 8px;
}
.date-holder{
	display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
}

@media screen and (max-width: 600px) {
	.title {
		font-size: 1.4rem;
	}
	.author { 
		font-size: 1.1rem;
	}
	.date-text{
		display: none;
	}
}
</style>
