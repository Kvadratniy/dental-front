<template>
  <page-container :breadcrumbs="breadcrumbs">
    <template #header>
      <h4 :class="$style.title">
        <v-icon
          color="#DF9F46"
        >
          mdi-wallet-giftcard
        </v-icon>
        <span style="margin-left: 10px;">Список визитов</span>
      </h4>
      <v-btn
        dark
        depressed
        color="#DF9F46"
        @click="isShowScanner = true"
      >
        Создать
      </v-btn>
    </template>

    <template #content>
      <v-data-table
        fixed-header
        :headers="headers"
        :items="items"
        :items-per-page="15"
        @click:row="onClickRow"
      >
        <template #item.creationDate="{ value }">
          {{ formatDate(value) }}
        </template>

        <template #item.responsibleManager="{ value }">
          {{ value.firstName }} {{ value.lastName }}
        </template>

        <template #item.discount="{ value }">
          {{ value.sale }} %
        </template>

        <template #item.total="{ value }">
          {{ formatPrice(value) }}
        </template>

        <template #item.servicesIds="{ value }">

          {{ getServices(value) }}
        </template>

        <template #item.status="{ value }">
          <span v-if="value === 'DRAFT'" :class="$style.draft">
            Открыт
          </span>
          <span v-if="value === 'COMPLETED'" :class="$style.complete">
            Закрыт
          </span>
        </template>
      </v-data-table>

      <Modal v-if="isShowScanner" @close="isShowScanner = false">
        <div :class="$style.qrcontainer">
          <qrscaner @create="create"/>
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

      <Modal v-if="isShowComplete" :clickOutside="false" @close="isShowComplete = false">
        <div :class="$style.resultContainer">
          <div>
            <span :class="$style.title" style="margin-bottom: 10px;">Закрыть посещение</span>
            <div :class="$style.row">
              <div :class="$style.subtitle">Менеджер:</div>
              <div>{{ selectedSale.responsibleManager.firstName }} {{ selectedSale.responsibleManager.lastName }}</div>
            </div>

            <div :class="$style.row">
              <div :class="$style.subtitle">Скидка:</div>
              <div>{{ selectedSale.discount.sale }} %</div>
            </div>

            <div :class="$style.row">
              <div :class="$style.subtitle">Сумма со скидкой:</div>
              <div>{{ formatPrice(sumWithDiscount) }}</div>
            </div>

            <div :class="$style.row">
              <v-autocomplete
                v-model="selectedServices"
                :class="$style.field"
                label="Оказанные услуги"
                multiple
                small-chips
                return-object
                outlined
                :items="services"
                item-text="title"
                item-value="id"
                hide-details
              />
            </div>

            <!-- <v-text-field
              v-model="sum"
              :class="$style.field"
              small
              outlined
              label="Сумма визита (без скидки), руб"
              type="number"
              hide-details
            ></v-text-field> -->
          </div>
          <div :class="$style.footer">
            <v-btn
              dark
              depressed
              color="#d15151"
              style="margin: 20px 20px 0"
              @click="isShowComplete = false"
            >
              Отменить
            </v-btn>
            <v-btn
              dark
              depressed
              color="#1ab225"
              style="margin: 20px 0 0"
              @click="onComplete"
            >
              Завершить
            </v-btn>
          </div>
        </div>
      </Modal>
    </template>
  </page-container>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from '@vue/composition-api';
import { useRouter } from '@/router/composition';
import { formatPrice } from '@/core/filters/price';
import { formatDate } from '@/core/filters/date';
import useBreadcrumbs from '../../core/composition/useBreadcrumbs';
import calendar from '@/core/components/calendar.vue'
import qrscaner from '@/core/components/qrscaner.vue';
import PageContainer from '@/core/components/page-container.vue';
import Modal from '@/core/components/modal.vue';
import useSales from '@/features/sales/composition/useSales';
import useServices from '@/features/services/composition/useServices';

export default defineComponent({
  components: { PageContainer, Modal, calendar, qrscaner },

  setup() {
    const router = useRouter();
    const isShowScanner = ref(false);
    const isShowComplete = ref(false);
    const selectedSale = ref<any>(null);
    const selectedServices = ref<any>([]);
    const sum = computed(() => {
      const s = selectedServices.value.map(({cost}) => cost);
      if (!s.length) return 0;
      return s.reduce((prev, cur) => {
        return prev + cur;
      });
    });

    const {
      breadcrumbs,
    } = useBreadcrumbs(['DENTAL CLUB', 'ПРОДАЖИ']);

    const {
      services,
      loadServices
    } = useServices();

    const {
      headers,
      items,
      create: createSale,
      uploadSales,
      complete,
    } = useSales();

    const sumWithDiscount = computed(() => {
      const res = Number(sum.value!) - Number(sum.value!) * (Number(selectedSale.value?.discount.sale) / 100) || 0;
      parseInt(res.toString());
      return res;
    });

    const getServices = (values) => values.map((id) => services.value.find((item) => id === item.id).title).join(', ');

    const create = async (user: string, disc: string) => {
      await createSale(user, disc);
      isShowScanner.value = false;
    };

    const onClickRow = (item) => {
      if (item.status !== 'DRAFT') return;
      selectedSale.value = item;
      isShowComplete.value = true;
    };

    const onComplete = async (item) => {
      if (!sum.value || !selectedSale.value) return;
      const ids = selectedServices.value.map((item) => item.id);
      await complete(selectedSale.value.id, sum.value, ids);
      await uploadSales();
      isShowComplete.value = false;
    };

    onMounted(async () => {
      await uploadSales();
      await loadServices();
    });

    return {
      sum,
      sumWithDiscount,
      selectedServices,
      selectedSale,
      isShowComplete,
      isShowScanner,
      breadcrumbs,
      headers,
      items,
      router,

      formatDate,
      formatPrice,

      onComplete,

      create,
      onClickRow,

      services,
      getServices,
    }
  }
});
</script>

<style module lang="scss">
.title {
  font-family: 'Montserrat';
  font-size: 14px;
  color: var(--color-dark);
  font-weight: 900;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}

.subtitle {
  font-family: 'Montserrat';
  font-size: 14px;
  color: var(--color-dark);
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}


.qrcontainer {
  min-width: 300px;
}

.resultContainer {
  width: 100%;
  min-width: 800px;
}

.draft {
  color: red
}

.complete {
  color: green
}

.row {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 5px 0 0;
}

.field {
  margin: 20px 0 !important;
}

.footer {
  display: flex;
  justify-content: flex-end;
}
</style>