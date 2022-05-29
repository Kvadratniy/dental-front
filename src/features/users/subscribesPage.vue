<template>
 <page-container :breadcrumbs="breadcrumbs">
    <template #header>
      <span>
        Скидка: {{ discount.sale}} %
      </span>
      <span>
        Дата окончания: {{ formatDate(discount.endDate) }}
      </span>
    </template>
    <template #content>
      <div :class="$style.addDiscount">
        <v-select
          v-model="selectedUser"
          :class="$style.addDiscountSelect"
          :items="users"
          filled
          hide-details
          item-value="id"
          item-text="short"
          label="Пользователь"
        ></v-select>
        <v-btn
          dark
          depressed
          color="#DF9F46"
          :disabled="!selectedUser"
          @click="onSub"
        >
          Добавить скидку для пользователя
        </v-btn>
        <div style="margin-bottom: 30px"></div>
        <span :class="$style.addDiscountTitle">Подписанные пользователи: </span>
        <v-data-table
          fixed-header
          :headers="headers"
          :items="discount.subscribers"
          :items-per-page="15"
        >
          <template #item.creationDate="{ value }">
            {{ formatDate(value) }}
          </template>

          <template #item.endDate="{ value }">
            {{ formatDate(value) }}
          </template>

          <template #item.sale="{ value }">
            {{ value }} %
          </template>
          <template #item.delete>
          <!-- <v-btn
            dark
            depressed
            color="#df4646"
            small
            block
          >
            Удалить
          </v-btn> -->
          </template>
        </v-data-table>
        <!-- <v-select
          v-model="selectedDiscount"
          :class="$style.addDiscountSelect"
          :items="discountsList"
          filled
          hide-details
          item-value="id"
          item-text="sale"
          label="Скидка, %"
        ></v-select>
        <v-btn
          dark
          depressed
          color="#DF9F46"
          @click="addDiscount"
        >
          Добавить
        </v-btn> -->
      </div>
      <!-- <div>
        <span>
          ДОСТУПНЫЕ СКИДКИ:
        </span>

        <div>
          {{ userDiscounts }}
        </div>
      </div> -->
    </template>
 </page-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import pageContainer from '@/core/components/page-container.vue';
import useBreadcrumbs from '@/core/composition/useBreadcrumbs';
import useDiscounts from '@/core/composition/useDiscounts';
import { formatDate } from '@/core/filters/date';
import useUser from './composition/useUser';

export default defineComponent({
  components: { pageContainer },
  props: {
    id: {
      type: String,
      required: true,
    }
  },

  setup(props) {
    const {
      breadcrumbs,
    } = useBreadcrumbs(['DENTAL CLUB', 'СКИДКИ ПОЛЬЗОВАТЕЛЯ']);

    const {
      softHeaders: headers,
      users,
      loadUsers,
    } = useUser();

    const selectedUser = ref<any>(null);

    const {
      item: discount,
      loadDiscountsById,
      subscribeUserById,
    } = useDiscounts();

    const onSub = async () => {
      await subscribeUserById({ id: selectedUser.value});
      await loadDiscountsById(props.id);
      selectedUser.value = null;
    }

    onMounted(async () => {
      await loadUsers();
      await loadDiscountsById(props.id);
    });

    return {
      breadcrumbs,
      selectedUser,
      discount,
      headers,
      users,
      formatDate,
      onSub,
    }
  }
})
</script>

<style module>
.addDiscount {
  margin: 20px 0;
}

.addDiscountTitle {
  font-size: 14px;
  padding-bottom: 10px;
}

.addDiscountSelect {
  margin-bottom: 10px !important;
}
</style>