const form = document.querySelector('form');
const productGlass = document.querySelector('.calculator__products-item--glass');
const productMirror = document.querySelector('.calculator__products-item--mirror');
const types = document.querySelector('.calculator__select--types');
const MAX_LENGTH = 2748;
const MAX_WIDTH = 1603;
let currentProductType = 'glass';

const PriceList = {
  glass: {
    'Прозрачное': {
      3: {
        'толщина': 3,
        'резка': 900,
        'кромка': {
          'полировка': 200,
          'шлифовка': 150
        }
      },
      4: {
        'толщина': 4,
        'резка': 1100,
        'кромка': {
          'полировка': 200,
          'шлифовка': 150
        }
      },
      5: {
        'толщина': 5,
        'резка': 1400,
        'кромка': {
          'полировка': 200,
          'шлифовка': 150
        }
      },
      6: {
        'толщина': 6,
        'резка': 1600,
        'кромка': {
          'полировка': 250,
          'шлифовка': 200
        }
      },
      8: {
        'толщина': 8,
        'резка': 2300,
        'кромка': {
          'полировка': 300,
          'шлифовка': 250
        }
      },
      10: {
        'толщина': 10,
        'резка': 2500,
        'кромка': {
          'полировка': 300,
          'шлифовка': 250
        }
      }
    },
    'Сатинное': {
      4: {
        'толщина': 4,
        'резка': 1600,
        'кромка': {
          'полировка': 200,
          'шлифовка': 150
        }
      }
    },
    'Тонированное': {
      4: {
        'толщина': 4,
        'резка': 1600,
        'кромка': {
          'полировка': 200,
          'шлифовка': 150
        }
      }
    }
  },
  mirror: {
    'Обычное': {
      4: {
        'толщина': 4,
        'резка': 1400,
        'кромка': {
          'полировка': 200,
          'шлифовка': 150
        },
        'бронирование': 120
      }
    },
    'Antique': {
      4: {
        'толщина': 4,
        'резка': 1400,
        'кромка': {
          'полировка': 200,
          'шлифовка': 150
        },
        'бронирование': 120
      }
    }
  },
  holes: {
    4: 100,
    5: 100,
    6: 150,
    7: 150,
    8: 150,
    9: 150,
    10: 200,
    11: 200,
    12: 200,
    13: 200,
    14: 200,
    15: 250,
    16: 250,
    17: 250,
    18: 250,
    19: 250,
    20: 250,
    21: 250,
    22: 250,
    23: 250,
    24: 250,
    25: 250,
    26: 250
  }
}

productGlass.addEventListener('click', () => {
  const previousProductType = currentProductType;
  currentProductType = 'glass';
  if (previousProductType === currentProductType) {
    return;
  }
  productGlass.classList.add('calculator__products-item--active');
  productMirror.classList.remove('calculator__products-item--active');
  switchOptions();
  switchAddingOptions()
  unlockThickness();
  form.reset();
  resetTotal();
});

productMirror.addEventListener('click', () => {
  const previousProductType = currentProductType;
  currentProductType = 'mirror';
  if (previousProductType === currentProductType) {
    return;
  }
  productGlass.classList.remove('calculator__products-item--active');
  productMirror.classList.add('calculator__products-item--active');
  switchOptions();
  switchAddingOptions()
  form.reset();
  lockThickness();
  resetTotal();
});

function switchOptions() {
  const fieldset = document.querySelector('.calculator__fieldset--types');
  const glassTemplate = document.querySelector('#glass-options');
  const mirrorTemplate = document.querySelector('#mirror-options');
  const types = document.querySelector('.calculator__select--types');
  if (currentProductType === 'glass') {
    types.remove();
    createGlassOptions();
  } else {
    types.remove();
    createMirrirOptions();
  }
}

function createGlassOptions() {
  const fieldset = document.querySelector('.calculator__fieldset--types');
  const selectElement = document.createElement('select');
  selectElement.classList.add('calculator__select');
  selectElement.classList.add('calculator__select--types');
  selectElement.name = 'types';
  selectElement.id = 'types';
  const el1 = document.createElement('option', 'Прозрачное');
  el1.setAttribute('value', 'Прозрачное');
  el1.innerText = 'Прозрачное';
  const el2 = document.createElement('option', 'Сатинное');
  el2.setAttribute('value', 'Сатинное');
  el2.innerText = 'Сатинное';
  const el3 = document.createElement('option', 'Тонированное');
  el3.setAttribute('value', 'Тонированное');
  el3.innerText = 'Тонированное';
  selectElement.appendChild(el1);
  selectElement.appendChild(el2);
  selectElement.appendChild(el3);
  fieldset.appendChild(selectElement);
}

function createMirrirOptions() {
  const fieldset = document.querySelector('.calculator__fieldset--types');
  const selectElement = document.createElement('select');
  selectElement.classList.add('calculator__select');
  selectElement.classList.add('calculator__select--types');
  selectElement.name = 'types';
  selectElement.id = 'types';
  const el1 = document.createElement('option', 'Обычное');
  el1.setAttribute('value', 'Обычное');
  el1.innerText = 'Обычное';
  const el2 = document.createElement('option', 'Antique');
  el2.setAttribute('value', 'Antique');
  el2.innerText = 'Antique';
  selectElement.appendChild(el1);
  selectElement.appendChild(el2);
  fieldset.appendChild(selectElement);
}

function switchAddingOptions() {
  const optionsList = document.querySelector('.calculator__list--additions');
  
  if (currentProductType === 'glass') {
    const element = optionsList.querySelector('.calculator__item');
    element.classList.remove('calculator__item--armor');
    element.classList.add('calculator__item--harding');
    const input = element.querySelector('input');
    input.setAttribute('name', 'harding');
    input.setAttribute('id', 'harding');
    const hardingLabel = element.querySelector('.calculator__control-label');
    hardingLabel.textContent = 'Закалка';
    hardingCheck();
  } else {
    removeHardinhgListener();
    const element = optionsList.querySelector('.calculator__item');
    element.classList.remove('calculator__item--harding');
    element.classList.add('calculator__item--armor');
    const input = element.querySelector('.calculator__control-input');
    input.setAttribute('name', 'armor');
    input.setAttribute('id', 'armor');
    const hardingLabel = element.querySelector('.calculator__control-label');
    hardingLabel.textContent = 'Бронирование';    
    input.addEventListener('change', function () {
      fillTotal();
    })
  }
}

function lockThickness() {
  const thickness = document.querySelector('.calculator__select--thickness');
  const thickness_4_mm = document.querySelector('#option_4mm');
  const arrow = document.querySelector('.calculator__select-img');
  thickness.disabled = true;
  thickness.style.opacity = '0.5';
  arrow.style.opacity = '0';
  thickness.style.cursor = 'not-allowed';
  thickness_4_mm.selected = true;
}

function unlockThickness() {
  const thickness = document.querySelector('.calculator__select--thickness');
  const thickness_4_mm = document.querySelector('#option_4mm');
  const arrow = document.querySelector('.calculator__select-img');
  thickness.disabled = false;
  thickness.style.opacity = '1';
  arrow.style.opacity = '1';
  thickness.style.cursor = 'pointer';
  thickness_4_mm.selected = false;
}

function calculate() {
  const types = document.querySelector('.calculator__select--types');
  const length = Number(document.querySelector('#length').value);
  const lengthUnit = document.querySelector('#length-select').value;
  const width = Number(document.querySelector('#width').value);
  const widthUnit = document.querySelector('#width-select').value;
  const thickness = Number(document.querySelector('.calculator__select--thickness').value);
  const grindingInput = document.querySelector('#grinding');
  const polishingInput = document.querySelector('#polishing');
  // const facetInput = document.querySelector('#facet');
  const armorInput = document.querySelector('#armor');
  const hardingInput = document.querySelector('#harding');
  const figureInput = document.querySelector('#figure');
  const holesInput = document.querySelector('#holes');
  const holesCount = Number(document.querySelector('#holes-count').value);
  const holesDiameter = Number(document.querySelector('#holes-diameter').value);

  const lengthFianl = lengthUnit === 'метр' ? length : lengthUnit === 'сантиметр' ? length / 100 : length / 1000;

  const widthFianl = widthUnit === 'метр' ? width : widthUnit === 'сантиметр' ? width / 100 : width / 1000;

  const cutPrice = lengthFianl * widthFianl * PriceList[currentProductType][`${types.value}`][thickness]['резка'];

  const grinding = grindingInput.checked ? ((lengthFianl + widthFianl) * 2) * PriceList[currentProductType][`${types.value}`][thickness]['кромка']['шлифовка'] : 0;

  const polishing = polishingInput.checked ? ((lengthFianl + widthFianl) * 2) * PriceList[currentProductType][`${types.value}`][thickness]['кромка']['полировка'] : 0;
  // const facet = facetInput.checked ? ((lengthFianl+widthFianl) * 2) * PriceList[currentProductType][`${types.value}`][Number(thickness)]['резка'] : 0;

  const armor = armorInput ? armorInput.checked ? ((lengthFianl + widthFianl) * 2) * PriceList[currentProductType][`${types.value}`][thickness]['бронирование'] : 0 : 0;

  const harding = hardingInput ? hardingInput.checked ? cutPrice : 0 : 0;
  const figureOverprice = figureInput.checked ? (cutPrice * 0.35) + (lengthFianl + widthFianl) * 2 * 50 : 0;

  const holesPrice = holesInput.checked && holesCount !== 0 && holesDiameter !== 0 ? holesCount * PriceList['holes'][holesDiameter] : 0;

  const total = 1000 + cutPrice + grinding + polishing + harding + figureOverprice + holesPrice + armor;

  return Math.ceil(Number(total));
}

function fillTotal() {
  const length = Number(document.querySelector('.calculator__input--length').value);
  const width = Number(document.querySelector('.calculator__input--width').value);
  const thickness = Number(document.querySelector('.calculator__select--thickness').value);
  if (length !== 0 && width !== 0 && thickness !== 0) {
    const total = document.querySelector('.calculator__total-total');
    total.textContent = calculate();
  }
}

function resetTotal() {
  const total = document.querySelector('.calculator__total-total');
  total.textContent = 0;
}


// form.addEventListener('change', function () {
//   fillTotal();
// });

document.querySelectorAll('input').forEach(element => {
  element.addEventListener('input', function () {
    fillTotal();
  })
});

document.querySelectorAll('select').forEach(element => {
  element.addEventListener('change', function () {
    fillTotal();
  })
})

function radioUncheck(evt) {
  let target = evt.target.parentElement.querySelector('.calculator__control-input')
  if (!target.checked) {
    target.checked = true;
    fillTotal();
  } else {
    target.checked = false;
    fillTotal();
  }
}
let addRadioListener = function () {
  document.querySelectorAll('.calculator__control--radio').forEach(function (radio) {
    radio.parentElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      radioUncheck(evt);
    });
  })
}

let removeRadioListener = function () {
  document.querySelectorAll('.calculator__control--radio').forEach(function (radio) {
    let parentElement = radio.parentElement;
    parentElement.replaceWith(parentElement.cloneNode(true));
    document.querySelectorAll('.calculator__control--radio').forEach(function (radio) {
      radio.parentElement.addEventListener('click', function (evt) {
        fillTotal();
      });
    })
  })
}

function removeHardinhgListener() {
  const listElement = document.querySelector('.calculator__item--harding');
  listElement.replaceWith(listElement.cloneNode(true));
}

addRadioListener();

function hardingCheck() {
  document.querySelector('#harding').addEventListener('change', function () {
    if (this.checked) {
      let grinding = document.querySelector('#grinding');
      grinding.checked = true;
      grinding.setAttribute("checked", "true");
      removeRadioListener();
    } else {
      addRadioListener();
    }
    fillTotal();
  })
}

hardingCheck()

function hardingUncheck() {
  document.querySelector('#harding').removeEventListener('change', function () {
    if (this.checked) {
      let grinding = document.querySelector('#grinding');
      grinding.checked = true;
      grinding.setAttribute("checked", "true");
      removeRadioListener();
    } else {
      addRadioListener();
    }
    fillTotal();
  })
}

function showFileAttachment() {
  const fileInput = document.querySelector('.calculator__control--file');
  fileInput.classList.remove('visually-hidden');
}

function hideFileAttachment() {
  const fileInput = document.querySelector('.calculator__control--file');
  fileInput.classList.add('visually-hidden');
}

document.querySelector('#figure').addEventListener('change', function () {
  if (this.checked) {
    showFileAttachment();
  } else {
    hideFileAttachment();
  }
})

function showHolesNumberInput() {
  const inputWrapper = document.querySelector('.calculator__wrapper-input--holes-count');
  inputWrapper.classList.remove('visually-hidden');
  inputWrapper.setAttribute("required", "true");
}

function hideHolesNumberInput() {
  const inputWrapper = document.querySelector('.calculator__wrapper-input--holes-count');
  const input = document.querySelector('.calculator__input--holes-count');
  input.value = '';
  inputWrapper.classList.add('visually-hidden');
  inputWrapper.setAttribute("required", "false");
}

function showHolesDiameterInput() {
  const inputWrapper = document.querySelector('.calculator__wrapper-input--holes-diameter');
  inputWrapper.classList.remove('visually-hidden');
  inputWrapper.setAttribute("required", "true");
}

function hideHolesDiameterInput() {
  const inputWrapper = document.querySelector('.calculator__wrapper-input--holes-diameter');
  const input = document.querySelector('.calculator__input--holes-diameter');
  input.value = '';
  inputWrapper.classList.add('visually-hidden');
  inputWrapper.setAttribute("required", "false");
}

document.querySelector('#holes').addEventListener('change', function () {
  if (this.checked) {
    showHolesNumberInput();
    showHolesDiameterInput();
  } else {
    hideHolesNumberInput();
    hideHolesDiameterInput();
  }
})

document.querySelector('.calculator__button--order').addEventListener('click', function (evt) {
  const length = Number(document.querySelector('.calculator__input--length').value);
  const width = Number(document.querySelector('.calculator__input--width').value);
  const thickness = Number(document.querySelector('.calculator__select--thickness').value);

  if (length !== 0 && width !== 0 && thickness !== 0) {
    evt.preventDefault();
    document.querySelector('.modal--submit').classList.add('modal--active');
    document.querySelector('#first-name').setAttribute('required', 'true');
    document.querySelector('#phone').setAttribute('required', 'true');
  }
})

document.querySelector('.calculator').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const formDataObject = Object.fromEntries(formData.entries());

  console.log(formDataObject)
  sendEmailTelegram(formDataObject)
});

document.querySelector('#file').addEventListener('change', function (event) {
  const fileList = event.target.files;
  console.log(fileList[0]);
})

document.querySelector('.modal--error').addEventListener('click', function (evt) {
  if(evt.target.classList.contains('modal--error') ||
  evt.target.classList.contains('modal__confirm--error')) {
    document.querySelector('.modal--error').classList.remove('modal--active');
  }
})

document.querySelector('.modal--ok').addEventListener('click', function (evt) {
  if(evt.target.classList.contains('modal--ok') ||
  evt.target.classList.contains('modal__confirm--ok')) {
    document.querySelector('.modal--ok').classList.remove('modal--active');
  }
})

document.querySelector('.modal--submit').addEventListener('click', function (evt) {
  if(evt.target.classList.contains('modal--submit')) {
    document.querySelector('.modal--submit').classList.remove('modal--active');
  }
})

document.querySelector('.modal__close--submit').addEventListener('click', function (evt) {
  if(evt.target.classList.contains('modal__close--submit') ||
  evt.target.classList.contains('modal__close-icon--submit') ||
  evt.target.classList.contains('modal__close-icon-path--submit')) {
    document.querySelector('.modal--submit').classList.remove('modal--active');
  }
})

//TELEGRAM

const TELEGRAM_BOT_TOKEN = '7262208595:AAFj6FywHvF6OsIbOK-lKezyZk0ZBX8Qn_A';
const TELEGRAM_CHAT_ID = '-1002218007462';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/`;

async function sendEmailTelegram(Data) {
  const finalText = 'Новый заказ'

  const goodsText = `\n\nТовар: ${currentProductType === 'glass' ? 'стекло' : 'зеркало'}`
  const typeText = `\nВид: ${Data.types}`
  const lengthText = `\nДлина: ${Data.length} ${Data['length-select']}`
  const widthText = `\nШирина: ${Data.width} ${Data['width-select']}`
  const thicknessText = currentProductType === 'glass' ? `\nТолщина: ${Data['thickness-select']} мм` : `\nТолщина: 4 мм`;
  const edgeTypeText = Boolean(Data['edge-type']) ? `\n\nТип обработки кромки: ${Data['edge-type']}` : '';
  const hardingText = Data.harding === 'on' ? '\n\nТребуется закалка' : '';
  const figureText = Data.figure === 'on' ? '\nТребуется фигурная обработка' : '';
  const hasLayout = Boolean(Data.file.name);
  const layoutPicture = hasLayout ? Data.file : '';
  const hasHoles = Boolean(Data.holes === 'on');
  console.log(hasHoles);
  const holesCountText = hasHoles ? `\nКоличество отверстий: ${Data['holes-count']}` : '';
  const holesDiameterText = hasHoles ? `\nДиаметр отверстий: ${Data['holes-diameter']}` : '';
  const armor = Data.armor === 'on' ? '\nТребуется бронирование' : '';
  const commentText = Boolean(Data.comment) ? `\n\nКомментарий: ${Data.comment}` : '';
  const nameText = `\n\nИмя: ${Data['first-name']}`
  const telText = `\nТелефон: ${Data['phone']}`
  const costText = `\n\nСтоимость: ${calculate()} руб.`

  const text = `${finalText}${nameText}${telText}${goodsText}${typeText}${lengthText}${widthText}${thicknessText}${edgeTypeText}${hardingText}${figureText}${holesCountText}${holesDiameterText}${commentText}${costText}`

  // console.log(text)

  if (hasLayout) {
    const formData = new FormData();
    formData.append('chat_id', TELEGRAM_CHAT_ID);
    formData.append('photo', layoutPicture);
    formData.append('caption', text);

    try {
      const response = await fetch(API + 'sendPhoto', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        form.reset();
        document.querySelector('.modal--submit').classList.remove('modal--active');
        document.querySelector('.modal--ok').classList.add('modal--active');
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      console.log(error)
      document.querySelector('.modal--submit').classList.remove('modal--active');
      document.querySelector('.modal--error').classList.add('modal--active');
    }

  } else {
    try {
      const response = await fetch(API + 'sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text
        })
      });
      if (response.ok) {
        form.reset();
        document.querySelector('.modal--submit').classList.remove('modal--active');
        document.querySelector('.modal--ok').classList.add('modal--active');
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      console.log(error)
      document.querySelector('.modal--submit').classList.remove('modal--active');
      document.querySelector('.modal--error').classList.add('modal--active');
    }
  }
}

