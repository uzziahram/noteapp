
<template>
<div class="h-screen flex flex-col items-center">
	<!-- Form-->
	<div class="w-8/12 flex flex-col bg-zinc-800 p-10">
		<h1 class="p-4 self-center font-bold">Notes App</h1>
		<div class="self-center w-5/12 flex flex-col">
			<input type="text" v-model="note_title" class="input w-full b-" placeholder="Title" />
			<textarea class="textarea w-full mb-5" v-model="note_content" placeholder="Bio"></textarea>
			<button class="bg-zinc-900 h-10 cursor-pointer" @click="test">Create</button>
		</div>	
	</div>	

	<!-- list -->
	<div class="w-8/12 flex bg-zinc-800 justify-center">
		<div class="w-10/12  flex flex-col items-center font-mono">
			<Notecard v-for="note in notes" :note="note" :key="note.id"/>
		</div>		
	</div>
</div>
</template>


<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Notecard from './components/Notecard.vue';

const note_title = ref("")
const note_content = ref("")
const notes = ref([])


const fetchData = async () => {
	try {
		const res = await axios.get('http://localhost:3000/api/notes')
		notes.value = res.data
		console.log(res.data)
	} catch (error) {
		console.log(error)
	}
	
}

// dev rani
class note {
	constructor(title, content,id){
		this.title = title
		this.content = content
		this.id = id
	}
}


function test() {
	if(!note_title.value || !note_content.value) return

	const statenote = new note(note_title.value, note_content.value)

	note_title.value = ""
	note_content.value = ""

	notes.value.push(statenote)
	console.log(notes.value)
}

onMounted(fetchData)

</script>
