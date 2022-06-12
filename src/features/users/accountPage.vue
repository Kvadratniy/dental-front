<template>
  <page-container :breadcrumbs="breadcrumbs">
    <template #header>
      <h4 :class="$style.title">
        <v-icon
          color="#DF9F46"
        >
          mdi-account-box
        </v-icon>
        <span style="margin-left: 10px;">АККАУНТ</span>
      </h4>

      <div :class="$style.balance">
        <span>
          Баланс:
        </span>
        <span style="color: #DF9F46; margin-left: 5px">
          {{ formatPrice(user.purse.balance)}}
        </span>
        <!-- <v-icon
          color="#DF9F46"
        >
          mdi-currency-rub
        </v-icon> -->
      </div>
    </template>
    <template #content>
      <v-container>
        <v-row dense>
          <div style="margin-bottom: 20px">
            <p>Каждый пришедший пациент, предъявивший ваш QR код, получает скидку на услуги клиники. В замен, Вы получаете вознаграждение в виде баллов.</p>
            <p>Баллами можно оплатить лечение в сети клиник "Dr.Tochiev Dental club" или обменять на деньги 1 балл = 1 руб.</p>
             <v-btn
              :class="$style.btn"
              outlined
              rounded
              small
              @click="isShowModal = true"
            >
              Списать баллы
            </v-btn>
            <br/>
          </div>

          <div>

          </div>
        </v-row>

        <v-row dense>
          <div :class="$style.border">
           МОИ СКИДКИ
          </div>
          <v-col
            v-for="(item, i) in discounts"
            :key="i"
            cols="12"
            sm="12"
            md="12"
            lg="6"
          >
            <v-card
              color="#264156"
              dark
            >
              <div :class="$style.card">
                <div :class="$style.info">
                  <v-card-title
                    class="text-h5"
                    style="color: #ffd397"
                  >
                    Скидка {{ item.sale }} %
                  </v-card-title>

                  <v-card-subtitle>Действует до: {{ formatDate(item.endDate) }}</v-card-subtitle>

                  <v-card-actions>
                    <v-btn
                      :class="$style.btn"
                      outlined
                      rounded
                      small
                      block
                      @click="upload(item.src)"
                    >
                      Скачать
                    </v-btn>
                  </v-card-actions>
                </div>

                <div :class="$style.qrcode">
                  <v-avatar
                    class="ma-3"
                    size="200"
                    tile
                  >
                    <v-img :src="item.src"></v-img>
                  </v-avatar>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <Modal v-if="isShowModal" @close="isShowModal = false">
          <span>
            Для списания накопленных баллов, покажите этот QR код администратору клиники
          </span>
          <div style="display:flex; justify-content: center;">
            <v-img :src="writeoffQr" style="max-width: 300px"/>
          </div>
        </Modal>
      </v-container>
    </template>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import pageContainer from '@/core/components/page-container.vue';
import { useRouter } from '@/router/composition';
import useBreadcrumbs from '@/core/composition/useBreadcrumbs';
import useUser from './composition/useUser';
import useCurrentUser from '@/core/composition/useUser';
import { formatDate } from '@/core/filters/date';
import { downloadFile } from '@/core/utils/files';
import { formatPrice } from '@/core/filters/price';
import Modal from '@/core/components/modal.vue';
import useWriteoff from '@/features/writeoff/composition/useWriteoff';

export default defineComponent({
  components: { pageContainer, Modal },

  setup() {
    const router = useRouter();
    const isShowModal = ref(false);

    const {
      breadcrumbs,
    } = useBreadcrumbs(['DENTAL CLUB', 'АККАУНТ']);

    const {
      discounts,
      loadUserDiscounts,
      managers,
    } = useUser();

    const {
      writeoffQr,
      loadWriteoffQr,
    } = useWriteoff();

    const { user } = useCurrentUser();

    const upload = (src) => {
      downloadFile(src, '123')
    }

    onMounted(async () => {
      await loadUserDiscounts();
      await loadWriteoffQr();
    })

    return {
      user,
      breadcrumbs,
      writeoffQr,
      discounts,
      router,
      isShowModal,
      formatDate,
      formatPrice,
      upload,
    }
  }
});
</script>

<style module lang="scss">
.wrapper {
  height: 100%;
}

.container {
  margin: 0 20px 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: -10px -20px 27px rgb(0 0 0 / 5%);
  display: flex;
  flex-direction: column;
  flex: 1 0;
}

.title {
  font-family: 'Montserrat';
  font-size: 14px;
  color: var(--color-dark);
  font-weight: 900;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}

.headerContainer {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #DF9F46;
  padding: 0 0 16px 0;
  gap: 16px
}

.header {
  font-family: 'Montserrat';
  color: var(--color-dark) !important;
}

.row {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 15px 0 0;
  max-width: 700px;
}

.card {
  display: flex;
  justify-content: space-between;
}

.info {
  order: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 10px;
}

.btn {
  width: 225px;
  font-weight: 700;
  font-size: 13px !important;
}

.border {
  width: 100%;
  border-bottom: 2px solid #DF9F46;
  font-family: "Montserrat";
  font-size: 14px;
  color: var(--color-dark);
  font-weight: 900;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.balance {
  display: flex;
  align-items: center;
  font-family: "Montserrat";
  font-size: 17px;
  color: var(--color-dark);
  font-weight: 900;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .card {
    flex-direction: column;
    margin-bottom: 20px;
  }

  .info {
    order: 1;
    width: 90%;
    margin: 0 auto;
  }

  .qrcode {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }

  .btn {
    font-weight: 700;
    padding: 20px 0 !important;
    margin-bottom: 20px;
  }

}
</style>