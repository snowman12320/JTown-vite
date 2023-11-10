<script>
import HomeCarousel from '@/components/HomeCarousel.vue';
import HomeStory from '@/components/HomeStory.vue';
import FrontNavbar from '@/components/FrontNavbar.vue';
import FullFooter from '@/components/FullFooter.vue';

import loginStore from '@/stores/loginStore.js';
import { mapActions, mapState } from 'pinia';

export default {
    name: 'HomeView',
    components: {
        FrontNavbar,
        HomeCarousel,
        HomeStory,
        FullFooter
    },
    mounted() {
        this.checkLoginStatus();
    },
    computed: {
        ...mapState(loginStore, ['isLoading', 'isLogin'])
    },
    methods: {
        ...mapActions(loginStore, ['checkLoginStatus'])
    }
};
</script>

<template>
    <div class="position-relative">
        <LoadingMask :active="isLoading" />
        <FrontNavbar></FrontNavbar>
        <HomeCarousel></HomeCarousel>
        <div class="container-xxl">
            <HomeStory customClass="text-nbaBlue"></HomeStory>
        </div>
        <FullFooter></FullFooter>
    </div>
</template>
