<script setup>
</script>

<template>
    <div class="hero">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-6">
                <h1>Manage your book library easily</h1>
                <p>This simple website will allow you to search and manage your books collection using Open Book API</p>
            </div>
            <div class="col-6 txt-right">
                <img src="/public/hero.webp" alt="" width={500} height={500} />
            </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.hero {
    background-color: #02543c;

    h1 {
        font-size: 50px;
        font-weight: bold;
        text-transform: uppercase;
        color: #f7323f;
    }

    p {
        color: white;
        font-size: 24px;
    }
}

.txt-right {
    text-align: right;
}

.margin-top {
    margin-top: 50px;
}
</style>