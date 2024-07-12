<template>
    <div class="max-w-7xl mx-auto bg-white shadow rounded-xl p-4 sm:p-8 cursor-pointer border border-gray-100/50">
        <h2 class="text-xl font-bold mb-5">Notifications</h2>
        <div>
            <label class="px-4 py-1 rounded-full"
                :class="{ 'border border-primary text-primary': selectNotification === 'all' }" for="all">
                <input id="all" name="notification" value="all" class="hidden" type="radio"
                    v-model="selectNotification">
                <span>All</span>
            </label>
            <label class="px-4 py-1 rounded-full"
                :class="{ 'border border-primary text-primary': selectNotification === 'unread' }" for="unread">
                <input id="unread" name="notification" value="unread" class="hidden" type="radio"
                    v-model="selectNotification">
                <span>unread</span>
            </label>
        </div>
        <div class="space-y-1 mt-5">
            <div v-for="(item, index) in filteredItems" :key="index" class="">
                <div :class="{ 'bg-purple-50': item.active }" class="rounded-xl py-4 flex flex-col sm:flex-row items-start gap-4 px-4">
                    <img class="w-8 h-8 sm:w-14 sm:h-14 rounded-full object-cover border border-primary" :src="item.image" alt="">
                    <div class="flex flex-col gap-1 items-start justify-start">
                        <p class="font-extralight">
                            <span class="font-semibold mr-2">{{ item.name }}</span>
                            {{ item.message }}
                        </p>
                        <span class="font-extralight text-primary text-sm">{{ item.time }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div
        class="bg-gradient-to-r from-primary to-secondary sm:rounded-t-full border-t py-4 sm:py-10 text-center col-span-5 mt-12">
        <p class="text-lg font-normal text-white text-center">© 2024 BlockFund - Built on stellar</p>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const selectNotification = ref('all');
const items = [
  { name: 'Amjad', message: 'Create a one-time security question to verify the user.', time: '7 hours ago', active: true, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwcHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Amjad', message: 'Create a one-time security question to verify the user.', time: '7 hours ago', active: true, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwcHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Amjad', message: 'Create a one-time security question to verify the user.', time: '7 hours ago', active: true, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwcHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Amjad', message: 'Create a one-time security question to verify the user.', time: '7 hours ago', active: true, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwcHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Amjad', message: 'Create a one-time security question to verify the user.', time: '7 hours ago', active: false, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwcHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Amjad', message: 'Create a one-time security question to verify the user.', time: '7 hours ago', active: false, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwcHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D' },
  // Add more items as needed
];

const filteredItems = computed(() => {
  if (selectNotification.value === 'unread') {
    return items.filter(item => item.active);
  } else {
    return items;
  }
});
</script>
