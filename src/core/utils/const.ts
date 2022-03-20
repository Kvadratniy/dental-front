export const FILTERS = {
  writeoffDefault: {
    filter: 'WRITEOFF_DEFAULT',
    filterName: 'По умолчанию',
  },
  inventoryDefault: {
    filter: 'INVENTORY_DEFAULT',
    filterName: 'По умолчанию',
  },
  incoming: {
    filter: 'INCOMING',
    filterName: 'Входящие',
  },
  hasAttachment: {
    filter: 'HAS_ATTACHMENT',
    filterName: 'С вложениями',
  },
  byStatus: {
    filter: 'BY_STATUS',
    filterName: 'Статус',
  },
  byRelation: {
    filter: 'BY_RELATION',
    filterName: 'Имеют отношение',
  },
  toApprove: {
    filter: 'TO_APPROVE',
    filterName: 'Требует подтверждения',
  },
  isApproved: {
    filter: 'IS_APPROVED',
    filterName: 'Подтверждено',
  },
  byDatePeriod: {
    filter: 'BY_DATE_PERIOD',
    filterName: 'Дата (период)',
  },
  byParentType: {
    filter: 'BY_PARENT_TYPE',
    filterName: 'По типу процесса',
  },
  byDateExceptPeriod: {
    filter: 'BY_DATE_EXCEPT_PERIOD',
    filterName: 'Дата (Исключая период)',
  },
  byType: {
    filter: 'BY_TYPE',
    filterName: 'Тип заявки',
  },
  byAppNumber: {
    filter: 'BY_APP_NUMBER',
    filterName: 'Номер заявки',
  },
  byAppId: {
    filter: 'BY_APP_ID',
    filterName: 'Id заявки',
  },
  byOpNumber: {
    filter: 'BY_OP_NUMBER',
    filterName: 'Номер заявки',
  },
  byPerformer: {
    filter: 'BY_PERFORMER',
    filterName: 'Исполнитель',
  },
  byCreator: {
    filter: 'BY_CREATOR',
    filterName: 'Инициатор',
  },
  hasAdjustment: {
    filter: 'HAS_ADJUSTMENT',
    filterName: 'Есть корректировки',
  },
  byTotalFrom: {
    filter: 'BY_TOTAL_FROM',
    filterName: 'Сумма от',
  },
  byTotalTill: {
    filter: 'BY_TOTAL_TILL',
    filterName: 'Сумма до',
  },
  byGoodsGroup: {
    filter: 'BY_GOODS_GROUP',
    filterName: 'Группа товаров',
  },
  byGoodsGroupExcept: {
    filter: 'BY_GOODS_GROUP_EXCEPT',
    filterName: 'Исключая группу товаров',
  },
  byNomenclature: {
    filter: 'BY_NOMENCLATURE',
    filterName: 'Код товара',
  },
  byNomenclatureExcept: {
    filter: 'BY_NOMENCLATURE_EXCEPT',
    filterName: 'Исключая код товара',
  },
  byTitle: {
    filter: 'BY_TITLE',
    filterName: 'Название',
  },
  byTitleExcept: {
    filter: 'BY_TITLE_EXCEPT',
    filterName: 'Исключая название',
  },
  isAssortActive: {
    filter: 'IS_ASSORT_ACTIVE',
    filterName: 'Ассортимент активен',
  },
  isAssortElse: {
    filter: 'IS_ASSORT_ELSE',
    filterName: 'Ассортимент другое',
  },
  isAssortRevealed: {
    filter: 'IS_ASSORT_REVEALED',
    filterName: 'Ассортимент другое',
  },
  byCashSum: {
    filter: 'BY_CASH_SUM',
    filterName: 'Сумма',
  },
  byCashBagNumber: {
    filter: 'BY_CASH_BAG_NUMBER',
    filterName: 'Номер сумки',
  },
  byCashboxNumber: {
    filter: 'BY_CASHBOX_NUMBER',
    filterName: 'Номер кассы',
  },
  byZReport: {
    filter: 'BY_Z_REPORT',
    filterName: 'Номер Z-отчета',
  },
  byCashier: {
    filter: 'BY_CASHIER',
    filterName: 'Операционный кассир',
  },
  byStoreTo: {
    filter: 'BY_STORE_TO',
    filterName: 'Смежное ТО',
  },
  byStoreFrom: {
    filter: 'BY_STORE_FROM',
    filterName: 'ТО из которого ДС',
  },
  byReceiverPerson: {
    filter: 'BY_RECEIVER_PERSON',
    filterName: 'Кто принял ДС',
  },
  byIssuerPerson: {
    filter: 'BY_ISSUER_PERSON',
    filterName: 'Кто выдал ДС',
  },
  byBarcode: {
    filter: 'BY_BARCODE',
    filterName: 'Штрихкод товара',
  },
  byNomenclatureName: {
    filter: 'BY_NOMENCLATURE_NAME',
    filterName: 'Наименование товара',
  },
  byPriceTagType: {
    filter: 'BY_PRICE_TAG_TYPE',
    filterName: 'Тип ценника',
  },
  byPriceType: {
    filter: 'BY_PRICE_TYPE',
    filterName: 'Тип цены',
  },
  inStock: {
    filter: 'IN_STOCK',
    filterName: 'В наличии',
  },
  isPrinted: {
    filter: 'IS_PRINTED',
    filterName: 'Распечатан',
  },
  byOrderNumber: {
    filter: 'BY_ORDER_NUMBER',
    filterName: 'Номер приказа',
  },
  byOrderType: {
    filter: 'BY_ORDER_TYPE',
    filterName: 'Тип приказа',
  },
  byOrderStatus: {
    filter: 'BY_ORDER_STATUS',
    filterName: 'Статус приказа',
  },
  isMicro: {
    filter: 'IS_MICRO',
    filterName: 'Формат ценника',
  },
};

export const ITEM_FILTERS = {
  inventoryDefault: {
    filter: 'INVENTORY_DEFAULT',
    filterName: 'По умолчанию',
  },
  byGoodsGroup: {
    filter: 'ITEM_BY_GOODS_GROUP',
    filterName: 'Группа товаров',
  },
  byGoodsGroupExcept: {
    filter: 'ITEM_BY_GOODS_GROUP_EXCEPT',
    filterName: 'Исключая группу товаров',
  },
  byNomenclature: {
    filter: 'ITEM_BY_NOMENCLATURE',
    filterName: 'Код товара',
  },
  byNomenclatureExcept: {
    filter: 'ITEM_BY_NOMENCLATURE_EXCEPT',
    filterName: 'Исключая код товара',
  },
  byTitle: {
    filter: 'ITEM_BY_TITLE',
    filterName: 'Название',
  },
  byTitleExcept: {
    filter: 'ITEM_BY_TITLE_EXCEPT',
    filterName: 'Исключая название',
  },
  byTotalSumFrom: {
    filter: 'ITEM_BY_TOTAL_SUM_FROM',
    filterName: 'Сумма от',
  },
  byTotalSumTo: {
    filter: 'ITEM_BY_TOTAL_SUM_TO',
    filterName: 'Сумма до',
  },
  byNotFilled: {
    filter: 'ITEM_BY_NOT_FILLED',
    filterName: 'Незаполненность количества',
  },
};
