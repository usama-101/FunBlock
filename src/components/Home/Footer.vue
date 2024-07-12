<template>
    <footer>
          <div class="max-w-7xl mx-auto text-gray-500 ">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-20 px-6">
                  <div class="">
                      <img class="w-44 lg:w-auto" :src="Logo" alt="">
                      <p class="mt-3 pr-12">Empowering freelancers and businesses with blockchain-driven marketplace soultions.</p>
                  </div>
                  <ul class="space-y-2">
                      <p class="text-black font-semibold text-lg">Quick Links</p>
                      <li><router-link to="/about">About us</router-link></li>
                      <li>Connect with us</li>
                  </ul>
                  <ul class="space-y-3">
                      <p class="text-black font-semibold text-lg">Useful Links</p>
                      <li><router-link to="/charityDetail">Charity Details</router-link></li>
                      <li><router-link to="/dashboard">Dashboard</router-link></li>
                      <li><router-link to="/account-setting">Account Settings</router-link></li>
                      <li><router-link to="/start-fundraising">Start Fundraising</router-link></li>
                  </ul>
                  <ul class="space-y-2">
                      <p class="text-black font-semibold text-lg">Follow Us</p>
                      <div class="flex items-center justify-start gap-3">
                          <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link1" alt=""></a>
                          <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link2" alt=""></a>
                          <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link3" alt=""></a>
                          <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link4" alt=""></a>
                          <a href=""><img class="w-10 h-10 object-contain shadow rounded-md" :src="Link5" alt=""></a>
                      </div>
                  </ul>
              </div>
              <div class="bg-gradient-to-r from-primary to-secondary sm:rounded-t-full border-t py-4 sm:py-10 text-center col-span-5">
                  <p class="text-lg font-normal text-white text-center">© 2024 BlockFund - Built on stellar</p>
              </div>

          </div>
      </footer>
</template>
<script setup>
import Logo from '@assets/logo.png';
import Link1 from '@assets/Frame 15.png';
import Link2 from '@assets/Frame 16.png';
import Link3 from '@assets/Frame 17.png';
import Link4 from '@assets/Frame 18.png';
import Link5 from '@assets/Frame 19.png';
</script>