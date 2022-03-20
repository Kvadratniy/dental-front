enum eFields {
  cashBagNumber = 'cashBagNumber', // № кассовой сумки
  cashBagEnclosure = 'cashBagEnclosure', // № документа
  date = 'date', // Дата формирования кассовой сумки
  integrity = 'integrity', // Целостность сумки нарушена?
  discrepancies = 'discrepancies', // В кассовой сумке есть расхождения?
  surplus = 'surplus', // В кассовой сумке есть расхождения?
  admReceiptNumber = 'admCheckNumber', // Номер чека АДМ
  admTransactionNumber = 'admTransactionNumber', // Номер транзакции
  to = 'to', // torgovi object
  shortage = 'shortage',
  cashDeskNumber = 'cashDeskNumber', //
  relatedTransaction = 'relatedTransaction',
  employ = 'employ',
  kkm = 'kkm',
  moneyIn = 'moneyIn',
  moneyOut = 'moneyOut',
  recalcByNomenal = 'recalcByNomenal',
  recalcBySum = 'recalcBySum',
  responsible = 'responsible', // ответственный
  earnings = 'earnings',
}

export const config = {
  CASH_INITIAL: {
    title: 'Ввод остатков',
    details: [
      {
        title: 'Сумма, руб',
        name: 'totalSum',
        field: 'application',
      },
    ],
  },
  CASH_EXCHANGE_IN: {
    title: 'Возврат размена',
    details: [
      {
        title: 'Принял ДС',
        name: 'mainCashier',
        field: 'mainCashier',
      },
      {
        title: '№ кассы',
        name: 'cashNumber',
        field: 'shift',
      },
    ],
  },
  CASH_OVERAGE: {
    title: 'Излишек',
    details: [
      {
        title: 'Кассир',
        name: 'mainCashier',
        field: 'mainCashier',
      },
      {
        title: '№ кассы',
        name: 'cashNumber',
        field: 'shift',
      },
      {
        title: 'Z-отчет',
        name: 'zreport',
        field: 'shift',
      },
    ],
  },
  /**
   * Недостача в инкассаторской сумке
   * @CASH_BAG_SHORTAGE
   */
  CASH_BAG_SHORTAGE: {
    title: 'Недостача в инкассаторской сумке',
    requiredFields: [],
    detailFields: ['issuer', 'cashBagNumber'],
    fields: [
      {
        title: 'Произвёл(а) пересчёт *',
        text: 'ФИО сотрудника',
      },
      {
        title: 'Присутствовал(а) при пересчёте *',
        text: 'ФИО сотрудника',
      },
      {
        title: 'Присутствовал(а) при пересчёте',
        text: 'ФИО сотрудника',
      },
      {
        title: 'Присутствовал(а) при пересчёте',
        text: 'ФИО сотрудника',
      },
    ],
    primaryDataFields: [eFields.cashBagNumber, eFields.date, eFields.integrity],
    recalcDataFields: [eFields.recalcByNomenal],
  },

  /**
   * Излишек в инкассаторской сумке
   * @CASH_BAG_OVERAGE
   */
  CASH_BAG_OVERAGE: {
    title: 'Излишек в инкассаторской сумке',
    requiredFields: [],
    detailFields: ['cashBagNumber'],
    fields: [
      {
        title: 'Председатель комиссии *',
        text: 'ФИО сотрудника',
      },
      {
        title: 'Член комиссии *',
        text: 'ФИО сотрудника',
      },
      {
        title: 'Член комиссии',
        text: 'ФИО сотрудника',
      },
      {
        title: 'Член комиссии',
        text: 'ФИО сотрудника',
      },
    ],
    primaryDataFields: [eFields.cashBagNumber, eFields.date, eFields.integrity],
    recalcDataFields: [eFields.recalcByNomenal],
  },

  /**
   * Возврат размена инкассаторам
   * @CASH_CHANGE_RETURN
   */
  CASH_CHANGE_RETURN: {
    title: 'Возврат размена инкассаторам',
    details: [
      {
        title: 'Выдал ДС',
        name: 'bank',
        field: 'bank',
      },
      {
        title: '№ сумки',
        name: 'cashBagNumber',
        field: 'cashBagNumber',
      },
      {
        title: 'Принял ДС',
        name: 'mainCashier',
        field: 'mainCashier',
      },
    ],
    requiredFields: [],
    detailFields: ['issuer', 'cashBagNumber', 'receiver'],
    primaryDataFields: [eFields.cashBagNumber],
    transferDataFields: [eFields.moneyOut],
    recalcDataFields: [eFields.recalcByNomenal],
  },

  /**
   * Выручка от продажи ПС
   * @CASH_PS
   */
  CASH_PS: {
    title: 'Выручка от продажи ПС',
    details: [
      {
        title: 'Кассир',
        name: 'mainCashier',
        field: 'mainCashier',
      },
      {
        title: '№ кассы',
        name: 'cashNumber',
        field: 'shift',
      },
    ],
    requiredFields: [],
    text: {
      relatedTransaction: 'Связанная операция выручки',
    },
    primaryDataFields: [
      eFields.cashDeskNumber,
      eFields.relatedTransaction,
      eFields.employ,
    ],
    recalcDataFields: [eFields.recalcBySum],
  },

  /**
   * Излишек в инкассаторской сумке
   * @CASH_BAG_OVERAGE
   */
  CASH_SHORTAGE: {
    title: 'Недостача',
    requiredFields: [],
    detailFields: ['operationCashier', 'cashboxNumber', 'receiver'],
    fields: [
      {
        title: 'Председатель комиссии *',
        text: 'ФИО сотрудника',
      },
      {
        title: 'Член комиссии *',
        text: 'ФИО сотрудника',
      },
      {
        title: 'Член комиссии',
        text: 'ФИО сотрудника',
      },
      {
        title: 'Член комиссии',
        text: 'ФИО сотрудника',
      },
    ],
    primaryDataFields: [eFields.shortage],
    responsibleDataFields: [eFields.responsible],
  },

  /**
   * Выручка
   * @CASH_EARNINGS
   */
  CASH_EARNINGS: {
    title: 'Выручка',
    requiredFields: ['cashboxShiftId'],
    detailFields: [],
    primaryDataFields: [eFields.cashDeskNumber, eFields.employ, eFields.kkm],
    recalcDataFields: [eFields.earnings],
  },

  /**
   * Выручка от кт
   * @CASH_COMMISSION
   */
  CASH_COMMISSION: {
    title: 'Выручка от кт',
    requiredFields: ['cashboxShiftId'],
    details: [
      {
        title: 'Выдал ДС',
        name: 'mainCashier',
        field: 'mainCashier',
      },
      {
        title: '№ кассы',
        name: 'cashNumber',
        field: 'shift',
      },
    ],
    detailFields: ['salesAgent', 'cashboxNumber', 'receiver'],
    text: {
      relatedTransaction: 'Связанная операция выручки',
    },
    primaryDataFields: [
      eFields.cashDeskNumber,
      eFields.relatedTransaction,
      eFields.employ,
    ],
    recalcDataFields: [eFields.recalcBySum],
  },
  CASH_DAMAGE: {
    title: 'Возмещение материального ущерба',
    requiredFields: [],
    detailFields: [],
    primaryDataFields: [eFields.employ],
  },
  CASH_DAMAGE_EMPLOYEE: {
    title: 'Возмещение материального ущерба',
    requiredFields: [],
    detailFields: [],
    fields: [
      {
        title: 'Председатель комиссии *',
        text: 'ФИО сотрудника',
      },
      {
        title: 'Член комиссии *',
        text: 'ФИО сотрудника',
      },
      {
        title: 'Член комиссии',
        text: 'ФИО сотрудника',
      },
      {
        title: 'Член комиссии',
        text: 'ФИО сотрудника',
      },
    ],
    text: {
      relatedTransaction: 'Связанная операция возмещения',
      employ: 'ФИО сотрудника',
    },
    primaryDataFields: [eFields.relatedTransaction, eFields.employ],
  },
  CASH_CHANGE_ACCEPTANCE: {
    title: 'Прием размена от инкассаторов',
    requiredFields: ['cashBagNumber', 'totalCashSum', 'cashBagEnclosure'],
    details: [
      {
        title: 'Выдал ДС',
        name: 'bank',
        field: 'bank',
      },
      {
        title: '№ сумки',
        name: 'cashBagNumber',
        field: 'cashBagNumber',
      },
      {
        title: 'Принял ДС',
        name: 'mainCashier',
        field: 'mainCashier',
      },
      {
        title: 'Приложение',
        name: 'cashBagEnclosure',
        field: 'cashBagEnclosure',
      },
    ],
    primaryDataFields: [
      eFields.cashBagNumber,
      eFields.cashBagEnclosure,
      // eFields.date,
      eFields.integrity,
      eFields.discrepancies,
      // eFields.surplus,
    ],
    recalcDataFields: [eFields.recalcBySum],
  },
  CASH_TO_STORE: {
    title: 'Инкассация в ТО',
    requiredFields: [],
    detailFields: ['issuer', 'toStore', 'receiver'],
    text: {
      label: 'В смежный торговый объект',
    },
    transferDataFields: [eFields.moneyOut],
    recalcDataFields: [eFields.recalcBySum],
  },
  CASH_FROM_STORE: {
    title: 'Инкассация из ТО',
    requiredFields: [],
    detailFields: ['issuer', 'fromStore', 'receiver'],
    text: {
      label: 'Из смежного торгового объекта',
    },
    transferDataFields: [eFields.moneyIn],
    recalcDataFields: [eFields.recalcBySum],
  },

  CASH_TO_BANK: {
    title: 'Инкассация в банк',
    requiredFields: ['cashBagNumber'],
    details: [
      {
        title: 'Выдал ДС',
        name: 'mainCashier',
        field: 'mainCashier',
      },
      {
        title: '№ сумки',
        name: 'cashBagNumber',
        field: 'cashBagNumber',
      },
      {
        title: 'Принял ДС',
        name: 'bank',
        field: 'bank',
      },
      {
        title: 'Квитанция УВП',
        name: 'cashBagReceiptNumber',
        field: 'cashBagReceiptNumber',
      },
    ],
    primaryDataFields: [eFields.cashBagNumber],
    recalcDataFields: [eFields.recalcByNomenal],
  },
  CASH_TO_ADM: {
    title: 'Инкассация в АДМ',
    requiredFields: ['admTransactionNumber'],
    details: [
      {
        title: 'Выдал ДС',
        name: 'mainCashier',
        field: 'mainCashier',
      },
      {
        title: 'Чек из АДМ',
        name: 'admTransactionNumber',
        field: 'admTransactionNumber',
      },
    ],
    primaryDataFields: [eFields.admReceiptNumber, eFields.admTransactionNumber],
    recalcDataFields: [eFields.recalcByNomenal],
  },
  CASH_EXCHANGE_OUT: {
    title: 'Выдача размена',
    requiredFields: ['cashboxShiftId', 'totalCashSum'],
    details: [
      {
        title: 'Принял ДС',
        name: 'mainCashier',
        field: 'mainCashier',
      },
      {
        title: '№ кассы',
        name: 'cashNumber',
        field: 'shift',
      },
    ],
    detailFields: ['receiver', 'issuer', 'cashboxNumber'],
    primaryDataFields: [eFields.cashDeskNumber],
    transferDataFields: [eFields.moneyIn],
    recalcDataFields: [eFields.recalcBySum],
  },
  CASH_INTERMEDIATE: {
    title: 'Промежуточная инкассация',
    requiredFields: ['cashboxShiftId', 'totalCashSum'],
    details: [
      {
        title: 'Выдал ДС',
        name: 'mainCashier',
        field: 'mainCashier',
      },
      {
        title: '№ кассы',
        name: 'cashNumber',
        field: 'shift',
      },
    ],
    detailFields: ['receiver', 'issuer', 'cashboxNumber'],
    primaryDataFields: [eFields.cashDeskNumber],
    transferDataFields: [eFields.moneyOut],
    recalcDataFields: [eFields.recalcBySum],
  },
};

export const configCashbox = {
  CASH_PARKING: {
    fields: ['operationCashier', 'cashboxNumber', 'receiver'],
    createFields: [],
  },
  CASH_CORRECTION_OUT: {
    fields: ['issuer', '', 'receiver'],
    createFields: [],
  },
  CASH_CORRECTION_IN: {
    fields: ['issuer', '', 'receiver'],
    createFields: [],
  },
  CASH_TO_GK: {
    fields: ['issuer', 'receiver'],
    createFields: [],
  },
  CASH_FROM_GK: {
    fields: ['issuer', 'receiver'],
    createFields: [],
  },
  CASH_BAG_OVERAGE: {
    fields: ['cashBagNumber'],
    createFields: [
      'cashbag',
      'cashbag-date',
      'cashbag-disturbance',
      'responsible',
      'recalcByNomenal',
    ],
  },
  CASH_BAG_SHORTAGE: {
    fields: ['issuer', 'cashBagNumber'],
    createFields: [
      'cashbag',
      'cashbag-date',
      'cashbag-disturbance',
      'responsible',
      'recalcByNomenal',
    ],
  },
  CASH_CHANGE_ACCEPTANCE: {
    fields: ['issuer', 'cashBagNumber', 'receiver', 'cashBagEnclosure'],
    createFields: [
      'cashbag',
      'cashbag-date',
      'cashbag-disturbance',
      'cashbag-divergences',
    ],
  },
  CASH_EXCHANGE_OUT: {
    fields: ['receiver', 'issuer', 'cashboxNumber'],
    createFields: [],
  },
  CASH_EXCHANGE_IN: {
    fields: ['issuer', 'cashboxNumber'],
    createFields: [],
  },
  CASH_EARNINGS: {
    fields: [],
    createFields: ['cashdesc', 'recalcTotal', 'recalcTotalFull'],
  },
  CASH_OVERAGE: {
    fields: ['operationCashier', 'cashboxNumber', 'zReportNumber'],
    createFields: [],
  },
  CASH_CLAIM: {
    createFields: ['organization', 'compensation'],
  },
};
