appOption = {
  Type: 'keyboard',
  Buttons: [
    {
      Columns: 3,
      Rows: 2,
      BgLoop: true,
      Text: '<br><font color="#feffff"><b>За допомогою google form</b></font>',
      ActionType: 'open-url',
      ActionBody:
        'https://docs.google.com/forms/d/e/1FAIpQLScyFwdmd6m7aY_iWcMe7VHNwgaXTEKBTrapTFmSohR9QkjxgA/viewform',
      TextSize: 'medium',
      BgColor: '#173b65',
    },
    {
      Columns: 3,
      Rows: 2,
      BgLoop: true,
      Text: '<br><font color="#feffff"><b>У вигляді питань від бота</b></font>',
      ActionType: 'reply',
      ActionBody: 'Questions',
      TextSize: 'medium',
      BgColor: '#173b65',
    },
  ],
}

const initialKeyboard = {
  Type: 'keyboard',
  Buttons: [
    {
      Columns: 3,
      Rows: 2,
      BgLoop: true,
      Text: '<br><font color="#feffff"><b>Інформаційна довідка ХПФК</b></font>',
      ActionType: 'open-url',
      Silent: true,
      ActionBody: 'https://hpk.edu.ua/informatsijna-dovidka',
      TextSize: 'medium',
      BgColor: '#1f4c81',
    },
    {
      Columns: 3,
      Rows: 2,
      BgLoop: true,
      Text: '<br><font color="#feffff"><b>Інформація про підготовчі курси</b></font>',
      Silent: true,
      ActionType: 'open-url',
      ActionBody: 'https://hpk.edu.ua/course/for-entrants',
      TextSize: 'medium',
      BgColor: '#1f4c81',
    },
    {
      Columns: 3,
      Rows: 2,
      BgLoop: true,
      Text: '<br><font color="#feffff"><b>Подача заявки на підготовчі курси</b></font>',
      ActionType: 'reply',
      ActionBody: 'appType',
      TextSize: 'medium',
      BgColor: '#173b65',
    },
    {
      Columns: 3,
      Rows: 2,
      BgLoop: true,
      Text: '<br><font color="#feffff"><b>Номер телефону менеджера підготовчих курсів</b></font>',
      TextHAlign: 'center',
      TextVAlign: 'middle',
      ActionType: 'reply',
      ActionBody: 'Courses',
      TextSize: 'medium',
      BgColor: '#173b65',
    },
  ],
}
module.exports = {
  appOption,
  initialKeyboard,
}
