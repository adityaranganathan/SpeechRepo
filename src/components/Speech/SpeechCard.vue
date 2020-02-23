<template>
    <div class="card shadow" @click="$router.push('/editor/'+item._id)">
        <div class="preview" v-html="item.html"></div>
        <div class="bottom-holder">
            <div class="title">{{item.title}}</div>
            <div class="author">{{item.author}}</div>
            <div class="date">{{item.date}}</div>
        </div>

    </div>

</template>


<script>
export default {
    name:"SpeechCard",
    props: ["item"]
}
</script>






<style scoped>
.card{
    position: relative;
    width: 100%;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    will-change: transform;
    transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
}

.card:hover{
    transform: scale(1.05)
}
.shadow {
    -webkit-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.18);
    -moz-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.18);
    box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.18);
}

.preview{
    width: calc(100% - 32px);
    overflow: hidden;
    padding: 16px;
    background: white;
    height: 200px;
}


.bottom-holder{
    padding: 16px;
    box-shadow: 0px 0px 32px 0px rgba(0,0,0,0.4);
}

.title{
    text-align: left;
    font-size: 1.5rem;
    font-weight: 500;
}

.author{
    text-align: left;
    font-size: 1rem;
    font-weight: 500;
}
.date{
    text-align: right;
    margin-top: 16px;
    font-size: 1rem;
    color: rgba(0,0,0,0.4);
}

@media screen and (max-width: 600px) {
.preview{
    height: 150px;
}
.title{
    font-size: 1.1rem;
}
.author{
    font-size: 0.8rem;
}
    .date{
        font-size: 0.7rem;
    }
}
</style>