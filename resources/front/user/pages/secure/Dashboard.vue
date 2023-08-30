<template>
    <section class="flex justify-between w-full px-5 py-5 text-black">
        <h1 class="text-xl">Self Service Portal</h1>
        <h1 class="text-sm">Access All county services here</h1>
    </section>
    <section class="flex flex-col w-full px-5">
        <div class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 gap-6 py-6">
            <div v-for="(payment,i) in payments"
                 :key="i"
                 class="flex flex-row justify-around px-4 py-4 bg-white
                bg-gradient-to-r from-purple-700 via-purple-800
                to-purple-900 p-8 rounded-lg border-2 border-purple-500 hover:cursor-pointer"
                 @click="()=>{}"
            >
                <div class="my-auto">
                    <div class="text-lg text-purple-300">{{payment.name}}</div>
                    <!--                    <div class="text-4xl text-purple-100">622k</div>-->
                </div>
                <div class="text-purple-300 my-auto bg-gradient-to-l
                    from-purple-700 via-purple-800 to-purple-900 rounded-full p-1">
                    <FontAwesomeIcon :icon="payment.icon" class="fa-2xl"/>
                </div>
            </div>
        </div>
    </section>

    <section class="px-5">
        <SimpleTable title="Recent Payments"
                     :records="data"
                     :columnNames="headers"
                     @onEdit="(e)=>{
                         console.log(e)
                     }"
                     export-file-name="payments"
                     :process-column="true"
        />
        <div class="grid grid-cols-1 xl:grid-cols-2  gap-6 w-full">
            <div class="p-4 flex flex-col bg-white border border-gray-200 rounded-lg
                shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center justify-between mb-4">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Payments</h5>
                    <a class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">
                        View all
                    </a>
                </div>
                <div class="">
                    <ul class="divide-y divide-gray-200 dark:divide-gray-700" role="list">
                        <li v-for="(payment,i) in recentPayments" :key="i" class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="w-3/12 flex-shrink-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Kes {{payment.amount}}/=
                                    </p>
                                    <span class="bg-purple-100 text-purple-800 text-xs
                                        font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900
                                        dark:text-purple-300">{{payment.for}}</span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-lg font-medium text-gray-900 truncate dark:text-white">
                                        {{payment.name}}
                                    </p>
                                </div>
                                <div class="w-3/12 flex-shrink-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {{payment.location}}
                                    </p>
                                    <span class="bg-blue-100 text-blue-800 text-xs
                                        font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900
                                        dark:text-blue-300">{{payment.date}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="p-4 flex flex-col bg-white border border-gray-200 rounded-lg
                shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center justify-between mb-4">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">My Businesses</h5>
                    <a class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">
                        View all
                    </a>
                </div>
                <div class="">
                    <ul class="divide-y divide-gray-200 dark:divide-gray-700" role="list">
                        <li v-for="(business,i) in businesses" :key="i" class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 min-w-0">
                                    <p class="text-lg font-medium text-gray-900 truncate dark:text-white">
                                        {{business.name}}
                                    </p>
                                </div>
                                <div class="w-3/12 flex-shrink-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {{business.type}}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

</template>
<script lang="ts" setup>
import {
    faAnchor,
    faBusinessTime,
    faCab,
    faCaravan,
    faLandmark,
    faMoneyBill1,
    faTractor,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import SimpleTable from '@/common/components/Tables/SimpleTable.vue';

const payments = [
    {name: 'Pay for Parking', to: 'to', icon: faCab},
    {name: 'Pay for SBP', to: 'to', icon: faBusinessTime},
    {name: 'Pay for Cess', to: 'to', icon: faTractor},
    {name: 'Pay for Market', to: 'to', icon: faAnchor},
    {name: 'Pay for Land', to: 'to', icon: faLandmark},
    {name: 'Pay for Stalls', to: 'to', icon: faCaravan},
    {name: 'Pay for Bills', to: 'to', icon: faMoneyBill1},
];
const recentPayments = [
    {for: 'SBP', amount: '35,000', name: 'Moffat Munene', location: 'Main Stage', date: '25/06/2023'},
    {for: 'Cess', amount: '120', name: 'Moffat Munene', location: 'Barrier 5', date: '22/06/2023'},
];
const businesses = [
    {for: 'SBP', amount: '35,000', name: 'Hub Entreprises', type: 'Barber Shop', date: '25/06/2023'},
];
const headers = [
    {name: 'Name', real: 'name'},
    {name: 'Amount', real: 'amount'},
    {name: 'Vehicle', real: 'vehicle'},
    {name: 'Location', real: 'location'},
];
const data = [
    {name: 'Pay for Parking', amount: '35,000', vehicle: 'KCL 456T', location: 'Main Stage'},
    {name: 'Test', amount: '35,000', vehicle: 'KCL 456T', location: 'Other Stage'},
];

</script>
