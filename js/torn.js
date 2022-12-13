function load () {
    fetch('https://www.torn.com/page.php?sid=StockMarket&step=getInitialData')
        .then(response => response.json())
        .then(data => {

            // Style the box using CSS
            const css = '.lscontainer { max-width: 400px; position:absolute; right:0; top:100px; }'
                + '.lsheader { font-weight: bold;height: 22px;line-height: 22px;background: repeating-linear-gradient(90deg,#2e2e2e,#2e2e2e 2px,#282828 0,#282828 4px);border-bottom-right-radius: 5px;width:200px'
                + 'border-top-right-radius: 5px;color: #fff;cursor: default;font-size: 12px;font-weight: 700;margin: 0;padding-left: 10px;text-shadow: 0 1px 0 #333; }'
                + '.lsbody { font-style: italic; background-color:#fff; color:#000; padding:5px} .lsrows { font-size: 12px; padding-top: 3px; display: grid;grid-template-columns: 1fr 1fr 1fr;justify-content: space-between;grid-gap: 10px}'
                + '.lstext-red { color:red}.lstext-green { color:green}';
            var style = document.createElement("style");
            style.type = "text/css";
            style.appendChild(document.createTextNode(css));
            document.body.appendChild(style);



            var container = document.createElement("div");
            container.classList.add("lscontainer");
            var head = document.createElement("div");
            head.classList.add("lsheader");
            head.innerHTML = 'Your Stocks';

            container.appendChild(head);
            var body = document.createElement("div");
            body.classList.add("lsbody");
            container.appendChild(body);

            var innerStuff ='';

            _.forEach(data.stocks, (stock) => {
                if(stock.userOwned.sharesAmount > 0) {
                    _.forEach(stock.userOwned.transactions, transaction => {
                        console.log(stock.profile.acronym+ ': '+stock.sharesPrice.chartData[1].value+'-'+transaction.boughtPrice+'='+ (stock.sharesPrice.chartData[0].value - transaction.boughtPrice))
                        var row = document.createElement("div");
                        row.classList.add("lsrows");

                        let currentPrice = stock.sharesPrice.chartData[1].value;
                        let boughtPrice = transaction.boughtPrice;

                        let Percentage = calculatePercentage( (currentPrice - boughtPrice), currentPrice).toFixed(2)+ '%';

                        if (calculatePercentage( (currentPrice - boughtPrice), currentPrice).toFixed(2) > 0) {
                            row.classList.add('lstext-green');
                        }
                        else {
                            row.classList.add('lstext-red');
                        }

                        row.innerHTML = '<span>'+stock.profile.acronym+'</span> <span>Profit: $' + (currentPrice - boughtPrice).toFixed(2) + '</span><span style="text-align:right;">' + Percentage + ' </span>';

                        body.appendChild(row);
                    })
                }
            })

            document.body.appendChild(container);
        });
}
