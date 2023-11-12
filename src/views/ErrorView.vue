<template>
    <main class="main">
        <div class="container">
            <div class="relative">
                <div class="absolute-center">
                    <div class="heading">Under construction.</div>
                    <button type="button" class="btn-link rounded-pill">Go Back</button>
                </div>
                <div class="img">
                    <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt="404-1" />
                </div>
            </div>
            <div>
                <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="404-2" />
            </div>
            <div class="brightness-overlay"></div>
            <RouterLink to="/" class="fullscreen-link"></RouterLink>
        </div>
        <div id="cursor" :style="cursorStyle" class="absolute hidden"></div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            cursorStyle: {
                top: '0px',
                left: '0px'
            }
        };
    },
    mounted() {
        document.addEventListener('mousemove', this.handleMouseMove);
    },
    beforeUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
    },
    methods: {
        handleMouseMove(e) {
            this.cursorStyle.top = `${e.clientY}px`;
            this.cursorStyle.left = `${e.clientX}px`;
            const cursor = document.querySelector('#cursor');
            cursor.classList.remove('hidden');
        }
    }
};
</script>

<style scoped lang="scss">
#cursor {
    transition: all 0.1s ease;
    transform: scale(0);
    box-shadow: 0px 0px 50px 5px #fff;
    pointer-events: none;
}

#cursor:not(.hidden) {
    transform: scale(1);
    box-shadow: 0px 0px 40px 50px rgba(255, 255, 255, 0.3);
}

.main {
    position: absolute;
    inset: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
}

.container {
    margin: auto;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 2px 20px;
}

.relative {
    position: relative;
    padding-bottom: 12px;
}

.absolute-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.heading {
    margin-top: 12px;
    text-align: center;
    font-size: 70px;
    font-weight: bold;
    letter-spacing: 0.1em;
    color: #0253a5;
    line-height: 1.1;
    padding: 20px 0px;
    text-shadow: 0 3px 1px black;
}

.btn-link {
    margin-top: 2px;
    padding: 4px 8px;
    width: 100%;
    text-align: center;
    background-color: #0253a5;
    color: white;
    border-radius: 4px;
    display: inline-block;
    text-decoration: none;
    font-size: 50px;
    transition: all;
    transition-duration: 500ms;
    box-shadow: 0 5px 1px black;
    transform: translateY(-5px);
    border: none;
    &:hover {
        box-shadow: 0 6px 1px black;
        transform: translateY(-8px);
    }
    &:focus {
        box-shadow: 0 3px 1px black;
        transform: translateY(0px);
    }
}

.btn-link:hover {
    background-color: #574ce6;
}

/* Image */
.img {
    display: block;
    text-align: center;
}

.brightness-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
}

.fullscreen-link {
    position: absolute;
    inset: 0;
}

/* Cursor */
#cursor {
    position: absolute;
    height: 3px;
    width: 3px;
    border-radius: 50%;
    background-color: white;
}

.hidden {
    display: none;
}

@media (min-width: 768px) {
    .container {
        padding: 20px 44px;
        flex-direction: row;
        gap: 28px;
    }
}

@media (min-width: 1024px) {
    .container {
        padding: 24px;
    }
}

@media (max-width: 768px) {
    .heading {
        font-size: 30px;
    }
    .btn-link {
        font-size: 30px;
    }

    img {
        height: 100px;
        width: auto;
    }
}
</style>
