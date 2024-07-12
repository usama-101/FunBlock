<template>
  <Wrap class="max-w-7xl">
    <div class="grid lg:grid-cols-2 place-items-center">
      <div class="h-full">
        <div class="">
          <img :src="Nim" alt="Question Image" />
        </div>
      </div>
      <div>
        <div class="max-w-3xl mr-auto sm:mx-auto text-left">
          <h1 class="text-3xl font-bold">Frequent questions</h1>
          <p class="text-lg my-4">It is a long established fact that a reader will be distracted</p>
        </div>
        <div class="faq-section space-y-3 md:space-y-2 mt-5">
          <div
            class="bg-white rounded-xl px-5 py-5 max-w-xl mx-auto shadow-xl"
            v-for="(question, index) in faqList"
            :key="index"
          >
            <button @click="toggleFAQ(index)" class="w-full text-left py-2 focus:outline-none">
              <div class="flex justify-between items-center">
                <span class="text-lg font-normal text-gray-900">{{ question.question }}</span>
                <div class="min-w-[30px]">
                  <span class="material-icons" :class="{ 'rotate-180': activeIndex === index }">
                    <img class="w-8 h-8" :src="Plus" alt="Plus Icon" />
                  </span>
                </div>
              </div>
            </button>
            <transition name="fade">
              <div v-if="activeIndex === index" class="mt-2 text-gray-500" v-html="question.answer"></div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </Wrap>
</template>

<script setup>
import { ref } from 'vue';
import Nim from '@assets/Question.png';
import Plus from '@assets/Plus.png';
import Wrap from '@components/General/Wrap.vue';

const faqList = ref([
  {
    question: 'What is FundBlock?',
    answer: `FundBlock is a decentralized fundraising platform that utilizes the Stellar blockchain and Soroban smart contracts to provide increased transparency, reduced transaction fees, and enhanced accessibility for various fundraising needs. Whether you're raising funds for personal, medical, educational, entrepreneurial, or charitable purposes, FundBlock ensures a secure and efficient fundraising process.`
  },
  {
    question: 'How can you use FundBlock to raise Funds?',
    answer: `Creating your first campaign on FundBlock is easy:<br/>
    1. Sign Up or Log In: Create an account or log in to your existing account.<br/>
    2. Connect Your Wallet<br/>
    3. Create Campaign: Navigate to the "Create Campaign" section and fill out the required details such as title, description, fundraising goal, duration, and any images or videos.<br/>
    4. Submit for Review: Submit your campaign for approval. Our team will review it to ensure it meets our guidelines.<br/>
    5. Launch Campaign: Once approved, your campaign goes live, and you can start sharing it to attract donations.`
  },
  {
    question: 'How to create your first campaign?',
    answer: `Creating your first campaign on FundBlock is easy:<br/>
    1. Sign Up or Log In: Create an account or log in to your existing account.<br/>
    2. Connect Your Wallet<br/>
    3. Create Campaign: Navigate to the "Create Campaign" section and fill out the required details such as title, description, fundraising goal, duration, and any images or videos.<br/>
    4. Submit for Review: Submit your campaign for approval. Our team will review it to ensure it meets our guidelines.<br/>
    5. Launch Campaign: Once approved, your campaign goes live, and you can start sharing it to attract donations.`
  },
  {
    question: 'How to Fund on the Ongoing Campaigns?',
    answer: `Funding ongoing campaigns on FundBlock is straightforward:<br/>
    1. Browse Campaigns: Explore active campaigns through our Fund Explorer page.<br/>
    2. Select a Campaign: Click on a campaign that resonates with you to view its details.<br/>
    3. Donate: Click the "Donate" button and enter the amount you wish to contribute. You'll need to connect your Stellar wallet to complete the transaction.<br/>
    4. Confirmation: After completing the payment, you'll receive a confirmation of your donation, and the transaction will be recorded transparently on the blockchain.`
  },
  {
    question: 'How does FundBlock leverage Blockchain Technology to create Fundraising Campaigns?',
    answer: `FundBlock leverages blockchain technology in several key ways:<br/>
    Transparency: All transactions are recorded on the Stellar blockchain, providing real-time visibility into fund allocation and movement, ensuring donors can track their contributions.<br/>
    Security: Using Soroban smart contracts, FundBlock automates and secures the fundraising process by defining clear rules and conditions for fund allocation, reducing the risk of fraud and misuse.<br/>
    Low Fees: Blockchain technology allows for lower transaction fees compared to traditional fundraising methods, maximizing the amount of funds available for your campaign.<br/>
    Global Accessibility: The Stellar blockchain enables seamless cross-border transactions, allowing you to reach a global audience of potential donors.`
  }
]);

const activeIndex = ref(-1);

const toggleFAQ = (index) => {
  activeIndex.value = activeIndex.value === index ? -1 : index;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
