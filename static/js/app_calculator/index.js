"use strict"

document.addEventListener("DOMContentLoaded", e => {
    // variables
    let display_text = "";
    let display_text_small = "";
    let arr_calc = [];

    const btn_0 = document.getElementById('btn-0');
    const btn_1 = document.getElementById('btn-1');
    const btn_2 = document.getElementById('btn-2');
    const btn_3 = document.getElementById('btn-3');
    const btn_4 = document.getElementById('btn-4');
    const btn_5 = document.getElementById('btn-5');
    const btn_6 = document.getElementById('btn-6');
    const btn_7 = document.getElementById('btn-7');
    const btn_8 = document.getElementById('btn-8');
    const btn_9 = document.getElementById('btn-9');

    const btn_ac = document.getElementById('btn-ac');
    const btn_equal = document.getElementById('btn-equal');
    const btn_plus = document.getElementById('btn-plus');
    const btn_minus = document.getElementById('btn-minus');
    const btn_multi = document.getElementById('btn-multi');
    const btn_divide = document.getElementById('btn-divide');
    const btn_root = document.getElementById('btn-root');

    const field_display = document.getElementById('field-display-p');
    const field_display_small = document.getElementById('field-display-p-small');
    const field_history = document.getElementById('field-history');

    let arr_objects = [
        btn_0, btn_1, btn_2, btn_3, btn_4, btn_5, btn_6, btn_7, btn_8, btn_9
    ];
    let arr_objects_num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let arr_btn_calc = [btn_plus, btn_minus, btn_multi, btn_divide];

    // functions
    const clean_array = (arr, typ) => {
        let cleaned_arr = [];
        let last_item;
        for (let i=0; i < arr.length; i++) {
            if (arr[i] === "+" || arr[i] === "-" || arr[i] === "*" || arr[i] === "/" || Number.isInteger(arr[i])) {
                cleaned_arr.push(arr[i]);
            } else {
                cleaned_arr.push(0)
            };
        };

        if (typ === "equal") {
            last_item = cleaned_arr[cleaned_arr.length - 1];
            Number.isInteger(last_item) ? cleaned_arr : cleaned_arr.pop();
            last_item = cleaned_arr[cleaned_arr.length - 1];
            if (last_item === "+" || last_item === "-" || last_item === "*" || last_item === "/") {
                cleaned_arr.pop();
            }
        };

        return cleaned_arr;
    };

    const counter_history = () => {
        let p = document.getElementById('p-history');
        let int = parseInt(p.innerText) + 1;
        p.innerText = int;
    };

    const add_history = (arr, result) => {
        let result_calc = arr.join(' ');

        let fragment = document.createDocumentFragment();
        let card = document.createElement('div');
        let p_calc = document.createElement('p');
        let p_result = document.createElement('p');

        card.setAttribute('class', 'card card-body card-history');
        p_calc.setAttribute('class', 'p-calc');
        p_calc.innerText = result_calc;
        p_result.setAttribute('class', 'p-result');
        p_result.innerText = result;

        card.appendChild(p_calc);
        card.appendChild(p_result);

        fragment.append(card);
        field_history.append(fragment);
    };

    // init listeners
    for (let i=0; i < arr_objects.length; i++) {
        arr_objects[i].addEventListener('click', e => {
            e.preventDefault();
            if (display_text.length < 10) {
                display_text += String(arr_objects_num[i]);
            } else {
                display_text = display_text;
            };
            field_display.innerText = display_text;
        });
    };

    for (let i=0; i < arr_btn_calc.length; i++) {
        arr_btn_calc[i].addEventListener('click', e => {
            e.preventDefault();

            field_display.length == 0 ? arr_calc.push(0) : arr_calc.push(parseInt(field_display.innerText));
            arr_calc.push(arr_btn_calc[i].innerText);
            arr_calc = clean_array(arr_calc, "calc");
            display_text = "";
            display_text_small = arr_calc.join(' ');
            field_display.innerText = display_text;
            field_display_small.innerText = display_text_small;
        });
    };

    btn_ac.addEventListener('click', e => {
        e.preventDefault();
        arr_calc.length = 0;
        display_text = "";
        display_text_small = "";
        field_display.innerText = display_text;
        field_display_small.innerText = display_text_small;
    });

    btn_equal.addEventListener('click', e => {
        e.preventDefault();

        field_display.length == 0 ? arr_calc.push(0) : arr_calc.push(parseInt(field_display.innerText));
        arr_calc = clean_array(arr_calc, "equal");
        display_text = "";
        field_display.innerText = display_text;

        // combine item from array to string
        let calc_string = arr_calc.join(' ');

        // calculate from string
        let result = eval(calc_string);
        display_text = result;
        display_text_small = "Result:";
        field_display.innerText = display_text;
        field_display_small.innerText = display_text_small;

        // add data to history-field
        counter_history();
        add_history(arr_calc, result);

        // reset array
        arr_calc.length = 0;
    });

    btn_root.addEventListener('click', e => {
        e.preventDefault();

        arr_calc.length = 0;
        arr_calc.push('Root of ');
        field_display.length == 0 ? arr_calc.push(0) : arr_calc.push(parseInt(field_display.innerText));
        let result = Math.sqrt(arr_calc[1]);
        display_text = result;
        display_text_small = `${arr_calc[0]}${arr_calc[1]}`;
        field_display.innerText = display_text;
        field_display_small.innerText = display_text_small;

        // add data to history-field
        counter_history();
        add_history(arr_calc, result);

        // reset array
        arr_calc.length = 0;
    });
});