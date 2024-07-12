<template>
    <div class="w-full">
        <h2 class="text-xl sm:text-3xl font-bold text-center mb-2">Start Your Fundraising</h2>
        <!-- <p class="text-center text-gray-900 mb-4 font-light">
            There are many variations of passages.
        </p> -->
        <div class="flex items-center mb-3">
            <div class="relative w-fit rounded-full">
                <img class="w-24 h-24 rounded-full border"
                    src="https://www.shutterstock.com/image-vector/confident-smiling-coach-man-wearing-600nw-2304634725.jpg"
                    alt="Profile Picture" />
                <button
                    class="absolute top-1 right-1 bg-white text-primary w-6 h-6 flex items-center justify-center rounded-full text-2xl shadow border border-gray-50">
                    +
                </button>
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div class="relative">
                <label for="name"
                    class=" -top-2 left-2 inline-block px-1 text-xs font-medium text-gray-900">First
                    Name</label>
                <input type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                    placeholder="William" required />
            </div>
            <div class="relative">
                <label for="name"
                    class=" -top-2 left-2 inline-block  px-1 text-xs font-medium text-gray-900">Last
                    Name</label>
                <input type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none placeholder:font-light text-sm"
                    placeholder="John" required />
            </div>
        </div>
        <div class="mt-4 relative">
            <label for="name"
                class=" -top-2 left-2 inline-block  px-1 text-xs font-medium text-gray-900">Bio</label>
            <textarea id="bio" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>
    </div>
</template>
