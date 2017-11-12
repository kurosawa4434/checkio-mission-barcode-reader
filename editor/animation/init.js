//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {

        function barcodeReaderCanvas(dom, dataInp, expl){
            const PAPER_WIDTH = 225;
            const PAPER_HEIGHT = 165;
            const LEFT_MARGIN = 30;
            const TOP_MARGIN = 10;
            const BAR_HEIGHT_L = 110;
            const BAR_HEIGHT_S = 100;
            const [answer, explanation] = expl;

            var paper = Raphael(dom, 
                PAPER_WIDTH,
                PAPER_HEIGHT,
                0, 0);

            var color = {
                blue: "#65A1CF",
                orange: "#FAAB00",
                white: "#FFFFFF",
                black: "#000000",
            };

            var attr = {
                rect: {
                    'stroke': color.blue,
                    'stroke-width': 0,
                    'fill': color.blue
                },
                text: {
                    "stroke": color.black, 
                    'stroke-width': 0,
                    'fill': 'black',
                    "font-size": 18,
                    'font-family': "Verdana",
                },
                text_exp: {
                    "stroke": color.black, 
                    'stroke-width': 0,
                    'fill': color.blue,
                    "font-size": 16,
                    'font-family': "Verdana",
                },
            };

            const r = dataInp.match(/ +|_+/g);
            let mod = LEFT_MARGIN;

            // EAN number
            if (answer){
                //1
                paper.text(22, 110 + TOP_MARGIN, 
                    answer.slice(0, 1)).attr(attr.text);
                for (let i = 0; i < 6; i += 1){
                    //2-7
                    paper.text(45+i*14, 110 + TOP_MARGIN,
                        answer.slice(i+1, i+2)).attr(attr.text);
                    //8-13
                    paper.text(135+i*14, 110 + TOP_MARGIN,
                        answer.slice(i+7, i+8)).attr(attr.text);
                }
            }

            for (let i = 0; i < r.length; i += 1 ){
                let n = r[i].length * 2;
                let height = BAR_HEIGHT_L;

                if (mod  >= (3)*2 + LEFT_MARGIN
                    && mod < (45)*2 + LEFT_MARGIN 
                    || mod >= (50)*2 + LEFT_MARGIN 
                        && mod < (92)*2 + LEFT_MARGIN){
                    height = BAR_HEIGHT_S;
                }

                // draw bar
                if (r[i].slice(0, 1) === '_'){
                    paper.rect(
                        mod,
                        0 + TOP_MARGIN, 
                        n,
                        height 
                    ).attr(attr.rect).attr("fill", color.black);
                }

                mod += n;
            }
            // explanation text
            paper.text(100, 135 + TOP_MARGIN,
                explanation).attr(attr.text_exp);
        }

        var $tryit;
        var io = new extIO({
            multipleArguments: false,
            functions: {
                js: 'barcodeReader',
                python: 'barcode_reader'
            },
            animation: function($expl, data){
                barcodeReaderCanvas($expl[0],
                    data.in, data.ext.explanation);
            }
        });
        io.start();
    }
);
