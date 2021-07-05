// ==UserScript==
// @name         HotJar - Download recordings actions as CSV
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Download as CSV the list of action within a session recording, the filename is the query string to append to https://insights.hotjar.com/r 
// for example filename: _site=2464694&recording=6692080434.csv becomes https://insights.hotjar.com/r?site=2464694&recording=6692080434
// @author       Alessandro Stoppato
// @match        https://insights.hotjar.com/r*
// @icon         https://www.google.com/s2/favicons?domain=hotjar.com
// @grant        none
// @noframes
// @downloadURL https://raw.githubusercontent.com/alexrah/userscript_hotjar_export_actions_csv/master/main.js
// @updateURL https://raw.githubusercontent.com/alexrah/userscript_hotjar_export_actions_csv/master/main.js
// ==/UserScript==

(function() {
    'use strict';

    class HotJar_CSV {

        constructor() {
            const class_this = this;
            const hotjar_download = document.createElement('button');
            hotjar_download.innerText = 'Download Actions';
            hotjar_download.classList.add('hotjar-download');
            hotjar_download.style.position = 'fixed';
            hotjar_download.style.top = '0';
            hotjar_download.style.right = '0';
            hotjar_download.style.zIndex = '9999999999';

            hotjar_download.addEventListener('click',()=>{
                class_this.downloadCSV(this.generateCSV(),window.location.search + '.csv');
            });

            window.document.body.appendChild(hotjar_download);

        }


        generateCSV(){
            let events = document.querySelectorAll('.events > div > div > div');
            let actions_table = [];
            events.forEach((node)=>{

                let spans = node.querySelectorAll('span');
                let spans_arr = Array.from(spans);
                // console.log(spans_arr);
                let action_table = spans_arr.map((span,index)=> {
                    return span.innerText;
                });
                // console.log(action_table);
                actions_table.push({'Action':action_table[0],"URL":action_table[1]})
            });
            console.table(actions_table);
            let replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
            let header = Object.keys(actions_table[0]);
            let csv = [
                header.join(','), // header row first
                ...actions_table.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
            ].join('\r\n')
            return csv;
        }

        downloadCSV(csv, filename) {
            var csvFile;
            var downloadLink;

            csvFile = new Blob([csv], {
                type: "text/csv"
            });

            downloadLink = document.createElement("a");
            downloadLink.download = filename;
            downloadLink.href = window.URL.createObjectURL(csvFile);

            downloadLink.style.display = "none";

            document.body.appendChild(downloadLink);

            downloadLink.click();
        }

    }

    new HotJar_CSV();
})();
