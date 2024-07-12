import { createRouter, createWebHistory } from 'vue-router';
import Notification from '../views/Notification.vue';
const routes = [
    {
        path : '/',
        meta: {
            title:'Home'
        },
        component: () => import('../views/Home.vue')
    },
    {
        path : '/charitydetail',
        meta: {
            title:'Campaign detail'
        },
        component: () => import('../views/CharityDetail.vue')
    },
    {
        path : '/connectWallet',
        meta: {
            title:'Connect wallet'
        },
        component: () => import('../views/ConnectWallet.vue')
    },
    {
        path : '/login',
        meta: {
            title:'Login page'
        },
        component: () => import('../views/Login.vue')
    },
    {
        path : '/dashboard',
        meta: {
            title:'User dashboard'
        },
        component: () => import('../views/Dashboard.vue')
    },
    {
        path : '/account-setting',
        meta: {
            title:'Profile settings'
        },
        component: () => import('../views/AccountSetting.vue')
    },
    {
        path : '/start-fundraising',
        meta: {
            title:'Create campaign'
        },
        component: () => import('../views/StartFunding.vue')
    },
    {
        path : '/notification',
        meta: {
            title:'Notifications'
        },
        component: Notification,
        name: 'Notification'
    },
    {
        path : '/admin/dashboard',
        meta: {
            title:'Admin dashboard'
        },
        component: () => import('../views/AdminPanel/Dashboard.vue')
    },
    {
        path : '/admin/login',
        meta: {
            title:'Admin login'
        },
        component: () => import('../views/AdminPanel/Login.vue')
    },
    {
        path : '/signup',
        meta: {
            title:'Create account'
        },
        component: () => import('@views/Signup.vue')
    },
    {
        path : '/admin/campaignManagement',
        meta: {
            title:'Manage campaign'
        },
        component: () => import('@views/AdminPanel/Campaign.vue')
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Set the page title dynamically when the route changes
router.beforeEach((to, from, next) => {
    //check if it has logged in
    const isLoggedIn = localStorage.getItem('x-login') || 'false'
    const too = to.path; 
    if(too == '/dashboard' || too == '/account-setting'  || too == '/start-fundraising') { 
      //redirect back if not logged in
      if(isLoggedIn == 'false') {console.log(too)
        next('/login')
      }
    }
    document.title = to.meta.title + "  | Fundblock";
    next();
});

export default router;

//stellar network add --global mainnet --rpc-url https://mainnet.stellar.validationcloud.io/v1/vfYPZayzy34E4hjJzTtSdM9-f1lWYg-ZI5EoLcNK4Jg --network-passphrase "Public Global Stellar Network ; September 2015"