const regSymbol = /^[А-Яа-яёЁA-Za-z\s'-]$/i;
const regString = /^(?!.*([ '-])\1)[А-Яа-яёЁA-Za-z]+(?:[ '-][А-Яа-яёЁA-Za-z]+)*$/i;

const EventTypes = {
  keypress: (e) => {
    const char = String.fromCharCode(e.keyCode);
    return {
      char,
      isValid: regSymbol.test(char),
    };
  },
  input: (e) => {
    const value = e.target.value;
    const cleanValue = value
      .replace(/(['-])\1+/g, '$1')
      .replace(/\s{2,}/g, ' ');
    
    if (value !== cleanValue) {
      e.target.value = cleanValue;
    }

    return {
      char: cleanValue,
      isValid: true
    };
  },
  paste: (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text");
    const cleanText = text
      .replace(/(['-])\1+/g, '$1')
      .replace(/\s{2,}/g, ' ');

    document.execCommand('insertText', false, cleanText);
    return {
      char: cleanText,
      isValid: true
    };
  },
  default: (e) => {
    return {
      char: e.target.value,
      isValid: regString.test(e.target.value)
    };
  },
  blur: (e) => {
    e.target.value = e?.target?.value?.trim()
    return {
      char: e?.target?.value,
      isValid: true
    }
  }
};

function isLetter(e) {
  const { char, isValid } = Object.hasOwn(EventTypes, e?.type) 
    ? EventTypes[e.type](e) 
    : EventTypes.default(e);

  if (!isValid) {
    e.preventDefault();
  } 
  return isValid;
}

function initIsLetterHelper() {
  const inputs = document.querySelectorAll('[data-is-letter-helper]');
  inputs.forEach(input => {
    const inputEvents = JSON.parse(input?.getAttribute('data-is-letter-helper'));

    inputEvents.forEach(inputEvent => {
      if (Object.hasOwn(EventTypes, inputEvent)) {
        input.addEventListener(inputEvent, isLetter);
      } else {
        console.warn('Передан не валидный event.', `(event:${inputEvent})`);
      }
    });
  });
}