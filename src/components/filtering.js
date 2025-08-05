import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);


export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    
    Object.keys(indexes)
        .forEach((elementName) => {
            
            elements[elementName].append (
                ...Object.values(indexes[elementName])
                    .map(name => {
                        const option = document.createElement('option');
                        option.value = name;
                        option.textContent = name;
                        return option;
                    })
            )
        });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        
        if (action && action.name === 'clear') {
            const parent = action.parentElement;
            const fieldName = action.dataset.field;
            const inputField = parent.querySelector(`input[name="${fieldName}"]`);
            inputField.value = '';
            state[fieldName] = '';
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}