/**
 * Функция валидации input полей в указанный тип данных
 * @param {'string' | 'number'} type - Тип данных для преобразования ('string' или 'number')
 * @param {...HTMLInputElement} fields - Input элементы для валидации
 * @returns {Array<string | number> | string | number} - Результат валидации
 * @throws {Error} - Если передан неподдерживаемый тип
 */
function validateInputsFields(type, ...fields) {
  if (fields.length === 0) {
    console.warn('No fields provided');
    return [];
  }

  const results = fields.map(field => {
    const value = field.value.trim();
    
    if (type === 'string') {
      return value;
    } else if (type === 'number') {
      const num = Number(value);
      return isNaN(num) ? field.value : num; // Возвращаем исходное значение, если не число
    } else {
      throw new Error(`Unsupported type: ${type}`);
    }
  });

  return results.length === 1 ? results[0] : results;
}

/**
 * Валидирует поле по заданному типу с использованием стандартных паттернов
 * @param {HTMLInputElement} field - Input поле с данными
 * @param {'email' | 'password' | 'text'} variant - Тип валидации
 * @param {Object} [options] - Дополнительные параметры валидации
 * @param {RegExp} [options.customPattern] - Кастомный паттерн для валидации
 * @param {number} [options.minLength] - Минимальная длина для password/text
 * @param {number} [options.maxLength] - Максимальная длина для password/text
 * @returns {boolean} - Результат валидации
 * @throws {Error} - Если передан неподдерживаемый тип
 */
function isValidData(field, variant, options = {}) {
  const value = validateInputsFields('string', field);
  
  // Если поле пустое после trim
  if (!value) return false;

  switch (variant) {
    case 'email':
      const emailPattern = options.customPattern || 
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(value.toLowerCase());

    case 'password':
      const {
        minLength = 4,
        maxLength = 64,
        requireDigit = true,
        requireLower = true,
        requireUpper = true,
        requireSpecial = false,
        customPattern
      } = options;
      
      if (customPattern) return customPattern.test(value);
      
      let passwordPattern = '^';
      if (requireDigit) passwordPattern += '(?=.*\\d)';
      if (requireLower) passwordPattern += '(?=.*[a-z])';
      if (requireUpper) passwordPattern += '(?=.*[A-Z])';
      if (requireSpecial) passwordPattern += '(?=.*[!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~])';
      passwordPattern += `.{${minLength},${maxLength}}$`;
      
      return new RegExp(passwordPattern).test(value);

    case 'text':
      const {
        minLength: textMin = 1,
        maxLength: textMax = 100,
        allowNumbers = true,
        allowHyphens = true,
        allowSpaces = true,
        customPattern: textPattern
      } = options;
      
      if (textPattern) return textPattern.test(value);
      
      let textRegex = '^[A-Za-z';
      if (allowNumbers) textRegex += '0-9';
      if (allowHyphens) textRegex += '\\-';
      if (allowSpaces) textRegex += '\\s';
      textRegex += `\'']{${textMin},${textMax}}$`;
      
      return new RegExp(textRegex).test(value);

    default:
      throw new Error(`Unsupported validation variant: ${variant}`);
  }
}
