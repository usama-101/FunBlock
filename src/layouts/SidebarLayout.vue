<template>
    <div class="flex min-h-screen w-full">
        <!-- Mobile Sidebar -->
        <div v-if="isSidebarOpen" class="">
            <div class="bg-gray-700 h-screen w-screen fixed z-50 opacity-70"></div>
            <div class="bg-white text-white  flex-none px-4 drop-shadow-md 2xl:max-w-64 absolute z-50 h-full">
                <button @click="isSidebarClose" class="absolute top-2 -right-10 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-7 h-7">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
                <img :src="Logo" alt="Logo" class="block px-4 py-12 mx-auto">
                <!-- Sidebar content goes here -->
                <ul class="space-y-3 mt-12">
                    <li>
                        <router-link to="/dashboard"
                            class="text-gray-900 hover:text-white font-medium w-full rounded-xl px-4 py-3 hover:bg-gradient-to-r from-secondaryblue to-secondarypink flex items-center justify-start gap-2"
                            active-class="text-white font-medium text-base bg-gradient-to-r from-secondaryblue to-secondarypink w-full rounded-md">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 22 23" fill="none">
                                    <path
                                        d="M0.781128 11.6452C0.781128 9.35677 0.781128 8.21256 1.30033 7.26402C1.81953 6.31549 2.76808 5.72679 4.66516 4.54941L6.66516 3.30815C8.67052 2.06357 9.67323 1.44128 10.7811 1.44128C11.889 1.44128 12.8917 2.06357 14.8971 3.30815L16.8971 4.5494C18.7942 5.72679 19.7427 6.31549 20.2619 7.26402C20.7811 8.21256 20.7811 9.35677 20.7811 11.6452V13.1663C20.7811 17.0671 20.7811 19.0176 19.6095 20.2294C18.438 21.4413 16.5523 21.4413 12.7811 21.4413H8.78113C5.00989 21.4413 3.12428 21.4413 1.9527 20.2294C0.781128 19.0176 0.781128 17.0671 0.781128 13.1663V11.6452Z"
                                        stroke="currentcolor" stroke-width="1.5" />
                                    <path d="M13.781 17.4413H7.78101" stroke="currentcolor" stroke-width="1.5"
                                        stroke-linecap="round" />
                                </svg>
                            </span>
                            Dashboard
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/products"
                            class="text-gray-900 hover:text-white font-medium w-full rounded-xl px-4 py-3 hover:bg-gradient-to-r from-secondaryblue to-secondarypink flex items-center justify-start gap-2"
                            active-class="text-white font-medium text-base bg-gradient-to-r from-secondaryblue to-secondarypink w-full rounded-md">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 22 22" fill="none">
                                    <rect x="1.21851" y="1.10828" width="13.1023" height="13.8274" rx="2.25" fill="none"
                                        stroke="currentcolor" stroke-width="1.5" />
                                    <rect x="7.24146" y="6.52417" width="13.1023" height="13.8274" rx="2.25" fill="none"
                                        stroke="currentcolor" stroke-width="1.5" />
                                </svg>
                            </span>
                            Products
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/order"
                            class="text-gray-900 hover:text-white font-medium w-full rounded-xl px-4 py-3 hover:bg-gradient-to-r from-secondaryblue to-secondarypink flex items-center justify-start gap-2"
                            active-class="text-white font-medium text-base bg-gradient-to-r from-secondaryblue to-secondarypink w-full rounded-md">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 22 28" fill="none">
                                    <path
                                        d="M17.924 1.72986H3.63827C2.06031 1.72986 0.781128 3.04667 0.781128 4.67103V23.7887C0.781128 25.413 2.06031 26.7299 3.63827 26.7299H17.924C19.5019 26.7299 20.7811 25.413 20.7811 23.7887V4.67103C20.7811 3.04667 19.5019 1.72986 17.924 1.72986Z"
                                        stroke="currentcolor" stroke-width="1.5" />
                                    <path d="M6.49548 10.0828H15.0669" stroke="currentcolor" stroke-width="1.5"
                                        stroke-linecap="round" />
                                    <path d="M6.49548 14.0828H15.0669" stroke="currentcolor" stroke-width="1.5"
                                        stroke-linecap="round" />
                                    <path d="M6.49548 18.0828H12.2098" stroke="currentcolor" stroke-width="1.5"
                                        stroke-linecap="round" />
                                </svg>
                            </span>
                            Orders
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/query"
                            class="text-gray-900 hover:text-white font-medium w-full rounded-xl px-4 py-3 hover:bg-gradient-to-r from-secondaryblue to-secondarypink flex items-center justify-start gap-2"
                            active-class="text-white font-medium text-base bg-gradient-to-r from-secondaryblue to-secondarypink w-full rounded-md">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 21 21" fill="none">
                                    <circle cx="10.7811" cy="10.7036" r="9.29346" stroke="currentcolor"
                                        stroke-width="1.5" />
                                    <path
                                        d="M9.98046 12.81V12.5328C9.98046 12.3563 9.99483 12.19 10.0236 12.034C10.0523 11.8738 10.0852 11.7363 10.1221 11.6213C10.1591 11.5022 10.2145 11.3832 10.2884 11.2641C10.3664 11.145 10.4342 11.0485 10.4917 10.9746C10.5491 10.9007 10.6313 10.8145 10.738 10.7159C10.8448 10.6174 10.9269 10.5455 10.9844 10.5004C11.0419 10.4511 11.1301 10.3813 11.2492 10.291C11.3806 10.1924 11.4833 10.1124 11.5572 10.0508C11.6352 9.98917 11.7255 9.90705 11.8282 9.8044C11.9308 9.69765 12.0088 9.59705 12.0622 9.50261C12.1156 9.40818 12.1607 9.29321 12.1977 9.15771C12.2388 9.02221 12.2593 8.8785 12.2593 8.72658C12.2593 8.30777 12.1197 7.97108 11.8405 7.7165C11.5613 7.45782 11.2102 7.32849 10.7873 7.32849C10.3726 7.32849 10.0174 7.45167 9.72178 7.69803C9.42615 7.94439 9.27012 8.27697 9.2537 8.69578H7.93567C7.94799 8.13737 8.09375 7.65286 8.37296 7.24226C8.65217 6.83166 9.00118 6.52782 9.41999 6.33073C9.8388 6.13364 10.2966 6.0351 10.7934 6.0351C11.3067 6.0351 11.7748 6.1398 12.1977 6.3492C12.6247 6.5545 12.9696 6.86451 13.2324 7.27921C13.4952 7.69392 13.6266 8.17638 13.6266 8.72658C13.6266 9.02632 13.5917 9.29526 13.5219 9.53341C13.4562 9.76745 13.3515 9.97891 13.2078 10.1678C13.0641 10.3567 12.9368 10.5024 12.8259 10.6051C12.7192 10.7077 12.5652 10.8391 12.364 10.9993C12.2162 11.1183 12.1135 11.2025 12.056 11.2518C11.9986 11.301 11.9144 11.3832 11.8035 11.4981C11.6968 11.609 11.6208 11.7075 11.5756 11.7938C11.5305 11.88 11.4874 11.9888 11.4463 12.1202C11.4052 12.2516 11.3847 12.3891 11.3847 12.5328V12.81H9.98046ZM9.91271 15.3721V13.7646H11.4463V15.3721H9.91271Z"
                                        fill="currentcolor" />
                                </svg>
                            </span>
                            Queries
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/product"
                            class="text-gray-900 hover:text-white font-medium w-full rounded-xl px-4 py-3 hover:bg-gradient-to-r from-secondaryblue to-secondarypink flex items-center justify-start gap-2"
                            active-class="text-white font-medium text-base bg-gradient-to-r from-secondaryblue to-secondarypink w-full rounded-md">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </span>
                            Settings
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Desktop Sidebar -->
        <div
            class="bg-white text-white hidden lg:block flex-none px-4 drop-shadow-md sticky top-0 h-screen max-w-64 w-full 2xl:max-w-xs w-full">
            <img :src="Logo" alt="Logo" class="hidden md:block px-4 pt-20 pb-0 mx-auto">
            <!-- Sidebar content goes here -->
            <ul class="space-y-3 mt-24">
                <li>
                    <router-link to="/admin/dashboard"
                        class="text-gray-900 hover:text-white font-medium w-full rounded-xl px-4 py-3 hover:bg-gradient-to-r from-secondaryblue to-secondarypink flex items-center justify-start gap-2"
                        active-class="text-white font-medium text-base bg-gradient-to-r from-secondaryblue to-secondarypink w-full rounded-md">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 22 23" fill="none">
                                <path
                                    d="M0.781128 11.6452C0.781128 9.35677 0.781128 8.21256 1.30033 7.26402C1.81953 6.31549 2.76808 5.72679 4.66516 4.54941L6.66516 3.30815C8.67052 2.06357 9.67323 1.44128 10.7811 1.44128C11.889 1.44128 12.8917 2.06357 14.8971 3.30815L16.8971 4.5494C18.7942 5.72679 19.7427 6.31549 20.2619 7.26402C20.7811 8.21256 20.7811 9.35677 20.7811 11.6452V13.1663C20.7811 17.0671 20.7811 19.0176 19.6095 20.2294C18.438 21.4413 16.5523 21.4413 12.7811 21.4413H8.78113C5.00989 21.4413 3.12428 21.4413 1.9527 20.2294C0.781128 19.0176 0.781128 17.0671 0.781128 13.1663V11.6452Z"
                                    stroke="currentcolor" stroke-width="1.5" />
                                <path d="M13.781 17.4413H7.78101" stroke="currentcolor" stroke-width="1.5"
                                    stroke-linecap="round" />
                            </svg>
                        </span>
                        Dashboard
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin/campaignManagement"
                        class="text-gray-900 hover:text-white font-medium w-full rounded-xl px-4 py-3 hover:bg-gradient-to-r from-secondaryblue to-secondarypink flex items-center justify-start gap-2"
                        active-class="text-white font-medium text-base bg-gradient-to-r from-secondaryblue to-secondarypink w-full rounded-md">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 22 22" fill="none">
                                <rect x="1.21851" y="1.10828" width="13.1023" height="13.8274" rx="2.25" fill="none"
                                    stroke="currentcolor" stroke-width="1.5" />
                                <rect x="7.24146" y="6.52417" width="13.1023" height="13.8274" rx="2.25" fill="none"
                                    stroke="currentcolor" stroke-width="1.5" />
                            </svg>
                        </span>
                        Campaign Management
                    </router-link>
                </li>
                <li>
                    <router-link to="/order"
                        class="text-gray-900 hover:text-white font-medium w-full rounded-xl px-4 py-3 hover:bg-gradient-to-r from-secondaryblue to-secondarypink flex items-center justify-start gap-2"
                        active-class="text-white font-medium text-base bg-gradient-to-r from-secondaryblue to-secondarypink w-full rounded-md">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 22 28" fill="none">
                                <path
                                    d="M17.924 1.72986H3.63827C2.06031 1.72986 0.781128 3.04667 0.781128 4.67103V23.7887C0.781128 25.413 2.06031 26.7299 3.63827 26.7299H17.924C19.5019 26.7299 20.7811 25.413 20.7811 23.7887V4.67103C20.7811 3.04667 19.5019 1.72986 17.924 1.72986Z"
                                    stroke="currentcolor" stroke-width="1.5" />
                                <path d="M6.49548 10.0828H15.0669" stroke="currentcolor" stroke-width="1.5"
                                    stroke-linecap="round" />
                                <path d="M6.49548 14.0828H15.0669" stroke="currentcolor" stroke-width="1.5"
                                    stroke-linecap="round" />
                                <path d="M6.49548 18.0828H12.2098" stroke="currentcolor" stroke-width="1.5"
                                    stroke-linecap="round" />
                            </svg>
                        </span>
                        Orders
                    </router-link>
                </li>
                <li>
                    <router-link to="/query"
                        class="text-gray-900 hover:text-white font-medium w-full rounded-xl px-4 py-3 hover:bg-gradient-to-r from-secondaryblue to-secondarypink flex items-center justify-start gap-2"
                        active-class="text-white font-medium text-base bg-gradient-to-r from-secondaryblue to-secondarypink w-full rounded-md">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 21 21" fill="none">
                                <circle cx="10.7811" cy="10.7036" r="9.29346" stroke="currentcolor" stroke-width="1.5" />
                                <path
                                    d="M9.98046 12.81V12.5328C9.98046 12.3563 9.99483 12.19 10.0236 12.034C10.0523 11.8738 10.0852 11.7363 10.1221 11.6213C10.1591 11.5022 10.2145 11.3832 10.2884 11.2641C10.3664 11.145 10.4342 11.0485 10.4917 10.9746C10.5491 10.9007 10.6313 10.8145 10.738 10.7159C10.8448 10.6174 10.9269 10.5455 10.9844 10.5004C11.0419 10.4511 11.1301 10.3813 11.2492 10.291C11.3806 10.1924 11.4833 10.1124 11.5572 10.0508C11.6352 9.98917 11.7255 9.90705 11.8282 9.8044C11.9308 9.69765 12.0088 9.59705 12.0622 9.50261C12.1156 9.40818 12.1607 9.29321 12.1977 9.15771C12.2388 9.02221 12.2593 8.8785 12.2593 8.72658C12.2593 8.30777 12.1197 7.97108 11.8405 7.7165C11.5613 7.45782 11.2102 7.32849 10.7873 7.32849C10.3726 7.32849 10.0174 7.45167 9.72178 7.69803C9.42615 7.94439 9.27012 8.27697 9.2537 8.69578H7.93567C7.94799 8.13737 8.09375 7.65286 8.37296 7.24226C8.65217 6.83166 9.00118 6.52782 9.41999 6.33073C9.8388 6.13364 10.2966 6.0351 10.7934 6.0351C11.3067 6.0351 11.7748 6.1398 12.1977 6.3492C12.6247 6.5545 12.9696 6.86451 13.2324 7.27921C13.4952 7.69392 13.6266 8.17638 13.6266 8.72658C13.6266 9.02632 13.5917 9.29526 13.5219 9.53341C13.4562 9.76745 13.3515 9.97891 13.2078 10.1678C13.0641 10.3567 12.9368 10.5024 12.8259 10.6051C12.7192 10.7077 12.5652 10.8391 12.364 10.9993C12.2162 11.1183 12.1135 11.2025 12.056 11.2518C11.9986 11.301 11.9144 11.3832 11.8035 11.4981C11.6968 11.609 11.6208 11.7075 11.5756 11.7938C11.5305 11.88 11.4874 11.9888 11.4463 12.1202C11.4052 12.2516 11.3847 12.3891 11.3847 12.5328V12.81H9.98046ZM9.91271 15.3721V13.7646H11.4463V15.3721H9.91271Z"
                                    fill="currentcolor" />
                            </svg>
                        </span>
                        Queries
                    </router-link>
                </li>
                <li>
                    <router-link to="/setting"
                        class="text-gray-900 hover:text-white font-medium w-full rounded-xl px-4 py-3 hover:bg-gradient-to-r from-secondaryblue to-secondarypink flex items-center justify-start gap-2"
                        active-class="text-white font-medium text-base bg-gradient-to-r from-secondaryblue to-secondarypink w-full rounded-md">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </span>
                        Settings
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- Navbar -->
        <div class="flex-1">
            <div class="py-3">
                <div
                    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-transparent px-4 sm:gap-x-6 sm:px-6 lg:px-12">
                    <button @click="MobSidebar" type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                        <span class="sr-only">Open sidebar</span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                            </svg>
                        </span>
                    </button>
                    <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
                        <div
                            class="flex items-center justify-end sm:justify-end w-full sm:w-auto gap-x-4 lg:gap-x-4 relative">
                            <button @click="isNotificationBtn" type="button"
                                class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                <span class="sr-only">View notifications</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="34" viewBox="0 0 32 34"
                                    fill="none">
                                    <path
                                        d="M14.0849 5.41765C16.5278 5.41765 18.8705 6.28021 20.5978 7.8156C22.3251 9.35097 23.2954 11.4334 23.2954 13.6048C23.2954 16.9634 24.0546 19.4783 25.0391 21.3278C26.2969 23.6908 26.9257 24.8723 26.8908 25.1421C26.85 25.4571 26.798 25.5438 26.5391 25.7277C26.3172 25.8854 25.2134 25.8854 23.0058 25.8854H5.16398C2.95639 25.8854 1.85262 25.8854 1.63073 25.7277C1.3719 25.5438 1.31989 25.4571 1.27909 25.1421C1.24411 24.8723 1.873 23.6908 3.1308 21.3278C4.11525 19.4783 4.87441 16.9634 4.87441 13.6048C4.87441 11.4334 5.84481 9.35097 7.5721 7.8156C9.29941 6.28021 11.6421 5.41765 14.0849 5.41765ZM14.0849 5.41765V2.00635M9.57177 31.0024C10.7763 32.0655 12.3586 32.7108 14.0918 32.7108C15.8247 32.7108 17.407 32.0655 18.6117 31.0024"
                                        stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <circle cx="23.0019" cy="9.42865" r="7.91696" fill="#FFB545" stroke="#F3F1FF"
                                        stroke-width="2" />
                                    <path
                                        d="M23.2692 11.7096H25.7067V13.3209H20.111V12.9459C21.2556 11.6256 22.0739 10.6568 22.5661 10.0396C23.0583 9.42245 23.3903 8.95175 23.5622 8.62753C23.738 8.30331 23.8259 7.99472 23.8259 7.70175C23.8259 7.42441 23.7399 7.20175 23.5681 7.03378C23.4001 6.86191 23.1813 6.77597 22.9118 6.77597C22.6306 6.77597 22.404 6.86386 22.2321 7.03964C22.0641 7.21152 21.9802 7.44003 21.9802 7.72519V7.87753H20.2634V7.70175C20.2634 6.95956 20.5016 6.3541 20.9782 5.88535C21.4587 5.41269 22.0934 5.17636 22.8825 5.17636C23.6677 5.17636 24.3083 5.41074 24.8044 5.87949C25.3044 6.34824 25.5544 6.9498 25.5544 7.68417C25.5544 8.19589 25.3981 8.73495 25.0856 9.30136C24.7731 9.86386 24.1677 10.6666 23.2692 11.7096Z"
                                        fill="white" />
                                </svg>
                            </button>
                            <router-link to="/notification" v-if="isNotification"
                                class="border rounded-lg bg-white px-4 py-2 absolute right-20 top-20 shadow-md z-50 w-96">
                                <div class="flex items-center justify-between border-b py-2">
                                    <p class="font-semibold text-md text-gray-900">Notifications</p>
                                    <!-- <a href="" class="text-sm text-gray-400 font-medium">Mark all as read</a> -->
                                </div>
                                <!-- <div class="flex items-center justify-start gap-3 border-b py-2">
                                    <img :src="notificationLogo" alt="">
                                    <p class="font-medium">You have Received <a class="text-primary" href="">2 Queries</a>
                                    </p>
                                </div>
                                <div class="flex items-center justify-start gap-3 border-b py-2">
                                    <img :src="notificationLogo" alt="">
                                    <p class="font-medium">You have Received <a class="text-primary" href="">2 Queries</a>
                                    </p>
                                </div>
                                <div class="flex items-center justify-start gap-3 border-b py-2">
                                    <img :src="notificationLogo" alt="">
                                    <p class="font-medium">You have Received <a class="text-primary" href="">2 Queries</a>
                                    </p>
                                </div> -->
                            </router-link>

                            <!-- Profile dropdown -->
                            <Menu as="div" class="relative cursor-pointer">
                                <MenuButton class="-m-1.5 flex items-center p-1.5">
                                    <span class="sr-only">Open user menu</span>
                                    <router-link to="/user_profile">

                                        <img class="h-10 w-10 rounded-full bg-gray-50"
                                            :src="adminDetImg"
                                            alt="" />
                                    </router-link>

                                    <div class="flex flex-col ml-4">

                                        <span class="hidden lg:flex lg:items-center gap-4">
                                            <span class="text-sm font-semibold text-gray-900" aria-hidden="true">{{ adminName}}</span>
                                            <button @click="walletAddressBtn">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </button>
                                           
                                        </span>
                                    </div>
                                </MenuButton>
                                <transition v-if="walletAddressModal" enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems
                                        class=" absolute right-0 z-10 mt-2.5 w-auto px-4 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        <h1 class="font-medium">Wallet address:</h1>
                                        <p v-if="isConnected" class="text-sm text-gray-500">{{ walletKey }}</p>
                                        <router-link to="/connectWallet" v-else class="text-sm text-gray-500">Connect wallet</router-link>
                                    </MenuItems>
                                </transition>
                            </Menu>

                        </div>
                    </div>

                </div>
            </div>
            <div class="">
                <div class="px-4 sm:px-6 xl:px-12 py-6">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Logo from '@assets/logo.png';
import userNewImg from '@assets/user_new.avif'
import { ref } from 'vue';
import { fAddr, getWallet } from '../utils/utils';

const adminDetImg = ref(userNewImg)
const adminName = ref("")
const walletKey = ref("")
const isConnected = ref(false)
const isLogin = ref(false)


const isSidebarOpen = ref(false);
const isNotification = ref(false);
const walletAddressModal = ref(false);
const walletAddressBtn = () => {
    walletAddressModal.value = !walletAddressModal.value;
}
const isNotificationBtn = () => {
    isNotification.value = !isNotification.value;
}

const MobSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
}
const isSidebarClose = () => {
    isSidebarOpen.value = false;
}

/* hearing functions */
hear('x-wallet', async (e) => { 
    isConnected.value = e.status
    if(e.status) {
        await setUp()
    }
})
//listen to login events
hear(['x-admin-login', 'x-admin'], (e) => {  
    adminSetup()
})

//wallet setup
const setUp = async () => {
    walletKey.value = await getWallet(); 
    //if empty value, disconnect wallet
    if(wallet.value == "") {
        isConnected.value = false
        localStorage.setItem('x-wallet-connect','false')
    }
    else {
        isConnected.value = true
    }
}

//userSetup
const adminSetup = async () => {  
    //read the admin details
    const adminDet = JSON.parse(localStorage.getItem('x-admin') || '{}')
    if(adminDet['token']) { 
        //change the logo
        isLogin.value = true
        adminDetImg.value = adminDet.img || userNewImg
        adminName.value = adminDet.name || "ADMIN"
    }
    else {
        isLogin.value = false
    }
}
adminSetup()
</script>

<style scoped></style>
