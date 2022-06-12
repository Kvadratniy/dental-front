<template>
  <page-container :breadcrumbs="breadcrumbs">
    <template #header>
      <h4 :class="$style.title">
        <v-icon
          color="#DF9F46"
        >
          mdi-briefcase-upload
        </v-icon>
        <span style="margin-left: 10px;">Список списания</span>
      </h4>
      <div>
        <v-btn
        dark
        depressed
        color="#DF9F46"
        style="margin-right: 10px"
        @click="isShowScanner = true"
      >
        Списать баллы
      </v-btn>
      </div>
    </template>
    <template #content>
      <v-data-table
        fixed-header
        :headers="headers"
        :items="items"
        :items-per-page="15"
      >
        <template #item.user="{ item }">
          {{ item.user.firstName }} {{ item.user.lastName }}
        </template>
        <template #item.amount="{ value }">
          {{ formatPrice(value) }}
        </template>
        <template #item.date="{ value }">
          {{ formatDate(value) }}
        </template>
      </v-data-table>

      <Modal v-if="isShowScanner" @close="isShowScanner = false" >
        <div :class="$style.qrcontainer">
          <qrscaner :writeoff="true" style="min-width: 300px" @create="create"/>
          <v-btn
            dark
            depressed
            color="#DF9F46"
            style="margin: 20px 0 0"
            @click="isShowScanner = false"
          >
            Закрыть
          </v-btn>
        </div>
      </Modal>

      <Modal v-if="isShowWriteoff" @close="isShowWriteoff = false">
        <span style="min-width: 350px">Для списания доступно: {{ userSum }} баллов</span>

        <v-text-field
          v-model="writeoffSum"
          type="number"
          style="margin: 20px 0 0"
          label="Сумма списания"
          :rules="[v => v <= userSum || 'Сумма превышает доступное значение']"
          filled
        ></v-text-field>

        <v-btn
          dark
          depressed
          color="#DF9F46"
          style="margin: 20px 0 0"
          :disabled="writeoffSum > userSum"
          @click="onWriteoff"
        >
          Списать
        </v-btn>
      </Modal>

    </template>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import pageContainer from '@/core/components/page-container.vue';
import { useRouter } from '@/router/composition';
import useBreadcrumbs from '../../core/composition/useBreadcrumbs';
import useWriteoff from './composition/useWriteoff';
import { formatPrice } from '@/core/filters/price';
import Modal from '@/core/components/modal.vue';
import qrscaner from '@/core/components/qrscaner.vue';
import useUser from '@/features/users/composition/useUser'
import { formatDate } from '@/core/filters/date';

export default defineComponent({
  components: { pageContainer, Modal, qrscaner },

  setup() {
    const router = useRouter();
    const isShowScanner = ref(false);
    const isShowWriteoff = ref(false);
    const user = ref<any>(null);
    const userId = ref(null);
    const userSum = ref(null);
    const writeoffSum = ref(0);
    const {
      getUserById,
    } = useUser();

    const create = async (id) => {
      user.value = await getUserById(id);
      userId.value = id;
      userSum.value = user.value.purse.balance;
      isShowWriteoff.value = true;
      isShowScanner.value = false;
    };

    const {
      breadcrumbs,
    } = useBreadcrumbs(['DENTAL CLUB', 'СПИСАНИЯ БАЛЛОВ ПОЛЬЗОВАТЕЛЕЙ']);

    const {
      headers,
      items,
      loadItems,
      writeoffSum: writeoffAmount,
    } = useWriteoff();

    const onWriteoff = () => {
      writeoffAmount(user.value, writeoffSum.value);
      isShowWriteoff.value = false;
      user.value = null;
      userSum.value = null;
      writeoffSum.value = 0;
      loadItems();
    };

    onMounted(async () => {
      await loadItems();
    });

    return {
      userId,
      userSum,
      isShowScanner,
      isShowWriteoff,
      breadcrumbs,
      headers,
      items,
      router,
      writeoffSum,
      formatPrice,
      create,
      formatDate,
      onWriteoff,
    }
  }
});
</script>

<style module>
.title {
  font-family: 'Montserrat';
  font-size: 14px;
  color: var(--color-dark);
  font-weight: 900;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}
</style>