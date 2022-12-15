console.log('hi')
fetch('https://www.torn.com/page.php?sid=StockMarket&step=getInitialData')
    .then(response => response.json())
    .then(data => {

        const container = document.getElementById("ts_table_row");


        const innerStuff = '';

        data.stocks.forEach(stock => {
            if (stock.userOwned.sharesAmount > 0) {
                stock.userOwned.transactions.forEach(transaction => {
                    const row = document.createElement("tr");

                    let currentPrice = stock.sharesPrice.chartData[1].value;
                    let boughtPrice = transaction.boughtPrice;
                    let shares = transaction.amount;

                    const Percentage = this.calculatePercentage((currentPrice - boughtPrice), currentPrice).toFixed(2) + '%';

                    if (calculatePercentage((currentPrice - boughtPrice), currentPrice).toFixed(2) > 0) {
                        row.classList.add('text-green-600');
                    } else {
                        row.classList.add('text-red-600');
                    }

                    row.innerHTML = '<td class="whitespace-nowrap px-3 py-1 text-sm font-semibold">' + stock.profile.acronym + '</td>'
                        +'<td class="whitespace-nowrap px-3 py-1 text-sm">' + Percentage + '</td>'
                        +'<td class="whitespace-nowrap px-3 py-1 text-sm">$' + (currentPrice - boughtPrice).toFixed(2)+'</td>'
                        +'<td class="whitespace-nowrap px-3 py-1 text-sm">$' + boughtPrice+'</td>'
                        +'<td class="whitespace-nowrap px-3 py-1 text-sm">$' + currentPrice+'</td>'
                        +'<td class="whitespace-nowrap px-3 py-1 text-sm">$' + numberWithCommas((boughtPrice * shares).toFixed(0)) +'</td>';

                    container.appendChild(row);
                })
            }
        })

        // document.body.appendChild(container);
    });

function calculatePercentage(percent, total) {
    return (percent / total) * 100;
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}